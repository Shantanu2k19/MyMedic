import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

import AboutSectionOne from "@/components/pdp/About/AboutSectionOne";
import AboutSectionTwo from "@/components/pdp/About/AboutSectionTwo";
import Blog from "@/components/pdp/Blog";
import Brands from "@/components/pdp/Brands";
import ScrollUp from "@/components/pdp/Common/ScrollUp";
import Contact from "@/components/pdp/Contact";
import Features from "@/components/pdp/Features";
import Hero from "@/components/pdp/Hero";
import Pricing from "@/components/pdp/Pricing";
import Testimonials from "@/components/pdp/Testimonials";
import Video from "@/components/pdp/Video";
import { Metadata } from "next";

import "@/styles/index.css";

// const session = await getServerSession(authOptions);
// if (session) redirect("/home");

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Brands />
      <Video />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Pricing />
      <Blog />
      <Contact />
    </>
  );
}