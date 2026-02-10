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
  return (
    <div className="card bg-base-100 shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {place.name}, {place.country}
          </h2>
          <p className="text-sm text-muted-foreground">
            Timezone: {weather.timezone}
          </p>
          <p className="mt-2">
            As of: <span className="font-mono">{cw.time}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{cw.temperature}°C</div>
          <div className="text-sm text-muted-foreground">
            Wind {cw.windspeed} km/h
          </div>
        </div>
      </div>
    </div>
  );
}
