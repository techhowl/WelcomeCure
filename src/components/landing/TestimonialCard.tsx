import React from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  title,
  avatar,
}) => {
  return (
    <div className="bg-[rgba(181,231,255,1)] border flex w-full flex-col items-stretch font-medium p-8 rounded-[15px] border-[rgba(230,230,230,1)] border-solid max-md:max-w-full max-md:mt-7 max-md:px-5">
      <p className="text-black text-lg leading-[27px] max-md:max-w-full">
        {quote}
      </p>
      <div className="flex items-center gap-4 text-base mt-[55px] max-md:mt-10">
        <img
          src={avatar}
          alt={name}
          className="aspect-[1] object-contain w-[45px] self-stretch shrink-0 my-auto rounded-[50%]"
        />
        <div className="self-stretch my-auto">
          <div className="text-black">{name}</div>
          <div className="text-[#828282]">{title}</div>
        </div>
      </div>
    </div>
  );
};
