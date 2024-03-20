import {
  Avatar,
  Badge,
  Card,
  Divider,
  Grid,
  Group,
  RangeSlider,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axiosInstance from "../../../utils/axios-connect";
import {
  IconBriefcase,
  IconCoin,
  IconHourglassEmpty,
  IconHourglassFilled,
  IconHourglassLow,
  IconMapPin,
} from "@tabler/icons-react";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/user/userAction";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const ListSuggestJob = () => {
  const loaderData = useLoaderData();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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
    console.log(user.user.id);
    const data = jobs?.filter((job) => Number(job.careerId) === Number(user.user.careerId)); 
    setFilterData(data);
  };

  const findJob = () => {
    return jobs?.filter((job) => Number(job?.careerId) === Number(user.user.careerId));;
  };
  const findIndustry = (id) => {
    return industries?.find((industry) => Number(industry.id) === Number(id));
  };

  const findCareer = (id) => {
    return careers?.find((industry) => Number(industry.id) === Number(id));
  };

  return (
    <div className="py-5">
      <Title order={1} c={"green"}>
        Suggest jobs for you
      </Title>
      <br />
      <Swiper
        className="mt-5"
        spaceBetween={50}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {findJob()?.map((item) => (
          <SwiperSlide key={item.id}>
            <Card
              shadow="sm"
              padding="xl"
              component="a"
              href={`http://localhost:6969/job/${item?.id}/details`}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ListSuggestJob;
