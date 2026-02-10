// app/components/Loading.tsx
"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="mt-4">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-base-300 rounded w-2/3" />
        <div className="h-10 bg-base-300 rounded" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-base-300 rounded" />
          <div className="h-20 bg-base-300 rounded" />
          <div className="h-20 bg-base-300 rounded" />
        </div>
      </div>
    </div>
  );
}
