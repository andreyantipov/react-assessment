import React from "react";
import "./App.css";
import { AppStoreProvider } from "./AppStoreProvider";

export const App: FCC = ({ children }) => {
  return (
      <AppStoreProvider>{children}</AppStoreProvider>
    );
};
