import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Search from "./ui/search";
import Navbar from "./ui/navbar";
import PatientList from './ui/patientList';

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
        <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
          <PatientList />

          <div className="shrink-0 border-t lg:flex-1 border-gray-200 px-4 py-6 sm:px-6 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
