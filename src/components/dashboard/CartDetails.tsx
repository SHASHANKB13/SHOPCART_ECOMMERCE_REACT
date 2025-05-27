import React from "react";
import {
  MantineProvider,
  Container,
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Image,
  ActionIcon,
  Button,
  Divider,
  TextInput,
  Select,
  Stack,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconMinus,
  IconPlus,
  IconChevronDown,
  IconArrowLeft,
} from "@tabler/icons-react";

function ShoppingCartPage() {
  const navigate = useNavigate();
  const handleContinueClick = () => {
    navigate("/");
  };
  // Dummy data for cart items
  const cartItems = [
    {
      id: 1,
      name: "Fifa 19",
      platform: "PS4",
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.images/mantine-logo.svg", // Replace with actual image path
      quantity: 2,
      price: 44.0,
    },
    {
      id: 2,
      name: "Glacier White 500GB",
      platform: "PS4",
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.images/mantine-logo.svg", // Replace with actual image path
      quantity: 1,
      price: 249.99,
    },
    {
      id: 3,
      name: "Platinum Headset",
      platform: "PS4",
      image:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.images/mantine-logo.svg", // Replace with actual image path
      quantity: 1,
      price: 119.99,
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCost = 5.0; // Standard Delivery
  const totalCost = subtotal + shippingCost;

  return (
    <MantineProvider
      theme={{
        fontFamily: "Roboto, sans-serif",
        colors: {
          // Custom purple from the screenshot
          brand: [
            "#e9edfc",
            "#d2dcfc",
            "#a8b8fa",
            "#7e93f9",
            "#546df7",
            "#2a48f6",
            "#1f36b6",
            "#152477",
            "#0b1238",
            "#010000",
          ],
        },
        primaryColor: "brand",
      }}
    >
      <Container
        size="xl"
        py="xl"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5", // Light grey background
        }}
      >
        <Paper
          shadow="md"
          radius="md"
          p="xl"
          style={{ width: "100%", maxWidth: 1200, backgroundColor: "#ffffff" }}
        >
          <Grid gutter="xl">
            {/* Shopping Cart Section */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Group justify="space-between" align="flex-end" mb="lg">
                <Title order={2} fw={600}>
                  Shopping Cart
                </Title>
                <Text fz="lg" fw={500}>
                  {cartItems.length} Items
                </Text>
              </Group>

              {/* Table Headers */}
              <Grid
                mb="md"
                style={{ borderBottom: "1px solid #e0e0e0", paddingBottom: 8 }}
                align="center"
              >
                <Grid.Col span={5}>
                  <Text fz="sm" c="dimmed" fw={500}>
                    PRODUCT DETAILS
                  </Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Text fz="sm" c="dimmed" fw={500}>
                    QUANTITY
                  </Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Text fz="sm" c="dimmed" fw={500}>
                    PRICE
                  </Text>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Text fz="sm" c="dimmed" fw={500}>
                    TOTAL
                  </Text>
                </Grid.Col>
              </Grid>

              {/* Cart Items */}
              <Stack gap="lg">
                {cartItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <Grid align="center">
                      <Grid.Col span={5}>
                        <Group gap="md" wrap="nowrap">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fit="contain"
                            w={80}
                            h={80}
                            style={{
                              border: "1px solid #e0e0e0",
                              borderRadius: 4,
                            }}
                          />
                          <Stack gap={2}>
                            <Text fz="md" fw={500}>
                              {item.name}
                            </Text>
                            <Text fz="sm" c="dimmed">
                              {item.platform}
                            </Text>
                            <Button
                              variant="transparent"
                              c="blue"
                              fz="xs"
                              p={0}
                              h="auto"
                              style={{ alignSelf: "flex-start" }}
                            >
                              Remove
                            </Button>
                          </Stack>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Group gap={0}>
                          <ActionIcon
                            variant="default"
                            size="md"
                            radius="xs"
                            aria-label="Decrement quantity"
                          >
                            <IconMinus size={16} />
                          </ActionIcon>
                          <TextInput
                            value={item.quantity}
                            readOnly
                            size="md"
                            w={40}
                            styles={{
                              input: {
                                textAlign: "center",
                                borderLeft: 0,
                                borderRight: 0,
                                borderRadius: 0,
                              },
                            }}
                          />
                          <ActionIcon
                            variant="default"
                            size="md"
                            radius="xs"
                            aria-label="Increment quantity"
                          >
                            <IconPlus size={16} />
                          </ActionIcon>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Text fz="md" fw={500}>
                          £{item.price.toFixed(2)}
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Text fz="md" fw={500}>
                          £{(item.quantity * item.price).toFixed(2)}
                        </Text>
                      </Grid.Col>
                    </Grid>
                    {item.id !== cartItems.length && (
                      <Divider c="#e0e0e0" mt={-4} mb={-4} />
                    )}
                  </React.Fragment>
                ))}
              </Stack>

              <Button
                variant="transparent"
                c="blue"
                leftSection={<IconArrowLeft size={16} />}
                mt="xl"
                fw={500}
                onClick={handleContinueClick}
              >
                Continue Shopping
              </Button>
            </Grid.Col>

            {/* Order Summary Section */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper
                shadow="xs"
                radius="md"
                p="lg"
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Title order={3} mb="lg" fw={600}>
                  Order Summary
                </Title>

                <Stack gap="md">
                  <Group justify="space-between">
                    <Text fz="sm" fw={500} c="dimmed">
                      ITEMS {cartItems.length}
                    </Text>
                    <Text fz="sm" fw={500}>
                      £{subtotal.toFixed(2)}
                    </Text>
                  </Group>

                  <Group justify="space-between" align="center">
                    <Text fz="sm" fw={500} c="dimmed">
                      SHIPPING
                    </Text>
                    <Select
                      placeholder="Standard Delivery - £5.00"
                      data={[
                        "Standard Delivery - £5.00",
                        "Express Delivery - £10.00",
                      ]}
                      rightSection={<IconChevronDown size={14} />}
                      styles={{
                        input: {
                          width: 200,
                          textAlign: "right",
                          border: "none",
                          backgroundColor: "transparent",
                          paddingRight: 0,
                        },
                        wrapper: {
                          flexGrow: 1,
                          display: "flex",
                          justifyContent: "flex-end",
                        },
                        section: { pointerEvents: "none" },
                      }}
                      defaultValue="Standard Delivery - £5.00"
                    />
                  </Group>

                  <Stack gap="sm" mt="md">
                    <Text fz="sm" fw={500} c="dimmed">
                      PROMO CODE
                    </Text>
                    <Group gap="xs" wrap="nowrap">
                      <TextInput
                        placeholder="Enter your code"
                        radius="xs"
                        flex={1}
                        styles={{ input: { height: 36 } }}
                      />
                      <Button
                        bg="red.4"
                        radius="xs"
                        style={{
                          height: 36,
                          width: 80,
                          textTransform: "uppercase",
                        }}
                      >
                        Apply
                      </Button>
                    </Group>
                  </Stack>

                  <Divider mt="md" mb="md" />

                  <Group justify="space-between">
                    <Text fz="lg" fw={600}>
                      TOTAL COST
                    </Text>
                    <Text fz="lg" fw={600}>
                      £{totalCost.toFixed(2)}
                    </Text>
                  </Group>

                  <Button
                    fullWidth
                    size="lg"
                    mt="md"
                    radius="xs"
                    bg="brand.6" // Using custom purple
                    style={{ textTransform: "uppercase" }}
                  >
                    Checkout
                  </Button>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </MantineProvider>
  );
}

export default ShoppingCartPage;
