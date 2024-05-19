import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Search from "./ui/search";
import Navbar from "./ui/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doctor's Orders",
  description: "Patiently take patent notes, patently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar>
          <Search />
        </Navbar>
        { children }
      </body>
    </html>
  );
}
