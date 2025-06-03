import { Table, Title } from "@mantine/core";

export default function ProductsList() {
  const products = [
    { id: 101, name: "iPhone 14", price: "$799" },
    { id: 102, name: "MacBook Pro", price: "$1999" },
    { id: 103, name: "AirPods Pro", price: "$249" },
  ];

  const rows = products.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.id}</Table.Td>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.price}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={3} mb="md">
        Products
      </Title>
      <Table highlightOnHover withBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Price</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
