// app/components/ForecastList.tsx
"use client";
import React from "react";
import { WeatherResponse } from "../../lib/types";

export default function ForecastList({
  weather,
}: {
  weather: WeatherResponse;
}) {
  const daily = weather.daily;

  if (!daily) {
    return (
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
        <div className="flex items-center space-x-2 text-yellow-700">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
          <span>No daily forecast available.</span>
        </div>
      </div>
    );
  }

  const days =
    daily.time?.map((t: string, i: number) => ({
      date: t,
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
      // Use current_weather for today
      code:
        i === 0
          ? (weather.current_weather?.weathercode ?? daily.weathercode[i])
          : daily.weathercode[i],
    })) ?? [];

  const getWeatherIcon = (code: number | null) => {
    console.log("code : " + code);
    if (code === null) return "☀️";

    // Clear sky
    if (code === 0) return "☀️";

    // Mainly clear / partly cloudy
    if (code === 1 || code === 2) return "⛅";

    // Overcast
    if (code === 3) return "☁️";

    // Fog
    if (code === 45 || code === 48) return "🌫";

    // Drizzle + Rain + Rain showers
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";

    // Snow + Snow showers
    if ([71, 73, 75, 85, 86].includes(code)) return "❄️";

    // Thunderstorm
    if ([95, 96, 99].includes(code)) return "⛈️";

    return "☁️";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">7-Day Forecast</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
        {days.map((d: any, index: number) => (
          <div
            key={d.date}
            className={`
              relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${
                index === 0
                  ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm"
              }
            `}
          >
            {index === 0 && (
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full"></div>
            )}

            <div className="relative z-10 text-center">
              <div
                className={`font-semibold ${index === 0 ? "text-blue-50" : "text-gray-600"}`}
              >
                {formatDate(d.date)}
              </div>

              <div
                className={`text-xs mt-1 ${index === 0 ? "text-blue-100" : "text-gray-500"}`}
              >
                {d.date.split("-")[2]}/{d.date.split("-")[1]}
              </div>

              <div className="text-2xl my-3">{getWeatherIcon(d.code)}</div>

              <div
                className={`text-lg font-bold ${index === 0 ? "text-white" : "text-gray-800"}`}
              >
                {Math.round(d.max)}°
              </div>

              <div
                className={`text-sm mt-1 ${index === 0 ? "text-blue-100" : "text-gray-600"}`}
              >
                {Math.round(d.min)}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
