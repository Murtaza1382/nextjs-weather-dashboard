"use client";
import { useEffect, useState } from "react";

export default function ToggleDarkMode() {
  const [dark, setDark] = useState(false);

  // Load saved theme on page load
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggle() {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  }

  return (
    <button
      onClick={toggle}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
