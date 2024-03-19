import { useEffect, useState } from "react";
import {
  Anchor,
  BackgroundImage,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBuilding,
  IconChevronRight,
  IconMapPin,
  IconUsersGroup,
  IconWorld,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios-connect";

const Company = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});

  useEffect(() => {
    fetchCompanyDetails(id);
  }, [id]);

  const fetchCompanyDetails = async (id) => {
    let { data } = await axiosInstance.get(`/industries/${id}`);
    setCompany(data);
  };

  return (
    <Container className="my-4" size="xl">
      <Group>
        <Link to={"/company"}>Companies list</Link>
        <Center>
          <IconChevronRight size={18} />
        </Center>
        <Text>{company.name}</Text>
      </Group>

      <Card radius={"md"} shadow="md" className="mt-5" withBorder p={"lg"}>
        <BackgroundImage h={250} src={company.image} radius={"md"} />
        <Group className="mt-5">
          <Image
            className="border rounded-full bg-white"
            h={180}
            w={180}
            fit="contain"
            src={company.logo}
          />

          <Stack>
            <Title order={1}>{company.name}</Title>
            <Group>
              <Group gap={"xs"}>
                <IconWorld />
                <Anchor href={company.website}>{company.website}</Anchor>
              </Group>
              <Group gap={"xs"}>
                <IconBuilding />
                <Text>{company.totalEmployees}+ employees</Text>
              </Group>
              <Group gap={"xs"}>
                <IconUsersGroup />
                <Text>{company.totalFollowers} followers</Text>
              </Group>
            </Group>
          </Stack>
        </Group>
      </Card>

      <Grid className="mt-5">
        <Grid.Col span={8}>
          <Card radius={"md"} shadow="md" withBorder>
            <Stack>
              <Title order={4}>About the company</Title>
              <Divider />
              <Text>{company.description}</Text>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <Card radius={"md"} shadow="md" withBorder>
            <Stack>
              <Title order={4}>Contact details</Title>
              <Divider />
              <Paper withBorder shadow="md" p={"lg"}>
                <Stack>
                  <Group>
                    <IconMapPin />
                    <Title order={5}>Location</Title>
                  </Group>
                  <Text>{company.location}</Text>
                </Stack>
              </Paper>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Company;
