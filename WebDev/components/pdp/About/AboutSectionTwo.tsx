"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

import LoginForm from "./loginSection"
import SignupForm from "./signupSection"
import "@/styles/bounce.css";

const AboutSectionTwo = () => {
  const [isSignin, toggleSignin] = useState(false);

  const toggleComponent = () => {
    toggleSignin(!isSignin);
  };

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="border border-red-300 container">
        <div className="flex flex-wrap items-center justify-center">
          
          <div className="w-full px-4 lg:w-1/2 border border-green-300 px-20">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] 
              text-center lg:m-0 flex justify-center items-center"
              data-wow-delay=".15s"
            >
            <Image
              src="/images/mainImg/grn3.jpg"
              alt="about image"
              width={100}
              height={100}
              className="image-container"
            />
            </div>
          </div>

          <div className="flex items-center justify-center w-full px-4 lg:w-1/2 border border-red-300 my-10">

            {/* <div className="absolute">
                {isSignin ? <LoginForm toggleComponent={toggleComponent}/> : <SignupForm toggleComponent={toggleComponent}/>}
            </div>
            <div className="absolute">
                  {isSignin ? <SignupForm toggleComponent={toggleComponent}/> : <LoginForm toggleComponent={toggleComponent}/>}
            </div> */}

            {isSignin ? (
                <LoginForm toggleComponent={toggleComponent}/> 
            ) : (
                <SignupForm toggleComponent={toggleComponent}/>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
