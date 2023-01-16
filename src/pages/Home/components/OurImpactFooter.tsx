import React from "react";
import { CardProps } from "types/card";

interface NumberFeatureProps {
  number: string;
  content?: string;
  contentClassName?: string;
}

export const NumberFeature = ({
  number,
  content,
  contentClassName
}: NumberFeatureProps) => {
  return (
    <div className="flex">
      <p className="font-bold text-buttonColor mr-1.5 z-50">{number}</p>

      <p
        className={`whitespace-pre-line z-50 ${
          contentClassName && contentClassName
        } md:text-sm leading-text-line-height`}
      >
        {content}
      </p>
      <div className="absolute bg-green-50 w-8 h-8 rounded-full flex justify-center items-center"></div>
    </div>
  );
};

const OurImpactFooter = ({
  image,
  title,
  firstList,
  secondList,
  thirdList,
  style
}: CardProps) => {
  return (
    <div className="py-8 px-5 lg:px-0">
      <div className="flex space-x-2 w-20 md:flex-col">
        <img src={image} alt="bulb-icon" />
        <h1 className="whitespace-pre-line text-2xl font-bold md:text-2xl lg:mt-3">
          {title}
        </h1>
      </div>

      <div className="flex flex-col mt-5 space-y-5 px-4 md:px-0 lg:px-1">
        <NumberFeature
          number={"1"}
          content={firstList}
          contentClassName={style}
        />

        <NumberFeature
          number={"2"}
          content={secondList}
          contentClassName={style}
        />

        <NumberFeature
          number={"3"}
          content={thirdList}
          contentClassName={style}
        />
      </div>
    </div>
  );
};

export default OurImpactFooter;
