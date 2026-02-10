// lib/types.ts

export type GeocodingResult = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  elevation?: number;
  population?: number;
};

export type CurrentWeather = {
  temperature: number; // Celsius
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
};

export type WeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms?: number;
  utc_offset_seconds?: number;
  timezone: string;
  timezone_abbreviation?: string;
  elevation?: number;
  current_weather?: CurrentWeather;
  daily?: any;
  hourly?: any;
};
