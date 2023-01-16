import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CLOSE_ICON } from "assets/icons";
// import Image from "components/widgets/Image/Image";

interface ServiceModalCardProps {
  heading: string;
  details: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ServiceCardModal = ({
  heading,
  details,
  isOpen,
  setIsOpen
}: ServiceModalCardProps) => {
  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative container mx-auto z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-modalColor bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={"div"}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className={"flex"}
              >
                <Dialog.Panel
                  className="w-[370px] overflow-hidden md:w-[900px] lg:w-[965px] h-fit
                  rounded-2xl bg-white px-12 md:px-10 py-6 text-left transform 
                   align-middle shadow-xl transition-all"
                >
                  <div className="flex flex-col justify-center items-center md:flex-row md:items-start">
                    <div className="mt-2 md:space-y-8 w-full">
                      <div
                        className="flex flex-col justify-center items-center space-y-4
                       md:space-y-0 md:justify-start md:items-start"
                      >
                        <h1 className="text-md md:text-xl text-center md:text-start font-bold">
                          {heading}
                        </h1>
                      </div>

                      <p className="text-[16px] text-modalTextColor leading-[30px] mt-7 md:mt-0">
                        {details}
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>

                <img
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-7 -ml-1 -mt-1 md:ml-3 md:mt-3"
                  src={CLOSE_ICON}
                  alt=""
                />
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default ServiceCardModal;
