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
      router.replace("/home");
    } catch (error) {
      console.log("error loging in :" + error);
    }
  };
  
  const inputChangeHandler = (e, setItem) => {
    error && setError(false);
    setItem(e.target.value);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => inputChangeHandler(e, setEmail)}
            onFocus={() => setError(false)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => inputChangeHandler(e, setPassword)}
            onFocus={() => setError(false)}
          />
          <button
            disabled={!password || !email}
            className={`bg-blue-700 text-white 
            font-bold cursor-pointer px-6 py-2 rounded-md"
            `}
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
        </form>
        <div className="flex justify-end pt-3 text-sm">
          <Link href={"/register"}>
            Dont have an account? <span className="underline">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
