import React from "react";

export const Navbar = () => {
  return (
    <header className="w-full absolute top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Welcome Cure Logo */}
        <div className="flex items-center">
          <img src="/assets/Logonew.svg" alt="Welcome Cure Logo" className="w-24 md:w-45 md:h-50" />
        </div>
      </div>
    </header>
  );
}; 