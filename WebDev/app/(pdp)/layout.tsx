"use client";

import Footer from "@/components/pdp/Footer";
import Header from "@/components/pdp/Header";
import ScrollToTop from "@/components/pdp/ScrollToTop";
import { Inter } from "next/font/google";
// import "node_modules/react-modal-video/css/modal-video.css";

import { Providers } from "./providers"

import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

