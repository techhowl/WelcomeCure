import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

// Extend HTMLDivElement to include our event handler properties
declare global {
  interface HTMLDivElement {
    _mouseEnterHandler?: (event: MouseEvent) => void;
    _mouseLeaveHandler?: (event: MouseEvent) => void;
    _touchStartHandler?: (event: TouchEvent) => void;
  }
}

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
    title: "Lack of Sleep (Insomnia)", 
    image: "/assets/insomnia.png",
    backText: "40% of adults with insomnia also have psychiatric disorders, most likely depression"
  },
  { 
    title: "Reduced Productivity", 
    image: "/assets/productivity.png",
    backText: "Even mild insomnia can lead to more than 50% reduction in productivity levels"
  },
  // Duplicate cards to have 8 total
  { 
    title: "Daytime Drowsiness", 
    image: "/assets/snoring.png",
    backText: "82% of people with daytime drowsiness suffer from mental health issues"
  },
  { 
    title: "Sleep Paralysis", 
    image: "/assets/fatigue.png",
    backText: "Sleep paralysis leads to an increased risk of chronic illnesses"
  },
  { 
    title: "Creepy-Crawly” Sensations", 
    image: "/assets/insomnia.png",
    backText: "Over 50% of people affected by this symptom face risk of cognitive impairment"
  },
  { 
    title: "Restless Leg Movements", 
    image: "/assets/productivity.png",
    backText: "29% of adults face sleep disruption due to uncontrollable leg movements"
  },
];

// Custom arrow components for the slider
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-5 md:-ml-6 bg-[#FBDC00] rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md hover:bg-[#FBDC00]/90 focus:outline-none"
      aria-label="Previous"
    >
      <ChevronLeft className="w-6 h-6 text-black" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-5 md:-mr-6 bg-[#FBDC00] rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md hover:bg-[#FBDC00]/90 focus:outline-none"
      aria-label="Next"
    >
      <ChevronRight className="w-6 h-6 text-black" />
    </button>
  );
};

export const FamiliarSymptoms = () => {
  const sliderRef = useRef<Slider | null>(null);
  
  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '30px'
        }
      }
    ]
  };
  
  // Add CSS for the 3D flip effect
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .flip-card {
        perspective: 1000px;
        background-color: transparent;
        width: 100%;
        height: 320px;
        border-radius: 16px;
        cursor: pointer;
      }
      
      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        border-radius: 16px;
      }
      
      /* Add hover effect directly with CSS */
      .flip-card:hover .flip-card-inner {
        transform: rotateY(180deg);
      }
      
      .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
        border-radius: 16px;
        overflow: hidden;
      }
      
      .card-front {
        background-color: transparent;
      }
      
      .card-back {
        background-color: transparent;
        transform: rotateY(180deg);
      }
      
      /* Fix for slider to handle 3D properly */
      .slick-slide {
        visibility: visible !important;
        pointer-events: auto !important;
        z-index: auto !important;
      }
      
      .slick-track, .slick-list {
        z-index: auto !important;
      }
      
      /* Apply these styles to ensure slider elements don't interfere with 3D effect */
      .familiar-symptoms-slider .slick-slide,
      .familiar-symptoms-slider .slick-slide > div,
      .familiar-symptoms-slider .slick-track,
      .familiar-symptoms-slider .slick-list {
        background-color: transparent !important;
      }
      
      /* Add scale effect on hover */
      .flip-card:hover {
        z-index: 10;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Add scroll to booking form function
  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="w-full py-20 relative">
      <div className="container mx-auto px-4 w-full">
        <h2 className="text-[#1A1A1A] text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          Does This Sound Familiar?
        </h2>
        
        <div className="relative px-6 md:px-10">
          <Slider ref={sliderRef} {...settings} className="familiar-symptoms-slider">
            {symptoms.map((symptom, index) => (
              <div key={index} className="px-2 md:px-4">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    {/* Front of Card */}
                    <div className="card-front">
                      <img
                        src={symptom.image}
                        alt={symptom.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute text-left bottom-0 left-0 w-full p-6 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold">{symptom.title}</h3>
                      </div>
                    </div>
                    
                    {/* Back of Card */}
                    <div className="card-back">
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
              </div>
            ))}
          </Slider>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-[#1A1A1A] text-xl md:text-2xl font-normal max-w-3xl mx-auto">
            Get a detailed overview of your <span className="font-bold">sleep disorder symptoms</span>
            <br className="hidden md:block"/>
            with our expert evaluation.
          </p>
          
          <button 
            className="mt-8 md:mt-10 bg-[#FBDC00] hover:bg-[#FBDC00]/90 text-black font-semibold text-xl px-10 py-4 rounded-xl transition-all"
            onClick={scrollToBookingForm}
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};