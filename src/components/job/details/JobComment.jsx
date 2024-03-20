import {
  Avatar,
  Button,
  Grid,
  Group,
  Paper,
  Rating,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconBusinessplan,
  IconHeart,
  IconHourglassEmpty,
  IconMapPin,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axios-connect";
import { Form, useSubmit } from "react-router-dom";
import { useForm } from "@mantine/form";

const JobComment = ({ job }) => {
  const { user } = useSelector((state) => state.user);

  const submit = useSubmit();

  console.log(job);
  
  const form = useForm({
    initialValues: {
      content: "",
      star: 0,
      jobId: job?.id,
      userId: user?.id
    },
  });

  const handleSubmit = (values) => {
    submit(values, {
      method: "post",
    });
  };

  console.log(form.values);

  return (
    <>
      <Paper withBorder radius="md" p={"md"} shadow="md">
        <Grid>
          <Grid.Col span={1}>
            <Avatar
              src={user?.avatar}
              variant="filled"
              radius="xl"
              size="xl"
              alt="it's me"
              className="border-2"
            />
          </Grid.Col>
          <Grid.Col span={11}>
            <Form onSubmit={handleSubmit}>
              <Textarea
                placeholder="Your Feedback"
                rows={4}
                {...form.getInputProps("content")}
              />
              <Stack className="mt-3">
                <Rating
                  {...form.getInputProps("star")}
                  className="float-end"
                />
                <Button
                  type="submit"
                  gradient={{ from: "blue", to: "violet", deg: 71 }}
                  variant="gradient"
                  radius={"xl"}
                  className="w-[10%]"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default JobComment;
