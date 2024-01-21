"use client";
import { themeContextInit } from "@/types";
import React, { createContext, useState } from "react";

const themeContextInitVal: themeContextInit = {
  theme: false,
  handleTheme: () => {},
};

export const ThemeContext = createContext(themeContextInitVal);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(false);
  const handleTheme = () => {
    setTheme(!theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
