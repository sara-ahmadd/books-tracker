"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Parent = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme ? "dark" : "light"} min-h-screen`}>{children}</div>
  );
};

export default Parent;
