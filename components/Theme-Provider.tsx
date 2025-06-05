"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.app.theme); // 'system' | 'dark' | 'light'
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    // Set initial value
    setSystemPrefersDark(mediaQuery.matches);

    // Listen to system preference changes
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    const shouldUseDark =
      theme === "dark" ? true : theme === "light" ? false : systemPrefersDark;

    root.classList.toggle("dark", shouldUseDark);
  }, [theme, systemPrefersDark]);

  return <>{children}</>;
};
