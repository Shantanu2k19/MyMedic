//TODO FILE required??

"use client";
import React from "react";

export default function ProjectInfo() {
  
  return (
    <div className="grid place-items-center h-screen">
      <div
        className="shadow-lg p-8 bg-zinc-500/10 
            flex flex-col gap-2 my-6"
      >
        <div>
          name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          email: <span className="font-bold">{session?.user?.email}</span>
        </div>

        <button
          className="bg-red-500 text-white
                font-bold px-6 py-2 mt-3"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
