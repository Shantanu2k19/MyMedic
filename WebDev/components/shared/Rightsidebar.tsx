"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function Rightsidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  // if(session){
  //   console.log("user valid")
  // }
  // else{
  //   router.replace("/");
  //   //causes jitter
  // }
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          current user : {session?.user?.name}
        </h3>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          User's mail :{session?.user?.email}
        </h3>
      </div>
    </section>
  );
}

export default Rightsidebar;
