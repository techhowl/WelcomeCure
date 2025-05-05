import React from "react";

interface DoctorCardProps {
  name: string;
  experience: string;
  description: string;
  image: string;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  experience,
  description,
  image,
}) => {
  return (
    <div className="bg-[rgba(230,230,230,1)]  w-3/4 md:w-full px-5 py-5 rounded-[15px] h-full">
      <div className="flex md:flex-row flex-col items-start md:items-center gap-4">
        {/* Image container - fixed size for consistency */}
        <div className="md:w-[40%] w-full flex md:justify-center justify-start flex-shrink-0 mb-4 md:mb-0">
          <div className="bg-[rgba(251,220,0,1)] w-1/2 md:w-full aspect-square  rounded-[7px] overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-[7px]"
            />
          </div>
        </div>
        
        {/* Text content with responsive font sizes */}
        <div className="md:w-[60%] w-full">
          <div className="flex flex-col font-medium">
            <h3 className="text-xl sm:text-2xl md:text-[24px] lg:text-[28px] font-bold leading-tight mb-2">{name}</h3>
            <div className="text-xs sm:text-sm md:text-lg lg:text-lg mt-1 mb-2 text-balck">
              {experience}
            </div>
            <p className="text-xs w-10/12 sm:text-sm md:text-lg lg:text-lg leading-tight sm:leading-normal md:leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
