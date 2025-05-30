import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";

export default function RegisterModal({ opened, onClose }) {
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      fullname: "",
      password: "",
    },
    validate: {
      username: (value) => (!value ? "Username is required" : null),
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      fullname: (value) => (!value ? "Full name is required" : null),
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)
          ? null
          : "Password must include upper, lower, digit, special char & be 8+ chars",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        const message = data.message;
        setUser(data?.data?.username);
        localStorage.setItem("username", data?.data?.username || "");
        localStorage.setItem("userId", data?.data?.user_id || "");
        localStorage.setItem("login_status", "true");
        console.log("Registration successful:", data);
        notifications.show({
          title: "Success!",
          message: message || "Registration successful",
          icon: <IconCheck size={16} />,
          autoClose: 3000,
          color: "Green",
          position: "top-right",
        });

        form.reset();
        setTimeout(() => onClose(), 1000); // Auto-close after success
      } else {
        console.error("Registration failed:", data.error || "Unknown error");
        notifications.show({
          title: "Error!",
          icon: <IconX size={16} />,
          autoClose: 3000,
          message: data.error || "Registration failed",
          color: "red",
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error in Registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Register"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Username"
          placeholder="Your username"
          withAsterisk
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          mt="md"
          withAsterisk
          {...form.getInputProps("email")}
        />
        <TextInput
          label="Full Name"
          placeholder="John Doe"
          mt="md"
          withAsterisk
          {...form.getInputProps("fullname")}
        />
        <PasswordInput
          label="Password"
          placeholder="Strong password"
          mt="md"
          withAsterisk
          {...form.getInputProps("password")}
        />

        {message && (
          <Text
            mt="md"
            c={message.type === "error" ? "red" : "green"}
            size="sm"
          >
            {message.text}
          </Text>
        )}

        <Group justify="flex-end" mt="xl">
          <Button type="submit" loading={loading} color={theme.colors.blue[4]}>
            Register
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
