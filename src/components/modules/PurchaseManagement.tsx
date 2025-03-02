import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  FileText,
  Download,
  Truck,
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

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  date: string;
  total: number;
  items: number;
  status: "draft" | "pending" | "approved" | "received" | "cancelled";
}

interface PurchaseManagementProps {
  purchaseOrders?: PurchaseOrder[];
}

const PurchaseManagement = ({
  purchaseOrders = [
    {
      id: "1",
      poNumber: "PO-2023-001",
      supplier: "Global Electronics Inc.",
      date: "2023-06-10",
      total: 12500.0,
      items: 15,
      status: "received",
    },
    {
      id: "2",
      poNumber: "PO-2023-002",
      supplier: "Premium Furniture Co.",
      date: "2023-06-15",
      total: 8750.5,
      items: 8,
      status: "approved",
    },
    {
      id: "3",
      poNumber: "PO-2023-003",
      supplier: "Tech Accessories Ltd.",
      date: "2023-06-18",
      total: 3450.25,
      items: 25,
      status: "pending",
    },
    {
      id: "4",
      poNumber: "PO-2023-004",
      supplier: "Office Supplies Direct",
      date: "2023-06-20",
      total: 1250.75,
      items: 12,
      status: "draft",
    },
    {
      id: "5",
      poNumber: "PO-2023-005",
      supplier: "Innovative Tech Solutions",
      date: "2023-06-05",
      total: 5875.4,
      items: 7,
      status: "cancelled",
    },
  ],
}: PurchaseManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all-orders");

  // Filter purchase orders based on search query and filters
  const filteredPurchaseOrders = purchaseOrders.filter((po) => {
    const matchesSearch =
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      po.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || po.status === statusFilter;

    return matchesSearch && matchesStatus;
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
            <ShoppingBag className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">Purchase Management</h1>
          </div>
          <Button className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Create Purchase Order
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Purchase Orders</CardTitle>
            <Tabs
              defaultValue="all-orders"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all-orders">All Orders</TabsTrigger>
                <TabsTrigger value="pending-orders">Pending</TabsTrigger>
                <TabsTrigger value="approved-orders">Approved</TabsTrigger>
                <TabsTrigger value="received-orders">Received</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search purchase orders..."
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
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="received">Received</option>
                    <option value="cancelled">Cancelled</option>
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
                  <PurchaseOrderTable purchaseOrders={filteredPurchaseOrders} />
                </TabsContent>

                <TabsContent value="pending-orders" className="m-0">
                  <PurchaseOrderTable
                    purchaseOrders={filteredPurchaseOrders.filter(
                      (po) => po.status === "pending",
                    )}
                  />
                </TabsContent>

                <TabsContent value="approved-orders" className="m-0">
                  <PurchaseOrderTable
                    purchaseOrders={filteredPurchaseOrders.filter(
                      (po) => po.status === "approved",
                    )}
                  />
                </TabsContent>

                <TabsContent value="received-orders" className="m-0">
                  <PurchaseOrderTable
                    purchaseOrders={filteredPurchaseOrders.filter(
                      (po) => po.status === "received",
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

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[];
}

const PurchaseOrderTable = ({ purchaseOrders }: PurchaseOrderTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          >
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="default"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >
            Approved
          </Badge>
        );
      case "received":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            Received
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>PO Number</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-4 text-muted-foreground"
              >
                No purchase orders found
              </TableCell>
            </TableRow>
          ) : (
            purchaseOrders.map((po) => (
              <TableRow key={po.id}>
                <TableCell className="font-medium">{po.poNumber}</TableCell>
                <TableCell>{po.supplier}</TableCell>
                <TableCell>{new Date(po.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">{po.items}</TableCell>
                <TableCell className="text-right font-medium">
                  ${po.total.toFixed(2)}
                </TableCell>
                <TableCell>{getStatusBadge(po.status)}</TableCell>
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
                        <Download className="h-4 w-4 mr-2" /> Download PDF
                      </DropdownMenuItem>
                      {po.status === "approved" && (
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2" /> Mark as Received
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      {(po.status === "draft" || po.status === "pending") && (
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

export default PurchaseManagement;
