import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-black/85 flex justify-center items-center">
      <svg height="48" width="64">
        <polyline
          className="stroke-gray-500"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        ></polyline>
        <polyline
          className="stroke-red-500 animate-dash"
          points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        ></polyline>
      </svg>
    </div>
  );
};

export default Loading;
