import { Autocomplete, Container, Grid, Stack, rem } from "@mantine/core";
import { Card, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios-connect";
import { IconSearch } from "@tabler/icons-react";

const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [text, setText] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    let { data } = await axiosInstance.get("/industries");
    setCompanies(data);
  };

  const optionsFilter = ({ options, search }) => {
    const splittedSearch = search.toLowerCase().trim().split(" ");
    return options.filter((option) => {
      const words = option.label.toLowerCase().trim().split(" ");
      return splittedSearch.every((searchWord) =>
        words.some((word) => word.includes(searchWord))
      );
    });
  };

  const getCompaniesName = () => {
    return companies.map((company) => company.name);
  };

  const filterCompanies = (search) => {
    return companies.filter((company) => {
      return company.name.toLowerCase().includes(search.toLowerCase());
    });
  };

  console.log(text);

  useEffect(() => {
    if (text.trim() === "") {
      setFilteredCompanies(companies); // If search text is empty, display all companies
    } else {
      setFilteredCompanies(filterCompanies(text)); // Filter companies based on search text
    }
  }, [text, companies]);

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

        <Grid className="mt-5">
          <Grid.Col span={4}>
            <Autocomplete
              placeholder="Search for companies..."
              data={getCompaniesName()}
              filter={optionsFilter}
              leftSection={
                <IconSearch
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              }
              onChange={(value) => setText(value)}
            />
          </Grid.Col>
        </Grid>

        <Grid className="my-6">
          {filteredCompanies.map((item) => (
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
