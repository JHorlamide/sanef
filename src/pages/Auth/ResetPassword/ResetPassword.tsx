import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { LOGIN_LOGO } from "assets/images";
import CustomBtn from "components/widgets/CustomBtn/CustomBtn";
import { Input } from "components/widgets/CustomInput/CustomInput";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");

  const togglePasswordShow = () => {
    setPassword(password === "password" ? "text" : "password");
  };

  const togglePasswordConfirmShow = () => {
    setConfirmPassword(confirmPassword === "password" ? "text" : "password");
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto">
      <div className="container mx-auto my-20 bg-white rounded-xl w-[580px] h-[530px] shadow-lg">
        <div className="px-20 py-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <h1 className="font-bold text-[24px] capitalize">
                reset password
              </h1>
              <p className="text-[14px]">Please enter your new password</p>
            </div>

            <div className="mx-5 w-[90.79px] h-[74px] mb-8">
              <img src={LOGIN_LOGO} alt="..." className="w-full h-full" />
            </div>
          </div>
        </div>

        <form className="w-full px-16" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <div className="relative flex flex-col space-y-2">
              <Input
                id="password"
                label="New Password"
                type={password}
                errors={errors}
                register={register}
                validationSchema={{
                  required: "Password is required"
                }}
                className="rounded-full border border-gray-300 outline-buttonColor 
                focus:border-buttonColor focus:ring-buttonColor py-2 px-5 w-[431px]"
                parentClassName="space-y-2"
                data-testid="password-input"
              />

              <div className="absolute inset-y-0 top-9 right-10">
                <span
                  className="text-[12px] cursor-pointer"
                  onClick={togglePasswordShow}
                >
                  {password === "password" ? "Show" : "Hide"}
                </span>
              </div>
            </div>
            <div className="relative flex flex-col space-y-2">
              <Input
                id="confirmPassword"
                label="Repeat Password"
                type={confirmPassword}
                errors={errors}
                register={register}
                validationSchema={{
                  required: "Confirm password is required"
                }}
                className="rounded-full border border-gray-300 outline-buttonColor 
                focus:border-buttonColor focus:ring-buttonColor py-2 px-5 w-[431px]"
                parentClassName="space-y-2"
                data-testid="confirm-password-input"
              />

              <div className="absolute inset-y-0 top-9 right-10">
                <span
                  className="text-[12px] cursor-pointer"
                  onClick={togglePasswordConfirmShow}
                >
                  {confirmPassword === "password" ? "Show" : "Hide"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-10 space-y-5">
            <CustomBtn
              className="text-white font-semibold bg-buttonColor rounded-full py-3 px-5 w-[431px]
             hover:bg-lightGreen"
              type="submit"
              role={"button"}
            >
              Set Password
            </CustomBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
