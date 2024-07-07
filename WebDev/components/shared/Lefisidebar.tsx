'use client'
import React from 'react'

import { sidebarLinks } from '@/types/sidebarLinks'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";
import { useEffect } from 'react';

function LeftSidebar () {

  const { data: session, status } = useSession();
  console.log("session:", session);
  console.log("status:",status);
  const router = useRouter()
  const pathname = usePathname()

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     console.log("redirecting to home")
  //     router.push('/');
  //   }
  // }, [status, router]);
  
  // if (status === 'loading') {
  //   console.log("loading...")
  // }

  const HandleLogout = () => {
    console.log('logging out');
    signOut({ callbackUrl: '/' });
  } 

  return (
    <section className="custom-scrollbar leftsidebar">
        <div className="flex w-full flex-1
        flex-col gap-6 px-6">
            {sidebarLinks.map((link) => {
              // if link is active
              const isActive =
                (pathname.includes(link.route) && link.route.length > 1) ||
                pathname === link.route

              return (
                <Link
                    href={link.route}
                    key={link.label}
                    className=
                    {`leftsidebar_link ${isActive && 'bg-primary-500'}`}
                >
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={24}
                        height={24}
                    />

                    <p className="text-light-1
                    max-lg:hidden">{link.label}</p>
                </Link>
              )
            })}
        </div>

        <div className="mt-10 px-6"
          onClick={() => HandleLogout()}
        >
          <div className="flex cursor-pointer gap-4 p-4">
              <Image src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
              ></Image>

              <p className="text-light-2 max-lg:hidden">
                  Logout
              </p>
          </div>
        </div>
    </section>
  )
}

export default LeftSidebar
