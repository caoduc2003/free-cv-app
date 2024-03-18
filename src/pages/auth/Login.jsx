import React, { useEffect } from "react";
import LoginForm from "../../components/auth/login/LoginForm";
import { useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios-connect";

const Login = () => {
  const actionData = useActionData();
  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData?.msg);
    } else if (!actionData?.error) {
      toast.success(actionData?.msg);
    }
  }, [actionData]);
  return <LoginForm />;
};

const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const { email, password } = formData;
  try {
    const res = (await axiosInstance.get("/users")).data;
    
    const user = res.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      return {
        error: false,
        msg: "Login successful",
      };
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        msg: error.message,
      };
    }
  }
};

const loader = () => {
  return;
};
export { action as LoginAction, loader as LoginLoader };
export default Login;
