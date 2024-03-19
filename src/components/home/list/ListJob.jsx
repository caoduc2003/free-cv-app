import {
  Avatar,
  Badge,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { RangeSlider } from "@mantine/core";
import axiosInstance from "../../../utils/axios-connect";
import {
  IconBriefcase,
  IconCoin,
  IconHourglassEmpty,
  IconHourglassFilled,
  IconHourglassLow,
  IconMapPin,
} from "@tabler/icons-react";

const ListJob = () => {
  const [locations, setLocations] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [careers, setCareers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const listIndustries = await axiosInstance.get("/industries");
    setIndustries(listIndustries.data);
    const listCareer = await axiosInstance.get("/careers");
    setCareers(listCareer.data);
    const listJobs = await axiosInstance.get("/jobs");
    setJobs(listJobs.data);

    const data = jobs
      .filter(
        (job) => job.salary >= sliderValue[0] && job.salary <= sliderValue[1]
      )
      .filter(
        (job) =>
          job.experience >= sliderValueExperience[0] &&
          job.experience <= sliderValueExperience[1]
      );
    setFilterData(data);
  };
  const companyNames = industries?.map((company) => company.name);
  const location = industries?.map((company) => company.location);
  const career = careers?.map((company) => company.name);

  const [value, setValue] = useState(null);

  const findIndustry = (id) => {
    return industries?.find((industry) => Number(industry.id) === Number(id));
  };

  const findCareer = (id) => {
    return careers?.find((industry) => Number(industry.id) === Number(id));
  };

  const companyOptions = industries.map((company) => ({
    label: company.name,
    value: company.id.toString(),
  }));

  const [selectedCompany, setSelectedCompany] = React.useState("");

  // Hàm xử lý sự kiện thay đổi giá trị của Select
  const handleCompanyChange = (value) => {
    setSelectedCompany(value);
  };

  const careerOptions = careers.map((career) => ({
    label: career.name,
    value: career.id.toString(),
  }));

  const [selectedCareer, setSelectedCareer] = React.useState("");

  const handleCareerChange = (value) => {
    setSelectedCareer(value);
  };

  const [selectLocation, setSelectLocation] = React.useState("");

  const handleLocationChange = (value) => {
    setSelectLocation(value);
  };

  const [sliderValue, setSliderValue] = useState([1000, 1500]);

  const handleSliderChange = (values) => {
    setSliderValue(values);
  };

  const [sliderValueExperience, setSliderValueExperience] = useState([0, 2]);

  const handleSliderExperienceChange = (values) => {
    setSliderValueExperience(values);
  };

  useEffect(() => {
    let filteredData = jobs;
    if (selectLocation) {
      filteredData = filteredData.filter(
        (job) => job.location == selectLocation
      );
    }

    if (selectedCompany) {
      filteredData = filteredData.filter(
        (job) => job.industryId == selectedCompany
      );
    }

    if (selectedCareer) {
      filteredData = filteredData.filter(
        (job) => job.careerId == selectedCareer
      );
    }

    if (sliderValue) {
      filteredData = filteredData.filter(
        (job) => job.salary >= sliderValue[0] && job.salary <= sliderValue[1]
      );
    }
    if (sliderValueExperience) {
      filteredData = filteredData.filter(
        (job) =>
          job.experience >= sliderValueExperience[0] &&
          job.experience <= sliderValueExperience[1]
      );
    }
    setFilterData(filteredData);
  }, [
    selectLocation,
    selectedCompany,
    selectedCareer,
    sliderValue,
    sliderValueExperience,
    jobs,
  ]);

  return (
    <Container className="mt-5 container">
      <Group>
        <Title order={1} c={"green"}>
          Best jobs for you
        </Title>
        <Divider orientation="vertical" />
        <Text
          variant="gradient"
          gradient={{ from: "yellow", to: "orange", deg: 47 }}
          fw={700}
          fz={18}
        >
          Powered by Rice™️
        </Text>
      </Group>
      <br />
      <Grid>
        <Grid.Col span={2}>
          <Select
            label="Career"
            placeholder="Choose career"
            data={careerOptions}
            value={selectedCareer}
            onChange={handleCareerChange}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            label="Location"
            placeholder="Choose work location"
            data={location}
            value={selectLocation}
            onChange={handleLocationChange}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            label="Company"
            placeholder="Choose company"
            data={companyOptions}
            value={selectedCompany}
            onChange={handleCompanyChange}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Text size="sm" fw={500}>
            Experience
          </Text>
          <RangeSlider
            minRange={2}
            min={0}
            max={10}
            step={1}
            defaultValue={[0, 2]}
            label={(value) => `${value} yrs`}
            className="mt-3"
            onChange={handleSliderExperienceChange}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Text size="sm" fw={500}>
            Salary
          </Text>
          <RangeSlider
            minRange={500}
            min={1000}
            max={10000}
            step={100}
            defaultValue={[1000, 10000]}
            label={(value) => `${value}$`}
            className="mt-3"
            onChange={handleSliderChange}
          />
        </Grid.Col>
      </Grid>

      <Grid className="mt-5">
        {filterData?.map((item) => (
          <Grid.Col key={item.id} span={4}>
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              href={`http://localhost:6969/job/${item?.id}/details`}
              target="_blank"
              withBorder
              className="cursor-pointer h-[200px] max-h-[250px]"
            >
              <Group className="justify-between">
                <Avatar
                  src={findIndustry(item?.industryId)?.image}
                  alt="it's me"
                  size={"xl"}
                />
                <Stack className="basis-[70%]">
                  <Stack gap={0}>
                    <Title order={4}>{item?.title}</Title>
                    <Text c="dimmed" size="sm" className="truncate">
                      {findIndustry(item?.industryId)?.name}
                    </Text>
                  </Stack>
                  <Group gap={"xs"}>
                    <Badge
                      leftSection={<IconCoin size={14} />}
                    >{`${item?.salary}$`}</Badge>
                    <Badge leftSection={<IconMapPin size={14} />}>
                      {item?.location}
                    </Badge>
                    <Badge leftSection={<IconBriefcase size={14} />}>
                      {findCareer(item?.careerId)?.name}
                    </Badge>
                    <Badge leftSection={<IconHourglassLow size={14} />}>
                      {`${item?.experience} years`}
                    </Badge>
                  </Group>
                </Stack>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default ListJob;
