import { io } from "socket.io-client";

const approvePending = async (id, handleGetPendingUsers) => {
  try {
    const socket = await io("http://127.0.0.1:8080");
    const response = await fetch(
      `http://127.0.0.1:8000/api/approvePendingUser/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to approve user");

    console.log("User approved:", id);
    socket.emit("updateResidents");
    handleGetPendingUsers();
  } catch (error) {
    console.error(error.message);
  }
};
export default approvePending;
