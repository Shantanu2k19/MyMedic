"use client"
import { useSession } from "next-auth/react";

export default function hello(){
    const { data: session } = useSession();
    console.log(session?.user?.name)

    return (
        <>
        </>
    )
}