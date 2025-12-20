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
      className="
        inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium
        bg-zinc-900 text-white hover:bg-zinc-800
        dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200
        transition
      "
      aria-pressed={isDark}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
