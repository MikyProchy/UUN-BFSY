"use client";

import React, { useEffect, useState } from "react";

export function ToggleDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const nextIsDark = stored ? stored === "dark" : prefersDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 text-xl pb-3"
      aria-pressed={isDark}
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
