import React, { useState, useEffect } from "react";
import { DoctorCard } from "./DoctorCard";

// Doctor data updated with actual image paths from assets folder
const doctorsData = [
  {
    name: "Dr. Bhavna Ahuja",
    experience: "18 Years of Experience",
    description: "Profound insights into chronic and complex cases.",
    image: "/assets/Dr. Bhavna Ahuja (1).jpg",
  },
  {
    name: "Dr. Nida Qazi",
    experience: "13 Years of Experience",
    description: "Specializing in acute and chronic conditions with precision.",
    image: "/assets/Dr. Nida Qazi (1).jpg",
  },
  {
    name: "Dr. Tarana Malick",
    experience: "20 Years of Experience",
    description: "Expert in integrative medicine with a patient-centered approach.",
    image: "/assets/Dr. Tarana Malick (1).jpg",
  },
  {
    name: "Dr. Nishtha",
    experience: "15 Years of Experience",
    description: "Specializing in pediatric care with gentle and effective treatments.",
    image: "/assets/dr.-Nishtha (1).jpg",
  },
  {
    name: "Dr. Jawahar Shah",
    experience: "45 Years of Experience",
    description: "A global leader in homeopathy, revolutionizing holistic healthcare.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Rita Maity",
    experience: "24 Years of Experience",
    description: "Decades of dedication, bringing unmatched expertise.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Sameer Gupta",
    experience: "22 Years of Experience",
    description: "Pioneering research in homeopathic treatments for modern ailments.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Vikram Mehta",
    experience: "25 Years of Experience",
    description: "Renowned for his innovative approach to chronic disease management.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
];

export const DoctorsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Always showing 4 doctors (2x2 grid) at a time on desktop
  // On mobile, showing 1 doctor at a time
  const doctorsPerPage = 4;
  const mobileDocsPerPage = 1;
  const totalPages = Math.ceil(doctorsData.length / doctorsPerPage);
  const mobileTotalPages = Math.ceil(doctorsData.length / mobileDocsPerPage);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handlePrev = () => {
    if (isMobile) {
      setCurrentPage(prev => (prev > 0 ? prev - 1 : mobileTotalPages - 1));
    } else {
      setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
    }
  };
  
  const handleNext = () => {
    if (isMobile) {
      setCurrentPage(prev => (prev < mobileTotalPages - 1 ? prev + 1 : 0));
    } else {
      setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
    }
  };
  
  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentPage, isMobile]);

  return (
    <section className="w-10/12 md:w-full mx-auto px-4 sm:px-6 my-16 relative" id="doctors-section">
      <h2 className="text-[rgba(26,26,26,1)] text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 max-md:mb-8">
        Our Experienced Team of Doctors
      </h2>
      
      <div className="max-w-[1400px] md:p-10 p-4 mx-auto relative">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#FBDC00] rounded-full w-12 h-12 flex items-center justify-center -ml-6 focus:outline-none hover:bg-[#e6ca00] transition-colors duration-300"
          aria-label="Previous doctors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#FBDC00] rounded-full w-12 h-12 flex items-center justify-center -mr-6 focus:outline-none hover:bg-[#e6ca00] transition-colors duration-300"
          aria-label="Next doctors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Desktop View */}
        <div className="hidden md:block overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div 
                key={`desktop-${pageIndex}`} 
                className="min-w-full grid grid-cols-2 gap-6"
              >
                {doctorsData
                  .slice(pageIndex * doctorsPerPage, pageIndex * doctorsPerPage + doctorsPerPage)
                  .map((doctor, index) => (
                    <div key={`desktop-card-${index}`} className="w-full">
                      <DoctorCard {...doctor} />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile View - Single card layout */}
        <div className="md:hidden w-full overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: mobileTotalPages }).map((_, pageIndex) => (
              <div 
                key={`mobile-${pageIndex}`} 
                className="min-w-full flex justify-center"
              >
                {doctorsData
                  .slice(pageIndex * mobileDocsPerPage, pageIndex * mobileDocsPerPage + mobileDocsPerPage)
                  .map((doctor, index) => (
                    <div key={`mobile-card-${index}`} className="w-full max-w-[90%]">
                      <DoctorCard {...doctor} />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 