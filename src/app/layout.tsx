import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.scss";
import { Navbar } from "./components/navigation/navbar";
import Footer from "./components/footer/footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: {
    template: "MATHSOC | %s",
    default: "MATHSOC",
  },
  description:
    "Official website of the Undergraduate Mathematics Society of the University of Waterloo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable}`}>
      <body id="body">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
