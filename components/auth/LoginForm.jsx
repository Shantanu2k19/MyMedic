"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { React, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  console.log("<LoginForm>");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid creds");
        return;
      }

      // router.replace("dashboard");
    } catch (error) {
      console.log("error loging in :" + error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-blue-700 text-white 
                font-bold cursor-pointer px-6 py-2 rounded-md"
          >
            Login
          </button>

          {error && (
            <div
              className="bg-red-500 text-white w-fit text-sm
                px-3 py-1 rounded-md mt-2"
            >
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Dont have an account? <span className="underline">register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
