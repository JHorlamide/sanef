import React from "react";
import ProductServiceList from "./ProductServicesList";
import { PRODUCT_SERVICE } from "../content";
import Image from "components/widgets/Image/Image";
import { LONG_HORIZONTAL_LINE, LONG_VERTICAL_LINE } from "assets/icons";

const ProductServiceDesktop = () => {
  return (
    <div
      className="hidden lg:block container mx-auto bg-white rounded-xl 
      shadow-lg  mt-10 py-24 px-16"
    >
      {/* <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20"> */}
      <div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16">
          <ProductServiceList
            heading={PRODUCT_SERVICE[0].heading}
            firstList={PRODUCT_SERVICE[0].firstList}
            secondList={PRODUCT_SERVICE[0].secondList}
            thirdList={PRODUCT_SERVICE[0].thirdList}
            fourthList={PRODUCT_SERVICE[0].fourthList}
          />

          {PRODUCT_SERVICE.slice(1, 3).map(
            ({ id, heading, firstList, secondList, thirdList, fourthList }) => (
              <div key={id} className="relative h-fit">
                <Image
                  parentClassName="absolute lg:-left-8 -top-14"
                  imageClassName="h-[670px]"
                  image={LONG_VERTICAL_LINE}
                />

                <ProductServiceList
                  key={id}
                  heading={heading}
                  firstList={firstList}
                  secondList={secondList}
                  thirdList={thirdList}
                  fourthList={fourthList}
                />
              </div>
            )
          )}
        </div>

        <div className="relative mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-x-16">
          {PRODUCT_SERVICE.slice(3, 7).map(
            ({ id, heading, firstList, secondList, thirdList, fourthList }) => (
              <ProductServiceList
                key={id}
                heading={heading}
                firstList={firstList}
                secondList={secondList}
                thirdList={thirdList}
                fourthList={fourthList}
              />
            )
          )}

          <Image
            parentClassName="absolute right-12 lg:-top-10"
            imageClassName="w-[1290px]"
            image={LONG_HORIZONTAL_LINE}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductServiceDesktop;
