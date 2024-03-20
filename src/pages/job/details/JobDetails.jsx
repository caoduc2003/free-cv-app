import { Container, Grid, Stack } from "@mantine/core";
import JobHeader from "../../../components/job/details/JobHeader";
import JobDescription from "../../../components/job/details/JobDescription";
import CompanyInfo from "../../../components/job/details/CompanyInfo";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import axiosInstance from "../../../utils/axios-connect";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
const JobDetails = () => {
  const loaderData = useLoaderData();
  const user = useSelector((state) => state.user);
  const submit = useSubmit();
  const [saved, setSaved] = useState(false);
  const [savedJobs, setSavedJobs] = useState(null);
  const checkSaveJobStatus = async (id) => {
    try {
      const res = (await axiosInstance.get(`/savedJobs`)).data;
      const check = res.find(
        (u) =>
          Number(u.jobId) === Number(id) &&
          Number(u.userId) === Number(user?.user?.id)
      );
      if (check === undefined || check === null) {
        setSaved(false);
      } else {
        setSavedJobs(check);
        setSaved(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };
  const handleSaveJob = () => {
    if (saved) {
      submit(
        {
          requestField: "saveJob",
          id: savedJobs?.id,
        },
        { method: "delete" }
      );
      setSaved(false);
      setSavedJobs(null);
    } else {
      submit(
        {
          requestField: "saveJob",
          jobId: loaderData?.jobEntity[0]?.id,
          userId: user?.user?.id,
          createdAt: new Date(),
        },
        { method: "post" }
      );
      setSaved(true);
    }
  };
  useEffect(() => {
    checkSaveJobStatus(loaderData?.jobEntity[0]?.id);
  }, [loaderData]);

  return (
    <>
      <Container className="container mt-5">
        <Grid>
          <Grid.Col span={9}>
            <Stack>
              <JobHeader
                job={loaderData?.jobEntity[0]}
                saved={saved}
                handleSaveJob={handleSaveJob}
              />
              <JobDescription
                job={loaderData?.jobEntity[0]}
                saved={saved}
                handleSaveJob={handleSaveJob}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={3}>
            <CompanyInfo company={loaderData?.industryEntity[0]} />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

const loader = async ({ params }) => {
  try {
    const { id } = params;
    const res1 = (await axiosInstance.get(`/jobs?id=${id}`)).data;
    const industryId = res1[0]?.industryId;
    const res2 = (await axiosInstance.get(`/industries?id=${industryId}`)).data;
    return {
      jobEntity: res1,
      industryEntity: res2,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return redirect("/");
    }
  }
};

const action = async ({ request }) => {
  try {
    const formData = Object.fromEntries(await request.formData());
    const method = request.method;
    const requestField = formData.requestField;
    const url = {
      saveJob: {
        POST: "http://localhost:9999/savedJobs",
        DELETE: "http://localhost:9999/savedJobs?id=" + formData.id,
      },
      applyJob: {
        POST: "http://localhost:9999/jobAplications",
        DELETE: "http://localhost:9999/jobAplications",
      },
    };

    const payload = {
      saveJob: {
        POST: {
          jobId: formData.jobId,
          userId: formData.userId,
          createdAt: formData.createdAt,
        },
      },
      applyJob: {
        POST: "Job applied successfully",
        DELETE: "Unapplied!",
      },
    };

    const successMsg = {
      saveJob: {
        POST: "Job saved successfully",
        DELETE: "Unsaved!",
      },
      applyJob: {
        POST: "Job applied successfully",
        DELETE: "Unapplied!",
      },
    };

    const errorMsg = {
      saveJob: {
        POST: "Job saved failed! Please try again",
        DELETE: "Unsaved failed! Please try again",
      },
      applyJob: {
        POST: "Job applied failed! Please try again",
        DELETE: "Unapplied failed! Please try again",
      },
    };

    if (method !== "DELETE") {
      await axios.request({
        method: method,
        url: url[requestField][method],
        data: payload[requestField][method],
      });
      return {
        error: false,
        msg: successMsg[requestField][method],
      };
    } else {
      await axios.request({
        method: method,
        url: url[requestField][method],
      });
      return {
        error: false,
        msg: successMsg[requestField][method],
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return {
        error: true,
        msg: "Server error!",
      };
    }
  }
};
export { loader as JobDetailsLoader, action as JobDetailsAction };
export default JobDetails;
