import {
  Avatar,
  Divider,
  Grid,
  Group,
  Paper,
  Text,
  Title,
  Rating
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios-connect";

const ListJobFeedback = ({ job }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const getAllFeedbacks = async () => {
    const feedbacks = await axiosInstance.get("/feedbacks");
    setFeedbacks(feedbacks.data);
  };

  const fetchAllUsers = async () => {
    const users = await axiosInstance.get("/users");
    setUsers(users.data);
  };

  useEffect(() => {
    getAllFeedbacks();
    fetchAllUsers();
  }, []);

  const dataComment = () => {
    return feedbacks.filter((feedback) => feedback.jobId === job.id);
  };

  const getUserById = (id) => {
    return users.find((user) => user.id === id);
  };

  const user = useSelector((state) => state.user.user);

  return (
    <Paper withBorder radius="md" p={"md"} shadow="md">
      {dataComment().map((feedback) => (
        <>
          <Grid key={feedback.id}>
            <Grid.Col span={1}>
              <Avatar
                src={getUserById(feedback.userId)?.avatar}
                variant="filled"
                radius="xl"
                size="lg"
                alt="it's me"
                className="border-2"
              />
            </Grid.Col>
            <Grid.Col span={11}>
              <Group>
                <Title order={4}>
                  {getUserById(feedback.userId)?.firstName}{" "}
                  {getUserById(feedback.userId)?.lastName}
                </Title>
                <Divider orientation="vertical" />
                <Title order={4}>
                <Rating
                  value={feedback.start}
                  readOnly 
                />
              </Title>
                <Divider orientation="vertical" />
                <Title order={4}>{feedback.createdAt}</Title>
              </Group>

              <div>{feedback.content}</div>
            </Grid.Col>
          </Grid>
          <Divider className="my-4"></Divider>
        </>
      ))}
    </Paper>
  );
};

export default ListJobFeedback;
