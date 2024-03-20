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
import { Link } from "react-router-dom";

const CompanyInfo = ({ company }) => {
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
          <Link to={`/company/${company?.id}/details`} className="w-full">
            <Button
              rightSection={<IconExternalLink stroke={1.5} />}
              variant="light"
              fullWidth
            >
              Company details
            </Button>
          </Link>
        </Stack>
      </Paper>
    </>
  );
};

export default CompanyInfo;
