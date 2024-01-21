"use client";

import React, { createContext, useState } from "react";
const initGroups: string[] = ["ToRead", "OnProgress", "Done"];
export const initGroupContext = {
  groups: initGroups,
  handleGroups: (b: string[]) => {},
};
export const GroupsContext = createContext(initGroupContext);
const GroupsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [groups, setGroups] = useState(initGroups);
  const handleGroups = (val: string[]) => {
    setGroups(val);
  };
  return (
    <GroupsContext.Provider value={{ groups, handleGroups }}>
      {children}
    </GroupsContext.Provider>
  );
};

export default GroupsContextProvider;
