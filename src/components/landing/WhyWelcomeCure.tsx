import React from "react";

const features = [
  {
    icon: "/assets/ExpertlyCrafted.svg",
    title: "Expertly Crafted Treatment Plans",
  },
  {
    icon: "/assets/PersonalizedDiet.svg",
    title: "Personalized Diet and Lifestyle Advisory",
  },
  {
    icon: "/assets/InternationalClassMedicines.svg",
    title: "International Class Medicines",
  },
  {
    icon: "/assets/ExpertPanel.svg",
    title: "Expert Panel of Qualified Doctors",
  },
];

export const WhyWelcomeCure = () => {
  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="w-full mt-8 sm:mt-10 md:mt-14">
          <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap justify-start sm:justify-between gap-6 md:gap-5">
            {features.map((feature, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/4 flex flex-col sm:items-center">
                <div className="w-full flex justify-center">
                  {feature.icon && (
                    <img
                      src={feature.icon}
                      alt={feature.title.split(" ")[0]}
                      className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 object-contain"
                    />
                  )}
                </div>
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-[#1A1A1A] font-medium text-center sm:text-center leading-tight mt-3 sm:mt-4 md:mt-6 max-w-full whitespace-pre-line">
                  {feature.title.replace(" and ", "\nand ").replace("Treatment Plans", "Treatment\nPlans").replace("Qualified Doctors", "Qualified\nDoctors").replace("Class Medicines", "Class\nMedicines")}
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
