import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

import AboutSectionTwo from "@/components/pdp/About/AboutSectionTwo";
import Brands from "@/components/pdp/Brands";
import ScrollUp from "@/components/pdp/Common/ScrollUp";
import Features from "@/components/pdp/Features";
import Hero from "@/components/pdp/Hero";
import Video from "@/components/pdp/Video";

import "@/styles/index.css";

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <AboutSectionTwo />
      <Video />
    </>
  );
}