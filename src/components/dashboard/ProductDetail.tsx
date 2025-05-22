import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Group,
  Text,
  Badge,
  Image,
  Title,
  Paper,
  Divider,
  Flex,
} from "@mantine/core";

interface Product {
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
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/product/details/${id}`
        );
        const result = await response.json();
        setProduct(result?.data);
      } catch (err) {
        console.error("Error loading product", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Text>Loading product...</Text>;

  return (
    <Paper p="lg" shadow="md">
      <Group align="start" justify="apart" grow>
        <Image src={product.image} alt={product.name} width={300} radius="md" />
        <Flex>
          <Title order={2}>{product.name}</Title>
          <Text size="lg" fw={500} mt="sm" color="green">
            ₹{product.price.toLocaleString()}
          </Text>
          <Text c="dimmed">Brand: {product.brand}</Text>
          <Badge color="teal" variant="filled" mt="sm">
            {product.category}
          </Badge>

          <Text mt="md">
            {product.rating
              ? `⭐ ${product.rating} | ${product.reviewsCount} reviews`
              : "No reviews"}
          </Text>

          <Divider my="md" />

          <Group mt="sm">
            <Button color="orange">Add to Cart</Button>
            <Button color="red" variant="filled">
              Buy Now
            </Button>
          </Group>
        </Flex>
      </Group>
    </Paper>
  );
};

export default ProductDetail;
