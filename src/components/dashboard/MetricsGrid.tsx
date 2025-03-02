import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
  className?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  change = { value: "0%", trend: "neutral" },
  icon = <BarChart className="h-5 w-5" />,
  className,
}: MetricCardProps) => {
  return (
    <Card className={cn("h-full transition-all hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {change.trend === "up" && (
            <ArrowUp className="h-4 w-4 text-emerald-500 mr-1" />
          )}
          {change.trend === "down" && (
            <ArrowDown className="h-4 w-4 text-rose-500 mr-1" />
          )}
          <span
            className={cn(
              "text-xs",
              change.trend === "up" && "text-emerald-500",
              change.trend === "down" && "text-rose-500",
              change.trend === "neutral" && "text-muted-foreground",
            )}
          >
            {change.value}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsGridProps {
  metrics?: MetricCardProps[];
  className?: string;
}

const MetricsGrid = ({
  metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: { value: "+20.1%", trend: "up" },
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Active Users",
      value: "2,345",
      change: { value: "+10.3%", trend: "up" },
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "New Orders",
      value: "342",
      change: { value: "-3.2%", trend: "down" },
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: { value: "Same as last week", trend: "neutral" },
      icon: <BarChart className="h-5 w-5" />,
    },
  ],
  className,
}: MetricsGridProps) => {
  return (
    <div className={cn("bg-background p-4 rounded-lg", className)}>
      <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;
