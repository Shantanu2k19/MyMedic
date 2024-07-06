"use client";
import React from "react";
import "@/styles/index.css";
import '@/styles/globals.css';
import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }) => {
  console.log("provider.js")
  return <SessionProvider>{children}</SessionProvider>;
};
