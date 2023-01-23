import React from "react";

interface PartnerLogoAndNameProp {
  logo: string;
  name?: string;
  companyName?: string;
}

const PartnerLogoAndName = ({
  logo,
  name,
  companyName
}: PartnerLogoAndNameProp) => {
  return (
    <div className="flex-col items-center justify-center inline-block px-3 space-y-2 align-top bg-clip-content">
      <div className="container mx-auto bg-white w-[130px] p-6 m-0 shadow-md rounded-full">
        <img
          className="w-full m-0"
          src={logo}
          alt={name ? name : companyName}
        />
      </div>

      <div className="">
        <p className="text-center text-[12px] font-semibold mt-5 whitespace-pre-line">
          {name ? name : companyName}
        </p>
      </div>
    </div>
  );
};

export default PartnerLogoAndName;
