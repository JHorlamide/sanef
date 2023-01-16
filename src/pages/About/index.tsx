import React from "react";
import Navbar from "components/layout/Navbar/Navbar";
import Image from "components/widgets/Image/Image";
import { ABOUT_IMAGE_1 } from "assets/images";
import { GROUP_CIRCLE } from "assets/icons";
import { CARD_CONTENT } from "./content";
import CoreValueCard from "./components/CoreValueCard";
import style from "./About.module.css";
import TeamTab from "./components/TeamTab";
import Footer from "components/layout/Footer";
import Layout from "pages/Layout";

const About = () => {
  return (
    <Layout>
      <section
        className={`${style.about_hero} relative bg-about-hero-mobile md:bg-about-hero-desktop
        bg-center bg-cover bg-no-repeat items-center h-96 lg:h-[400px]`}
      >
        <Navbar />

        <div className="">
          <h1 className="max-w-lg mx-auto my-10 text-4xl font-extrabold text-center text-white lg:mt-5">
            About SANEF
          </h1>
        </div>
      </section>

      <Image
        parentClassName="hidden lg:block absolute inset-y-0 right-0 top-32 aspect-auto"
        image={ABOUT_IMAGE_1}
      />

      {/* VISION & MISSION */}
      <section className="relative z-0 px-5 md:mt-10 md:px-32">
        <div className="px-5 lg:w-1/2 md:-mt-10 lg:-mt-0 md:px-0">
          <p className="text-lg text-left md:text-md lg:text-md md:leading-text-line-height">
            SANEF serves as an enabler in the Financial Inclusion ecosystem in
            Nigeria, collaborating with various Stakeholders to expand the
            frontiers of Financial Inclusion which includes Agent Expansion,
            Financial Literacy, Public Enlightenment, Policy Advocacy and
            Technological Solutions for Products and Services to increase Agent
            Business viability and Agent Network sustainability.
          </p>
        </div>

        {/* Vision & Mission Mobile Container */}
        <div
          id="vision-mission-container"
          className="flex flex-col mt-12 space-y-8 lg:space-y-0 lg:mt-16 md:space-y-5 md:space-x-0 lg:flex-row lg:space-x-28"
        >
          {/* OUR VISION CONTAINER */}
          <div className="flex flex-col px-5 space-y-5 md:space-y-3 md:px-0 lg:w-full">
            <div
              className={`absolute w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mt-2.5 md:mt-1 lg:mt-1 ml-[142px] md:ml-[90px] lg:ml-[142px] rounded-full bg-buttonColor`}
            ></div>
            <h1 className="relative flex text-4xl font-bold text-left md:text-2xl lg:text-4xl lg:text-justify">
              Our Vision
            </h1>

            <p className="text-xl md:text-md lg:text-md md:leading-text-line-height">
              To bring Financial Services closer to every Nigerian
            </p>
          </div>

          {/* OUR MISSION CONTAINER */}
          <div className="flex flex-col px-5 space-y-5 md:space-y-3 md:px-0 lg:w-full">
            <div
              className={`absolute w-12 h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 mt-2 lg:mt-1 ml-[169px] md:ml-[110px] lg:ml-[12%] rounded-full bg-buttonColor`}
            ></div>
            <h1 className="relative z-10 flex text-4xl font-bold text-left md:text-2xl lg:text-4xl lg:text-justify">
              Our Mission
            </h1>

            <p className="text-xl md:text-md lg:text-md md:leading-text-line-height">
              To collaborate with all Stakeholders in widening and deepening
              Financial Access Points and Services towards meeting the Financial
              Inclusion targets across all geopolitical zones in Nigeria
            </p>
          </div>
        </div>
      </section>

      {/* OUR CORE VALUES */}
      <section className="py-16">
        <div className="flex flex-col items-center justify-center">
          <h1 className="flex text-4xl font-bold text-left">Our Core Values</h1>
          <hr className="w-16 border-b-4 border-buttonColor" />
        </div>

        {/* Mobile View */}
        <div className="container flex flex-col mx-auto mt-12 space-y-10 md:hidden">
          {CARD_CONTENT.map(({ id, image, heading, content }) => (
            <CoreValueCard
              key={id}
              image={image}
              heading={heading}
              content={content}
            />
          ))}
        </div>

        {/* Desktop View */}
        <div className="relative hidden px-1 mt-10 md:grid md:grid-cols-2 lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-10 lg:px-0">
          {/*  */}
          <div className="z-10 md:grid md:grid-cols-1 md:gap-y-4 lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:gap-4">
            {CARD_CONTENT.slice(0, 3).map(({ id, image, heading, content }) => (
              <CoreValueCard
                key={id}
                image={image}
                heading={heading}
                content={content}
              />
            ))}
          </div>

          <div className="z-10 md:grid md:grid-cols-1 md:gap-0 lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:gap-6">
            {CARD_CONTENT.slice(3).map(({ id, image, heading, content }) => (
              <CoreValueCard
                key={id}
                image={image}
                heading={heading}
                content={content}
              />
            ))}
          </div>

          <Image
            image={GROUP_CIRCLE}
            parentClassName="hidden md:block absolute inset-y-0 -right-0 top-52"
            imageClassName="w-80"
          />
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="py-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="flex text-4xl font-bold text-left">Our Team</h1>
        </div>
      </section>

      {/* Team TAB */}
      <section className="z-0 py-10">
        <TeamTab />
      </section>

      <section>
        <Footer />
      </section>
    </Layout>
  );
};

export default About;
