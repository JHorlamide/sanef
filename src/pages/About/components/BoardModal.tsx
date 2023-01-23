import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CLOSE_ICON } from "assets/icons";
import Image from "components/widgets/Image/Image";

interface BoardModalProps {
  image: string;
  name: string;
  position: string;
  profileDetails: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BoardModal = ({
  image,
  name,
  position,
  profileDetails,
  isOpen,
  setIsOpen
}: BoardModalProps) => {
  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="container relative z-50 mx-auto"
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
            <div className="fixed inset-0 bg-opacity-25 bg-modalColor" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={"div"}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                className={"relative flex"}
              >
                <Dialog.Panel
                  className="w-[370px] md:w-[900px] lg:w-[965px] h-fit transform 
                    overflow-hidden rounded-2xl bg-white px-12 md:px-10 py-6 text-left align-middle
                    shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center justify-center md:space-x-10 md:flex-row md:items-start">
                    <Image
                      image={image}
                      parentClassName="w-[200px] h-[150px] flex justify-center items-center md:justify-start md:items-start md:mx-0 md:w-1/6"
                      imageClassName="w-full h-full object-cover rounded-2xl"
                    />

                    {/* <div className="w-full mt-2 md:mt-2 md:w-5/6 md:space-y-8"> */}
                    <div className="w-full mt-2 md:space-y-8">
                      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:justify-start md:items-start">
                        <h1 className="font-bold text-center text-md md:text-xl md:text-start">
                          {name}
                        </h1>
                        <h1 className="text-md">{position}</h1>
                      </div>

                      <p className="text-[16px] text-modalTextColor leading-[30px] mt-7 md:mt-0 whitespace-pre-line">
                        {profileDetails}
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>

                <img
                  className="absolute inset-y-0 w-10 -mt-1 -ml-1 h-7 -right-10 top-5 md:ml-5 md:mt-5"
                  src={CLOSE_ICON}
                  alt=""
                  onClick={() => setIsOpen(false)}
                />
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default BoardModal;
