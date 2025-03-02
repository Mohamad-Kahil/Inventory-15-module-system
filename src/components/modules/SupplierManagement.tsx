import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Factory,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  Package,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  status: "active" | "inactive" | "pending";
  productsSupplied: number;
  lastOrder: string | null;
}

interface SupplierManagementProps {
  suppliers?: Supplier[];
}

const SupplierManagement = ({
  suppliers = [
    {
      id: "1",
      name: "Global Electronics Inc.",
      contactPerson: "Michael Chen",
      email: "m.chen@globalelectronics.com",
      phone: "+1 (555) 123-4567",
      category: "Electronics",
      status: "active",
      productsSupplied: 45,
      lastOrder: "2023-06-10",
    },
    {
      id: "2",
      name: "Premium Furniture Co.",
      contactPerson: "Sarah Johnson",
      email: "sarah@premiumfurniture.com",
      phone: "+1 (555) 987-6543",
      category: "Furniture",
      status: "active",
      productsSupplied: 28,
      lastOrder: "2023-06-05",
    },
    {
      id: "3",
      name: "Tech Accessories Ltd.",
      contactPerson: "David Williams",
      email: "david@techaccessories.com",
      phone: "+1 (555) 234-5678",
      category: "Accessories",
      status: "inactive",
      productsSupplied: 15,
      lastOrder: "2023-04-22",
    },
    {
      id: "4",
      name: "Office Supplies Direct",
      contactPerson: "Jennifer Lee",
      email: "jennifer@officesupplies.com",
      phone: "+1 (555) 876-5432",
      category: "Office Supplies",
      status: "active",
      productsSupplied: 32,
      lastOrder: "2023-06-08",
    },
    {
      id: "5",
      name: "Innovative Tech Solutions",
      contactPerson: "Robert Brown",
      email: "robert@innovativetech.com",
      phone: "+1 (555) 345-6789",
      category: "Electronics",
      status: "pending",
      productsSupplied: 0,
      lastOrder: null,
    },
  ],
}: SupplierManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all-suppliers");

  // Filter suppliers based on search query and filters
  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || supplier.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || supplier.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter
  const categories = [
    ...new Set(suppliers.map((supplier) => supplier.category)),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background p-6 rounded-lg w-full"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Factory className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">Supplier Management</h1>
          </div>
          <Button className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Supplier Directory</CardTitle>
            <Tabs
              defaultValue="all-suppliers"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all-suppliers">All Suppliers</TabsTrigger>
                <TabsTrigger value="active-suppliers">Active</TabsTrigger>
                <TabsTrigger value="pending-suppliers">
                  Pending/Inactive
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search suppliers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    className="h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <select
                    className="h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs
                defaultValue="all-suppliers"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsContent value="all-suppliers" className="m-0">
                  <SupplierTable suppliers={filteredSuppliers} />
                </TabsContent>

                <TabsContent value="active-suppliers" className="m-0">
                  <SupplierTable
                    suppliers={filteredSuppliers.filter(
                      (supplier) => supplier.status === "active",
                    )}
                  />
                </TabsContent>

                <TabsContent value="pending-suppliers" className="m-0">
                  <SupplierTable
                    suppliers={filteredSuppliers.filter(
                      (supplier) =>
                        supplier.status === "inactive" ||
                        supplier.status === "pending",
                    )}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

interface SupplierTableProps {
  suppliers: Supplier[];
}

const SupplierTable = ({ suppliers }: SupplierTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Products</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-4 text-muted-foreground"
              >
                No suppliers found
              </TableCell>
            </TableRow>
          ) : (
            suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>
                  <div className="font-medium">{supplier.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {supplier.contactPerson}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                      {supplier.email}
                    </div>
                    <div className="flex items-center mt-1">
                      <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                      {supplier.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{supplier.category}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {supplier.productsSupplied}
                </TableCell>
                <TableCell>
                  {supplier.lastOrder
                    ? new Date(supplier.lastOrder).toLocaleDateString()
                    : "Never"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      supplier.status === "active"
                        ? "default"
                        : supplier.status === "pending"
                          ? "outline"
                          : "secondary"
                    }
                    className={
                      supplier.status === "pending"
                        ? "border-yellow-500 text-yellow-500"
                        : ""
                    }
                  >
                    {supplier.status.charAt(0).toUpperCase() +
                      supplier.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" /> Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Package className="h-4 w-4 mr-2" /> View Products
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" /> View Contracts
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupplierManagement;
