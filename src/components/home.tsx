import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import DashboardContent from "./dashboard/DashboardContent";
import UserManagement from "./modules/UserManagement";
import ProductManagement from "./modules/ProductManagement";
import CustomerManagement from "./modules/CustomerManagement";
import SupplierManagement from "./modules/SupplierManagement";
import PurchaseManagement from "./modules/PurchaseManagement";
import InventoryManagement from "./modules/InventoryManagement";
import SalesManagement from "./modules/SalesManagement";
import POSManagement from "./modules/POSManagement";
import AccessDenied from "./common/AccessDenied";

const Home = () => {
  // Mock user permissions
  const userPermissions = {
    dashboard: true,
    users: true,
    products: true,
    customers: true,
    suppliers: true,
    purchases: true,
    inventory: true,
    sales: true,
    pos: true,
    invoicing: false,
    logistics: false,
    production: false,
    accounting: false,
    analytics: true,
    planning: false,
    marketing: false,
    settings: true,
  };

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardContent />} />
        <Route
          path="users/*"
          element={
            userPermissions.users ? (
              <UserManagement />
            ) : (
              <AccessDenied moduleName="users" />
            )
          }
        />
        <Route
          path="products/*"
          element={
            userPermissions.products ? (
              <ProductManagement />
            ) : (
              <AccessDenied moduleName="products" />
            )
          }
        />
        <Route
          path="customers/*"
          element={
            userPermissions.customers ? (
              <CustomerManagement />
            ) : (
              <AccessDenied moduleName="customers" />
            )
          }
        />
        <Route
          path="suppliers/*"
          element={
            userPermissions.suppliers ? (
              <SupplierManagement />
            ) : (
              <AccessDenied moduleName="suppliers" />
            )
          }
        />
        <Route
          path="purchases/*"
          element={
            userPermissions.purchases ? (
              <PurchaseManagement />
            ) : (
              <AccessDenied moduleName="purchases" />
            )
          }
        />
        <Route
          path="inventory/*"
          element={
            userPermissions.inventory ? (
              <InventoryManagement />
            ) : (
              <AccessDenied moduleName="inventory" />
            )
          }
        />
        <Route
          path="sales/*"
          element={
            userPermissions.sales ? (
              <SalesManagement />
            ) : (
              <AccessDenied moduleName="sales" />
            )
          }
        />
        <Route
          path="pos/*"
          element={
            userPermissions.pos ? (
              <POSManagement />
            ) : (
              <AccessDenied moduleName="pos" />
            )
          }
        />
        <Route
          path="invoicing/*"
          element={
            userPermissions.invoicing ? (
              <div>Invoicing Module</div>
            ) : (
              <AccessDenied moduleName="invoicing" />
            )
          }
        />
        <Route
          path="logistics/*"
          element={
            userPermissions.logistics ? (
              <div>Logistics Module</div>
            ) : (
              <AccessDenied moduleName="logistics" />
            )
          }
        />
        <Route
          path="production/*"
          element={
            userPermissions.production ? (
              <div>Production Module</div>
            ) : (
              <AccessDenied moduleName="production" />
            )
          }
        />
        <Route
          path="accounting/*"
          element={
            userPermissions.accounting ? (
              <div>Accounting Module</div>
            ) : (
              <AccessDenied moduleName="accounting" />
            )
          }
        />
        <Route
          path="analytics/*"
          element={
            userPermissions.analytics ? (
              <div>Analytics Module</div>
            ) : (
              <AccessDenied moduleName="analytics" />
            )
          }
        />
        <Route
          path="planning/*"
          element={
            userPermissions.planning ? (
              <div>Planning Module</div>
            ) : (
              <AccessDenied moduleName="planning" />
            )
          }
        />
        <Route
          path="marketing/*"
          element={
            userPermissions.marketing ? (
              <div>Marketing Module</div>
            ) : (
              <AccessDenied moduleName="marketing" />
            )
          }
        />
        <Route
          path="settings/*"
          element={
            userPermissions.settings ? (
              <div>Settings Module</div>
            ) : (
              <AccessDenied moduleName="settings" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default Home;
