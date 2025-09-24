import React, { useState } from "react";
import { GetDocTitle } from "../../../../utils/hooks/useDocumentTitle";

export default function NotifyUsers() {
  const [formData, setFormData] = useState({
    receiver_type: "all",
    receiver_id: "",
    type: "system",
    title: "",
    message: "",
    report_id: "",
    response_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen p-2 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Page Heading */}
      <h1 className="mt-6 ml-10 text-3xl text-white">Send Notification</h1>
      <GetDocTitle title="KCERA: Send Notification" />

      {/* Dark Panel */}
      <div className="flex flex-col gap-4 p-6 mt-4 text-white rounded-lg shadow ">
        <form className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 text-sm border rounded-md bg-black/30 backdrop-blur-sm border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter notification title"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 text-sm border rounded-md bg-black/30 backdrop-blur-sm border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
              placeholder="Type notification message..."
              required
            />
          </div>

          {/* Notification Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-300">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 text-sm border rounded-md bg-black/30 backdrop-blur-sm border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="system">System</option>
              <option value="emergency">Emergency</option>
              <option value="info">Info</option>
              <option value="alert">Alert</option>
            </select>
          </div>

          {/* Receiver Type */}
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-300">
              Send To
            </label>
            <select
              name="receiver_type"
              value={formData.receiver_type}
              onChange={handleChange}
              className="w-full p-3 text-sm border rounded-md bg-black/30 backdrop-blur-sm border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Users</option>
              <option value="role">By Role</option>
              <option value="user">Specific User</option>
            </select>
          </div>

          {/* Receiver ID (if specific user) */}
          {formData.receiver_type === "user" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">
                User ID
              </label>
              <input
                type="text"
                name="receiver_id"
                value={formData.receiver_id}
                onChange={handleChange}
                className="w-full p-3 text-sm border rounded-md bg-black/30 backdrop-blur-sm border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter user ID"
              />
            </div>
          )}

          {/* Role selector (if receiver_type is role) */}
          {formData.receiver_type === "role" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">
                Role
              </label>
              <select
                name="receiver_id"
                value={formData.receiver_id}
                onChange={handleChange}
                className="w-full p-3 text-sm border rounded-md bg-black/30 backdrop-blur-sm border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">-- Choose Role --</option>
                <option value="admin">Admin</option>
                <option value="dispatcher">Dispatcher</option>
                <option value="responder">Responder</option>
              </select>
            </div>
          )}

          {/* Optional IDs */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">
                Related Report ID (optional)
              </label>
              <input
                type="text"
                name="report_id"
                value={formData.report_id}
                onChange={handleChange}
                className="w-full p-3 text-sm border rounded-md bg-black/30 backdrop-blur-sm border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. 42"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-slate-300">
                Related Response ID (optional)
              </label>
              <input
                type="text"
                name="response_id"
                value={formData.response_id}
                onChange={handleChange}
                className="w-full p-3 text-sm border rounded-md bg-black/30 backdrop-blur-sm border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. 105"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
