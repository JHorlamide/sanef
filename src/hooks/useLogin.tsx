import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { LoginType, loginUser } from "api/user";
import AuthContext, { AuthType, AuthContextType } from "context/AuthProvider";

const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const { saveAuth } = React.useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("password");
  const toggleShowPassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    const loginData: LoginType = {
      email: data.email,
      password: data.password
    };

    loginUser(loginData)
      .then((response) => {
        setLoading(false);

        const authData: AuthType = {
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        };

        // Store User Credential in Context State
        saveAuth(authData);

        toast.success(response.message);
        navigate("/banks");

        localStorage.setItem("sanefToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      })
      .catch((error: any) => {
        if (error.status === "FETCH_ERROR") {
          return toast.error("Server error: Server seems to be down");
        }

        if (error.response) {
          return toast.error(error.response.data.message);
        }

        toast.error(error.message);
      });
  };

  return {
    errors,
    loading,
    inputType,
    onSubmit,
    register,
    handleSubmit,
    toggleShowPassword
  };
};

export default useLogin;
