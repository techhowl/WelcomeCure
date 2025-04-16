import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-white self-stretch flex items-stretch gap-5 overflow-hidden flex-wrap justify-between mt-[71px] px-20 py-[88px] max-md:max-w-full max-md:mr-1.5 max-md:mt-10 max-md:px-5">
      <div className="flex flex-col items-stretch mt-1 max-md:max-w-full">
        <h2 className="text-black text-[40px] font-bold leading-[44px] max-md:max-w-full">
          <span className="font-medium">Ready For</span>
          <br />
          <span className="text-[52px] leading-[57px] text-[rgba(29,155,215,1)]">
            A Good Night's Sleep?
          </span>
        </h2>
        <button className="bg-[rgba(251,220,0,1)] min-h-[54px] gap-2.5 text-2xl text-[rgba(26,26,26,1)] font-semibold text-center mt-[22px] px-[52px] py-[9px] rounded-[15px] max-md:px-5">
          Get Started Now
        </button>
      </div>
      <div className="flex flex-col items-stretch">
        <div className="flex w-[184px] max-w-full flex-col items-stretch">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2be3ac9cab27924850280ee8f92794e7c634136?placeholderIfAbsent=true"
            alt="WelcomeCure Logo"
            className="aspect-[1] object-contain w-[95px]"
          />
          <div className="flex gap-2 mt-3.5">
            {["https://cdn.builder.io/api/v1/image/assets/TEMP/4330bd5432134a4caee1ff0c5035102b0c58a2a7?placeholderIfAbsent=true", "https://cdn.builder.io/api/v1/image/assets/TEMP/b1a6c13f3c32e3dbdd0a56b79395011cace373f1?placeholderIfAbsent=true", "https://cdn.builder.io/api/v1/image/assets/TEMP/fbe9046dc0ba1172345864d894ef6a2668a02332?placeholderIfAbsent=true", "https://cdn.builder.io/api/v1/image/assets/TEMP/0981d6a75fb6305b9b63010f7dfc0c39395ee417?placeholderIfAbsent=true"].map((icon, index) => (
              <img
                key={index}
                src={icon}
                alt={`Social icon ${index + 1}`}
                className="aspect-[1] object-contain w-10 rounded shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="text-black text-base font-medium mt-[11px]">
          ©2025 WelcomeCure • All Rights Reserved
        </div>
      </div>
    </footer>
  );
};
