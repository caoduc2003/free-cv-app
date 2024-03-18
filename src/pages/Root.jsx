import React from "react";
import Header from "../components/common/header/Header";
import { Outlet } from "react-router-dom";
import axiosInstance from "../utils/axios-connect";

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const loader = async () => {
  try {
    const res = (await axiosInstance.get("/users")).data;
    const user = JSON.parse(localStorage.getItem("user"));
    const check = res.find((u) => JSON.stringify(u) === JSON.stringify(user));
    if (check) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
  }
};

export { loader as RootLoader };
export default Root;
