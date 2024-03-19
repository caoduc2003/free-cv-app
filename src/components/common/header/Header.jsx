import {
  Autocomplete,
  Group,
  Burger,
  rem,
  Text,
  ActionIcon,
  Title,
  Badge,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowRight,
  IconBuilding,
  IconChevronRight,
  IconCoins,
  IconFileInfo,
  IconMap2,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./Header.module.css";
import {
  Form,
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../redux/user/userAction";
import GuestButton from "./buttons/GuestButton";
import UserButton from "./buttons/UserButton";
import { isNotEmpty, useForm } from "@mantine/form";
import axiosInstance from "../../../utils/axios-connect";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const autocompleteData = useRef(null);
  const loaderData = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      keyword: "",
    },
    validate: {
      keyword: isNotEmpty(),
    },
  });

  const fetchAutocompleteData = async () => {
    try {
      const res1 = (await axiosInstance.get("/jobs")).data;
      const res2 = (await axiosInstance.get("/industries")).data;
      const addedIndustryName = res1.map((j) => {
        const industry = res2.find((i) => i.id === j.industryId);
        return { ...j, industryName: industry.name };
      });

      autocompleteData.current = addedIndustryName;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getUser(loaderData?.id));
    fetchAutocompleteData();
  }, [dispatch, loaderData]);

  const getJobByTitle = (title) => {
    return autocompleteData?.current?.find((j) => j.title === title);
  };
  const renderSearchResult = ({ option }) => {
    const job = getJobByTitle(option.value);
    return (
      <>
        <Link to={`/job/${job?.id}/details`} className="w-full">
          <Group className="justify-between">
            <Stack gap={"xs"}>
              <Title order={5}>{option.value}</Title>
              <Group gap={"xs"}>
                <Badge
                  variant="light"
                  color="orange"
                  size="sm"
                  leftSection={<IconBuilding size={10} />}
                >
                  {job?.industryName}
                </Badge>
                <Badge
                  variant="light"
                  color="blue"
                  size="sm"
                  leftSection={<IconMap2 size={10} />}
                >
                  {job?.location}
                </Badge>
                <Badge
                  leftSection={<IconCoins size={10} />}
                  color="green"
                  variant="light"
                  size="sm"
                >
                  {`${job?.salary}$`}
                </Badge>
              </Group>
            </Stack>
            <IconChevronRight size={30} stroke={1.5} />
          </Group>
        </Link>
      </>
    );
  };
  const handleSubmit = (values) => {
    navigate(`/search?keyword=${values.keyword}`);
  };
  return (
    <header className={classes.header}>
      <Group className="justify-between h-[rem(56px)]">
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Link to={"/"} className="cursor-pointer">
            <Group>
              <IconFileInfo size={28} />
              <Text fw={800} className="text-2xl">
                FreeCV
              </Text>
            </Group>
          </Link>
        </Group>
        <Form
          className="basis-1/2"
          onSubmit={form.onSubmit((val) => handleSubmit(val))}
        >
          <Autocomplete
            placeholder="Search for a job..."
            renderOption={renderSearchResult}
            leftSection={
              <IconSearch
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            }
            rightSection={
              <ActionIcon size={32} radius="xl" variant="filled" type="submit">
                <IconArrowRight
                  style={{ width: rem(18), height: rem(18) }}
                  stroke={1.5}
                />
              </ActionIcon>
            }
            data={autocompleteData.current?.map((j) => j.title)}
            visibleFrom="xs"
            radius={"xl"}
            rightSectionWidth={42}
            size="md"
            {...form.getInputProps("keyword")}
          />
        </Form>
        {loaderData ? <UserButton user={loaderData} /> : <GuestButton />}
      </Group>
    </header>
  );
}
