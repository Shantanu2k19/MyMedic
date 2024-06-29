"use client";
import React from "react";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

const Quote = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Empowering Patients with Medication Knowledge"
          paragraph="Patients are 50% more likely to take their medications punctually when they understand their purpose and benefits. 
          Clear information builds trust and encourages adherence to treatment.Studies"
          center
          mb="80px"
        />
      </div>

      {/* <ModalVideo
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId="L61p2uyiMSo"
        onClose={() => setOpen(false)}
      /> */}

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Quote;
