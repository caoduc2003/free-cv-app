import { Avatar, Button, Group, Paper, Text, Title } from "@mantine/core";
import {
  IconBusinessplan,
  IconHeart,
  IconHourglassEmpty,
  IconMapPin,
} from "@tabler/icons-react";

const JobHeader = ({ job }) => {
  return (
    <>
      <Paper withBorder radius="md" p={"xl"} shadow="md">
        <Group className="justify-between">
          <Title order={2}>{job?.title}</Title>
          <Text c={"dimmed"}>{`Deadline: ${job?.dueDate}`}</Text>
        </Group>
        <Group className="mt-5">
          <Group gap={"xs"}>
            <Avatar src={null} color="green">
              <IconBusinessplan />
            </Avatar>
            <Text className="font-semibold">{`${job?.salary}$`}</Text>
          </Group>
          <Group gap={"xs"}>
            <Avatar src={null} color="green">
              <IconMapPin />
            </Avatar>
            <Text className="font-semibold">{`${job?.location}`}</Text>
          </Group>
          <Group gap={"xs"}>
            <Avatar src={null} color="green">
              <IconHourglassEmpty />
            </Avatar>
            <Text className="font-semibold">{`${job?.experience} YOE`}</Text>
          </Group>
        </Group>
        <Group className="mt-5">
          <Button
            gradient={{ from: "blue", to: "violet", deg: 71 }}
            variant="gradient"
            radius={"xl"}
            className="grow"
          >
            Apply now
          </Button>
          <Button
            variant="outline"
            color="orange"
            radius={"xl"}
            leftSection={<IconHeart />}
            className="grow-0"
          >
            Save this job
          </Button>
        </Group>
      </Paper>
    </>
  );
};

export default JobHeader;
