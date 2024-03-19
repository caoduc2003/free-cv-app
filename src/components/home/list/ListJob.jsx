import {
  Avatar,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { RangeSlider } from "@mantine/core";
import axiosInstance from "../../../utils/axios-connect";

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
    return industries?.find((industry) => industry.id === id);
  };

  const findCareer = (id) => {
    return careers?.find((industry) => industry.id === id);
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
    console.log(filteredData);
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
  ]);

  return (
    <Container className="p-4">
      <div>
        <h1 className="text-green-600 font-bold">Best Job</h1>
      </div>
      <div>
        <Grid>
          <Grid.Col span={2}>
            <Select
              label="Career"
              placeholder="Choose Carrer"
              data={careerOptions}
              value={selectedCareer}
              onChange={handleCareerChange}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Select
              label="Location"
              placeholder="Choose Location"
              data={location}
              value={selectLocation}
              onChange={handleLocationChange}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Select
              label="Company"
              placeholder="Choose Company"
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
              minRange={0}
              min={0}
              max={10}
              step={1}
              defaultValue={[0, 2]}
              className="mt-3"
              onChange={handleSliderExperienceChange}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <Text size="sm" fw={500}>
              Salary
            </Text>
            <RangeSlider
              minRange={0}
              min={1000}
              max={10000}
              step={100}
              defaultValue={[1000, 1500]}
              className="mt-3"
              onChange={handleSliderChange}
            />
          </Grid.Col>
        </Grid>
      </div>

      <div>
        <Grid>
          {filterData?.map((item) => (
            <Grid.Col key={item.id} span={4}>
              <Card
                shadow="sm"
                padding="xl"
                component="a"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
              >
                <Group className="justify-between">
                  <Avatar
                    src={findIndustry(item?.industryId).image}
                    alt="it's me"
                  />
                  <div className="basis-[70%]">
                    <Text fw={500} size="xs">
                      {item?.title}
                    </Text>
                    <Text mt="xs" c="dimmed" size="xs">
                      {findIndustry(item?.industryId).name}
                    </Text>
                    <Group gap={"xs"} className="pt-2">
                      <Text
                        size="xs"
                        className="py-1 px-1 bg-slate-300 border rounded-3"
                      >
                        $ {item?.salary}
                      </Text>
                      <Text
                        size="xs"
                        className="py-1 px-1 bg-slate-300 border rounded-3"
                      >
                        {item?.location}
                      </Text>
                      <Text
                        size="xs"
                        className="py-1 px-1 bg-slate-300 border rounded-3"
                      >
                        {findCareer(item?.careerId).name}
                      </Text>
                      <Text
                        size="xs"
                        className="py-1 px-1 bg-slate-300 border rounded-3"
                      >
                        {item?.experience} years
                      </Text>
                    </Group>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default ListJob;
