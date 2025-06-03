import DashboardLayout from "./AdminDashboardLayout.tsx";
import UsersTable from "./UserTable.tsx";
import ProductsList from "./Products.tsx";
import { useState } from "react";

function AdminOverview() {
  const [activePage, setActivePage] = useState("users");

  const renderContent = () => {
    switch (activePage) {
      case "users":
        return <UsersTable />;
      case "products":
        return <ProductsList />;
      case "settings":
        return <div>Settings content goes here</div>;
      default:
        return <div>Welcome to Admin Dashboard</div>;
    }
  };

  return (
    <DashboardLayout onNavigate={setActivePage}>
      {renderContent()}
    </DashboardLayout>
  );
}
export default AdminOverview;
