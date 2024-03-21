import RegisterForm from "@/components/auth/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import React from "react";

export default async function Register() {
  const session = await getServerSession(authOptions);
  console.log("[Register]");

  if (session) redirect("/home");

  return (
    <div>
      <RegisterForm />
    </div>
  );
}
