import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FF8C00", "#00E5FF", "#555555", "#FF5252"];

export default function ReportsPieChart({ data }) {
  return (
    <div className="p-6 border border-gray-700 shadow-lg rounded-2xl bg-black/40 backdrop-blur-md">
      <h3 className="mb-4 text-xl font-semibold text-gray-300">
        Reports by Type
      </h3>
      <ResponsiveContainer width="100%" height={288}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="request_type"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderRadius: 8 }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
