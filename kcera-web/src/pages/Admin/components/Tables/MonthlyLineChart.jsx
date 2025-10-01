import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyLineChart({ data }) {
  return (
    <div className="p-6 border border-gray-700 shadow-lg rounded-2xl bg-black/40 backdrop-blur-md">
      <h3 className="mb-4 text-xl font-semibold text-gray-300">
        Monthly Reports
      </h3>
      <ResponsiveContainer width="100%" height={288}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderRadius: 8 }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#00E5FF"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2, stroke: "#00E5FF", fill: "#1F2937" }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
