import React, { useState } from "react";
import {
  Container,
  Group,
  Select,
  Input,
  Button,
  Badge,
  Title,
  Flex,
} from "@mantine/core";
import { BsCart3, BsPersonCircle, BsSearch } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const cart_count = 1;

const Header = (props) => {
  const navigate = useNavigate();

  const handleGearIconClick = (page) => {
    navigate(`/${page}`);
  };

  const onSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    if (!searchTerm) {
      props.setData(props.orginalData.current);
    } else {
      const filteredData = props.orginalData.current.filter((d) =>
        d.name.toLowerCase().includes(searchTerm)
      );
      props.setData(filteredData);
    }
  };

  return (
    <Flex
      h={60}
      px="md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Container
        size="xl"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Section */}
        <Group>
          <HiShoppingCart size={24} />
          <Title order={4} style={{ margin: 0 }}>
            Shop Cart
          </Title>
        </Group>

        {/* Category Selector */}
        <Select
          label="Category"
          placeholder="Select category"
          data={[
            { value: "MOBILE", label: "Mobiles" },
            { value: "CLOTHING", label: "Clothes" },
            { value: "GROCERIES", label: "Groceries" },
          ]}
          value={props.jsonData.category}
          onChange={(value) => {
            props.setJsonData({
              ...props.jsonData,
              category: value,
            });
          }}
          style={{ width: 200 }}
        />

        {/* Search Bar */}
        <Group style={{ flexGrow: 1, maxWidth: "40%" }}>
          <BsSearch size={20} />
          <Input
            placeholder="Search for Products, Brand and More"
            onChange={onSearch}
            style={{ width: "100%" }}
          />
        </Group>

        {/* Right Section */}
        <Group>
          <Group justify="center" gap="xs">
            {/* <BsCart3 size={24} style={{ cursor: "pointer" }} onClick={() => handleGearIconClick("productCart")} /> */}
            <Title order={6}>Cart</Title>
            {cart_count !== null && (
              <Badge size="lg" color="blue">
                {cart_count}
              </Badge>
            )}
          </Group>
        </Group>
      </Container>
    </Flex>
  );
};

export default Header;
