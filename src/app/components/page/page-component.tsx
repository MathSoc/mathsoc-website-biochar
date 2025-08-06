import React from "react";
import "./page.scss";

export const Page: React.FC<{
  children: React.ReactNode;
  id: string;
  variant?: "pink";
}> = ({ children, id, variant }) => {
  return (
    <div className={`page ${variant}`} id={id}>
      <div className="page-inner">{children}</div>
    </div>
  );
};
