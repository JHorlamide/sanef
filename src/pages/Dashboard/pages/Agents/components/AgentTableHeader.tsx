import React, { useState, useEffect } from "react";
import CustomBtn from "components/widgets/CustomBtn/CustomBtn";
import { useNavigate } from "react-router-dom";
import { DOWNLOAD_ICON, FILTER_ICON2, SEARCH_ICON } from "assets/icons";
import CustomInput from "components/widgets/CustomInput/CustomInput";
import CustomSelect from "components/widgets/CustomInput/CustomSelect";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";

interface TableHeaderProps {
  buttonText: string;
  path: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  agents: Array<any>;
  setIsApproved: React.Dispatch<React.SetStateAction<string>>;
}

const AgentTableHeader = ({
  buttonText,
  path,
  agents,
  setSearchTerm,
  setIsApproved
}: TableHeaderProps) => {
  const {
    register,
    // handleSubmit,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filter, setFilter] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setIsApproved(e.target.value);
  };

  useEffect(() => {
    setSearchTerm(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const csvData = agents.map((agent) => {
    return {
      id: agent._id,
      email: agent.email,
      firstName: agent.firstName,
      surname: agent.surname,
      businessName: agent.businessName,
      state: agent.state,
      LGA: agent.LGA,
      gender: agent.gender,
      choiceOfSuperAgent: agent.choiceOfSuperAgent,
      preferredPhoneNumber: agent.preferredPhoneNumber,
      alternativePhoneNumber: agent.alternativePhoneNumber,
      proposedAgentService: agent.proposedAgentService,
      createdAt: agent.createdAt,
      updatedAt: agent.updatedAt
    };
  });

  return (
    <div className="flex justify-between">
      {/* Filter & Search Component */}
      <div className="flex space-x-2">
        <div className="relative flex flex-col space-y-2">
          <CustomInput
            id="password"
            className="px-10 py-2 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
            inputProps={{
              type: "text",
              name: "password",
              value: searchValue,
              placeholder: "Search",
              onChange: handleSearchInput
            }}
          />

          <div className="absolute inset-y-0 top-1 left-3">
            <img src={SEARCH_ICON} alt="" />
          </div>
        </div>

        {/* Filter */}
        <div className="relative">
          <CustomSelect
            id="gender"
            className="px-10 py-2 border border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor w-52"
            selectProps={{
              name: "gender",
              value: filter,
              onChange: handleChange
            }}
            selectOptions={[
              { value: "approved", name: "Approved" },
              { value: "new_request", name: "New Request" }
            ]}
            selectPlaceholder="Filter"
            errors={errors}
            register={register}
          />

          <div className="absolute inset-y-0 top-3 left-3">
            <img src={FILTER_ICON2} alt="" />
          </div>
        </div>
      </div>

      {/* Download & New Bank Buttons */}
      <div className="flex space-x-2">
        <CustomBtn
          className="flex px-5 py-2 font-medium bg-white rounded-full text-buttonColor hover:bg-lightGreen hover:text-white"
          leftIcon={
            <img
              src={DOWNLOAD_ICON}
              alt="download-icon"
              className="mt-0.5 mr-1"
            />
          }
        >
          <CSVLink data={csvData} filename="agents.csv">
            Download CSV
          </CSVLink>
        </CustomBtn>

        <CustomBtn
          className="px-8 py-2 font-medium text-white rounded-full bg-buttonColor hover:bg-lightGreen"
          onClick={() => navigate(path)}
        >
          {buttonText}
        </CustomBtn>
      </div>
    </div>
  );
};

export default AgentTableHeader;
