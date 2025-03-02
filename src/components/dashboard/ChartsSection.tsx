import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

interface ChartsSectionProps {
  title?: string;
  description?: string;
  timeRanges?: string[];
  chartTypes?: string[];
}

const ChartsSection = ({
  title = "Business Analytics",
  description = "Visualized data insights across your enterprise",
  timeRanges = [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last year",
    "All time",
  ],
  chartTypes = ["Revenue", "Users", "Orders", "Inventory"],
}: ChartsSectionProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[1]);
  const [activeChart, setActiveChart] = useState("Revenue");

  // Mock data for charts
  const revenueData = [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 19000 },
    { month: "Mar", value: 15000 },
    { month: "Apr", value: 22000 },
    { month: "May", value: 28000 },
    { month: "Jun", value: 25000 },
  ];

  const usersData = [
    { month: "Jan", value: 500 },
    { month: "Feb", value: 620 },
    { month: "Mar", value: 750 },
    { month: "Apr", value: 890 },
    { month: "May", value: 1050 },
    { month: "Jun", value: 1200 },
  ];

  const ordersData = [
    { month: "Jan", value: 350 },
    { month: "Feb", value: 420 },
    { month: "Mar", value: 380 },
    { month: "Apr", value: 510 },
    { month: "May", value: 580 },
    { month: "Jun", value: 620 },
  ];

  const inventoryData = [
    { category: "Electronics", value: 35 },
    { category: "Furniture", value: 25 },
    { category: "Clothing", value: 20 },
    { category: "Office", value: 15 },
    { category: "Other", value: 5 },
  ];

  // Placeholder for chart rendering
  const renderChart = (type: string) => {
    switch (type) {
      case "Revenue":
        return (
          <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 flex">
                {revenueData.map((item, index) => {
                  const height = (item.value / 30000) * 100;
                  return (
                    <motion.div
                      key={index}
                      className="flex-1 flex flex-col justify-end px-2"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div
                        className="bg-primary/80 rounded-t-sm w-full"
                        style={{ height: `${height}%` }}
                      />
                      <div className="text-xs text-center mt-2">
                        {item.month}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="h-8 flex items-center justify-between px-4 text-sm text-muted-foreground">
                <div>$0</div>
                <div>$30K</div>
              </div>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <div className="flex items-center text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>12.5%</span>
              </div>
            </div>
          </div>
        );
      case "Users":
        return (
          <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-end">
              <svg className="w-full h-[250px]" viewBox="0 0 600 300">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d={`M 0,${300 - (usersData[0].value / 1200) * 250} ${usersData.map((d, i) => `L ${(i * 600) / (usersData.length - 1)},${300 - (d.value / 1200) * 250}`).join(" ")}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute bottom-0 w-full flex justify-between px-4 text-xs text-muted-foreground">
                {usersData.map((item, index) => (
                  <div key={index}>{item.month}</div>
                ))}
              </div>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <div className="flex items-center text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span>24.8%</span>
              </div>
            </div>
          </div>
        );
      case "Orders":
        return (
          <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 flex">
                {ordersData.map((item, index) => {
                  const height = (item.value / 700) * 100;
                  return (
                    <motion.div
                      key={index}
                      className="flex-1 flex flex-col justify-end px-2"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div
                        className="bg-indigo-500/80 rounded-t-sm w-full"
                        style={{ height: `${height}%` }}
                      />
                      <div className="text-xs text-center mt-2">
                        {item.month}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <div className="flex items-center text-sm text-red-500">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span>3.2%</span>
              </div>
            </div>
          </div>
        );
      case "Inventory":
        return (
          <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[250px] h-[250px] relative">
                {inventoryData.map((item, index) => {
                  const startAngle =
                    index > 0
                      ? (inventoryData
                          .slice(0, index)
                          .reduce((sum, d) => sum + d.value, 0) /
                          100) *
                        360
                      : 0;
                  const endAngle = startAngle + (item.value / 100) * 360;
                  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

                  const startX =
                    125 + 100 * Math.cos((startAngle - 90) * (Math.PI / 180));
                  const startY =
                    125 + 100 * Math.sin((startAngle - 90) * (Math.PI / 180));
                  const endX =
                    125 + 100 * Math.cos((endAngle - 90) * (Math.PI / 180));
                  const endY =
                    125 + 100 * Math.sin((endAngle - 90) * (Math.PI / 180));

                  const colors = [
                    "#4f46e5",
                    "#8b5cf6",
                    "#ec4899",
                    "#f97316",
                    "#84cc16",
                  ];

                  return (
                    <motion.path
                      key={index}
                      d={`M 125,125 L ${startX},${startY} A 100,100 0 ${largeArcFlag},1 ${endX},${endY} Z`}
                      fill={colors[index % colors.length]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col space-y-1">
              {inventoryData.map((item, index) => {
                const colors = [
                  "bg-indigo-600",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-orange-500",
                  "bg-lime-500",
                ];
                return (
                  <div key={index} className="flex items-center text-xs">
                    <div
                      className={`w-3 h-3 ${colors[index % colors.length]} rounded-sm mr-2`}
                    ></div>
                    <span>
                      {item.category} ({item.value}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      default:
        return (
          <div className="h-[300px] flex items-center justify-center">
            No data available
          </div>
        );
    }
  };

  return (
    <Card className="w-full bg-background shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={selectedTimeRange}
            onValueChange={setSelectedTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={chartTypes[0]}
          value={activeChart}
          onValueChange={setActiveChart}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            {chartTypes.map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                className="flex items-center"
              >
                {type === "Revenue" && <BarChart className="h-4 w-4 mr-2" />}
                {type === "Users" && <LineChart className="h-4 w-4 mr-2" />}
                {type === "Orders" && <BarChart className="h-4 w-4 mr-2" />}
                {type === "Inventory" && <PieChart className="h-4 w-4 mr-2" />}
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
          {chartTypes.map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              {renderChart(type)}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartsSection;
