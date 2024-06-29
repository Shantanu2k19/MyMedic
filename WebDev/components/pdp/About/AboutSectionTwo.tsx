"use client"

import Image from "next/image";
import { useState } from "react";

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
      <div className="container max-w:200">

      <div className="flex flex-wrap items-center justify-center">

          <div className="flex flex-wrap items-center justify-center w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] 
              max-w-[500px] text-center lg:m-0 flex items-center justify-center"
              data-wow-delay=".15s"
            >
            <Image
              src="/images/mainImg/medicSearch.jpg"
              alt="about image"
              width={1080}
              height={1080}
              className="image-container"
            />
            </div>

            <p className="text-[20px]">
            &quot;"An educated patient is the best prescription.&quot;"
            </p>
          </div>

          <div className="flex items-center justify-center w-full px-4 lg:w-1/2 my-10" id="sectionSignupLogin">

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
