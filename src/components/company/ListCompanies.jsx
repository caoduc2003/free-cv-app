import { Container, Grid, Stack } from "@mantine/core";
import { Card, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios-connect";

const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    let { data } = await axiosInstance.get("/industries");
    setCompanies(data);
  };

  return (
    <Container size="xl">
      <div className="my-5">
        <Text
          order={2}
          className="text-center text-3xl"
          fw={800}
          variant="gradient"
          gradient={{ from: "orange", to: "yellow", deg: 142 }}
        >
          TOP COMPANIES
        </Text>

        <Grid className="my-6">
          {companies.map((item) => (
            <Grid.Col span={4} key={item.id}>
              <Link to={`/company/${item.id}/details`}>
                <Card
                  shadow="sm"
                  padding="lg"
                  withBorder
                  radius="md"
                  className="h-full"
                >
                  <Card.Section>
                    <Image src={item.image} h={200} />
                  </Card.Section>
                  <Stack gap={0}>
                    <Text fw={500} size="lg" mt="md">
                      {item.name}
                    </Text>
                    <Text mt="xs" c="dimmed" size="sm">
                      {item?.description}
                    </Text>
                  </Stack>
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default ListCompanies;
