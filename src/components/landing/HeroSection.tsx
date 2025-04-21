import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const conditions = ["Depression", "Heart Diseases", "Accidents"];
  const currentIndex = useRef(0);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Function to create a new text element
    const createTextElement = (text: string) => {
      const div = document.createElement("div");
      div.className = "text-[40px] md:text-[56px] font-bold leading-none tracking-tight text-[#1D9BD7] absolute w-full";
      div.style.opacity = "0";
      
      // Split text into individual spans for letter animation
      text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        div.appendChild(span);
      });
      
      return div;
    };
    
    // Initial setup - clear container and add first item
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      const element = createTextElement(conditions[0]);
      containerRef.current.appendChild(element);
      
      // Animate in the first text
      const chars = element.querySelectorAll("span");
      gsap.to(element, { opacity: 1, duration: 0.01 });
      gsap.to(chars, { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, 
        duration: 0.5, 
        ease: "back.out(1.7)"
      });
    }
    
    // Animation loop
    const animateNextWord = () => {
      if (!containerRef.current) return;
      
      const oldElement = containerRef.current.firstChild as HTMLElement;
      if (!oldElement) return;
      
      // Get old chars for animation out
      const oldChars = oldElement.querySelectorAll("span");
      
      // Animate out each letter with stagger
      gsap.to(oldChars, {
        opacity: 0,
        y: -30,
        stagger: 0.03,
        duration: 0.4,
        ease: "back.in(1.7)",
        onComplete: () => {
          // After out animation, update to next word
          currentIndex.current = (currentIndex.current + 1) % conditions.length;
          const newText = conditions[currentIndex.current];
          
          // Remove old element
          if (containerRef.current) {
            containerRef.current.removeChild(oldElement);
            
            // Create and add new element
            const newElement = createTextElement(newText);
            containerRef.current.appendChild(newElement);
            
            // Animate in new element
            const newChars = newElement.querySelectorAll("span");
            gsap.to(newElement, { opacity: 1, duration: 0.01 });
            gsap.to(newChars, {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          }
        }
      });
    };
    
    // Set interval for animation
    const interval = setInterval(animateNextWord, 4000);
    
    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return <div className="w-full h-auto sm:h-screen relative flex flex-col md:flex-row items-center justify-between pt-24 px-4 md:px-0">
      <div className="container h-auto mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-16 z-10">
          {/* Heading */}
          <h1 className="text-base lg:text-xl xl:text-2xl [@media(min-width:1100px)]:text-3xl [@media(min-width:1300px)]:text-4xl [@media(min-width:1600px)]:text-4xl leading-tight tracking-tight text-[#1A1A1A] font-normal mb-6 text-left md:text-left">
            Bad sleep quality makes<br />
            you more prone to
          </h1>
          
          {/* Animated text container */}
          <div className="h-[60px] md:h-[80px] relative mb-2 text-left" ref={containerRef}></div>
          
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

