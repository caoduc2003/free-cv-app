import { Autocomplete, Group, Burger, rem, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import React from "react";

// const links = [
//   { link: "/about", label: "Features" },
//   { link: "/pricing", label: "Pricing" },
//   { link: "/learn", label: "Learn" },
//   { link: "/community", label: "Community" },
// ];

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  // const items = links.map((link) => (
  //   <a
  //     key={link.label}
  //     href={link.link}
  //     className={classes.link}
  //     onClick={(event) => event.preventDefault()}
  //   >
  //     {link.label}
  //   </a>
  // ));

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
