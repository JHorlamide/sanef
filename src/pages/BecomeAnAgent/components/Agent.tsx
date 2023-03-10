import { Fragment } from "react";
import Image from "components/widgets/Image/Image";
import style from "../BecomeAnAgent.module.css";
import { Input } from "components/widgets/CustomInput/CustomInput";
import CustomBtn from "components/widgets/CustomBtn/CustomBtn";
import CustomSelect from "components/widgets/CustomInput/CustomSelect";
import { CHECK_LIST } from "assets/icons";

import { Combobox, Transition } from "@headlessui/react";
import { BsCheck2 } from "react-icons/bs";
import { HiOutlineChevronDown } from "react-icons/hi";
import { useRegisterAgent } from "hooks/useAgents";

const Agent = () => {
  const {
    query,
    register,
    errors,
    onSubmit,
    handleSubmit,
    filterLGA,
    filterState,
    setStateToFetchLGA,
    setQuery,
    setSelectedState,
    setSelectedLGA,
    selectedLGA,
    selectedState,
    filterSuperAgents,
    selectedSuperAgent,
    setSelectedSuperAgent
  } = useRegisterAgent();

  return (
    <Fragment>
      <div className="sm:container space-y-5 md:w-[690px] md:justify-center px-5 mx-auto">
        <p className="text-center">
          <span className="font-bold">SANEF Agents</span> are individuals or
          small businesses who provide financial services within communities on
          behalf of licensed financial institutions.
        </p>

        <p className="text-center">
          They are recruited and monitored by CBN licensed financial
          institutions/SANEF Super Agents to carry out financial transactions.
        </p>
      </div>

      {/* FLEX CONTAINER */}
      <div className="container flex flex-col items-center mx-auto mt-8 space-y-8 lg:flex-row lg:space-x-6 lg:space-y-0 md:items-start md:pb-24">
        {/* 1st CONTAINER */}
        <div className="text-white bg-buttonColor rounded-xl w-full mx-5 md:mx-0 px-5 py-4 md:px-10 md:py-12 md:container lg:w-[450px]">
          <div className="">
            <h1 className="font-bold">Requirements</h1>

            <div className="mt-8 space-y-4">
              <div className="flex justify-start space-x-4">
                <div className="block w-fit">
                  <Image
                    image={CHECK_LIST}
                    parentClassName="mt-2"
                    imageClassName="w-fit"
                  />
                </div>

                <div className="w-full">
                  <p className="flex">Must be able to read and write</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-fit">
                  <Image
                    image={CHECK_LIST}
                    parentClassName="mt-2"
                    imageClassName="w-fit"
                  />
                </div>

                <div className="w-full">
                  <p className="">
                    Must have a functional computer or at least an android
                    enabled mobile phone
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-fit">
                  <Image
                    image={CHECK_LIST}
                    parentClassName="mt-2"
                    imageClassName="w-fit"
                  />
                </div>

                <div className="w-full">
                  <p className="">
                    Must have an existing physical shop/business outlet
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-fit">
                  <Image
                    image={CHECK_LIST}
                    parentClassName="mt-2"
                    imageClassName="w-fit"
                  />
                </div>

                <div className="w-full">
                  <p className="">
                    A copy of ID or equivalent (Driver???s license, National ID
                    card, Int???l passport, Voter???s card)
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-fit">
                  <Image
                    image={CHECK_LIST}
                    parentClassName="mt-2"
                    imageClassName="w-fit"
                  />
                </div>

                <div className="w-full">
                  <p className="">
                    A Passport-sized photograph Proof of Address (Utility bills
                    e.g. PHCN, LAWMA, DStv, GOtv, StarTimes, etc.)
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-fit">
                  <Image
                    image={CHECK_LIST}
                    parentClassName="mt-2"
                    imageClassName="w-fit"
                  />
                </div>

                <div className="w-full">
                  <p className="">
                    Financial/Bank account detail or statements
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-fit">
                  <Image
                    image={CHECK_LIST}
                    parentClassName="mt-2"
                    imageClassName="w-fit"
                  />
                </div>

                <div className="w-full">
                  <p className="">At least 10,000 Naira startup capital.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd CONTAINER */}
        <div
          className={`${style.form_tab} bg-white md:rounded-2xl md:shadow-lg w-full lg:w-[700px]`}
        >
          <div className="flex flex-col space-y-1.5 justify-center px-5 mt-8 md:mt-10">
            <h1 className="font-bold text-[24px] text-center">
              Apply to become a SANEF Agent here
            </h1>

            <p className="text-[14px] text-center">
              Fill the application form below and a super agent will get in
              touch with you.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col px-5 space-y-10 md:space-y-5 md:justify-center py-14 md:py-12 md:px-10 md:w-fit"
          >
            {/* FIRST & LAST NAME */}
            <div className="container flex flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full space-y-2">
                <Input
                  type="text"
                  id="firstName"
                  label="First Name"
                  errors={errors}
                  register={register}
                  required={true}
                  validationSchema={{
                    required: "First name is required"
                  }}
                  className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                  data-testid="emailInput"
                  parentClassName="space-y-2"
                />
              </div>

              <div className="w-full space-y-2">
                <Input
                  type="text"
                  id="lastName"
                  label="Last Name"
                  errors={errors}
                  register={register}
                  required={true}
                  validationSchema={{
                    required: "Last name is required"
                  }}
                  className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                  data-testid="emailInput"
                  parentClassName="space-y-2"
                />
              </div>
            </div>

            {/* BUSINESS NAME */}
            <div className="container space-y-2">
              <Input
                type="text"
                id="businessName"
                label="Business Name"
                errors={errors}
                register={register}
                required={true}
                validationSchema={{
                  required: "Business name is required"
                }}
                className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                data-testid="emailInput"
                parentClassName="space-y-2"
              />
            </div>

            {/* EMAIL & GENDER  */}
            <div className="container flex flex-col space-y-10 md:space-y-0 md:space-x-4 md:flex-row">
              <div className="w-full space-y-2">
                <Input
                  type="text"
                  id="email"
                  label="Email Address"
                  errors={errors}
                  register={register}
                  required={true}
                  validationSchema={{
                    required: "Email is required"
                  }}
                  className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                  data-testid="emailInput"
                  parentClassName="space-y-2"
                />
              </div>

              <div className="w-full space-y-2">
                <label htmlFor="gender">Gender</label>
                <CustomSelect
                  id="gender"
                  className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                  selectProps={{ name: "gender" }}
                  selectOptions={[
                    { value: "male", name: "Male" },
                    { value: "female", name: "Female" }
                  ]}
                  selectPlaceholder="Select a gender"
                  errors={errors}
                  register={register}
                />
              </div>
            </div>

            {/* PREFERRED & ALTERNATE PHONE NUMBER */}
            <div className="container flex flex-col space-y-10 md:space-y-0 md:space-x-4 md:flex-row">
              <div className="w-full space-y-2">
                <Input
                  type="text"
                  id="preferredPhoneNumber"
                  label="Preferred Phone Number"
                  errors={errors}
                  register={register}
                  required={true}
                  validationSchema={{
                    required: "Preferred phone number is required"
                  }}
                  className="relative w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                  data-testid="emailInput"
                  parentClassName="space-y-2"
                />
              </div>

              <div className="w-full space-y-2">
                <Input
                  type="text"
                  id="alternatePhoneNumber"
                  label="Alternate Phone Number"
                  errors={errors}
                  register={register}
                  required={true}
                  validationSchema={{
                    required: "Alternate phone number is required"
                  }}
                  className="relative w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                  data-testid="emailInput"
                  parentClassName="space-y-2"
                />
              </div>
            </div>

            {/* STATE & LGA */}
            <div className="container flex flex-col space-y-10 md:space-y-0 md:space-x-4 md:flex-row">
              <div className="z-10 w-full space-y-2">
                <label htmlFor="state">State</label>
                <Combobox value={selectedState} onChange={setSelectedState}>
                  <div className="relative mt-1">
                    <Combobox.Input
                      placeholder="Search States"
                      className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                      displayValue={(state: any) => {
                        setStateToFetchLGA(state);
                        return state;
                      }}
                      onChange={(event) => setQuery(event.target.value)}
                    />

                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <HiOutlineChevronDown
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery("")}
                    >
                      <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filterState.length === 0 && query !== "" ? (
                          <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                            Nothing found.
                          </div>
                        ) : (
                          filterState.map((state, index) => (
                            <Combobox.Option
                              key={state.id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-buttonColor text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={state?.id}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {state.name}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active
                                          ? "text-white"
                                          : "text-buttonColor"
                                      }`}
                                    >
                                      <BsCheck2
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>

              <div className="z-10 w-full space-y-2">
                <label htmlFor="lga">LGA</label>
                <Combobox value={selectedLGA} onChange={setSelectedLGA}>
                  <div className="relative mt-1">
                    <Combobox.Input
                      placeholder="Search LGA"
                      className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                      displayValue={(lga: any) => lga}
                      onChange={(event) => setQuery(event.target.value)}
                    />

                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <HiOutlineChevronDown
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery("")}
                    >
                      <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filterLGA?.length === 0 && query !== "" ? (
                          <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                            Nothing found.
                          </div>
                        ) : (
                          filterLGA?.map((lga, index) => (
                            <Combobox.Option
                              key={index}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-buttonColor text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={lga}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {lga}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active
                                          ? "text-white"
                                          : "text-buttonColor"
                                      }`}
                                    >
                                      <BsCheck2
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>
            </div>

            {/* PREFERRED AGENCY SERVICES/BUSINESS NAME */}
            <div className="space-y-2">
              <Input
                type="text"
                id="proposedAgencyService"
                label="Proposed Agency Services/Business Address"
                errors={errors}
                register={register}
                required={true}
                validationSchema={{
                  required:
                    "Proposed agency services/business address is required"
                }}
                className="relative z-0 w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                data-testid="emailInput"
                parentClassName="space-y-2"
              />
            </div>

            {/* PREFERRED SUPER AGENT */}
            <div className="container flex flex-col space-y-10 md:space-y-0 md:space-x-4 md:flex-row">
              <div className="w-full space-y-2">
                <label htmlFor="state">Choose Your Preferred Super Agent</label>
                <Combobox
                  value={selectedSuperAgent}
                  onChange={setSelectedSuperAgent}
                >
                  <div className="relative mt-1">
                    <Combobox.Input
                      placeholder="Search super agents"
                      className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                      displayValue={(superAgent: any) => superAgent}
                      onChange={(event) => setQuery(event.target.value)}
                    />

                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <HiOutlineChevronDown
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>

                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      afterLeave={() => setQuery("")}
                    >
                      <Combobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filterSuperAgents.length === 0 && query !== "" ? (
                          <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                            Nothing found.
                          </div>
                        ) : (
                          filterSuperAgents.map((superAgent) => (
                            <Combobox.Option
                              key={superAgent._id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-buttonColor text-white"
                                    : "text-gray-900"
                                }`
                              }
                              value={superAgent.companyName}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {superAgent.companyName}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active
                                          ? "text-white"
                                          : "text-buttonColor"
                                      }`}
                                    >
                                      <BsCheck2
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Combobox.Option>
                          ))
                        )}
                      </Combobox.Options>
                    </Transition>
                  </div>
                </Combobox>
              </div>
            </div>

            <CustomBtn className="w-full px-5 py-3 font-semibold text-white rounded-full bg-buttonColor hover:bg-lightGreen">
              Submit Application
            </CustomBtn>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Agent;

//  <div className="space-y-2">
//    <label htmlFor="superAgent">Choose Your Preferred Super Agent</label>
//    <CustomSelect
//      id="superAgent"
//      className="w-full py-3 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
//      selectProps={{
//        name: "superAgent"
//      }}
//      selectOptions={superAgents.map((superAgent) => {
//        return {
//          value: superAgent.companyName,
//          name: superAgent!.companyName
//        };
//      })}
//      selectPlaceholder="Business Name"
//      errors={errors}
//      register={register}
//    />
//  </div>;
