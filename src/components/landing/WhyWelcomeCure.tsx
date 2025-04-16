import React from "react";

const features = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d81535e6308922d7767213c62cd29b3786a14ca?placeholderIfAbsent=true",
    title: "Expertly Crafted\nTreatment Plans",
  },
  {
    title: "Personalized Diet\nand Lifestyle Advisory",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5a126efd5b5db0f2d9e6152da6fe6f583014467d?placeholderIfAbsent=true",
    title: "International Class\nMedicines",
  },
  {
    title: "Expert Panel\nof Qualified Doctors",
  },
];

export const WhyWelcomeCure = () => {
  return (
    <section className="bg-white w-full max-w-screen-xl mt-[77px] max-md:max-w-full max-md:mt-10">
      <div className="bg-[rgba(230,230,230,1)] flex w-full flex-col items-center px-20 py-[53px] rounded-[15px] max-md:max-w-full max-md:px-5">
        <h2 className="text-[rgba(26,26,26,1)] text-5xl font-bold max-md:max-w-full max-md:text-[40px]">
          Why WelcomeCure?
        </h2>
        <p className="text-[rgba(26,26,26,1)] text-2xl font-normal leading-9 text-center mt-[37px] max-md:max-w-full">
          <span>Backed by almost </span>
          <span className="font-bold text-[rgba(29,155,215,1)]">
            five decades of experience
          </span>
          <span>, we have perfected</span>
          <br />
          <span>an </span>
          <span className="font-bold text-[rgba(29,155,215,1)]">
            all-natural treatment
          </span>
          <span> to cure your sleep problems.</span>
        </p>
        <div className="self-stretch mt-[57px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            {features.map((feature, index) => (
              <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
                <div className="flex grow flex-col items-stretch text-xl text-[rgba(26,26,26,1)] font-medium text-center leading-[30px] max-md:mt-10">
                  {feature.icon && (
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="aspect-[1] object-contain w-[94px] self-center"
                    />
                  )}
                  <div
                    className={
                      feature.icon ? "mt-[22px]" : "mt-[116px] max-md:mt-10"
                    }
                  >
                    {feature.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="self-stretch bg-[rgba(251,220,0,1)] min-h-[54px] w-[297px] max-w-full gap-2.5 text-2xl text-[rgba(26,26,26,1)] font-semibold text-center mt-[57px] px-[52px] py-[9px] rounded-[15px] max-md:mt-10 max-md:px-5">
          Get Started Now
        </button>
      </div>
    </section>
  );
};
