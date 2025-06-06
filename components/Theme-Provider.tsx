"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { initializeTheme } from "../store";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, isThemeInitialized } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

 
  useEffect(() => {
    if (typeof window !== 'undefined' && !isThemeInitialized) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const systemTheme = systemPrefersDark ? 'dark' : 'light';
      dispatch(initializeTheme(systemTheme));
      console.log('System theme detected:', systemTheme); // Debug log
    }
  }, [dispatch, isThemeInitialized]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = () => {
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [dispatch]);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;

      if (theme === 'dark') {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  return <>{children}</>;
};