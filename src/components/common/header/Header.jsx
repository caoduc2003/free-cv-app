import { Autocomplete, Group, Burger, rem, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import { Link, useLoaderData } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/user/userAction";

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const loaderData = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(loaderData?.id));
  }, [loaderData]);

  const user = useSelector((state) => state.user);

  return (
    <header className={classes.header}>
      <Group className="justify-between h-[rem(56px)]">
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <MantineLogo size={28} />
        </Group>
        <Autocomplete
          className="basis-1/3"
          placeholder="Search"
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

        <Group>
          <Link to="/login">
            <Button variant="light" radius={"sm"}>
              Login
            </Button>
          </Link>
          <Button>Sign up</Button>
        </Group>
      </Group>
    </header>
  );
}
