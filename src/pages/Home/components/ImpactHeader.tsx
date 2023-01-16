import React from "react";

interface OurImpactHeaderProps {
  headingText: string;
  content: string;
}

const OurImpactHeader = ({ headingText, content }: OurImpactHeaderProps) => {
  return (
    <div className="flex flex-col justify-center items-center md:justify-start md:items-start">
      <div className="flex space-x-2">
        <h1 className="font-bold text-2xl">{headingText}</h1>
        <span className="font-bold relative bg-buttonColor w-7 h-7 rounded-full flex justify-center items-center">
          <p className="absolute right-2.5 top-0.5 text-bold text-2xl">+</p>
        </span>
      </div>

      <p className="whitespace-pre-line text-sm text-center mt-3 max-w-sm md:text-left">
        {content}
      </p>
    </div>
  );
};

export default OurImpactHeader;
