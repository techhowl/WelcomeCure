import React, { useState, useEffect } from "react";
import { DoctorCard } from "./DoctorCard";

// Doctor data moved from index.tsx to this component
const doctorsData = [
  {
    name: "Dr. Jawahar Shah",
    experience: "45 Years of Experience",
    description:
      "A global leader in homeopathy, revolutionizing holistic healthcare.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Rita Maity",
    experience: "24 Years of Experience",
    description: "Decades of dedication, bringing unmatched expertise.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Bhavna Ahuja",
    experience: "18 Years of Experience",
    description: "Profound insights into chronic and complex cases.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Nida Qazi",
    experience: "13 Years of Experience",
    description:
      "Specializing in acute and chronic conditions with precision.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Anisha Patel",
    experience: "20 Years of Experience",
    description:
      "Expert in integrative medicine with a patient-centered approach.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Sameer Gupta",
    experience: "22 Years of Experience",
    description:
      "Pioneering research in homeopathic treatments for modern ailments.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Priya Sharma",
    experience: "15 Years of Experience",
    description:
      "Specializing in pediatric care with gentle and effective treatments.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
  {
    name: "Dr. Vikram Mehta",
    experience: "25 Years of Experience",
    description:
      "Renowned for his innovative approach to chronic disease management.",
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  },
];

export const DoctorsSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Always showing 4 doctors (2x2 grid) at a time on desktop
  // On mobile, still use 1 column
  const doctorsPerPage = 4;
  const totalPages = Math.ceil(doctorsData.length / doctorsPerPage);
  
  const handlePrev = () => {
    setCurrentPage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };
  
  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
  };
  
  // Auto-scroll every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentPage]);

  // Calculate which doctors to show
  const startIndex = currentPage * doctorsPerPage;
  const visibleDoctors = doctorsData.slice(startIndex, startIndex + doctorsPerPage);

  return (
    <section className="w-10/12 md:w-full mx-auto px-4 sm:px-6 my-16 relative" id="doctors-section">
      <h2 className="text-[rgba(26,26,26,1)] text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 max-md:mb-8">
        Our Experienced Team of Doctors
      </h2>
      
      <div className="max-w-[1400px]  mx-auto relative">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#FBDC00] rounded-full w-12 h-12 flex items-center justify-center -ml-6 focus:outline-none hover:bg-[#e6ca00] transition-colors duration-300"
          aria-label="Previous doctors"
        >
          <span className="text-[#1A1A1A] text-2xl">&lt;</span>
        </button>
        
        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#FBDC00] rounded-full w-12 h-12 flex items-center justify-center -mr-6 focus:outline-none hover:bg-[#e6ca00] transition-colors duration-300"
          aria-label="Next doctors"
        >
          <span className="text-[#1A1A1A] text-2xl">&gt;</span>
        </button>
        
        {/* Simple carousel with horizontal slide */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div 
                key={pageIndex} 
                className="min-w-full grid row-start-auto md:grid-cols-2 gap-5 md:gap-6"
              >
                {doctorsData
                  .slice(pageIndex * doctorsPerPage, pageIndex * doctorsPerPage + doctorsPerPage)
                  .map((doctor, index) => (
                    <div key={index} className="w-full">
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