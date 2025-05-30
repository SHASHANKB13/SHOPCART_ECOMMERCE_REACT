import React, { useState, useEffect } from "react";
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
  Loader,
  Center,
  useMantineTheme,
  Indicator,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import {
  IconMinus,
  IconPlus,
  IconChevronDown,
  IconArrowLeft,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { HiShoppingCart } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

function ShoppingCartPage() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartDetails = async () => {
      const storedUserId = localStorage.getItem("userId");
      const loginStatus = localStorage.getItem("login_status");

      if (storedUserId && loginStatus === "true") {
        try {
          setLoading(true);
          const response = await fetch(
            `http://127.0.0.1:5000/api/cart/details/${storedUserId}`
          );
          const result = await response.json();
          const data = result?.data || {};
          setCartData(data); // ✅ Save full data: includes count & products
        } catch (err) {
          console.error("Error fetching cart details:", err);
          setError("Failed to load cart details. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCartDetails();
  }, []);

  const handleContinueClick = () => {
    navigate("/");
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  const fetchIntermediateCartDetails = async () => {
    const storedUserId = localStorage.getItem("userId");
    const loginStatus = localStorage.getItem("login_status");
    if (storedUserId && loginStatus === "true") {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/cart/details/${storedUserId}`
        );
        const result = await response.json();
        const data = result?.data || {};
        setCartData(data); // ✅ Save full data: includes count & products
      } catch (err) {
        console.error("Error fetching cart details:", err);
        setError("Failed to load cart details. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <MantineProvider>
        <Center style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <Loader size="xl" />
        </Center>
      </MantineProvider>
    );
  }

  if (error) {
    return (
      <MantineProvider>
        <Center style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <Text c="red.6" fz="xl">
            {error}
          </Text>
        </Center>
      </MantineProvider>
    );
  }

  if (!cartData || cartData.products?.length === 0) {
    return (
      <MantineProvider>
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
            <HiShoppingCart
              size={24}
              color="yellow"
              onClick={handleContinueClick}
              style={{ cursor: "pointer" }}
            />
            <Title order={4} c="white">
              Shop Cart
            </Title>
          </Group>
        </Flex>
        <Center style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
          <Text fz="xl" c="dimmed">
            Your shopping cart is empty.
          </Text>
        </Center>
      </MantineProvider>
    );
  }

  const { products, count } = cartData;

  const subtotal = products.reduce(
    (acc, item) => acc + parseFloat(item.quantity) * parseFloat(item.price),
    0
  );
  const shippingCost = 5.0;
  const totalCost = subtotal + shippingCost;

  const handleAddButton = async (productId: number) => {
    const userId = localStorage.getItem("userId"); // Adjust as needed
    const quantity = 1; // default quantity

    if (!userId) {
      console.error("User ID not found. Please log in.");
      notifications.show({
        title: "Error!",
        icon: <IconX size={16} />,
        autoClose: 3000,
        message: "Please log in to add products to your cart.",
        color: "red",
        position: "top-right",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: Number(userId),
          product_id: productId,
          quantity,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Product added to cart:", result);
        fetchIntermediateCartDetails();
        notifications.show({
          title: "Success!",
          message: result.message || "Product added to cart successfully.",
          icon: <IconCheck size={16} />,
          autoClose: 3000,
          color: "Green",
          position: "top-right",
        });
      } else {
        console.error("Error adding to cart:", result.error);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleRemoveButton = async (productId: number) => {
    const userId = localStorage.getItem("userId"); // Adjust as needed
    const quantity = 1; // default quantity

    if (!userId) {
      console.error("User ID not found. Please log in.");
      notifications.show({
        title: "Error!",
        icon: <IconX size={16} />,
        autoClose: 3000,
        message: "Please log in to add products to your cart.",
        color: "red",
        position: "top-right",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: Number(userId),
          product_id: productId,
          quantity,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Product removed from cart:", result);
        fetchIntermediateCartDetails();
        notifications.show({
          title: "Success!",
          message: result.message || "Product removed from cart successfully.",
          icon: <IconCheck size={16} />,
          autoClose: 3000,
          color: "Green",
          position: "top-right",
        });
      } else {
        console.error("Error removing from cart:", result.error);
      }
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  return (
    <MantineProvider
      theme={{
        fontFamily: "Roboto, sans-serif",
        colors: {
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
        size="100%"
        py="xl"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
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
            <HiShoppingCart
              size={24}
              color="yellow"
              onClick={handleContinueClick}
              style={{ cursor: "pointer" }}
            />
            <Title order={4} c="white">
              Shop Cart
            </Title>
          </Group>
        </Flex>
        <Paper
          shadow="md"
          radius="md"
          p="xl"
          mt={60}
          style={{ width: "100%", maxWidth: 1200, backgroundColor: "#ffffff" }}
        >
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Group justify="space-between" align="flex-end" mb="lg">
                <Title order={2} fw={600}>
                  Shopping Cart
                </Title>
                <Text fz="lg" fw={500}>
                  {count} Items
                </Text>
              </Group>

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

              <Stack gap="lg">
                {products?.map((item, index) => (
                  <React.Fragment key={item.product_id + "-" + index}>
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
                              {item.category}
                            </Text>
                            <Button
                              variant="transparent"
                              c="red"
                              fz="xs"
                              p={0}
                              h="auto"
                              style={{ alignSelf: "flex-start" }}
                              onClick={() =>
                                handleRemoveButton(item.product_id)
                              }
                              leftSection={<MdDelete size={16} />}
                            >
                              Remove
                            </Button>
                          </Stack>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Group gap={0}>
                          <ActionIcon variant="default" size="md" radius="xs">
                            <IconMinus
                              size={16}
                              onClick={() =>
                                handleRemoveButton(item.product_id)
                              }
                            />
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
                          <ActionIcon variant="default" size="md" radius="xs">
                            <IconPlus
                              size={16}
                              onClick={() => handleAddButton(item.product_id)}
                            />
                          </ActionIcon>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Text fz="md" fw={500}>
                          ₹ {parseFloat(item.price).toFixed(2)}
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={3}>
                        <Text fz="md" fw={500}>
                          ₹ {parseFloat(item.total_price).toFixed(2)}
                        </Text>
                      </Grid.Col>
                    </Grid>
                    {index !== products?.length - 1 && (
                      <Divider c="#e0e0e0" mt={-4} mb={-4} />
                    )}
                  </React.Fragment>
                ))}
              </Stack>

              <Button
                variant="transparent"
                // c="blue"
                c={theme.colors.deepBlue[5]}
                leftSection={<IconArrowLeft size={16} />}
                mt="xl"
                fw={500}
                onClick={handleContinueClick}
              >
                Continue Shopping
              </Button>
            </Grid.Col>

            {/* Order Summary */}
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
                      ITEMS {count}
                    </Text>
                    <Text fz="sm" fw={500}>
                      ₹ {subtotal.toFixed(2)}
                    </Text>
                  </Group>

                  <Group justify="space-between" align="center">
                    <Text fz="sm" fw={500} c="dimmed">
                      SHIPPING
                    </Text>
                    <Select
                      placeholder="Standard Delivery -     ₹ 5.00"
                      data={[
                        "Standard Delivery -     ₹ 5.00",
                        "Express Delivery -     ₹ 10.00",
                      ]}
                      rightSection={<IconChevronDown size={14} />}
                      defaultValue="Standard Delivery -     ₹ 5.00"
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
                        // bg="red.4"
                        color={theme.colors.deepBlue[4]}
                        radius="xs"
                        style={{
                          height: 36,
                          //   width: 80,
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
                      ₹ {totalCost.toFixed(2)}
                    </Text>
                  </Group>

                  <Button
                    fullWidth
                    size="lg"
                    mt="md"
                    radius="xs"
                    // bg="brand.6"
                    color={theme.colors.deepBlue[4]}
                    style={{ textTransform: "uppercase" }}
                    onClick={handleCheckoutClick}
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
