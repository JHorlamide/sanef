import React from "react";
import { RecentCardProps } from "types/card";
import RouterLink from "components/layout/Navbar/NavLink/RouterLink";
import { IoIosArrowForward } from "react-icons/io";
import style from "../Home.module.scss";
import { Link } from "react-router-dom";

const RecentCard = ({
  id,
  image,
  date,
  headLine,
  details,
  imgWidthHeight
}: RecentCardProps) => {
  return (
    <div className="flex-col items-start justify-center inline-block w-full my-10 align-top lg:my-16">
      <div className={`px-3 ${imgWidthHeight}`}>
        <Link to={`/media/news/${id}`}>
          <img
            className="object-cover w-full h-full rounded-xl"
            src={image}
            alt=""
          />
        </Link>
      </div>

      <div className="mb-10 ml-6 space-y-5">
        <p className="mt-5 text-md">{date}</p>
        <h1 className="text-2xl font-bold md:text-xl">{headLine}</h1>
        <p
          className={`${style.clamp} text-xl text-left leading-text-line-height md:text-base`}
        >
          {details}
        </p>

        <RouterLink
          className="flex text-xl font-semibold text-buttonColor w-fit md:text-base hover:text-lightGreen"
          path={`/media/news/${id}`}
          title="Continue Reading"
          rightIcon={
            <IoIosArrowForward size={22} className="ml-1 mt-0.5 text-sm" />
          }
        />
      </div>
    </div>
  );
};

export default RecentCard;
