import React, { useState } from "react";
import {
  AppShell,
  NavLink,
  Title,
  Flex,
  Group,
  useMantineTheme,
  Burger,
  Modal,
  Text,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { HiShoppingCart } from "react-icons/hi";
import { FaPowerOff } from "react-icons/fa";
import { IconCheck } from "@tabler/icons-react";

export default function DashboardLayout({ children, onNavigate }) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState("users");

  const links = [
    { label: "Users", value: "users" },
    { label: "Products", value: "products" },
    { label: "Settings", value: "settings" },
  ];
  const [
    logoutModalOpened,
    { open: logoutModalOpen, close: logoutModalClose },
  ] = useDisclosure(false);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.clear();
    console.log("User logged out successfully");
    navigate("/admin/login");
    logoutModalClose();
    notifications.show({
      title: "Logged out",
      message: "You have been logged out successfully.",
      icon: <IconCheck size={16} />,
      autoClose: 3000,
      color: "green",
      position: "top-right",
    });
  };

  return (
    <>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 200,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Flex
            h="100%"
            px="md"
            align="center"
            justify="space-between"
            bg={theme.colors.deepBlue[4]}
          >
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <HiShoppingCart size={24} color="yellow" />
              <Title order={4} c="white">
                Shop Cart
              </Title>
            </Group>
            <FaPowerOff
              size={24}
              color="white"
              style={{ cursor: "pointer" }}
              onClick={logoutModalOpen}
            />
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar p="xs" pt="md">
          {links.map((link) => (
            <NavLink
              key={link.value}
              label={link.label}
              color={theme.colors.deepBlue[4]}
              active={active === link.value}
              onClick={() => {
                setActive(link.value);
                onNavigate(link.value);
              }}
            />
          ))}
        </AppShell.Navbar>

        <AppShell.Main>
          {children || <Title order={3}>Welcome to Admin Dashboard</Title>}
        </AppShell.Main>
      </AppShell>
      <Modal
        opened={logoutModalOpened}
        onClose={logoutModalClose}
        title="Logout"
        centered
      >
        <Text>Are you sure you want to logout?</Text>
        <Group justify="flex-end" mt="md">
          <Button
            variant="light"
            color={theme.colors.deepBlue[4]}
            onClick={logoutModalClose}
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      </Modal>
    </>
  );
}
