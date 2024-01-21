"use client";

import React, { createContext, useState } from "react";
const initFilter: string = "Status";
export const initGroupContext = {
  filter: initFilter,
  handleFilter: (b: string) => {},
};
export const FilterContext = createContext(initGroupContext);
const FilterContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState(initFilter);
  const handleFilter = (val: string) => {
    setFilter(val);
  };
  return (
    <FilterContext.Provider value={{ filter, handleFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
