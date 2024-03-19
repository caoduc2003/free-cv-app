import { Container, Grid } from "@mantine/core";
import { Card, Image, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
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
        <h1 className="text-2xl font-semibold text-center">
          DANH SÁCH CÁC CÔNG TY NỔI BẬT
        </h1>

        <Grid className="my-6">
          {companies.map((item) => (
            <Grid.Col span={4} key={item.id}>
              <Card shadow="sm" padding="lg">
                <Card.Section>
                  <Image src={item.image} h={160} alt="No way!" />
                </Card.Section>

                <Text fw={500} size="lg" mt="md">
                  <Link to={`/company/${item.id}/details`}>{item.name}</Link>
                </Text>

                <Text mt="xs" c="dimmed" size="sm">
                  Please click anywhere on this card to claim your reward, this
                  is not a fraud, trust us
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default ListCompanies;
