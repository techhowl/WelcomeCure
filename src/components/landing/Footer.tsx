import React from "react";

export const Footer = () => {
  // Add scroll to booking form function
  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[url('/assets/Phonefooter.png')] md:bg-[url('/assets/footerbg.webp')] bg-cover bg-center w-full py-16 md:py-20 px-6 sm:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left side with text and button */}
        <div className="flex flex-col items-start w-full md:w-auto">
        <div>
            <img 
              src="/assets/Logonew.svg" 
              alt="WelcomeCure Logo" 
              width={100}
              height={100}
              className="ml-0 mb-5"
            />
          <h2 className="text-left">
            <span className="text-black text-xl md:text-3xl lg:text-[40px] font-medium block leading-tight">Ready For</span>
            <span className="text-[#1D9BD7] font-extrabold text-[29px] mt-4 md:mt-4 md:text-5xl lg:text-[52px]  block leading-tight">A Good Night's Sleep?</span>
          </h2>
          <button 
            className="mt-6 md:mt-8 mb-6 md:mb-8 bg-[#FBDC00] w-[200px] md:w-[240px] h-[54px] rounded-[15px] md:text-xl text-[15px]  font-semibold text-[#1a1a1a] hover:bg-[#FBDC00]/90 transition-colors"
            onClick={scrollToBookingForm}
          >
            Get Started Now
          </button>
        </div>

        {/* Right side with logo, social icons and copyright */}
        <div className="flex flex-col mb-32 md:mb-0 items-start md:items-end gap-4 w-full md:w-auto">
          {/* <div className="flex items-start justify-start md:justify-center">
            <img 
              src="/assets/Logo.svg" 
              alt="WelcomeCure Logo" 
              width={100}
              height={100}
              className="ml-0"
            /> */}
          </div>
          
          <div className="flex justify-center items-center gap-8 md:gap-2 mt-3">
            <a href="https://facebook.com/welcomecure" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <div className="w-full flex items-center gap-2 justify-center">
                <img 
                  src="/assets/facebookdesktop.svg" 
                  alt="Facebook" 
                  width={50} 
                  height={20}
                  className="hidden md:block" 
                />
                <img 
                  src="/assets/facebook.svg" 
                  alt="Facebook" 
                  width={20} 
                  height={20}
                  className="block md:hidden" 
                />
              </div>
            </a>
            <a href="https://linkedin.com/company/welcomecure" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <div className="w-full flex items-center gap-2 justify-center">
                <img 
                  src="/assets/linkdlin.svg" 
                  alt="LinkedIn" 
                  width={50} 
                  height={20}
                  className="hidden md:block" 
                />
                <img 
                  src="/assets/linkdlinmobile.svg" 
                  alt="LinkedIn" 
                  width={20} 
                  height={20}
                  className="block md:hidden" 
                />
              </div>
            </a>
            <a href="https://youtube.com/c/welcomecure" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center justify-center">
                <img 
                  src="/assets/youtube.svg" 
                  alt="YouTube" 
                  width={50} 
                  height={20}
                  className="hidden md:block" 
                />
                <img 
                  src="/assets/youtubemobile.svg" 
                  alt="YouTube" 
                  width={20} 
                  height={20}
                  className="block md:hidden" 
                />
              </div>
            </a>
            <a href="https://www.instagram.com/welcomecureonline/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center justify-center">
                <img 
                  src="/assets/instagram.svg" 
                  alt="Instagram" 
                  width={50} 
                  height={20}
                  className="hidden md:block" 
                />
                <img 
                  src="/assets/instagrammobile.svg" 
                  alt="Instagram" 
                  width={20} 
                  height={20}
                  className="block md:hidden" 
                />
              </div>
            </a>
          </div>
          
          <div className="text-black md:text-white text-sm md:text-base font-medium mt-6 md:mt-2">
            ©2025 WelcomeCure • All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
