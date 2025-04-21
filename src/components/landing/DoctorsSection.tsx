import React from "react";
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
];

export const DoctorsSection: React.FC = () => {
  return (
    <section className="w-full mx-auto  px-4 sm:px-6 my-16" id="doctors-section">
      <h2 className="text-[rgba(26,26,26,1)] text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12  max-md:mb-8">
        Our Experienced Team of Doctors
      </h2>
      
      <div className="max-w-[1400px]  mx-auto">
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-5 md:gap-6">
          {doctorsData.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}; 