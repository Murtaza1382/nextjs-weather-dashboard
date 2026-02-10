// app/components/SearchBar.tsx
"use client";
import React, { useState } from "react";
import { geocodeCity, fetchWeather } from "../../lib/weather";
import { GeocodingResult, WeatherResponse } from "../../lib/types";
import WeatherCard from "./WeatherCard";
import Loading from "./Loading";
import ForecastList from "./ForecastList";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [place, setPlace] = useState<GeocodingResult | null>(null);

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    setWeather(null);
    setPlace(null);

    if (!q.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      const geos = await geocodeCity(q.trim());
      setResults(geos);
      if (geos.length === 0) {
        setError("No location found");
        setLoading(false);
        return;
      }
      // pick first result by default (user can choose)
      const chosen = geos[0];
      setPlace(chosen);
      const w = await fetchWeather(chosen.latitude, chosen.longitude);
      setWeather(w);
    } catch (err: any) {
      console.error(err);
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className="flex gap-2" onSubmit={onSearch}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Enter city (e.g. Kabul, London)"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>

      <div className="mt-4">
        {loading && <Loading />}

        {error && <div className="alert alert-error mt-4">{error}</div>}

        {!loading && results.length > 0 && (
          <div className="mt-4">
            <label className="text-sm text-muted-foreground">
              Choose location:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {results.map((r) => (
                <button
                  key={r.id}
                  className={`btn btn-ghost justify-start ${place?.id === r.id ? "border-primary" : ""}`}
                  onClick={async () => {
                    setPlace(r);
                    setError(null);
                    setLoading(true);
                    try {
                      const w = await fetchWeather(r.latitude, r.longitude);
                      setWeather(w);
                    } catch (err: any) {
                      setError(err?.message ?? "Failed to fetch weather");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <div className="text-left">
                    <div className="font-medium">
                      {r.name}, {r.country}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Lat: {r.latitude.toFixed(2)} · Lon:{" "}
                      {r.longitude.toFixed(2)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {weather && place && (
          <div className="mt-6">
            <WeatherCard place={place} weather={weather} />
            <div className="mt-4">
              <ForecastList weather={weather} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
