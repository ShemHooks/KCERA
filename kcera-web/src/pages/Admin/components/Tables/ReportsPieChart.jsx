import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const COLORS = ["#FF8C00", "#00E5FF", "#555555", "#FF5252"];

export default function ReportsPieChart({ data }) {
  return (
    <div className="p-6 border border-gray-700 shadow-lg rounded-2xl bg-black/40 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold text-gray-3 00">
          Reports by Type
        </h3>
        {/* <div className="flex w-[50px]">
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            className="p-2 text-white border border-gray-600 rounded-md w-[50px] h-[25px]"
          />
        </div> */}
      </div>
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
