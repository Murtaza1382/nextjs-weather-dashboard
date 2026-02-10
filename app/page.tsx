// app/page.tsx
import dynamic from "next/dynamic";
import React from "react";

const SearchBar = dynamic(() => import("./components/SearchBar"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <p className="text-sm text-muted-foreground">
              Search a city to view current weather
            </p>
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}
