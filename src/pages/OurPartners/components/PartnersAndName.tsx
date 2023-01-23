import React from "react";
interface PartnersAndNameProps {
  sectionName: string;
  logos: {
    _id: number | string;
    logo: {
      imageUrl: string;
    };
    name?: string;
    companyName?: string;
  }[];
}

const PartnersAndName = ({ sectionName, logos }: PartnersAndNameProps) => {
  return (
    <section id={sectionName} className="container mt-10">
      <div className="flex flex-col items-center justify-center md:justify-start md:items-start">
        <h1 className="text-2xl font-bold text-center md:text-left lg:text-3xl">
          {sectionName}
        </h1>
        <hr className="w-16 mt-2 border-b-4 border-buttonColor" />
      </div>

      <div className="relative flex items-center justify-center mt-8">
        <div
          id="slider"
          className="overflow-x-scroll scroll whitespace-nowrap scroll-smooth"
        >
          {logos.map(({ _id, logo, name }) => (
            <div
              key={_id}
              className="flex-col items-center justify-center inline-block px-3 space-y-2 align-top bg-clip-content"
            >
              <div className="p-4 m-0 bg-white rounded-full">
                <img className="w-20 h-20 m-0" src={logo.imageUrl} alt={name} />
              </div>

              <div>
                <p className="text-center text-[12px] font-semibold whitespace-pre-line md:whitespace-normal">
                  {name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersAndName;
