import { Group, Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const GuestButton = () => {
  return (
    <>
      <Group>
        <Link to="/login">
          <Button variant="light" radius={"sm"}>
            Login
          </Button>
        </Link>
        <Button>Sign up</Button>
      </Group>
    </>
  );
};

export default GuestButton;
