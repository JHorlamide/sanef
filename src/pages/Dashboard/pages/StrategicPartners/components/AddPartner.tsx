import { useNavigate } from "react-router-dom";
import StrategicPartnerHeader from "./StrategicPartnerHeader";
import { IMG_PLACEHOLDER } from "assets/icons";
import DashboardLayout from "../../../../../components/DashboardLayout";
import { DashboardMainView } from "components/Layout";
import CustomBtn from "components/widgets/CustomBtn/CustomBtn";
import CustomInput from "components/widgets/CustomInput/CustomInput";
import { STRATEGIC_PARTNERS } from "routes/ROUTES_CONSTANTS";
import { useStrategicPartnerForm } from "hooks/useStrategicPartner";

const AddPartner = () => {
  const navigate = useNavigate();
  const {
    partnerName,
    partnerLogo,
    errorMessage,
    previewLogo,
    hiddenFileInput,
    openFileInput,
    handleNameChange,
    handleFileChange,
    handleSubmit,
    handlePress
  } = useStrategicPartnerForm();

  return (
    <DashboardLayout>
      <StrategicPartnerHeader />

      <DashboardMainView className="h-screen pt-10 pl-10">
        <div className="bg-white w-[690px] h-[451px] border rounded-lg py-6 flex flex-col space-y-10">
          <div className="space-y-4">
            <h1 className="text-[18px] font-bold pl-10">
              New Strategic Partner
            </h1>
            <hr className="w-full border" />
          </div>

          <form
            className="container px-8 mx-auto space-y-20"
            onSubmit={handleSubmit}
          >
            <div className="flex space-x-10">
              {/* Image Placeholder */}
              <div
                className="bg-white rounded-full w-[180px] h-[180px] shadow-lg 
                p-8 justify-center items-center"
              >
                <img
                  src={previewLogo ? previewLogo : IMG_PLACEHOLDER}
                  alt="placeholder"
                  className="w-full h-full"
                />
              </div>

              {/* Form Input */}
              <div className="w-[390px] space-y-12">
                <div className="space-y-3">
                  <label htmlFor="partnerName">Name</label>
                  <CustomInput
                    id="partnerName"
                    className="w-full py-3 mt-8 border-gray-300 rounded-full outline-buttonColor focus:border-buttonColor focus:ring-buttonColor"
                    inputProps={{
                      type: "text",
                      name: "partnerName",
                      value: partnerName,
                      onChange: handleNameChange
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  {errorMessage && (
                    <p className="text-sm text-center text-red-500">
                      {errorMessage}
                    </p>
                  )}

                  <div className="flex">
                    <CustomBtn
                      className="w-full mb-2 font-semibold outline-none text-buttonColor text-start text-md"
                      onClick={openFileInput}
                      type="button"
                    >
                      Upload logo
                    </CustomBtn>

                    <p className="w-full font-semibold text-gray-800 whitespace-normal text-md text-start">
                      {partnerLogo?.name}
                    </p>
                  </div>

                  <CustomInput
                    id="partnerLogo"
                    className="hidden font-semibold border-none text-buttonColor text-md"
                    inputProps={{
                      type: "file",
                      placeholder: "Upload logo",
                      name: "partnerLogo",
                      onChange: handleFileChange,
                      ref: hiddenFileInput
                    }}
                  />

                  <small>Formats accepted: PNG, JPG, GIF. Maximum 5MB.</small>
                </div>
              </div>
            </div>

            <div className="flex space-x-16">
              <CustomBtn
                className="px-20 py-3 font-semibold text-white rounded-full bg-buttonColor"
                type="submit"
                onKeyDown={handlePress}
              >
                Add Partner
              </CustomBtn>

              <CustomBtn
                className="font-semibold text-buttonColor"
                type="button"
                onClick={() => navigate(STRATEGIC_PARTNERS)}
              >
                Back
              </CustomBtn>
            </div>
          </form>
        </div>
      </DashboardMainView>
    </DashboardLayout>
  );
};

export default AddPartner;
