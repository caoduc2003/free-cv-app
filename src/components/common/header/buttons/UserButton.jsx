import { Avatar, Group, Menu, Text, UnstyledButton } from "@mantine/core";
import { IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useNavigate, useSubmit } from "react-router-dom";

const UserButton = ({ user }) => {

  const navigate = useNavigate();

  const submit = useSubmit();
  const handleLogout = () => {
    submit(null, {
      method: "post",
      action: "/logout",
    });
  };
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <Group className="p-2">
              <Avatar src={user?.avatar} />
              <Text className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</Text>
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item leftSection={<IconUserCircle size={14} />} onClick={() => navigate("/profile")}>
            Profile
          </Menu.Item>
          <Menu.Item
            leftSection={<IconLogout size={14} />}
            c={"red"}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default UserButton;
