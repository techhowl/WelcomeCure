import React from "react";
import { Calendar } from "lucide-react";

export const FloatingButton = () => {
  const scrollToBookingForm = () => {
    // Find the booking form element
    const bookingForm = document.getElementById("booking-form");
    
    // If it exists, scroll to it smoothly
    if (bookingForm) {
      bookingForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <button
      aria-label="Book an appointment"
      onClick={scrollToBookingForm}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#1D9BD7] text-white shadow-lg hover:bg-[#0e8bc7] transition-all duration-300 hover:scale-110 group"
      style={{
        boxShadow: "0 10px 25px -5px rgba(29, 155, 215, 0.4)",
      }}
    >
      <span className="absolute -top-10 right-0 bg-[#FBDC00] text-black text-sm py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
        Book Now
      </span>
      <Calendar className="w-6 h-6" />
      <div className="absolute inset-0 rounded-full border-2 border-[#FBDC00] animate-ping-slow opacity-70"></div>
    </button>
  );
}; 