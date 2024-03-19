import React, { useEffect } from "react";
import LoginForm from "../../components/auth/login/LoginForm";
import { redirect, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios-connect";

const Login = () => {
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
      return redirect("/home");
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

export { action as LoginAction };
export default Login;
