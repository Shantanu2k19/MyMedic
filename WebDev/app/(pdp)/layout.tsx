"use client";

import Footer from "@/components/pdp/Footer";
import Header from "@/components/pdp/Header";
import ScrollToTop from "@/components/pdp/ScrollToTop";
import { Inter } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

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
          <ToastContainer
            position="top-center"
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            limit={3}
            theme="dark"
            // className="custom-toast-container"
          />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

