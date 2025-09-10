import os
import subprocess
import time
import webbrowser

LARAVEL_PATH = "kcera-be"
REACT_PATH   = "kcera-web"
SOCKET_PATH  = "kcera-socket"
EXPO_PATH    = "kcera-mobile"

# Default ports
LARAVEL_PORT = 8000
SOCKET_PORT  = 8080
REACT_PORT   = 5173

def kill_port(port):
    """Kill any process using a given port (Windows only)."""
    try:
        result = subprocess.check_output(f'netstat -ano | findstr :{port}', shell=True).decode()
        lines = result.strip().split("\n")
        for line in lines:
            parts = line.strip().split()
            if len(parts) >= 5:
                pid = parts[-1]
                print(f"Killing process {pid} on port {port}...")
                subprocess.run(f"taskkill /PID {pid} /F", shell=True)
    except subprocess.CalledProcessError:
        print(f"No process found on port {port}.")

# Kill ports before starting
kill_port(LARAVEL_PORT)
kill_port(SOCKET_PORT)
kill_port(REACT_PORT)

print("Starting Laravel backend...")
laravel = subprocess.Popen("php artisan serve --host=0.0.0.0 --port=8000", cwd=LARAVEL_PATH, shell=True)

print("Starting Socket server...")
socket = subprocess.Popen("node server.js", cwd=SOCKET_PATH, shell=True)

time.sleep(3)

print("Starting React...")
subprocess.Popen("start cmd /k npm run dev", cwd=REACT_PATH, shell=True)

print("Starting Expo...")
subprocess.Popen("start cmd /k npx expo start", cwd=EXPO_PATH, shell=True)

time.sleep(5)
webbrowser.open(f"http://localhost:{REACT_PORT}/")

print("All services launched. React and Expo running in their own CMD windows.")


try:
    laravel.wait()
    socket.wait()
except KeyboardInterrupt:
    print("Stopping services...")
    laravel.terminate()
    socket.terminate()
