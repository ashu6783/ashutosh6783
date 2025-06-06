"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { setTheme, initializeTheme } from "../store";

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
    }
  }, [dispatch, isThemeInitialized]);

 
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't manually changed the theme
      // You can add logic here if you want to track user preference vs system
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [dispatch]);

  // Apply theme to document
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