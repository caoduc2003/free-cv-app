import { useEffect, useState } from "react";
import {
  Anchor,
  BackgroundImage,
  Button,
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
  IconPlus,
  IconUsersGroup,
  IconWorld,
  IconX,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios-connect";
import { useSelector } from "react-redux";

const Company = () => {
  const { id } = useParams();
  const [isFollowed, setIsFollowed] = useState(true);
  const [company, setCompany] = useState({});

  const user = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    fetchCompanyDetails(id);
  }, [id]);

  const fetchCompanyDetails = async (id) => {
    let { data } = await axiosInstance.get(`/industries/${id}`);
    setCompany(data);
  };

  const handleFollow = async () => {
    setIsFollowed(!isFollowed);

    let updatedData = {};

    if (company.followers.includes(user.user.id)) {
      updatedData = {
        ...company,
        followers: company.followers.filter((id) => id !== user.user.id),
        totalFollowers: company.totalFollowers - 1,
      };
    } else {
      updatedData = {
        ...company,
        followers: [...company.followers, user.user.id],
        totalFollowers: company.totalFollowers + 1,
      };
    }

    let { data } = await axiosInstance.put(`/industries/${id}`, updatedData);
    setCompany(data);
  };

  console.log(company.followers?.includes(user.user.id));

  useEffect(() => {
    if (company.followers?.includes(user.user.id)) {
      setIsFollowed(false);
    } else {
      setIsFollowed(true);
    }
  }, [company]);

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
        <Group className="mt-5 justify-around">
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
                <Text>{company.totalEmployees} employees</Text>
              </Group>
              <Group gap={"xs"}>
                <IconUsersGroup />
                <Text>{company.totalFollowers} followers</Text>
              </Group>
            </Group>
          </Stack>

          <Button
            onClick={handleFollow}
            variant="filled"
            color={isFollowed ? "green" : "red"}
          >
            {isFollowed ? <IconPlus size={18} /> : <IconX size={18} />}
            <Text className="ml-2">{isFollowed ? "Follow" : "Unfollow"}</Text>
          </Button>
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
