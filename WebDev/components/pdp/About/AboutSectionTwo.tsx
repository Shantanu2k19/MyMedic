"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from "../Common/SectionTitle";

import LoginForm from "./loginSection"
import SignupForm from "./signupSection"
import "@/styles/bounce.css";

const AboutSectionTwo = () => {
  const [isSignin, toggleSignin] = useState(false);

  const toggleComponent = () => {
    toggleSignin(!isSignin);
  };

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="border border-red-300 container max-w:200">

      <div className="flex flex-wrap items-center justify-center">

          <div className="w-full px-4 lg:w-1/2 border border-green-300">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] 
              max-w-[500px] text-center lg:m-0 flex items-center justify-center"
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

            <p>
              do you know, a patient will take medicine if he know its will affect him
            </p>
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
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>

    </section>
  );
};

export default AboutSectionTwo;
