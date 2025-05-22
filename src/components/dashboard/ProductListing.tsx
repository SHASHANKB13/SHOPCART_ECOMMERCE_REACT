import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Grid,
  Group,
  Title,
  Container,
  Badge,
  Select,
  RangeSlider,
  Stack,
  Checkbox,
  Divider,
  useMantineTheme,
  Flex,
  TextInput,
  Indicator,
  Popover,
  Modal,
  PasswordInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { HiShoppingCart } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import { IconX, IconCheck } from "@tabler/icons-react";
import { BsSearch } from "react-icons/bs";
import { productData } from "../../data.tsx";
import classes from "./Card.module.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  rating: number | null;
  reviewsCount: number;
  brand: string;
};

const ProductList = () => {
  const [data, setData] = useState<Product[]>(productData);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [ratings, setRatings] = useState(["4"]);
  const [jsonData, setJsonData] = useState<{
    category: string;
    brand: string;
    products: Product[];
  }>({ category: "", brand: "", products: [] });
  const [searchValue, setSearchValue] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartButtonState, setCartButtonState] = useState<{
    [key: string]: string;
  }>({});
  const theme = useMantineTheme();
  const [opened, { close, open }] = useDisclosure(false);
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    if (!category) {
      setJsonData({ ...jsonData, category: "", products: productData });
      setData(productData);
      return;
    }
    const filteredProducts = productData.filter(
      (product) => product.category === category
    );
    setJsonData({ category, products: filteredProducts });
    setData(filteredProducts);
  };

  // Handle brand selection
  const handleBrandChange = (brand: string | null) => {
    if (!brand) {
      setJsonData({ ...jsonData, brand: "", products: productData });
      setData(productData);
      return;
    }

    const filteredProducts = productData.filter(
      (product) => product.brand === brand
    );

    setJsonData({ ...jsonData, brand, products: filteredProducts });
    setData(filteredProducts);
  };

  useEffect(() => {
    // Ensure jsonData updates when a category is selected
    if (jsonData.category) {
      setData(jsonData.products);
    }
  }, [jsonData]);

  const onSearchChange = (value: string) => {
    setSearchValue(value);
    const searchTerm = value.trim().toLowerCase();

    if (!searchTerm) {
      setData(productData);
    } else {
      const filteredData = productData.filter((d) =>
        d.name.toLowerCase().includes(searchTerm)
      );
      setData(filteredData);
    }
  };

  // Function to handle adding a product to the cart
  const handleAddCartButton = (productId: number) => {
    setCartCount((prevCount) => prevCount + 1);

    // Update state for the specific product
    setCartButtonState((prevState) => ({
      ...prevState,
      [productId]: "Added ☑️", // ✅ Updates only the clicked product's button
    }));
  };

  const [loginModalOpened, { open: loginModalOpen, close: loginModalClose }] =
    useDisclosure(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const message = data.message;
        setUser(data?.data?.username);
        console.log("Login successful:", data);
        notifications.show({
          title: "Success!",
          message: message || "Login successful",
          icon: <IconCheck size={16} />,
          autoClose: 3000,
          color: "Green",
          position: "top-right",
        });

        loginModalClose();
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
    <Container size="xl" mt="sm">
      {/* Header Section */}

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

        {/* Search Bar */}

        <Select
          placeholder="Search for Products, Brand and More"
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          searchable
          dropdownOpened={false}
          rightSectionPointerEvents="none"
          rightSection={<BsSearch size={20} />}
          style={{ width: "40%" }}
        />

        {/* Right Section */}

        <Group justify="space-between" gap="md" align="center" mr="lg">
          {user ? (
            <Flex align="center" gap="xs">
              <Text c="white" size="sm">
                Welcome, {user}
              </Text>
              <BsPersonCircle size={20} color="white" />
            </Flex>
          ) : (
            <>
              <Popover
                width={200}
                position="bottom"
                withArrow
                shadow="md"
                opened={opened}
              >
                <Popover.Target>
                  <BsPersonCircle
                    onMouseEnter={open}
                    onMouseLeave={close}
                    size={24}
                    color="white"
                    onClick={loginModalOpen}
                    style={{ cursor: "pointer" }}
                  />
                </Popover.Target>
                <Popover.Dropdown style={{ pointerEvents: "none" }}>
                  <Text size="sm">Please login/register to continue</Text>
                </Popover.Dropdown>
              </Popover>
            </>
          )}
          {/* <BsPersonCircle size={24} color="white" /> */}

          <Indicator inline label={cartCount} size={16} color="red">
            <HiShoppingCart size={24} color="white" />
          </Indicator>
        </Group>
      </Flex>

      <Grid mt="80px">
        {/* Sidebar Filters */}
        <Grid.Col span={3}>
          <Stack gap="md">
            <Title order={5}>Filters</Title>

            {/* Price Range Filter */}
            <Text>Price</Text>
            <RangeSlider
              min={0}
              max={30000}
              step={1000}
              value={priceRange}
              color={theme.colors.deepBlue[4]}
              onChange={setPriceRange}
              marks={[
                { value: 0, label: "Min" },
                { value: 30000, label: "Max" },
              ]}
            />

            {/* Brand Filter */}
            <Select
              label="Brand"
              value={jsonData.brand}
              onChange={(value) => handleBrandChange(value)}
              data={[
                { value: "", label: "All" },
                { value: "Apple", label: "Apple" },
                { value: "Samsung", label: "Samsung" },
                { value: "Oneplus", label: "Oneplus" },
              ]}
            />

            {/* Category Selector */}

            <Select
              label="Select Category"
              data={[
                { value: "", label: "All" },
                { value: "MOBILE", label: "Mobiles" },
                { value: "CLOTHING", label: "Clothes" },
                { value: "GROCERIES", label: "Groceries" },
              ]}
              value={jsonData.category}
              onChange={(value) => handleCategoryChange(value!)}
            />

            {/* Ratings Filter */}
            <Text>Customer Ratings</Text>
            <Checkbox.Group value={ratings} onChange={setRatings}>
              <Stack gap={10}>
                <Checkbox
                  color={theme.colors.deepBlue[4]}
                  value="4"
                  label="4★ & above"
                />
                <Checkbox
                  color={theme.colors.deepBlue[4]}
                  value="3"
                  label="3★ & above"
                />
              </Stack>
            </Checkbox.Group>

            <Divider my="sm" />
          </Stack>
        </Grid.Col>

        {/* Product Grid */}
        <Grid.Col span={9}>
          <Grid gutter="lg">
            {data.length > 0 ? (
              data.map((product, index) => (
                <Grid.Col key={index} span={4}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className={classes.customCard}
                    // style={{ border: "1px solid #E6E5E5" }}
                    style={{
                      border: "1px solid #E6E5E5",
                      width: "300px", // ✅ Fixed width
                      height: "400px", // ✅ Fixed height
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", // Ensures content is evenly spaced
                      cursor: "pointer",
                    }}
                  >
                    <Card.Section>
                      <Image
                        src={product.image}
                        alt={product.name}
                        height={160}
                        fit="contain"
                      />
                    </Card.Section>

                    <Group justify="apart" mt="md" mb="xs">
                      <Title order={5}>{product.name}</Title>
                      <Text fw={700} c={theme.colors.deepBlue[4]}>
                        ₹ {product.price.toLocaleString()}
                      </Text>
                    </Group>

                    <Text
                      size="sm"
                      c="dimmed"
                      style={{
                        marginTop: theme.spacing.md,
                        lineHeight: "1.5",
                        wordBreak: "break-word",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textTransform: "uppercase",
                      }}
                    >
                      {product.description || "No description available"}
                    </Text>

                    <Group gap="xs" mt="sm">
                      <Badge color="green">
                        {product.rating ? `${product.rating}★` : "No Rating"}
                      </Badge>
                      <Text size="xs" c="dimmed">
                        ({product.reviewsCount} Reviews)
                      </Text>
                    </Group>

                    <Button
                      fullWidth
                      mt="md"
                      radius="md"
                      color={theme.colors.deepBlue[4]}
                      onClick={() => handleAddCartButton(product.id)}
                    >
                      {cartButtonState[product.id] || "Add to Cart"}
                    </Button>
                  </Card>
                </Grid.Col>
              ))
            ) : (
              <Text>No products available in this category</Text>
            )}
          </Grid>
        </Grid.Col>
      </Grid>
      <>
        <Modal
          opened={loginModalOpened}
          onClose={loginModalClose}
          title="Login"
          centered
        >
          <Stack>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            <Group justify="flex-end" mt="md">
              <Button
                variant="light"
                onClick={loginModalClose}
                color={theme.colors.deepBlue[4]}
              >
                Cancel
              </Button>
              <Button onClick={handleLogin} color={theme.colors.deepBlue[4]}>
                Login
              </Button>
            </Group>
          </Stack>
        </Modal>
      </>
    </Container>
  );
};

export default ProductList;
