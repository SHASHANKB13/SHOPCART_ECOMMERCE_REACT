import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Group,
  Text,
  Badge,
  Image,
  Title,
  Box,
  Stack,
  Radio,
  Flex,
  Container,
  Paper,
  useMantineTheme,
  Popover,
  Indicator,
  Anchor,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconShoppingCart,
  IconBolt,
  IconShieldCheck,
} from "@tabler/icons-react";
import { HiShoppingCart } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";
import { FaTag } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  exchangeOffer: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  rating: number;
  ratingsCount: number;
  reviews: number;
  brand: string;
}

const ProductDetail = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const offers = [
    {
      type: "Bank Offer",
      text: "5% Unlimited Cashback on HDFC Bank Credit Cards T&C",
    },
    {
      type: "Bank Offer",
      text: "₹2500 Off On RBL Bank Credit Cards Non EMI Transactions. T&C",
    },
    {
      type: "Bank Offer",
      text: "₹4000 Off On All Banks Credit Card Transactions. T&C",
    },
    {
      type: "Special Price",
      text: "Get extra ₹5000 off (price inclusive of cashback/coupon) T&C",
    },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/product/details/${id}`
        );
        const result = await response.json();
        const raw = result.data;

        const mockProduct: Product = {
          id: raw.id,
          name: raw.name,
          price: parseFloat(raw.price),
          originalPrice: parseFloat(raw.price) + 5000, // mock
          exchangeOffer: 66200, // mock
          category: raw.category,
          image: raw.image,
          createdAt: raw.created_at,
          updatedAt: raw.updated_at,
          description: raw.description,
          rating: parseFloat(raw.rating),
          ratingsCount: 16112, // mock
          reviews: raw.reviews_count,
          brand: raw.brand,
        };

        setProduct(mockProduct);
      } catch (err) {
        console.error("Error loading product", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Text>Loading product...</Text>;

  return (
    <Container size="xl">
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

        {/* <Select
                  placeholder="Search for Products, Brand and More"
                  searchValue={searchValue}
                  onSearchChange={onSearchChange}
                  searchable
                  dropdownOpened={false}
                  rightSectionPointerEvents="none"
                  rightSection={<BsSearch size={20} />}
                  style={{ width: "40%" }}
                /> */}

        {/* Right Section */}

        <Group justify="space-between" gap="md" align="center" mr="lg">
          {/* <BsPersonCircle size={24} color="white" /> */}

          <Indicator inline label={cartCount} size={16} color="red">
            <HiShoppingCart size={24} color="white" />
          </Indicator>
        </Group>
      </Flex>
      <Text size="sm" c="dimmed" mt={80} mb="md">
        <Anchor onClick={() => navigate("/")} c={theme.colors.deepBlue[4]}>
          Home
        </Anchor>{" "}
        &gt;{" "}
        <Anchor onClick={() => navigate("/")} c={theme.colors.deepBlue[4]}>
          Category
        </Anchor>{" "}
        &gt; Product
      </Text>
      <Paper shadow="md" radius="md" p="xl" mt={30} withBorder>
        <Flex p="lg" gap="xl" align="start" wrap="wrap">
          <Group justify="space-between" align="flex-start" grow>
            <Box w={{ base: "100%", sm: 300 }}>
              <Image
                radius="md"
                src={product.image}
                alt={product.name}
                fit="contain"
              />
              <Group mt="md" grow>
                <Button
                  leftSection={<IconShoppingCart size={18} />}
                  fullWidth
                  color={theme.colors.deepBlue[4]}
                  onClick={() => setCartCount(cartCount + 1)}
                >
                  Add to Cart
                </Button>
                <Button
                  leftSection={<IconBolt size={18} />}
                  fullWidth
                  color="orange"
                >
                  Buy Now
                </Button>
              </Group>
            </Box>

            <Box style={{ flex: 1 }} ml={40}>
              <Title order={3}>{product.name}</Title>

              <Group mt="xs">
                <Badge color="green" size="lg">
                  {product.rating} ★
                </Badge>
                <Text size="sm">
                  {product.ratingsCount.toLocaleString()} Ratings &{" "}
                  {product.reviews} Reviews
                </Text>
                <Badge
                  color={theme.colors.deepBlue[4]}
                  variant="outline"
                  leftSection={<IconShieldCheck size={14} />}
                  radius="sm"
                >
                  Assured
                </Badge>
              </Group>

              <Text c="green" mt="sm" fw={600}>
                Extra ₹
                {(product.originalPrice - product.price).toLocaleString()} off
              </Text>

              <Group gap="xs" align="baseline">
                <Text fz={28} fw={700}>
                  ₹{product.price.toLocaleString()}
                </Text>
                <Text td="line-through" c="dimmed">
                  ₹{product.originalPrice.toLocaleString()}
                </Text>
                <Text c="green" fw={600}>
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % off
                </Text>
              </Group>

              <Box mt="lg">
                <Title order={5}>Available offers</Title>
                <Stack gap={4} mt="xs">
                  {offers.map((offer, index) => (
                    <Flex align="flex-start" gap={8} key={index}>
                      <FaTag color="green" size={14} style={{ marginTop: 2 }} />
                      <Text key={index} size="sm">
                        <strong>{offer.type}:</strong> {offer.text}
                      </Text>
                    </Flex>
                  ))}
                  <Text size="sm" c="blue">
                    View 4 more offers
                  </Text>
                </Stack>
              </Box>

              <Box mt="lg">
                <Radio.Group defaultValue="no-exchange">
                  <Stack spacing="xs">
                    <Radio
                      value="no-exchange"
                      label={`Buy without Exchange  ₹${product.price.toLocaleString()}`}
                    />
                    <Radio
                      value="with-exchange"
                      label={`Buy with Exchange  up to ₹${product.exchangeOffer.toLocaleString()} off`}
                      description="Get extra ₹8,000 off on exchange of select models"
                    />
                  </Stack>
                </Radio.Group>
              </Box>
            </Box>
          </Group>
        </Flex>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
