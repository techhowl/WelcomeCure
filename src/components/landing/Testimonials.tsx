import React, { useRef } from "react";
import Slider from "react-slick";
import { TestimonialCard } from "./TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slick-custom.css";


// Testimonial data moved from index.tsx
const testimonials = [
  {
    quote:
    "“I met Dr. Shah 6 months ago and my condition has improved greatly since then. I had very stiff joints and was dependent on my parents to do my work. It was Dr. Shah’s medicines that helped my condition improve.”",
    name: "Kangsha Patel",
    title: "Rheumatoid Arthritis Patient",
    avatar: '/assets/ladiesavator.webp',
  },
  {
    quote:
      "“I had been suffering from a lot of small chronic diseases and it had become an irritating part of my life. I decided to come to the Welcome Cure clinic. I had a fissure at the time and with Dr Jawahar’s medicines, I felt much better in just 10-15 days.”",
    name: "Akash Sharma",
    title: "Chronic Illness Patient",
    avatar: "/assets/manavator.webp",
  },
  {
    quote:
      "“My son Arhan has been suffering from Bronchitis since birth. We came to Dr Jawahar last year and with his medicine, in a period of 8-9 months, he has shown great improvement. The treatment has done wonders for him and I would like to thank Dr Jawahar Shah.” - Arhan’s Father.",
    name: "Arhan Bhandari",
    title: "Bronchitis Patient",
    avatar: "/assets/manavator.webp",
  },
  {
    quote:
      "“I have been suffering from Allergic Rhinitus for the past 8-10 years. I tried curing this with allopathy but the cure lasted only as long as the treatment was on. I decided to start my treatment again with Welcome Cure and in a span of only 3 months, my condition is 90% better.”",
    name: "Pradeep Singh",
    title: "Allergic Rhinitus Patient",
    avatar: "/assets/manavator.webp",
  },
];  

export const Testimonials = () => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplaySpeed: 4000,
        },
      },
    ],
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <section className="w-full px-4 md:px-28 mt-[67px] max-md:max-w-full mx-auto">
      <h2 className="text-black text-5xl font-bold mb-10 text-center max-md:text-[40px]">
      Welcome Cure Success Stories
      </h2>
      
      <div className="relative">
        <Slider ref={sliderRef} {...settings} className="testimonial-slider">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="h-full px-2">
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </Slider>
        
        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="testimonial-slider-nav-prev absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#FFDE30] rounded-full flex items-center justify-center cursor-pointer focus:outline-none hover:bg-[#f0d01f] transition-colors"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="testimonial-slider-nav-next absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-[#FFDE30] rounded-full flex items-center justify-center cursor-pointer focus:outline-none hover:bg-[#f0d01f] transition-colors"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}; 