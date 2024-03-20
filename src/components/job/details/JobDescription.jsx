import { Button, Divider, Group, Paper, Text, Title } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

const JobDescription = ({ job }) => {
  return (
    <>
      <Paper withBorder radius="md" p={"xl"} shadow="md">
        <Title order={3}>Job details</Title>
        <Divider className="my-3" />
        <Title order={4}>Description</Title>
        <Text className="mt-3">{job?.descriptions}</Text>
        <br />
        <Title order={4}>Requirements</Title>
        <Text className="mt-3">{job?.requirements}</Text>
        <br />
        <Title order={4}>Benefits</Title>
        <Text className="mt-3">{job?.benefits}</Text>
        <br />
        <Title order={4}>Work location</Title>
        <Text className="mt-3">Hanoi, Vietnam</Text>
        <br />
        <Title order={4}>Apply method</Title>
        <Text className="mt-3">Via email or buttons below</Text>
        <Group className="mt-5">
          <Button
            gradient={{ from: "blue", to: "violet", deg: 71 }}
            variant="gradient"
            radius={"xl"}
          >
            Apply now
          </Button>
          <Button
            variant="outline"
            color="orange"
            radius={"xl"}
            leftSection={<IconHeart />}
          >
            Save this job
          </Button>
        </Group>
      </Paper>
    </>
  );
};

export default JobDescription;
