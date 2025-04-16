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
    <div className="bg-[rgba(230,230,230,1)] grow w-full px-[23px] py-[21px] rounded-[15px] max-md:max-w-full max-md:mt-10 max-md:pr-5">
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-6/12 max-md:w-full max-md:ml-0">
          <div className="bg-[rgba(251,220,0,1)] flex w-[257px] shrink-0 h-[257px] aspect-[1] mx-auto rounded-[7px] max-md:mt-9">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-[7px]"
            />
          </div>
        </div>
        <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
          <div className="flex flex-col self-stretch items-stretch text-sm text-[rgba(26,26,26,1)] font-medium my-auto max-md:mt-10">
            <h3 className="text-[28px] font-bold">{name}</h3>
            <div className="mt-[19px]">{experience}</div>
            <p className="leading-[21px] mt-[17px] max-md:mr-[7px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
