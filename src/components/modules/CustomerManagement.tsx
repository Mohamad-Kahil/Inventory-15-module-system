import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  CreditCard,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "individual" | "business";
  status: "active" | "inactive";
  totalSpent: number;
  lastPurchase: string | null;
  avatar?: string;
}

interface CustomerManagementProps {
  customers?: Customer[];
}

const CustomerManagement = ({
  customers = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      type: "individual",
      status: "active",
      totalSpent: 1245.89,
      lastPurchase: "2023-06-15",
    },
    {
      id: "2",
      name: "Acme Corporation",
      email: "contact@acmecorp.com",
      phone: "+1 (555) 987-6543",
      type: "business",
      status: "active",
      totalSpent: 8750.5,
      lastPurchase: "2023-06-10",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      type: "individual",
      status: "inactive",
      totalSpent: 450.25,
      lastPurchase: "2023-03-22",
    },
    {
      id: "4",
      name: "Tech Solutions Inc",
      email: "info@techsolutions.com",
      phone: "+1 (555) 876-5432",
      type: "business",
      status: "active",
      totalSpent: 12350.75,
      lastPurchase: "2023-06-05",
    },
    {
      id: "5",
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      phone: "+1 (555) 345-6789",
      type: "individual",
      status: "active",
      totalSpent: 875.4,
      lastPurchase: "2023-05-28",
    },
  ],
}: CustomerManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all-customers");

  // Filter customers based on search query and filters
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);

    const matchesType = typeFilter === "all" || customer.type === typeFilter;

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background p-6 rounded-lg w-full"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">Customer Management</h1>
          </div>
          <Button className="flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Customer Directory</CardTitle>
            <Tabs
              defaultValue="all-customers"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all-customers">All Customers</TabsTrigger>
                <TabsTrigger value="individual-customers">
                  Individuals
                </TabsTrigger>
                <TabsTrigger value="business-customers">Businesses</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    className="h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="individual">Individual</option>
                    <option value="business">Business</option>
                  </select>

                  <select
                    className="h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs
                defaultValue="all-customers"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsContent value="all-customers" className="m-0">
                  <CustomerTable customers={filteredCustomers} />
                </TabsContent>

                <TabsContent value="individual-customers" className="m-0">
                  <CustomerTable
                    customers={filteredCustomers.filter(
                      (customer) => customer.type === "individual",
                    )}
                  />
                </TabsContent>

                <TabsContent value="business-customers" className="m-0">
                  <CustomerTable
                    customers={filteredCustomers.filter(
                      (customer) => customer.type === "business",
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

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable = ({ customers }: CustomerTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Total Spent</TableHead>
            <TableHead>Last Purchase</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-4 text-muted-foreground"
              >
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} alt={customer.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{customer.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                      {customer.email}
                    </div>
                    <div className="flex items-center mt-1">
                      <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                      {customer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {customer.type === "individual" ? "Individual" : "Business"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${customer.totalSpent.toFixed(2)}
                </TableCell>
                <TableCell>
                  {customer.lastPurchase
                    ? new Date(customer.lastPurchase).toLocaleDateString()
                    : "Never"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      customer.status === "active" ? "default" : "secondary"
                    }
                  >
                    {customer.status === "active" ? "Active" : "Inactive"}
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
                        <Mail className="h-4 w-4 mr-2" /> Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="h-4 w-4 mr-2" /> View Purchases
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

export default CustomerManagement;
