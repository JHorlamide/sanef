import { Link } from "react-router-dom";
import { LOGIN_LOGO } from "assets/images";
import CustomBtn from "components/widgets/CustomBtn/CustomBtn";
import { HOME } from "routes/ROUTES_CONSTANTS";
import RouterLink from "components/layout/Navbar/NavLink/RouterLink";
import { Input } from "components/widgets/CustomInput/CustomInput";
import useLogin from "hooks/useLogin";

const Login = () => {
  const {
    errors,
    loading,
    inputType,
    onSubmit,
    register,
    handleSubmit,
    toggleShowPassword
  } = useLogin();

  return (
    <div className="container mx-auto">
      <div className="container mx-auto my-20 bg-white rounded-xl w-[580px] h-[530px] shadow-lg">
        <div className="px-20 py-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col space-y-1">
              <h1 className="font-bold text-[24px]">Login</h1>
              <p className="text-[14px]">Sign into an existing account</p>
            </div>

            <div className="mx-5 w-[90.79px] h-[74px] mb-8">
              <Link to={HOME}>
                <img src={LOGIN_LOGO} alt="..." className="w-full h-full" />
              </Link>
            </div>
          </div>
        </div>

        <form className="w-full px-16" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <Input
                type="text"
                id="email"
                label="Email Address"
                errors={errors}
                register={register}
                required={true}
                validationSchema={{
                  required: "email is required"
                }}
                className="rounded-full border border-gray-300 outline-buttonColor 
                focus:border-buttonColor focus:ring-buttonColor py-2 px-5 w-[431px]"
                data-testid="emailInput"
                parentClassName="space-y-2"
              />
            </div>

            <div className="relative flex flex-col space-y-2">
              <Input
                type={inputType}
                id="password"
                label="Password"
                errors={errors}
                register={register}
                required={true}
                validationSchema={{
                  required: "password is required"
                }}
                className="rounded-full border border-gray-300 outline-buttonColor 
                focus:border-buttonColor focus:ring-buttonColor py-2 px-5 w-[431px]"
                data-testid="passwordInput"
                parentClassName="space-y-2"
              />

              <div className="absolute inset-y-0 top-[36px] right-10">
                <h1
                  className="text-[12px] cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {inputType === "password" ? "Show" : "Hide"}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col pt-10 space-y-5">
            <RouterLink
              path="/forgot-password"
              title="Forgot Password?"
              className="text-[14px] text-black hover:text-buttonColor"
            />

            <CustomBtn
              className="text-white font-semibold bg-buttonColor rounded-full py-3 px-5 w-[431px]
              hover:bg-lightGreen"
              isloading={loading}
              role="button"
            >
              Login
            </CustomBtn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
