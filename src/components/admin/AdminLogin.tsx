import React from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Text,
  Anchor,
  Stack,
  useMantineTheme,
  Flex,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { HiShoppingCart } from "react-icons/hi";
import { IconCheck, IconX } from "@tabler/icons-react";

export default function LoginPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const handleSubmit = async (values) => {
    if (values.username !== "admin1@mailinator.com") {
      notifications.show({
        title: "Access denied!",
        icon: <IconX size={16} />,
        autoClose: 3000,
        message: "You are not an admin",
        color: "red",
        position: "top-right",
      });
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        const message = data.message;
        localStorage.setItem("username", data?.data?.username || "");
        localStorage.setItem("userId", data?.data?.user_id || "");
        localStorage.setItem("login_status", "true");
        localStorage.setItem("isAdmin", "true");
        console.log("Login successful:", data);
        navigate("/admin/dashboard");
        notifications.show({
          title: "Success!",
          message: message || "Login successful as admin",
          icon: <IconCheck size={16} />,
          autoClose: 3000,
          color: "Green",
          position: "top-right",
        });

        // Redirect to the admin dashboard or another page
      } else {
        console.error("Login failed:", data.error || "Unknown error");
        notifications.show({
          title: "Error!",
          icon: <IconX size={16} />,
          autoClose: 3000,
          message: data.error || "Login failed",
          color: "red",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Container size={420} my={40}>
      <Flex
        h={60}
        bg={theme.colors.deepBlue[4]}
        mb="md"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          zIndex: 1000,
          top: 0, // ✅ Sticks it to the top
          left: 0,
          width: "100%",
        }}
      >
        {/* Left Section */}
        <Group ml="xl">
          <HiShoppingCart size={24} color="yellow" />
          <Title order={4} c="white">
            Shop Cart
          </Title>
        </Group>
      </Flex>
      <Title align="center" mb="md" mt={80}>
        Welcome Admin
      </Title>
      <Text c="dimmed" size="sm" align="center" mb="xl">
        You are not admin?{" "}
        <Anchor href="/" size="sm" c={theme.colors.deepBlue[4]}>
          click here
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              {...form.getInputProps("username")}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              required
            />
          </Stack>

          <Button
            fullWidth
            mt="xl"
            type="submit"
            color={theme.colors.deepBlue[4]}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
