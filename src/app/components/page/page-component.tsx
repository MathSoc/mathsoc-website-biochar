import React from "react";
import Head from "next/head";
import { MinimalPage } from "./minimal-page";
import "./page.scss";

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
      <MinimalPage id={id} variant={variant}>
        {children}
      </MinimalPage>
    </>
  );
};
