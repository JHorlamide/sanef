import React from "react";
import { LOGIN_LOGO } from "assets/images";
import CustomBtn from "components/widgets/CustomBtn/CustomBtn";
import NavLink from "components/layout/Navbar/NavLink/NavLink";
import { Input } from "components/widgets/CustomInput/CustomInput";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: any) => {
    alert("Password request sent!");
  };

  return (
    <div className="container mx-auto">
      <div className="container mx-auto my-20 bg-white rounded-xl w-[580px] h-[530px] shadow-lg">
        <div className="px-20 py-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <h1 className="font-bold text-[24px] capitalize">
                forgot password?
              </h1>
              <p className="text-[14px]">
                Let us help you recover the access to your account
              </p>
            </div>

            <div className="mx-5 w-[90.79px] h-[74px] mb-8">
              <img src={LOGIN_LOGO} alt="..." className="w-full h-full" />
            </div>
          </div>
        </div>

        <form className="w-full px-16" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2">
              <Input
                id="email"
                type="email"
                label="Email Address"
                errors={errors}
                register={register}
                required={true}
                validationSchema={{
                  required: "Email is required"
                }}
                className="rounded-full border border-gray-300 outline-buttonColor 
                focus:border-buttonColor focus:ring-buttonColor py-2 px-5 w-[431px]"
                data-testid="email-input"
                parentClassName="space-y-2"
              />
            </div>

            <CustomBtn
              className="text-white font-semibold bg-buttonColor rounded-full py-3 px-5 w-[431px]
             hover:bg-lightGreen"
              type="submit"
              role={"button"}
            >
              Request a Password Reset Link
            </CustomBtn>
          </div>

          <div className="flex items-center justify-center mt-8">
            <NavLink
              path="/login"
              title="Back to Login"
              className="text-[14px] text-black text-center font-bold 
              hover:text-buttonColor"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
