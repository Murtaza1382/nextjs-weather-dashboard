// app/components/Loading.tsx
"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
        {/* Inner spinning element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
      </div>
      <p className="mt-6 text-lg font-semibold text-gray-700">
        Fetching weather data...
      </p>
      <p className="text-sm text-gray-500 mt-2">This may take a moment</p>

      {/* Weather icons animation */}
      <div className="flex space-x-4 mt-8">
        <div
          className="animate-bounce text-2xl"
          style={{ animationDelay: "0s" }}
        >
          ☀️
        </div>
        <div
          className="animate-bounce text-2xl"
          style={{ animationDelay: "0.2s" }}
        >
          ⛅
        </div>
        <div
          className="animate-bounce text-2xl"
          style={{ animationDelay: "0.4s" }}
        >
          🌧️
        </div>
      </div>
    </div>
  );
}
