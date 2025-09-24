import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";

export default function SystemLogs() {
  const [logs] = useState([
    {
      date: "10/06, 9:01 AM",
      user: "jdoe",
      role: "Administrator",
      action: "User login",
      status: "Success",
    },
    {
      date: "10/06, 6:58 AM",
      user: "asmith",
      role: "Driver",
      action: "Data export",
      status: "Failed",
    },
    {
      date: "10/06, 2:19 PM",
      user: "bwilliams",
      role: "Resident",
      action: "System update",
      status: "Pending",
    },
    {
      date: "10/06, 2:38 AM",
      user: "morgam1",
      role: "Responder",
      action: "Incident response",
      status: "Success",
    },
    {
      date: "10/06, 5:08 AM",
      user: "bwilliams",
      role: "Resident",
      action: "Configuration change",
      status: "Failed",
    },
    {
      date: "10/06, 6:24 PM",
      user: "bwilliams",
      role: "Responder",
      action: "Active operator",
      status: "Pending",
    },
  ]);

  const statusColors = {
    Success: "bg-green-600/20 text-green-400",
    Failed: "bg-red-600/20 text-red-400",
    Pending: "bg-blue-600/20 text-blue-400",
  };

  return (
    <div className="flex min-h-screen text-white bg-slate-950">
      <main className="flex-1 p-6">
        <h2 className="mb-4 text-2xl font-semibold">System Logs</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <select className="px-3 py-2 text-white rounded-md bg-slate-800">
            <option>Date range</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <select className="px-3 py-2 text-white rounded-md bg-slate-800">
            <option>User role</option>
            <option>Administrator</option>
            <option>Supervisor</option>
            <option>Responder</option>
          </select>
          <select className="px-3 py-2 text-white rounded-md bg-slate-800">
            <option>Action type</option>
            <option>User Login</option>
            <option>Data Export</option>
            <option>System Update</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 text-white rounded-md bg-slate-800 w-60"
          />
        </div>

        <div className="p-4 rounded-lg shadow bg-slate-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-800">
                <th className="py-2">Date / Time</th>
                <th>User</th>
                <th>Role</th>
                <th>Action Performed</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx} className="border-b border-slate-800">
                  <td className="py-2">{log.date}</td>
                  <td>{log.user}</td>
                  <td>{log.role}</td>
                  <td>{log.action}</td>
                  <td className="flex justify-center gap-3 py-2">
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-400" />
                    <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between mt-4 text-sm text-slate-400">
            <span>1-10 of 50</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700">
                Prev
              </button>
              <button className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-500">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
