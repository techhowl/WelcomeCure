import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { BookingForm } from "@/components/landing/BookingForm";
import { FamiliarSymptoms } from "@/components/landing/FamiliarSymptoms";
import { WhyWelcomeCure } from "@/components/landing/WhyWelcomeCure";
import { Testimonials } from "@/components/landing/Testimonials";
import { DoctorCard } from "@/components/landing/DoctorCard";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  // const doctors = [
  //   {
  //     name: "Dr. Jawahar Shah",
  //     experience: "45 Years of Experience",
  //     description:
  //       "A global leader in homeopathy, revolutionizing holistic healthcare.",
  //     image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  //   },
  //   {
  //     name: "Dr. Rita Maity",
  //     experience: "24 Years of Experience",
  //     description: "Decades of dedication, bringing unmatched expertise.",
  //     image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  //   },
  //   {
  //     name: "Dr. Bhavna Ahuja",
  //     experience: "18 Years of Experience",
  //     description: "Profound insights into chronic and complex cases.",
  //     image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  //   },
  //   {
  //     name: "Dr. Nida Qazi",
  //     experience: "13 Years of Experience",
  //     description:
  //       "Specializing in acute and chronic conditions with precision.",
  //     image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
  //   },
  // ];

  return (
    <div className="bg-white flex flex-col overflow-hidden">
      <Navbar />
      <HeroSection />
      <div className="flex flex-col items-center">
        <BookingForm />
        <FamiliarSymptoms />
        <WhyWelcomeCure />
        <Testimonials />

        {/* <section className="w-full max-w-[1170px] mt-[70px]">
          <h2 className="text-[rgba(26,26,26,1)] text-5xl font-bold leading-none text-center mb-[31px] max-md:text-[40px]">
            Our Experienced Team of Doctors
          </h2>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
            {doctors.map((doctor, index) => (
              <DoctorCard key={index} {...doctor} />
            ))}
          </div>
        </section> */}

        {/* <FAQ /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Index;
