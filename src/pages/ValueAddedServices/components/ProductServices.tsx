import React, { Fragment } from "react";
import { PRODUCT_AND_SERVICE } from "../content";
import ProductServiceList from "./ProductServicesList";
import { LINE_2, LONG_HORIZONTAL_LINE, LONG_VERTICAL_LINE } from "assets/icons";
// import { LONG_HORIZONTAL_LINE } from "assets/icons";
import Image from "components/widgets/Image/Image";

export const ProductServicesTab = () => {
  return (
    <Fragment>
      <div
        className="z-0 hidden md:block lg:hidden relative overflow-hidden container mx-auto mt-10
        pt-10 bg-white rounded-xl shadow-lg w-[1201px] md:h-[1008px] lg:h-[800px]"
      >
        <div
          className="container mx-auto flex flex-col space-y-24 justify-center
          items-center"
        >
          <div className="md:grid md:grid-cols-2 md:gap-x-[75px] lg:hidden">
            <div className="container w-[288.45px]">
              {PRODUCT_AND_SERVICE["Bank Account/Wallet Opening"].map(
                (service) => (
                  <ProductServiceList
                    heading={Object.keys(PRODUCT_AND_SERVICE)[0]}
                    key={service.id}
                    firstList={service.firstList}
                    secondList={service.secondList}
                    thirdList={service.thirdList}
                  />
                )
              )}
            </div>

            <div className="container w-[288.45px]">
              {PRODUCT_AND_SERVICE["BVN Enrollment"].map((service) => (
                <ProductServiceList
                  heading={Object.keys(PRODUCT_AND_SERVICE)[1]}
                  key={service.id}
                  firstList={service.firstList}
                  secondList={service.secondList}
                  thirdList={service.thirdList}
                />
              ))}
            </div>

            <div className="container md:hidden lg:block w-[288.45px]">
              {PRODUCT_AND_SERVICE["Cash Deposit/Cash Withdrawal"].map(
                (service) => (
                  <ProductServiceList
                    heading={Object.keys(PRODUCT_AND_SERVICE)[2]}
                    key={service.id}
                    firstList={service.firstList}
                    secondList={service.secondList}
                    thirdList={service.thirdList}
                    fourthList={service.fourthList}
                  />
                )
              )}
            </div>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-x-[75px] lg:hidden">
            <div className="container w-[288.45px]">
              {PRODUCT_AND_SERVICE["Instant Transfer"].map((service) => (
                <ProductServiceList
                  heading={Object.keys(PRODUCT_AND_SERVICE)[3]}
                  key={service.id}
                  firstList={service.firstList}
                  secondList={service.secondList}
                  thirdList={service.thirdList}
                />
              ))}
            </div>

            <div className="container w-[288.45px]">
              {PRODUCT_AND_SERVICE["Bill Payment"].map((service) => (
                <ProductServiceList
                  heading={Object.keys(PRODUCT_AND_SERVICE)[4]}
                  key={service.id}
                  firstList={service.firstList}
                  secondList={service.secondList}
                  thirdList={service.thirdList}
                />
              ))}
            </div>

            <div className="container md:hidden lg:block w-[288.45px]">
              {PRODUCT_AND_SERVICE["Airtime Recharge"].map((service) => (
                <ProductServiceList
                  heading={Object.keys(PRODUCT_AND_SERVICE)[5]}
                  key={service.id}
                  firstList={service.firstList}
                />
              ))}
            </div>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-x-[75px]  lg:hidden">
            <div className="container md:block lg:hidden w-[288.45px]">
              {PRODUCT_AND_SERVICE["Cash Deposit/Cash Withdrawal"].map(
                (service) => (
                  <ProductServiceList
                    heading={Object.keys(PRODUCT_AND_SERVICE)[2]}
                    key={service.id}
                    firstList={service.firstList}
                    secondList={service.secondList}
                    thirdList={service.thirdList}
                  />
                )
              )}
            </div>

            <div className="container md:block lg:hidden w-[288.45px]">
              {PRODUCT_AND_SERVICE["Airtime Recharge"].map((service) => (
                <ProductServiceList
                  heading={Object.keys(PRODUCT_AND_SERVICE)[5]}
                  key={service.id}
                  firstList={service.firstList}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========= LONG VERTICAL LINE START ========= */}
        <Image
          parentClassName="absolute container inset-y-0 md:left-[370px] lg:left-[410px] md:top-10"
          imageClassName="lg:h-[720px]"
          image={LONG_VERTICAL_LINE}
        />

        <Image
          parentClassName="absolute md:hidden lg:block container inset-y-0 lg:left-[780px] md:top-10"
          imageClassName="lg:h-[720px]"
          image={LONG_VERTICAL_LINE}
        />
        {/* ========= LONG VERTICAL LINE END ========= */}

        {/* ========= LONG HORIZONTAL LINE START ========= */}
        <Image
          // parentClassName="container absolute lg:px-0 md:px-32 absolute inset-y-0 md:left-0 md:top-[360px] lg:left-20 lg:top-[430px]"
          parentClassName="container mx-auto absolute md:px-5 inset-y-0 md:left-0 md:top-[360px] lg:top-[430px]"
          imageClassName="w-fit"
          image={LONG_HORIZONTAL_LINE}
        />

        <Image
          parentClassName="container absolute lg:hidden md:px-5 inset-y-0 md:left-0 md:top-[650px]"
          imageClassName="w-fit"
          image={LONG_HORIZONTAL_LINE}
        />
        {/* LONG HORIZONTAL LINE END */}
      </div>
    </Fragment>
  );
};

export const ProductServicesMobile = () => {
  return (
    <Fragment>
      <div className="md:hidden bg-white rounded-xl shadow-lg px-3 py-10 mt-10">
        <div className="flex flex-col mt-5 space-y-5 px-4 md:px-0 lg:px-1">
          {PRODUCT_AND_SERVICE["Bank Account/Wallet Opening"].map((service) => (
            <ProductServiceList
              heading={Object.keys(PRODUCT_AND_SERVICE)[0]}
              key={service.id}
              firstList={service.firstList}
              secondList={service.secondList}
              thirdList={service.thirdList}
            />
          ))}
        </div>

        {/* MOBILE HORIZONTAL LINE 1 */}
        <Image
          image={LINE_2}
          parentClassName="flex justify-center py-10 md:hidden lg:hidden"
        />

        <div className="flex flex-col space-y-5 px-4 md:px-0 lg:px-1">
          {PRODUCT_AND_SERVICE["BVN Enrollment"].map((service) => (
            <ProductServiceList
              heading={Object.keys(PRODUCT_AND_SERVICE)[1]}
              key={service.id}
              firstList={service.firstList}
              secondList={service.secondList}
              thirdList={service.thirdList}
            />
          ))}
        </div>

        {/* MOBILE HORIZONTAL LINE 1 */}
        <Image
          image={LINE_2}
          parentClassName="flex justify-center py-10 md:hidden lg:hidden"
        />

        <div className="flex flex-col space-y-5 px-4 md:px-0 lg:px-1">
          {PRODUCT_AND_SERVICE["Cash Deposit/Cash Withdrawal"].map(
            (service) => (
              <ProductServiceList
                heading={Object.keys(PRODUCT_AND_SERVICE)[2]}
                key={service.id}
                firstList={service.firstList}
                secondList={service.secondList}
                thirdList={service.thirdList}
                fourthList={service.fourthList}
              />
            )
          )}
        </div>

        {/* MOBILE HORIZONTAL LINE 1 */}
        <Image
          image={LINE_2}
          parentClassName="flex justify-center py-10 md:hidden lg:hidden"
        />

        <div className="flex flex-col space-y-5 px-4 md:px-0 lg:px-1">
          {PRODUCT_AND_SERVICE["Instant Transfer"].map((service) => (
            <ProductServiceList
              heading={Object.keys(PRODUCT_AND_SERVICE)[3]}
              key={service.id}
              firstList={service.firstList}
              secondList={service.secondList}
              thirdList={service.thirdList}
            />
          ))}
        </div>

        {/* MOBILE HORIZONTAL LINE 1 */}
        <Image
          image={LINE_2}
          parentClassName="flex justify-center py-10 md:hidden lg:hidden"
        />

        <div className="flex flex-col space-y-5 px-4 md:px-0 lg:px-1">
          {PRODUCT_AND_SERVICE["Bill Payment"].map((service) => (
            <ProductServiceList
              heading={Object.keys(PRODUCT_AND_SERVICE)[4]}
              key={service.id}
              firstList={service.firstList}
              secondList={service.secondList}
              thirdList={service.thirdList}
            />
          ))}
        </div>

        {/* MOBILE HORIZONTAL LINE 1 */}
        <Image
          image={LINE_2}
          parentClassName="flex justify-center py-10 md:hidden lg:hidden"
        />

        <div className="flex flex-col space-y-5 px-4 md:px-0 lg:px-1">
          {PRODUCT_AND_SERVICE["Airtime Recharge"].map((service) => (
            <ProductServiceList
              heading={Object.keys(PRODUCT_AND_SERVICE)[5]}
              key={service.id}
              firstList={service.firstList}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
