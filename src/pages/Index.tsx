import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { BookingForm } from "@/components/landing/BookingForm";
import { FamiliarSymptoms } from "@/components/landing/FamiliarSymptoms";
import { WhyWelcomeCure } from "@/components/landing/WhyWelcomeCure";
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { DoctorCard } from "@/components/landing/DoctorCard";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const testimonials = [
    {
      quote:
        "I met Dr. Shah 6 months ago and my condition has improved greatly since then. I had very stiff joints and was dependent on my parents to do my work. It was Dr. Shah's medicines that helped my condition improve.",
      name: "Kangsha Patel",
      title: "Rheumatoid Arthritis Patient",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d219188da2de96c35ea5989522eb24b1c049649?placeholderIfAbsent=true",
    },
    {
      quote:
        "I had been suffering from a lot of small chronic diseases and it had become an irritating part of my life. I decided to come to the Welcome Cure clinic. I had a fissure at the time and with Dr Jawahar's medicines, I felt much better in just 10-15 days.",
      name: "Akash Sharma",
      title: "Chronic Illness Patient",
      avatar: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d219188da2de96c35ea5989522eb24b1c049649?placeholderIfAbsent=true",
    },
  ];

  const doctors = [
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

  return (
    <div className="bg-white flex flex-col overflow-hidden">
      <Navbar />
      <HeroSection />
      <div className="flex flex-col items-center">
        <BookingForm />
        <FamiliarSymptoms />
        <WhyWelcomeCure />

        {/* <section className="w-full max-w-[1166px] mt-[67px] max-md:max-w-full">
          <h2 className="text-black text-5xl font-bold mb-7 text-center max-md:text-[40px]">
            Sleepy Success Stories
          </h2>
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-6/12 max-md:w-full max-md:ml-0">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </section> */}

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
