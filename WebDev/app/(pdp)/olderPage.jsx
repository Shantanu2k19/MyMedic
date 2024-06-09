import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/home");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <LoginForm />
    </main>
  );
}
