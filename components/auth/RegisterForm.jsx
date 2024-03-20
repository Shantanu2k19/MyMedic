"use client";

import Link from "next/link";
import { React, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const router = useRouter();

  //console.log(name+","+email);
  console.log("<RegisterForm>");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      console.log("fileds empty");
      setError("all fields are required!");
      return;
    }

    try {
      const resUserExist = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExist.json();
      if (user) {
        setError("User already exist");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      console.log("api returned with: " + res.status);

      if (res.ok) {
        const form = e.target;
        console.log("created user success!!");
        form.reset();
        //router.push("/")

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
      } else {
        console.log("user registration failed");
      }
    } catch (error) {
      console.log("user registration API failed with error:" + error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-500">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Fullname"
            onChange={(e) => setName(e.target.value)}
          />

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
            Register
          </button>

          {error && (
            <div
              className="bg-red-500 text-white w-fit text-sm
                px-3 py-1 rounded-md mt-2"
            >
              {error}
            </div>
          )}

          <button
            onClick={() => signIn("google")}
            className="bg-blue-700 text-white 
                font-bold cursor-pointer px-6 py-2 rounded-md"
          >
            Login with google
          </button>

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
