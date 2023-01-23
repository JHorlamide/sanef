import React from "react";
import { Fragment } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, Transition } from "@headlessui/react";
import { Pagination } from "flowbite-react";

export interface IPaginationProps {
  pageNumber: number;
  totalPage: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export interface TableRecordProps {
  className?: string;
  totalPage: number;
  recordPerPage: number;
  setRecordPerPate: React.Dispatch<React.SetStateAction<number>>;
}

export const TableRecord = ({
  totalPage,
  className,
  recordPerPage,
  setRecordPerPate
}: TableRecordProps) => {
  const ItemList = [5, 10, 20, 30, 40, 50];

  return (
    <div className={className}>
      <p className="text-[12px] flex">
        Showing{" "}
        <div className="text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div className="mx-1.5 -mt-2">
              <Menu.Button
                className="inline-flex w-full justify-center rounded-lg 
                bg-white text-black text-sm px-[7px] py-2 font-medium"
              >
                {recordPerPage}
                <IoIosArrowDown
                  className="ml-0.5 -mr-1 h-5 w-5 text-black"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute w-16 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg left-5 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {ItemList.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-buttonColor text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={() => setRecordPerPate(item)}
                        >
                          {item}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        of {totalPage} Records
      </p>
    </div>
  );
};

const PaginationItem = ({
  pageNumber,
  totalPage,
  setPageNumber
}: IPaginationProps) => {
  const onPageChange = (selected: number) => {
    setPageNumber(selected);
  };

  return (
    <Pagination
      currentPage={pageNumber}
      showIcons={true}
      totalPages={totalPage}
      onPageChange={onPageChange}
    />
  );
};

export default PaginationItem;
