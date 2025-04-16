import React from "react";

const symptoms = [
  { 
    title: "Snoring", 
    image: "/assets/snoring.png"
  },
  { 
    title: "Fatigue", 
    image: "/assets/fatigue.png"
  },
  { 
    title: "Insomnia", 
    image: "/assets/insomnia.png"
  },
  { 
    title: "Reduced Productivity", 
    image: "/assets/productivity.png"
  },
];

export const FamiliarSymptoms = () => {
  return (
    <section className="w-full  py-20">
      <div className="container mx-auto px-4 w-full">
        <h2 className="text-[#1A1A1A] text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          Does This Sound Familiar?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {symptoms.map((symptom, index) => (
            <div key={index} className="relative overflow-hidden rounded-2xl shadow-sm">
              <img
                src={symptom.image}
                alt={symptom.title}
                className="h-full w-full object-cover inset-0 transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-2xl md:text-3xl font-bold">{symptom.title}</h3>
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
