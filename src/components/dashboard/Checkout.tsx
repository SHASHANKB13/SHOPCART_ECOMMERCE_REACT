import React from "react";
import {
  Container,
  Grid,
  TextInput,
  Select,
  Checkbox,
  Radio,
  Group,
  Text,
  Button,
  Box,
  Divider,
  Title,
  Paper,
  Image,
  Stack,
  Input,
  Flex,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const handleContinueClick = () => {
    navigate("/");
  };
  return (
    <Container
      size="100%"
      py="xl"
      style={{
        minHeight: "100vh",
        // display: "flex",
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
      <Title order={2} mb="lg" ta="center" mt={40}>
        CHECKOUT
      </Title>

      <Grid>
        {/* Left Section - Billing Address, Shipping, Payment */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          {/* <Text size="sm">
            <a href="#">Login</a> or continue to shop as guest
          </Text> */}

          <Paper shadow="sm" p="lg" withBorder>
            <Title order={4} mb="sm">
              BILLING ADDRESS
            </Title>
            <Text size="xs" color="red" mb="sm">
              *Required Field
            </Text>
            <Grid>
              <Grid.Col span={6}>
                <TextInput required label="First Name" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput required label="Last Name" />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput required label="Email Address" />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput required label="Telephone" />
              </Grid.Col>
              <Grid.Col span={12}>
                <Select
                  label="Country"
                  data={[{ value: "AU", label: "Australia" }]}
                  defaultValue="AU"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput label="Address" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput required label="Town/Suburb" />
              </Grid.Col>
              <Grid.Col span={6}>
                <Group grow>
                  <Select
                    label="Region/State"
                    placeholder="Select state"
                    data={["NSW", "VIC", "QLD"]}
                  />
                  <TextInput required label="Zip/Postal Code" />
                </Group>
              </Grid.Col>
              <Grid.Col span={12}>
                <Group justify="space-between">
                  {/* <Checkbox
                    label="Save this address"
                    color={theme.colors.deepBlue[4]}
                  /> */}
                  <Checkbox
                    label="Ship to the same address"
                    defaultChecked
                    color={theme.colors.deepBlue[4]}
                  />
                  <Checkbox
                    label="Create an account"
                    ml="md"
                    color={theme.colors.deepBlue[4]}
                  />
                </Group>
              </Grid.Col>
            </Grid>
          </Paper>

          <Paper shadow="sm" p="lg" mt="md">
            <Title order={4} mb="sm">
              SELECT SHIPPING METHOD
            </Title>
            <Radio.Group defaultValue="standard">
              <Stack>
                <Radio
                  value="standard"
                  label="Standard Shipping $6.95"
                  color={theme.colors.deepBlue[4]}
                />
                <Radio
                  value="express"
                  label="Express Shipping $10.00"
                  color={theme.colors.deepBlue[4]}
                />
              </Stack>
            </Radio.Group>
          </Paper>

          <Paper shadow="sm" p="lg" mt="md">
            <Title order={4} mb="sm">
              PROMO CODE
            </Title>
            <Group>
              <Input placeholder="Enter Code" w={200} />
              <Button variant="light" color={theme.colors.deepBlue[4]}>
                Apply
              </Button>
            </Group>
          </Paper>

          <Paper shadow="sm" p="lg" mt="md">
            <Title order={4} mb="sm">
              PAYMENT
            </Title>
            <Radio.Group defaultValue="paypal">
              <Stack>
                <Radio
                  value="credit"
                  label="Credit Card"
                  color={theme.colors.deepBlue[4]}
                />
                <Radio
                  value="cod"
                  label="Cash on Delivery (COD)"
                  color={theme.colors.deepBlue[4]}
                />
                <Radio
                  value="paypal"
                  label="PayPal Express Checkout"
                  color={theme.colors.deepBlue[4]}
                />
              </Stack>
            </Radio.Group>
            <Text mt="sm" c="green">
              You will be redirected to the PayPal website.
            </Text>
          </Paper>
        </Grid.Col>

        {/* Right Section - Review Order */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper shadow="sm" p="lg" withBorder>
            <Title order={4} mb="md">
              REVIEW ORDER
            </Title>
            <Group align="flex-start">
              <Image
                src="https://via.placeholder.com/80"
                alt="Product"
                width={80}
              />
              <Box>
                <Text fw={500}>Squid - Limited Edition Cactus Print</Text>
                <Text size="sm" c="dimmed">
                  SQD004-K01G40
                </Text>
                <Text size="sm" c="dimmed">
                  Cactus Print Limited Edition
                </Text>
              </Box>
            </Group>

            <Divider my="sm" />

            <Group justify="apart">
              <Text>QTY</Text>
              <Text>Total</Text>
            </Group>
            <Group justify="apart">
              <Text>1</Text>
              <Text>$49.00</Text>
            </Group>

            <Divider my="sm" />

            <Group justify="apart">
              <Text>Subtotal</Text>
              <Text>$49.00</Text>
            </Group>
            <Group justify="apart">
              <Text>GST</Text>
              <Text>$4.45</Text>
            </Group>
            <Group justify="apart" mt="md">
              <Text fw={700}>Grand Total</Text>
              <Text fw={700}>$49.00</Text>
            </Group>

            <Button fullWidth color={theme.colors.deepBlue[4]} mt="lg">
              PROCESS ORDER
            </Button>
            <Text align="center" mt="md" size="xs" c="dimmed">
              CART SECURED BY <b>Stripe</b>
            </Text>
            <Group justify="center" mt="xs">
              <Image
                width="auto"
                height={50}
                src="https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/43279012100/original/NQaEc3sL6Gso96fAdUWRiHZ5G9UUaHgUog.png?1639064459"
                alt="payment logo"
              />
            </Group>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
