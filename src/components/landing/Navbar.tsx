import React from "react";

export const Navbar = () => {
  return (
    <header className="w-full absolute top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Welcome Cure Logo */}
        <div className="flex items-center">
          <img src="/assets/Logo.svg" alt="Welcome Cure Logo" className="w-24 h-24 md:w-32 md:h-30" />
        </div>
      </div>
    </header>
  );
}; 