'use client';
import React from "react";

import { SessionProvider } from "next-auth/react"

export const AuthProvider = ({ children }) => {
    console.log("provider")
    return <SessionProvider>{children}</SessionProvider>
}