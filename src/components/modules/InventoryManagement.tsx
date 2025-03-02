import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Truck,
  ArrowDownUp,
  BarChart,
  QrCode,
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
import { Progress } from "@/components/ui/progress";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  location: string;
  inStock: number;
  minStock: number;
  maxStock: number;
  status: "in-stock" | "low-stock" | "out-of-stock" | "overstocked";
  lastUpdated: string;
}

interface InventoryManagementProps {
  inventoryItems?: InventoryItem[];
}

const InventoryManagement = ({
  inventoryItems = [
    {
      id: "1",
      name: "Wireless Headphones",
      sku: "WH-100",
      category: "Electronics",
      location: "Warehouse A, Shelf 3",
      inStock: 120,
      minStock: 20,
      maxStock: 150,
      status: "in-stock",
      lastUpdated: "2023-06-15",
    },
    {
      id: "2",
      name: "Ergonomic Office Chair",
      sku: "FN-200",
      category: "Furniture",
      location: "Warehouse B, Section 5",
      inStock: 45,
      minStock: 10,
      maxStock: 50,
      status: "in-stock",
      lastUpdated: "2023-06-12",
    },
    {
      id: "3",
      name: "Smart Watch",
      sku: "SW-300",
      category: "Electronics",
      location: "Warehouse A, Shelf 1",
      inStock: 8,
      minStock: 15,
      maxStock: 100,
      status: "low-stock",
      lastUpdated: "2023-06-10",
    },
    {
      id: "4",
      name: "Laptop Stand",
      sku: "LS-400",
      category: "Accessories",
      location: "Warehouse A, Shelf 4",
      inStock: 0,
      minStock: 10,
      maxStock: 50,
      status: "out-of-stock",
      lastUpdated: "2023-06-08",
    },
    {
      id: "5",
      name: "Wireless Keyboard",
      sku: "WK-500",
      category: "Electronics",
      location: "Warehouse A, Shelf 3",
      inStock: 65,
      minStock: 20,
      maxStock: 60,
      status: "overstocked",
      lastUpdated: "2023-06-14",
    },
  ],
}: InventoryManagementProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all-items");

  // Filter inventory items based on search query and filters
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter
  const categories = [...new Set(inventoryItems.map((item) => item.category))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background p-6 rounded-lg w-full"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Package2 className="h-6 w-6 mr-2 text-primary" />
            <h1 className="text-2xl font-bold">Inventory Management</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              Stock Adjustment
            </Button>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Inventory Items</CardTitle>
            <Tabs
              defaultValue="all-items"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all-items">All Items</TabsTrigger>
                <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
                <TabsTrigger value="overstocked">Overstocked</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search inventory..."
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
                    <option value="in-stock">In Stock</option>
                    <option value="low-stock">Low Stock</option>
                    <option value="out-of-stock">Out of Stock</option>
                    <option value="overstocked">Overstocked</option>
                  </select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs
                defaultValue="all-items"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsContent value="all-items" className="m-0">
                  <InventoryTable items={filteredItems} />
                </TabsContent>

                <TabsContent value="low-stock" className="m-0">
                  <InventoryTable
                    items={filteredItems.filter(
                      (item) => item.status === "low-stock",
                    )}
                  />
                </TabsContent>

                <TabsContent value="out-of-stock" className="m-0">
                  <InventoryTable
                    items={filteredItems.filter(
                      (item) => item.status === "out-of-stock",
                    )}
                  />
                </TabsContent>

                <TabsContent value="overstocked" className="m-0">
                  <InventoryTable
                    items={filteredItems.filter(
                      (item) => item.status === "overstocked",
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

interface InventoryTableProps {
  items: InventoryItem[];
}

const InventoryTable = ({ items }: InventoryTableProps) => {
  const getStockStatus = (item: InventoryItem) => {
    const { status, inStock, minStock, maxStock } = item;

    let color = "";
    let progressValue = 0;

    if (status === "out-of-stock") {
      color = "bg-destructive";
      progressValue = 0;
    } else if (status === "low-stock") {
      color = "bg-yellow-500";
      progressValue = (inStock / minStock) * 50;
    } else if (status === "overstocked") {
      color = "bg-blue-500";
      progressValue = 100;
    } else {
      color = "bg-green-500";
      progressValue = ((inStock - minStock) / (maxStock - minStock)) * 100;
      progressValue = Math.min(Math.max(progressValue, 0), 100);
    }

    return (
      <div className="flex items-center gap-2">
        <Progress value={progressValue} className={`h-2 ${color}`} />
        <Badge
          variant={status === "in-stock" ? "default" : "outline"}
          className={`
            ${status === "low-stock" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" : ""}
            ${status === "out-of-stock" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : ""}
            ${status === "overstocked" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" : ""}
          `}
        >
          {status === "in-stock"
            ? "In Stock"
            : status === "low-stock"
              ? "Low Stock"
              : status === "out-of-stock"
                ? "Out of Stock"
                : "Overstocked"}
        </Badge>
      </div>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">In Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-4 text-muted-foreground"
              >
                No inventory items found
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell className="text-right font-medium">
                  {item.inStock} / {item.maxStock}
                </TableCell>
                <TableCell>{getStockStatus(item)}</TableCell>
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
                        <ArrowDownUp className="h-4 w-4 mr-2" /> Adjust Stock
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Truck className="h-4 w-4 mr-2" /> Transfer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <QrCode className="h-4 w-4 mr-2" /> Generate Label
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart className="h-4 w-4 mr-2" /> View History
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

export default InventoryManagement;
