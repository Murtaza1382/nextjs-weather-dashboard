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
      <div className="mt-2 text-sm text-muted-foreground">
        No daily forecast available.
      </div>
    );
  }

  const days =
    daily.time?.map((t: string, i: number) => ({
      date: t,
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
      code: daily.weathercode ? daily.weathercode[i] : null,
    })) ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {days.map((d: any) => (
        <div key={d.date} className="card p-3 bg-base-100 shadow-sm">
          <div className="text-sm font-medium">{d.date}</div>
          <div className="mt-2 text-lg font-semibold">
            {Math.round(d.max)}° / {Math.round(d.min)}°
          </div>
        </div>
      ))}
    </div>
  );
}
