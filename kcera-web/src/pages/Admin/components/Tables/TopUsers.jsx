import React from "react";

export default function TopUsers({ users }) {
  return (
    <>
      <div className="mb-4">
        <h1 className="font-extrabold text-gray-500">Users</h1>
      </div>
      <div className="p-6 border border-gray-700 shadow-lg rounded-2xl bg-black/40 backdrop-blur-md">
        <h3 className="mb-4 text-xl font-semibold text-gray-300">Top Users</h3>
        <ul className="divide-y divide-gray-700">
          {users.map((user) => (
            <li key={user.user_id} className="flex justify-between py-3">
              <span className="text-gray-300">
                {user.user?.name || "Unknown User"}
              </span>
              <span className="font-bold text-cyan-400">{user.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
