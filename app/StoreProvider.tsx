"use client";
import React, { useRef } from "react";
import { ApplicationStore, makeStore } from "./reduxToolkit/store";
import { Provider } from "react-redux";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<ApplicationStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
