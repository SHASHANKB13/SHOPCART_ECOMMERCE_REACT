import { Table, Title } from "@mantine/core";

function UsersTable() {
  const users = [
    { id: 1, name: "John Doe", email: "john@mail.com" },
    { id: 2, name: "Jane Smith", email: "jane@mail.com" },
    { id: 3, name: "Alice Johnson", email: "alice@mail.com" },
  ];

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>{user.id}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Title order={3} mb="md">
        Users
      </Title>
      <Table highlightOnHover withBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
export default UsersTable;
