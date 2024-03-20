import React from "react";
import axiosInstance from "../../utils/axios-connect";
import JobComment from "../../components/job/details/JobComment";

const Feedback = () => {
  return <div><JobComment /></div>;
};

const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  try {
    const {data} = (await axiosInstance.post("/feedbacks", formData));

    return data
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
        msg: error.message,
      };
    }
  }
};

export { action as FeedbackAction };

export default Feedback;
