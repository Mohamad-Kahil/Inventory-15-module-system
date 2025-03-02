import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  Download,
  CreditCard,
  User,
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

interface SalesOrder {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  total: number;
  items: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
}

interface SalesManagementProps {
  salesOrders?: SalesOrder[];
}

const SalesManagement = ({
  salesOrders = [
    {
      id: "1",
      orderNumber: "ORD-2023-001",
      customer: "John Smith",
      date: "2023-06-15",
      total: 249.99,
      items: 2,
      status: "delivered",
      paymentStatus: "paid",
    },
    {
      id: "2",
      orderNumber: "ORD-2023-002",
      customer: "Acme Corporation",
      date: "2023-06-16",
      total: 1299.5,
      items: 5,
      status: "processing",
      paymentStatus: "paid",
    },
    {
      id: "3",
      orderNumber: "ORD-2023-003",
      customer: "Sarah Johnson",
      date: "2023-06-17",
      total: 89.95,
      items: 1,
      status: "pending",
      paymentStatus: "pending",
    },
    {
      id: "4",
      orderNumber: "ORD-2023-004",
      customer: "Tech Solutions Inc",
      date: "2023-06-14",
      total: 2450.75,
      items: 8,
      status: "shipped",
      paymentStatus: "paid",
    },
    {
      id: "5",
      orderNumber: "ORD-2023-005",
      customer: "Emily Wilson",
      date: "2023-06-10",
      total: 129.99,
      items: 1,
      status: "cancelled",
      paymentStatus: "refunded",
    },
  ],
}: SalesManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all-orders");

  // Filter sales orders based on search query and filters
  const filteredSalesOrders = salesOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    const matchesPaymentStatus =
      paymentStatusFilter === "all" ||
      order.paymentStatus === paymentStatusFilter;

    return matchesSearch && matchesStatus && matchesPaymentStatus;
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
            <ShoppingCart className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">Sales Management</h1>
          </div>
          <Button className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create Sales Order
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Sales Orders</CardTitle>
            <Tabs
              defaultValue="all-orders"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all-orders">All Orders</TabsTrigger>
                <TabsTrigger value="pending-orders">Pending</TabsTrigger>
                <TabsTrigger value="processing-orders">Processing</TabsTrigger>
                <TabsTrigger value="shipped-orders">
                  Shipped/Delivered
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
                    placeholder="Search orders..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    className="h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="refunded">Refunded</option>
                  </select>

                  <select
                    className="h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={paymentStatusFilter}
                    onChange={(e) => setPaymentStatusFilter(e.target.value)}
                  >
                    <option value="all">All Payment Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs
                defaultValue="all-orders"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsContent value="all-orders" className="m-0">
                  <SalesOrderTable salesOrders={filteredSalesOrders} />
                </TabsContent>

                <TabsContent value="pending-orders" className="m-0">
                  <SalesOrderTable
                    salesOrders={filteredSalesOrders.filter(
                      (order) => order.status === "pending",
                    )}
                  />
                </TabsContent>

                <TabsContent value="processing-orders" className="m-0">
                  <SalesOrderTable
                    salesOrders={filteredSalesOrders.filter(
                      (order) => order.status === "processing",
                    )}
                  />
                </TabsContent>

                <TabsContent value="shipped-orders" className="m-0">
                  <SalesOrderTable
                    salesOrders={filteredSalesOrders.filter(
                      (order) =>
                        order.status === "shipped" ||
                        order.status === "delivered",
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

interface SalesOrderTableProps {
  salesOrders: SalesOrder[];
}

const SalesOrderTable = ({ salesOrders }: SalesOrderTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "processing":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >
            Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          >
            Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            Delivered
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "refunded":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
          >
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            Paid
          </Badge>
        );
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "refunded":
        return <Badge variant="secondary">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesOrders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-4 text-muted-foreground"
              >
                No sales orders found
              </TableCell>
            </TableRow>
          ) : (
            salesOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">{order.items}</TableCell>
                <TableCell className="text-right font-medium">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  {getPaymentStatusBadge(order.paymentStatus)}
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
                        <FileText className="h-4 w-4 mr-2" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" /> Download Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" /> Customer Info
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="h-4 w-4 mr-2" /> Payment Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {(order.status === "pending" ||
                        order.status === "processing") && (
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Cancel Order
                        </DropdownMenuItem>
                      )}
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

export default SalesManagement;
