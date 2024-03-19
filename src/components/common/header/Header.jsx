import { Autocomplete, Group, Burger, rem, Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFileInfo, IconSearch } from "@tabler/icons-react";
import classes from "./Header.module.css";
import { Link, useLoaderData } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/user/userAction";
import GuestButton from "./buttons/GuestButton";
import UserButton from "./buttons/UserButton";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const loaderData = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(loaderData?.id));
  }, [dispatch, loaderData]);

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
        <Autocomplete
          className="basis-1/3"
          placeholder="Search for a job..."
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          data={[
            "React",
            "Angular",
            "Vue",
            "Next.js",
            "Riot.js",
            "Svelte",
            "Blitz.js",
          ]}
          visibleFrom="xs"
        />
        {loaderData ? <UserButton user={loaderData} /> : <GuestButton />}
      </Group>
    </header>
  );
}
