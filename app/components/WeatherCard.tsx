// app/components/WeatherCard.tsx
"use client";
import React from "react";
import { GeocodingResult } from "../../lib/types";
import { WeatherResponse } from "../../lib/types";

export default function WeatherCard({
  place,
  weather,
}: {
  place: GeocodingResult;
  weather: WeatherResponse;
}) {
  const cw = weather.current_weather!;

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Decorative gradient header */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>

      <div className="p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Location Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {place.name}, {place.country}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-sm text-gray-600">
                    {weather.timezone.split("/")[1]?.replace("_", " ") ||
                      weather.timezone}
                  </span>
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Last Updated</span>
                </div>
                <div className="font-semibold text-gray-800">
                  {formatTime(cw.time)}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Wind Speed</span>
                </div>
                <div className="font-semibold text-gray-800">
                  {cw.windspeed} km/h
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {getWindDirection(cw.winddirection || 0)}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  <span className="text-sm font-medium">Wind Direction</span>
                </div>
                <div className="font-semibold text-gray-800">
                  {cw.winddirection?.toFixed(0) || "N/A"}°
                </div>
              </div>
            </div>
          </div>

          {/* Temperature Display */}
          <div className="lg:text-right">
            <div className="inline-flex flex-col items-center lg:items-end p-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
              <div className="text-5xl md:text-6xl font-bold text-white">
                {Math.round(cw.temperature)}°
              </div>
              <div className="text-white/90 text-lg mt-2">°C</div>
              <div className="text-white/80 text-sm mt-3 flex items-center space-x-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
                  ></path>
                </svg>
                <span>Current Temperature</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                ></path>
              </svg>
              <span>Elevation: {place.elevation?.toFixed(0) || "N/A"}m</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 2.5a5.5 5.5 0 01-4.5 0m0 0a5.5 5.5 0 01-9-5.197"
                ></path>
              </svg>
              <span>
                Population: {place.population?.toLocaleString() || "N/A"}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600 font-medium">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Real-time Data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
