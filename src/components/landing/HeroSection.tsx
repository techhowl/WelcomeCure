import React from "react";
import { Button } from "@/components/ui/button";
export const HeroSection = () => {
  return <div className="w-full h-auto sm:h-screen relative flex flex-col md:flex-row items-center justify-between pt-24 px-4 md:px-0">
      <div className="container h-auto mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-16 z-10">
          {/* Heading */}
          <h1 className="text-base lg:text-xl xl:text-2xl [@media(min-width:1100px)]:text-3xl [@media(min-width:1300px)]:text-4xl [@media(min-width:1600px)]:text-4xl leading-tight tracking-tight text-[#1A1A1A] font-normal mb-4 text-left md:text-left">
            Bad sleep quality makes<br />
            you more prone to
          </h1>
          
          {/* Depression text */}
          <div className="text-[40px] md:text-[56px] font-bold leading-none tracking-tight text-[#1D9BD7] mb-6 text-left md:text-left">
            Depression
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl tracking-tight text-[#1A1A1A] mb-10 max-w-md text-left md:text-left">
            We provide expert-backed homeopathic solutions to improve your sleep, and life quality.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-start md:justify-start">
            <Button className="bg-[#FBDC00] hover:bg-[#FBDC00]/90 text-black font-medium text-xl py-6 px-10 rounded-xl w-fit">
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
      
      {/* Right Image - Absolute positioned to stick to the right */}
      <div className="min-[768px]:absolute right-0 bottom-0 w-full min-[768px]:w-1/2 block">
        <img alt="Woman with pillow" className="object-cover h-full w-full object-top" src="/assets/heresecimg.png" />
      </div>
    </div>;
};

