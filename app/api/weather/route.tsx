// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Example usage: /api/weather?lat=34.5&lon=69.2
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");
  if (!lat || !lon)
    return NextResponse.json(
      { error: "lat and lon required" },
      { status: 400 },
    );

  const ext = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const res = await fetch(ext);
  const body = await res.json();
  return NextResponse.json(body, { status: res.status });
}
