import React from "react";
import "./page.scss";

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="page">{children}</div>;
};
