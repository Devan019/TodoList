// import { Inter } from "next/font/google";
import Head from "./Header/page";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TO DO list",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Head/>
        {children}</body>
    </html>
  );
}
