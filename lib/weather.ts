// lib/weather.ts
import { GeocodingResult, WeatherResponse } from "./types";

export async function geocodeCity(name: string): Promise<GeocodingResult[]> {
  const q = encodeURIComponent(name);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=5&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding request failed");
  const data = await res.json();
  if (!data.results) return [];
  return data.results.map((r: any) => ({
    id: r.id,
    name: r.name,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
  }));
}

export async function fetchWeather(
  lat: number,
  lon: number,
): Promise<WeatherResponse> {
  // include current weather + daily forecast
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather request failed");
  return res.json();
}
