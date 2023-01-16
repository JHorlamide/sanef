import React from "react";
import Navbar from "components/layout/Navbar/Navbar";
import style from "./OurPartners.module.css";
import Image from "components/widgets/Image/Image";
import { DOTS } from "assets/icons";
import { OUR_PARTNERS_LOGOS } from "./content";
import PartnersTabs from "./components/PartnersTabs";
import PartnersAndName from "./components/PartnersAndName";
import Footer from "components/layout/Footer";
import Layout from "pages/Layout";

const OurPartners = () => {
  return (
    <Layout>
      <section
        className={`${style.about_hero} relative bg-about-hero-mobile md:bg-about-hero-desktop bg-center bg-cover bg-no-repeat items-center w-full h-96 lg:h-[400px]`}
      >
        <Navbar />

        <div className="">
          <h1 className="text-white text-4xl text-center max-w-lg mx-auto my-10 font-extrabold lg:mt-5">
            Our Partners
          </h1>
        </div>
      </section>

      <section className="relative p-10 -mt-28 md:-mt-10">
        <Image
          image={DOTS}
          parentClassName="absolute inset-y-0 -right-1 top-42 lg:right-20 lg:-top-40"
          imageClassName="w-24 h-24 lg:h-fit"
        />
      </section>

      <section className="relative mt-16 px-5 md:px-10 lg:px-40">
        <p className="text-[18px] text-center leading-[30px] md:text-md md:-mt-10 lg:-mt-20">
          We collaborate with Ecosystem Stakeholders, Government/MDAs and
          Developmental Organizations in expanding the frontiers of Financial
          Inclusion and advancing Economic Empowerment.
        </p>
      </section>

      <section className="md:hidden container mx-auto">
        {/* BANKS LOGOS */}
        <PartnersAndName sectionName="Banks" logos={OUR_PARTNERS_LOGOS.Banks} />

        {/* SUPER AGENTS LOGOS */}
        <PartnersAndName
          sectionName="Super Agents"
          logos={OUR_PARTNERS_LOGOS["Super Agents"]}
        />

        {/* REGULATOR LOGOS */}
        <PartnersAndName
          sectionName="Regulators"
          logos={OUR_PARTNERS_LOGOS.Regulators}
        />

        {/* STRATEGIC PARTNERS */}
        <PartnersAndName
          sectionName="Strategic Partners"
          logos={OUR_PARTNERS_LOGOS["Strategic Partners"]}
        />

        {/* Government/MDA'S LOGOS */}
        <PartnersAndName
          sectionName=" Government/MDA'S"
          logos={OUR_PARTNERS_LOGOS["Government/MDA'S"]}
        />
      </section>

      <section>
        <PartnersTabs />
      </section>

      <section className="mt-16">
        <Footer />
      </section>
    </Layout>
  );
};

export default OurPartners;
