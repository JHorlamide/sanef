import React from "react";
import "tw-elements";
import Navbar from "components/layout/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import {
  OUR_PARTNERS,
  ABOUT_US,
  VALUE_ADDED_SERVICES
} from "routes/ROUTES_CONSTANTS";
import CustomBtn from "../../widgets/CustomBtn/CustomBtn";
import { DOTS } from "assets/icons";
import Image from "../../widgets/Image/Image";
import "./Carousel.module.scss";
import style from "./Carousel.module.scss";

const Carousel = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div
      id="carouselExampleCaptions"
      className={`${style.carousel_item} carousel slide h-[670px] md:h-[630px] w-screen overflow-hidden`}
      data-bs-ride="carousel"
    >
      <Navbar />

      <div className="absolute top-0">
        {/* CAROUSEL SLIDER CONTAINER */}
        <div className={`inline-block carousel-inner overflow-hidden`}>
          {/* 1st Slid */}
          <div
            className={`bg-mobile_home_deepening_financial_inclusion md:bg-desktop_home_deepening_financial_inclusion 
            bg-center bg-cover h-[670px] bg-no-repeat items-center carousel-item active w-screen float-left
            py-40 md:py-[165px] lg:py-48 overflow-hidden`}
          >
            <div className="flex flex-col px-5 space-y-10 md:px-40">
              <h1
                className="max-w-lg text-4xl text-left text-white mb-3 font-extrabold
                md:max-w-6xl md:leading-snug md:text-[45px]"
              >
                Deepening Financial Inclusion through Partnerships and
                Collaborations
              </h1>

              <CustomBtn
                className="text-white text-[20px] font-medium rounded-full
                bg-buttonColor px-20 py-3 w-fit hover:bg-lightGreen"
                onClick={() => handleNavigate(OUR_PARTNERS)}
              >
                Partner with Us
              </CustomBtn>
            </div>
          </div>

          {/* 2nd Slid */}
          <div
            className={`bg-mobile_home_centre_of_excellence md:bg-desktop_home_centre_of_excellence 
            bg-center bg-cover bg-no-repeat items-center carousel-item relative w-screen float-left
            py-40 md:py-[165px] lg:py-48 h-[670px] overflow-hidden`}
          >
            <div className="flex flex-col px-5 space-y-10 md:px-40">
              <h1
                className="max-w-lg text-4xl text-left text-white mb-3 font-extrabold
                md:font-extrabold md:max-w-6xl md:leading-snug md:text-[45px]"
              >
                Centre of Excellence for Financial Inclusion best practices
              </h1>

              <CustomBtn
                className="text-white text-[20px] font-medium rounded-full
                bg-buttonColor px-20 py-3 w-fit hover:bg-lightGreen"
                onClick={() => handleNavigate(ABOUT_US)}
              >
                Learn More
              </CustomBtn>
            </div>
          </div>

          {/* 3rd Slid */}
          <div
            className={`bg-mobile_home_empowering_the_ecosystem md:bg-desktop_home_empowering_the_ecosystem 
            bg-center bg-cover h-[670px] bg-no-repeat items-center carousel-item relative w-screen float-left
            py-40 md:py-[165px] lg:py-48 overflow-hidden`}
          >
            <div className="flex flex-col px-5 space-y-10 md:px-40">
              <h1
                className="max-w-lg text-4xl text-left text-white mb-3 font-extrabold
                md:font-extrabold md:max-w-6xl md:leading-snug md:text-[45px]"
              >
                Empowering the Ecosystem through Innovative Technology
              </h1>

              <CustomBtn
                className="text-white text-[20px] font-medium rounded-full
                bg-buttonColor px-20 py-3 w-fit hover:bg-lightGreen"
                onClick={() => handleNavigate(VALUE_ADDED_SERVICES)}
              >
                Learn More
              </CustomBtn>
            </div>
          </div>

          {/* 4th Slid */}
          <div
            className={`bg-mobile_home_enhancing_knowledge md:bg-desktop_home_enhancing_knowledge 
            bg-center bg-cover bg-no-repeat items-center carousel-item relative w-screen float-left
            py-40 md:py-[165px] lg:py-48 h-[670px] overflow-hidden`}
          >
            <div className="flex flex-col px-5 space-y-10 md:px-40">
              <h1
                className="max-w-lg text-4xl text-left text-white mb-3 font-extrabold
                md:font-extrabold md:max-w-6xl md:leading-snug md:text-[45px]"
              >
                Enhancing knowledge through Impactful Financial Literacy
                Programmes
              </h1>

              <CustomBtn
                className="text-white text-[20px] font-medium rounded-full
                bg-buttonColor px-20 py-3 w-fit hover:bg-lightGreen"
                onClick={() => handleNavigate(VALUE_ADDED_SERVICES)}
              >
                Learn More
              </CustomBtn>
            </div>
          </div>
        </div>

        {/* CAROUSEL INDICATOR/NAVIGATOR */}
        <div
          className="absolute z-20 flex flex-row md:flex-col py-5 md:pt-0 space-y-10 
          justify-center items-center right-28 md:right-24 lg:right-52 top-[490px]"
        >
          <div
            className="flex items-start justify-start mt-3 carousel-indicators md:mt-0 md:justify-end lg:items-end"
            id="carousel_indicator_container"
          >
            <button
              id={`${style.carousel_indicator_button}`}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              aria-current="true"
              aria-label="Slide 1"
              className="active"
              data-role="slide"
            ></button>

            <button
              id={`${style.carousel_indicator_button}`}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              data-role="slide"
            ></button>

            <button
              id={`${style.carousel_indicator_button}`}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              data-role="slide"
            ></button>

            <button
              id={`${style.carousel_indicator_button}`}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="3"
              aria-label="Slide 4"
              data-role="slide"
            ></button>
          </div>

          <Image
            image={DOTS}
            parentClassName="hidden md:block"
            imageClassName="h-fit md:w-32 lg:w-fit"
          />
        </div>

        <Image
          image={DOTS}
          parentClassName="z-50 block md:hidden absolute inset-y-0 right-0 top-[580px]"
          imageClassName="w-20 h-24 md:w-32 h-fit lg:w-fit lg:h-fit"
        />
      </div>
    </div>
  );
};

export default Carousel;
