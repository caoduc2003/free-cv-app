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

const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const { keyword } = formData;
  try {
    const res1 = (await axiosInstance.get("/jobs")).data;
    const res2 = (await axiosInstance.get("/industries")).data;
    const filteredByKeyword = res1.filter((j) =>
      j.title.toLowerCase().includes(keyword.toLowerCase())
    );
    const addedIndustryName = filteredByKeyword.map((j) => {
      const industry = res2.find((i) => i.id === j.industryId);
      return { ...j, industryName: industry.name };
    });

    return addedIndustryName;
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        msg: error.message,
      };
    }
  }
};

export { loader as RootLoader, action as RootSearchBarAction };
export default Root;
