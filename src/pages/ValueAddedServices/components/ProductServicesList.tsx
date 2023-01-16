import React from "react";
import { NumberFeature } from "../../Home/components/OurImpactFooter";
interface ProductServiceListProps {
  heading: string;
  firstList: string;
  secondList?: string;
  thirdList?: string;
  fourthList?: string;
}

const ProductServiceList = ({
  heading,
  firstList,
  secondList,
  thirdList,
  fourthList
}: ProductServiceListProps) => {
  return (
    <div className="md:space-y-5">
      <h1 className="font-bold text-[20px] leading-[27px] md:text-[17px]">
        {heading}
      </h1>

      <div className="md:space-y-4">
        <NumberFeature number={"1"} content={firstList} contentClassName={""} />

        {secondList && (
          <NumberFeature
            number={"2"}
            content={secondList}
            contentClassName={""}
          />
        )}

        {thirdList && (
          <NumberFeature
            number={"3"}
            content={thirdList}
            contentClassName={""}
          />
        )}

        {fourthList && (
          <NumberFeature
            number={"4"}
            content={fourthList}
            contentClassName={""}
          />
        )}
      </div>
    </div>
  );
};

export default ProductServiceList;
