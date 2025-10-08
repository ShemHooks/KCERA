import React from "react";

export default function SummaryCards({ summary }) {
  return (
    <div className="mt-4">
      <div className="mb-4 ">
        <h1 className="font-extrabold text-gray-500">Overall Summary</h1>
      </div>
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
    </div>
  );
}
