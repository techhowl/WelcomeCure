import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-white w-full py-16 md:py-20 px-6 sm:px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left side with text and button */}
        <div className="flex flex-col items-start w-full md:w-auto">
          <h2 className="text-left">
            <span className="text-black text-2xl md:text-3xl lg:text-[40px] font-medium block leading-tight">Ready For</span>
            <span className="text-[#1D9BD7] text-4xl mt-5 md:mt-6 md:text-5xl lg:text-[52px] font-bold block leading-tight">A Good Night's Sleep?</span>
          </h2>
          <a href="#booking-form" className="mt-5 md:mt-6">
            <button className="bg-[#FBDC00] w-[240px] h-[54px] rounded-[15px] text-xl font-semibold text-[#1a1a1a] hover:bg-[#FBDC00]/90 transition-colors">
              Get Started Now
            </button>
          </a>
        </div>

        {/* Right side with logo, social icons and copyright */}
        <div className="flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
          <div className="flex items-start justify-start md:justify-center">
            <img 
              src="/assets/Logo.svg" 
              alt="WelcomeCure Logo" 
              width={100}
              height={100}
              className="ml-0"
            />
          </div>
          
          <div className="flex gap-4 mt-3">
            <a href="https://facebook.com/welcomecure" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <div className="w-9 h-9 flex items-center justify-center">
                <img 
                  src="/assets/facebook.svg" 
                  alt="Facebook" 
                  width={20} 
                  height={20}
                />
              </div>
            </a>
            <a href="https://linkedin.com/company/welcomecure" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <div className="w-9 h-9 flex items-center justify-center">
                <img 
                  src="/assets/linkdlin.svg" 
                  alt="LinkedIn" 
                  width={20} 
                  height={20}
                />
              </div>
            </a>
            <a href="https://youtube.com/c/welcomecure" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <div className="w-9 h-9 flex items-center justify-center">
                <img 
                  src="/assets/youtube.svg" 
                  alt="YouTube" 
                  width={20} 
                  height={20}
                />
              </div>
            </a>
            <a href="https://instagram.com/welcomecure" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <div className="w-9 h-9 flex items-center justify-center">
                <img 
                  src="/assets/instagram.svg" 
                  alt="Instagram" 
                  width={20} 
                  height={20}
                />
              </div>
            </a>
          </div>
          
          <div className="text-[#1a1a1a] text-sm md:text-base font-medium mt-2">
            ©2025 WelcomeCure • All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};
