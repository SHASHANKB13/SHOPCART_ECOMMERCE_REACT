import React, { useEffect, useState } from "react";
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
  Modal,
  PasswordInput,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { HiShoppingCart } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import { IconX, IconCheck, IconSettings, IconTrash } from "@tabler/icons-react";
import { BsSearch } from "react-icons/bs";
// import { productData } from "../../data.tsx";
import classes from "./Card.module.css";
import { IoIosLogOut } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { TbCoinRupee } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { SlLogin } from "react-icons/sl";

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
  const navigate = useNavigate();
  // states
  const [data, setData] = useState<Product[]>([]);
  const [productData, setProductData] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [ratings, setRatings] = useState(["4"]);
  const [searchValue, setSearchValue] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartButtonState, setCartButtonState] = useState<{
    [key: string]: string;
  }>({});
  const [jsonData, setJsonData] = useState<{
    category: string;
    brand: string;
    products: Product[];
  }>({
    category: "",
    brand: "",
    products: [],
  });
  const theme = useMantineTheme();
  const [opened, { close, open }] = useDisclosure(false);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/products");
        const result = await response.json();
        const products = result?.data?.products || [];
        setData(products);
        setProductData(products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // handle filters
  const handleCategoryChange = (category: string) => {
    const filtered = productData.filter(
      (p) => !category || p.category === category
    );
    setJsonData({ ...jsonData, category, products: filtered });
    setData(filtered);
  };

  const handleBrandChange = (brand: string | null) => {
    const filtered = productData.filter((p) => !brand || p.brand === brand);
    setJsonData({ ...jsonData, brand: brand || "", products: filtered });
    setData(filtered);
  };

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

  const [
    logoutModalOpened,
    { open: logoutModalOpen, close: logoutModalClose },
  ] = useDisclosure(false);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.clear();
    console.log("User logged out successfully");
    setUser("");
    setLoginStatus(false);
    setCartCount(0);
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

  const [loginModalOpened, { open: loginModalOpen, close: loginModalClose }] =
    useDisclosure(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const loginStatus = localStorage.getItem("login_status");

    if (storedUsername && storedUserId && loginStatus === "true") {
      setUser(storedUsername);
      setLoginStatus(true);
      console.log("User is logged in:", storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      const storedUserId = localStorage.getItem("userId");
      const loginStatus = localStorage.getItem("login_status");

      if (storedUserId && loginStatus === "true") {
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/api/cart/details/${storedUserId}`
          );
          const result = await response.json();

          if (response.ok) {
            setCartCount(result.data.count);
          } else {
            console.error("Failed to fetch cart count:", result.message);
          }
        } catch (error) {
          console.error("Error fetching cart count:", error);
        }
      }
    };

    fetchCartCount();
  }, []);

  const handleAddCartButton = async (productId: number) => {
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
        notifications.show({
          title: "Success!",
          message: result.message || "Product added to cart successfully.",
          icon: <IconCheck size={16} />,
          autoClose: 3000,
          color: "Green",
          position: "top-right",
        });

        // Update cart count
        setCartCount((prevCount) => prevCount + 1);

        // Update button state
        setCartButtonState((prevState) => ({
          ...prevState,
          [productId]: "added",
        }));
      } else {
        console.error("Error adding to cart:", result.error);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

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
        localStorage.setItem("username", data?.data?.username || "");
        localStorage.setItem("userId", data?.data?.user_id || "");
        localStorage.setItem("login_status", "true");
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

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };
  const handleCartClick = () => {
    if (!loginStatus) {
      notifications.show({
        title: "Error!",
        icon: <IconX size={16} />,
        autoClose: 3000,
        message: "Please log in to view your cart.",
        color: "red",
        position: "top-right",
      });
      return;
    }
    // Navigate to cart page
    navigate("/cart");
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

              <Menu
                shadow="md"
                width={200}
                trigger="hover"
                openDelay={100}
                closeDelay={400}
              >
                <Menu.Target>
                  <BsPersonCircle size={24} color="white" />
                </Menu.Target>

                <Menu.Dropdown mt={15}>
                  <Menu.Label>Application</Menu.Label>

                  <Menu.Item leftSection={<FaBoxOpen size={14} />}>
                    Orders
                  </Menu.Item>
                  <Menu.Item leftSection={<TbCoinRupee size={14} />}>
                    Rewards
                  </Menu.Item>
                  <Menu.Item leftSection={<BiSupport size={14} />}>
                    Customer care
                  </Menu.Item>
                  <Menu.Item leftSection={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Divider />

                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item leftSection={<BsPersonCircle size={14} />}>
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={<IoIosLogOut size={14} />}
                    onClick={logoutModalOpen}
                  >
                    Logout
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                    Delete my account
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          ) : (
            <>
              <Menu
                shadow="md"
                width={200}
                trigger="hover"
                openDelay={100}
                closeDelay={400}
              >
                <Menu.Target>
                  <BsPersonCircle size={24} color="white" />
                </Menu.Target>

                <Menu.Dropdown mt={15}>
                  <Menu.Item
                    leftSection={<SlLogin size={14} />}
                    onClick={loginModalOpen}
                  >
                    Login
                  </Menu.Item>
                  <Menu.Item leftSection={<BsPersonCircle size={14} />}>
                    Register/Sign Up
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}
          {/* <BsPersonCircle size={24} color="white" /> */}

          <Indicator inline label={cartCount} size={16} color="red">
            <HiShoppingCart
              size={24}
              color="white"
              onClick={handleCartClick}
              style={{ cursor: "pointer" }}
            />
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
                    // onClick={() => handleProductClick(product.id)}
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
                        onClick={() => handleProductClick(product.id)}
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
                      leftSection={
                        cartButtonState[product.id] === "added" ? (
                          <IconCheck size={18} color="white" />
                        ) : null
                      }
                      onClick={() => handleAddCartButton(product.id)}
                    >
                      {cartButtonState[product.id] === "added"
                        ? "Added"
                        : "Add to Cart"}
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
    </Container>
  );
};

export default ProductList;
