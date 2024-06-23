"use client"
import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "../_app";

import Footer from "@/components/pdp/Footer";
import Header from "@/components/pdp/Header";
import ScrollToTop from "@/components/pdp/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./providers";
import "@/styles/index.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
