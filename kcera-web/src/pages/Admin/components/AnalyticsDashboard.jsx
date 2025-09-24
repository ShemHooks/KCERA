import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  getSummary,
  getByType,
  getMonthly,
  getTopUsers,
} from "./../API/AnalyticApi";

const COLORS = ["#FF8C00", "#00E5FF", "#555555", "#FF5252"];

export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState({});
  const [byType, setByType] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    getSummary().then((res) => setSummary(res.data.data));
    getByType().then((res) => setByType(res.data.data));
    getMonthly().then((res) => setMonthly(res.data.data));
    getTopUsers().then((res) => setTopUsers(res.data.data));
  }, []);

  return (
    <div className="min-h-screen p-6 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {" "}
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {Object.entries(summary).map(([key, value]) => (
          <div
            key={key}
            className="p-4 rounded-2xl bg-black/40 border border-gray-700 shadow-lg backdrop-blur-md transition-all hover:scale-[1.03]"
          >
            <h3 className="text-lg font-medium tracking-wide text-gray-300 capitalize">
              {key.replace("_", " ")}
            </h3>
            <p className="mt-2 text-3xl font-extrabold text-cyan-400">
              {value}
            </p>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        <div className="p-6 border border-gray-700 shadow-lg rounded-2xl bg-black/40 backdrop-blur-md">
          <h3 className="mb-4 text-xl font-semibold text-gray-300">
            Reports by Type
          </h3>
          <div className="w-full h-72 ">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={byType}
                  dataKey="total"
                  nameKey="request_type"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label
                >
                  {byType.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="p-6 border border-gray-700 shadow-lg rounded-2xl bg-black/40 backdrop-blur-md">
          <h3 className="mb-4 text-xl font-semibold text-gray-300">
            Monthly Reports
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#00E5FF"
                  strokeWidth={3}
                  dot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: "#00E5FF",
                    fill: "#1F2937",
                  }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Top Users */}
      <div className="p-6 mt-6 border border-gray-700 shadow-lg rounded-2xl bg-black/40 backdrop-blur-md">
        <h3 className="mb-4 text-xl font-semibold text-gray-300">Top Users</h3>
        <ul className="divide-y divide-gray-700">
          {topUsers.map((user) => (
            <li key={user.user_id} className="flex justify-between py-3">
              <span className="text-gray-300">
                {user.user?.name || "Unknown User"}
              </span>
              <span className="font-bold text-cyan-400">{user.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
