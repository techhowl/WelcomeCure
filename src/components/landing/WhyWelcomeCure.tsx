import React, { useState, useEffect } from "react";

const features = [
  {
    icon: "/assets/ExpertlyCrafted.svg",
    title: "Expertly Crafted\nTreatment Plans",
  },
  {
    icon: "/assets/PersonalizedDiet.svg",
    title: "Personalized Diet and\nLifestyle Advisory",
  },
  {
    icon: "/assets/InternationalClassMedicines.svg",
    title: "International Class\nMedicines",
  },
  {
    icon: "/assets/ExpertPanel.svg",
    title: "Expert Panel of\nQualified Doctors",
  },
  {
    icon: "/assets/onlidoc.svg",
    title: "Online Doctor\nConsultation",
  },
  {
    icon: "/assets/wordlarg.svg",
    title: "World's Largest Database\nof Cured Patients",
  },
  {
    icon: "/assets/SafeInsurance.svg",
    title: "A Secure Vault For\nYour Information",
  },
  {
    icon: "/assets/adherence.svg",
    title: "Adherence To\nGlobal Standards",
  },
];

export const WhyWelcomeCure = () => {
  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Calculate visible count based on screen size
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1150) return 4;
      if (window.innerWidth >= 900) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    }
    return 4; // Default for SSR
  };

  const [visibleCount, setVisibleCount] = useState(4);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (features.length - visibleCount + 1));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [visibleCount]);

  const visibleFeatures = features.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="w-full px-5 md:px-20 mx-auto">
      <div className="bg-[#E6E6E6] flex flex-col items-start sm:items-center px-5 sm:px-10 md:px-20 py-10 md:py-14 rounded-[15px]">
        <h2 className="text-[#1A1A1A] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-left sm:text-center w-full">
          Why WelcomeCure?
        </h2>
        <p className="text-[#1A1A1A] text-base sm:text-lg md:text-xl lg:text-2xl leading-6 sm:leading-7 md:leading-9 text-left sm:text-center mt-4 sm:mt-6 md:mt-9 w-full">
          <span>Backed by almost </span>
          <span className="font-bold text-[#1D9BD7]">
            five decades of experience
          </span>
          <span>, we have perfected</span>
          <br className="hidden sm:block" />
          <span>an </span>
          <span className="font-bold text-[#1D9BD7]">
            all-natural treatment
          </span>
          <span> to cure your sleep problems.</span>
        </p>
        <div className="w-full mt-8 sm:mt-10 md:mt-14 overflow-hidden">
          <div className="flex flex-row justify-start transition-all duration-500 ease-in-out" style={{ width: `${(100 / visibleCount) * features.length}%`, transform: `translateX(-${(currentIndex * 100) / features.length}%)` }}>
            {features.map((feature, index) => (
              <div key={index} className={`w-full flex-shrink-0`} style={{ width: `${100 / features.length}%` }}>
                <div className="px-2 flex flex-col items-center">
                  <div className="w-full flex justify-center">
                    {feature.icon && (
                      <img
                        src={feature.icon}
                        alt={feature.title.split("\n")[0]}
                        className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 object-contain"
                      />
                    )}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[#1A1A1A] font-medium text-center leading-tight mt-3 sm:mt-4 md:mt-6 max-w-full whitespace-pre-line">
                    {feature.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button 
          className="bg-[#FBDC00] w-full sm:max-w-[297px] text-lg sm:text-xl md:text-2xl text-[#1A1A1A] font-semibold text-center mt-8 sm:mt-10 md:mt-14 py-2 md:py-3 rounded-[15px]"
          onClick={scrollToBookingForm}
        >
          Get Started Now
        </button>
      </div>
    </section>
  );
};
