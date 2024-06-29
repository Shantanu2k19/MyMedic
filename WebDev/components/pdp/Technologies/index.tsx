import React from 'react';
import { Tech } from "@/types/Tech"
import Image from "next/image";
import technologyData from "./technologyData";

const Technologies = () => {
  return (
    <section className="pt-16">
      <div className="container" id="sectionTechnologies">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="flex flex-wrap items-center justify-center rounded-sm bg-gray-light px-8 pt-14 dark:bg-gray-dark 
             font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[20px]">
              Powered By
            </div>
            <div className="flex flex-wrap items-center justify-center rounded-sm bg-gray-light px-8 py-8 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              {technologyData.map((tech) => (
                <SingleTech key={tech.id} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;

const SingleTech = ({ tech }: { tech: Tech }) => {
  const { href, image, imageLight, name } = tech;

  return (
    <div className="flex w-1/2 items-center justify-center px-3 py-[15px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-12 w-full transition opacity-60 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
      >
        {/* <Image src={imageLight} alt={name} fill className="hidden dark:block" />
        <Image src={image} alt={name} fill className="block dark:hidden" /> */}
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="dark:bg-white rounded-lg p-2" 
          style={{ filter: 'grayscale(10%)' }}
        />
      </a>
    </div>
  );
};
