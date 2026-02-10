// app/components/ToggleDarkMode.tsx
"use client";
import React, { useEffect, useState } from "react";

export default function ToggleDarkMode() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(t);
  }, []);

  function toggle() {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  }

  return (
    <button className="btn btn-ghost" onClick={toggle}>
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
