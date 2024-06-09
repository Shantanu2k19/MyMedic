"use client";
import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

import { NextPage } from "next";
import BaseSeo from "@/components/pdp/BaseSeo";
import Header from "@/components/pdp/Header"
import Hero from "@/components/pdp/Hero"
import Footer from "@/components/pdp/Footer"

const Home: NextPage = (props: any) => {
  
  return (
    <div>
      <BaseSeo />

      <main>
        <Header />
        <Hero {...props} />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

// export async function getStaticProps() {
//   return {
//     props: {
//       announcement: {
//         description: "Try Demo🚀",
//         stargazerTitle: "demoIcon",
//         // stargazerLink: "",
//         href: "https://www.google.co.in/",
//       },
//       heroSection: {
//         heading: "mymedic helps you with your prescription",
//         description:
//           "upload your prescription and get your medicine described by ai ",
//         buttonText: "Get started haha",
//       },
//     },
//   };
// }

export default Home;


// export default async function Home() {
//   const session = await getServerSession(authOptions);
//   if (session) redirect("/home");

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between ">
//       <LoginForm />
//     </main>
//   );
// }
