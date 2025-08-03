import type { Metadata } from "next";
import "./globals.scss";
import { Navbar } from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

export const metadata: Metadata = {
  title: "MATHSOC",
  description:
    "Official website of the Undergraduate Mathematics Society of the University of Waterloo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id="body">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
