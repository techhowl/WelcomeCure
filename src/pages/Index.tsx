import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { BookingForm } from "@/components/landing/BookingForm";
import { FamiliarSymptoms } from "@/components/landing/FamiliarSymptoms";
import { WhyWelcomeCure } from "@/components/landing/WhyWelcomeCure";
import { Testimonials } from "@/components/landing/Testimonials";
import { DoctorsSection } from "@/components/landing/DoctorsSection";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="bg-[#f5f5f5]">
      <Navbar />
      <HeroSection />
      <div className="flex flex-col items-center">
        <BookingForm />
        <FamiliarSymptoms />
        <WhyWelcomeCure />
        <Testimonials />
        <DoctorsSection />
        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
