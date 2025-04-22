import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const symptoms = [
  { 
    title: "Snoring", 
    image: "/assets/snoring.png",
    backText: "Regular snoring is associated with an 87-95% increased risk of uncontrolled hypertension"
  },
  { 
    title: "Fatigue", 
    image: "/assets/fatigue.png",
    backText: "Fatigue leads to 10-25% of all road accidents"
  },
  { 
    title: "Insomnia", 
    image: "/assets/insomnia.png",
    backText: "40% of adults with insomnia also have psychiatric disorders, most likely depression"
  },
  { 
    title: "Reduced Productivity", 
    image: "/assets/productivity.png",
    backText: "Even mild insomnia can lead to more than 50% reduction in productivity levels"
  },
];

export const FamiliarSymptoms = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const flippedStates = useRef<boolean[]>([false, false, false, false]);
  
  useEffect(() => {
    // Add CSS for 3D effect
    const style = document.createElement('style');
    style.innerHTML = `
      .flip-card {
        perspective: 1000px;
        transform-style: preserve-3d;
        border-radius: 1rem;
        overflow: hidden;
        background-color: transparent;
      }
      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 0.8s;
        transform-style: preserve-3d;
        background-color: transparent;
      }
      .card-front, .card-back {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        overflow: hidden;
        background-color: transparent;
      }
      .card-back {
        transform: rotateY(180deg);
      }
      .flip-card.flipped .flip-card-inner {
        transform: rotateY(180deg);
      }
    `;
    document.head.appendChild(style);
    
    // Add interaction events to each card
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      
      // Function to toggle card flip
      const toggleFlip = () => {
        if (flippedStates.current[index]) {
          card.classList.remove('flipped');
        } else {
          card.classList.add('flipped');
        }
        flippedStates.current[index] = !flippedStates.current[index];
      };
      
      // Add hover effects
      let hoverScale = gsap.timeline({ paused: true });
      hoverScale.to(card, {
        scale: 1.05,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Mouse events for desktop
      card.addEventListener("mouseenter", () => {
        if (!flippedStates.current[index]) {
          toggleFlip();
          hoverScale.play();
        }
      });
      
      card.addEventListener("mouseleave", () => {
        if (flippedStates.current[index]) {
          toggleFlip();
          hoverScale.reverse();
        }
      });
      
      // Touch events for mobile
      card.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent default touch behavior
        toggleFlip();
        if (!flippedStates.current[index]) {
          hoverScale.reverse();
        } else {
          hoverScale.play();
        }
      });
    });
    
    return () => {
      // Cleanup
      cardRefs.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
          card.removeEventListener("touchstart", () => {});
        }
      });
      
      // Remove the style element
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4 w-full">
        <h2 className="text-[#1A1A1A] text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          Does This Sound Familiar?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {symptoms.map((symptom, index) => (
            <div 
              key={index} 
              className="flip-card relative shadow-lg cursor-pointer h-[320px]"
              ref={el => cardRefs.current[index] = el}
            >
              <div className="flip-card-inner w-full h-full">
                {/* Front face of card */}
                <div className="card-front absolute w-full h-full">
                  <img
                    src={symptom.image}
                    alt={symptom.title}
                    className="h-full w-full object-cover inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-z-[50px]">
                    <h3 className="text-2xl md:text-3xl font-bold">{symptom.title}</h3>
                  </div>
                </div>
                
                {/* Back face of card */}
                <div className="card-back absolute w-full h-full text-white flex items-center justify-center p-6">
                  <img
                    src={symptom.image}
                    alt={symptom.title}
                    className="absolute h-full w-full object-cover inset-0 z-0"
                  />
                  <div className="absolute inset-0 bg-black/75 z-10"></div>
                  <div className="absolute bottom-0 left-0 p-6 z-20 text-left w-full">
                    <p className="text-sm font-medium leading-relaxed text-white">{symptom.backText}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[#1A1A1A] text-xl md:text-2xl font-normal max-w-3xl mx-auto">
            Get a detailed overview of your <span className="font-bold">sleep disorder symptoms</span>
            <br className="hidden md:block"/>
            with our expert evaluation.
          </p>
          
          <button className="mt-8 md:mt-10 bg-[#FBDC00] hover:bg-[#FBDC00]/90 text-black font-semibold text-xl px-10 py-4 rounded-xl transition-all">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};
