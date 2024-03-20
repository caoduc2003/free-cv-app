import { Container, Grid, Stack } from "@mantine/core";
import JobHeader from "../../../components/job/details/JobHeader";
import JobDescription from "../../../components/job/details/JobDescription";
import CompanyInfo from "../../../components/job/details/CompanyInfo";
import { redirect, useLoaderData } from "react-router-dom";
import axiosInstance from "../../../utils/axios-connect";
import JobComment from "../../../components/job/details/JobComment";
import ListJobFeedback from "../../../components/job/details/ListJobFeedback";
import Feedback from "../../feedback/Feedback";
const JobDetails = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);
  return (
    <>
      <Container className="container mt-5">
        <Grid>
          <Grid.Col span={9}>
            <Stack>
              <JobHeader job={loaderData?.jobEntity[0]} />
              <JobDescription job={loaderData?.jobEntity[0]} />
              <Feedback job={loaderData?.jobEntity[0]} />
              <ListJobFeedback job={loaderData?.jobEntity[0]} />
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

export { loader as JobDetailsLoader };
export default JobDetails;
