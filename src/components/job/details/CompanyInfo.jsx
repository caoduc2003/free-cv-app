import {
  Avatar,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

const CompanyInfo = ({ company }) => {
  console.log(company);
  return (
    <>
      <Paper className="max-w-80" withBorder radius="md" p={"lg"} shadow="md">
        <Stack>
          <Avatar
            variant="filled"
            radius="xs"
            size="xl"
            src={company?.image ? company?.image : null}
            color="orange"
          />
          <Title order={4}>{company?.name}</Title>
          <Stack gap={0}>
            <Group>
              <Text c={"dimmed"}>Size: </Text>
              <Text>{`${company?.totalEmployees} employees`}</Text>
            </Group>
            <Group>
              <Text c={"dimmed"}>Location: </Text>
              <Text>{company?.location}</Text>
            </Group>
          </Stack>
          <Button
            rightSection={<IconExternalLink stroke={1.5} />}
            variant="light"
          >
            Company details
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default CompanyInfo;
