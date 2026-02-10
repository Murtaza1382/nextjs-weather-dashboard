// app/error.tsx
"use client";
import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-3xl font-bold">Something went wrong</h2>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
      <button className="btn btn-primary mt-6" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
