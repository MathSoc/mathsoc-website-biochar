import React from "react";
import "./page.scss";

export const Page: React.FC<{ children: React.ReactNode; id: string }> = ({
  children,
  id,
}) => {
  return (
    <div className="page" id={id}>
      {children}
    </div>
  );
};
