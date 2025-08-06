import React from "react";
import "./headshot-grid.scss";

export const HeadshotGrid: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="headshot-grid">{children}</div>;
};
