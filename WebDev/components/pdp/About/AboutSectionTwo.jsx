import Image from "next/image";
import AuthBox from "@/components/pdp/AuthBox"

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center ">
          
          <div className="w-full px-4 lg:w-1/2 ">
            <div
              className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center "
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-2.jpg"
                alt="about image"
                fill
                className="chatgpt-image"
              />
            </div>
          </div>

          <div className="w-full px-4 lg:w-1/2 flex items-center justify-center">
            <div className="wow fadeInUp max-w-[90%]" data-wow-delay=".2s">
            <AuthBox />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
