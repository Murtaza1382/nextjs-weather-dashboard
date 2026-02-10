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
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-6">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
            ></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Discover Weather Anywhere
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get accurate weather forecasts for any location worldwide. Search for
          your city and get 7-day forecasts instantly.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <form className="flex flex-col sm:flex-row gap-3" onSubmit={onSearch}>
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter city name (e.g. Kabul, London, Tokyo)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
          </div>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transition-all duration-300"
            type="submit"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span>Search</span>
            </div>
          </button>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="mt-6">
            <Loading />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl">
            <div className="flex items-center space-x-2 text-red-700">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Location Results */}
        {!loading && results.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center space-x-2 text-gray-700 mb-3">
              <svg
                className="w-5 h-5 text-blue-500"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span className="text-sm font-medium">Choose a location:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((r) => (
                <button
                  key={r.id}
                  className={`
                    w-full text-left p-4 rounded-xl transition-all duration-300
                    ${
                      place?.id === r.id
                        ? "bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 shadow-md"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                    }
                  `}
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
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${place?.id === r.id ? "bg-blue-100" : "bg-gray-200"}`}
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
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
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {r.name}, {r.country}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Lat: {r.latitude.toFixed(2)} · Lon:{" "}
                        {r.longitude.toFixed(2)}
                      </div>
                    </div>
                    {place?.id === r.id && (
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Weather Display */}
      {weather && place && (
        <div className="space-y-8 animate-fadeIn">
          <WeatherCard place={place} weather={weather} />
          <ForecastList weather={weather} />
        </div>
      )}

      {/* Empty State */}
      {!weather && !loading && !error && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl inline-block mb-6">
              <svg
                className="w-16 h-16 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Search for a City
            </h3>
            <p className="text-gray-500">
              Enter a city name above to view weather forecasts and conditions
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
