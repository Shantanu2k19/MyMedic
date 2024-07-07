"use client";
import React from "react";
import History from "@/components/home/history"
import Upload from "@/components/home/upload"

const Home = () => {
  console.log("home")
  return (
      <>
        <History/>
        <Upload />
      </>
  )
}

export default Home;