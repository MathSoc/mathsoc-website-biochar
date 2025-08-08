import React from "react";
import "./page.scss";
import Head from "next/head";

export const Page: React.FC<{
  children: React.ReactNode;
  id: string;
  variant?: "pink";
}> = ({ children, id, variant }) => {
  return (
    <>
      <Head>
        <title>{id}</title>
      </Head>
      <div className={`page ${variant}`} id={id}>
        <div className="page-inner">{children}</div>
      </div>
    </>
  );
};
