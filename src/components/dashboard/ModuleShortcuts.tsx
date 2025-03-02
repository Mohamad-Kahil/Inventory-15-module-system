import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Users,
  FileText,
  BarChart3,
  Settings,
  ShoppingCart,
  Briefcase,
  Calendar,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface ModuleShortcutsProps {
  className?: string;
}

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  isRtl?: boolean;
}

const ModuleCard = ({
  title,
  description,
  icon,
  path,
  color,
  isRtl = false,
}: ModuleCardProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md group border-border/60",
        "hover:border-primary/20 hover:bg-accent/50",
      )}
      onClick={() => navigate(path)}
    >
      <CardContent className="p-6">
        <div
          className={cn(
            "flex items-start gap-4",
            isRtl && "flex-row-reverse text-right",
          )}
        >
          <div
            className={cn(
              "rounded-full p-3 transition-all duration-300",
              `bg-${color}/10 text-${color} group-hover:bg-${color}/20`,
            )}
          >
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{t(title)}</h3>
            <p className="text-sm text-muted-foreground">{t(description)}</p>
          </div>
          <ArrowRight
            className={cn(
              "h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1",
              isRtl && "rotate-180 group-hover:-translate-x-1",
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const ModuleShortcuts = ({ className }: ModuleShortcutsProps) => {
  const { t, direction } = useLanguage();
  const isRtl = direction === "rtl";

  const modules = [
    {
      title: "modules.users.title",
      description: "modules.users.description",
      icon: <Users className="h-6 w-6" />,
      path: "/users",
      color: "blue",
    },
    {
      title: "modules.calendar.title",
      description: "modules.calendar.description",
      icon: <Calendar className="h-6 w-6" />,
      path: "/calendar",
      color: "green",
    },
    {
      title: "modules.messages.title",
      description: "modules.messages.description",
      icon: <MessageSquare className="h-6 w-6" />,
      path: "/messages",
      color: "purple",
    },
    {
      title: "modules.documents.title",
      description: "modules.documents.description",
      icon: <FileText className="h-6 w-6" />,
      path: "/documents",
      color: "yellow",
    },
    {
      title: "modules.orders.title",
      description: "modules.orders.description",
      icon: <ShoppingCart className="h-6 w-6" />,
      path: "/orders",
      color: "orange",
    },
    {
      title: "modules.projects.title",
      description: "modules.projects.description",
      icon: <Briefcase className="h-6 w-6" />,
      path: "/projects",
      color: "pink",
    },
    {
      title: "modules.reports.title",
      description: "modules.reports.description",
      icon: <BarChart3 className="h-6 w-6" />,
      path: "/reports",
      color: "indigo",
    },
    {
      title: "modules.settings.title",
      description: "modules.settings.description",
      icon: <Settings className="h-6 w-6" />,
      path: "/settings",
      color: "slate",
    },
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{t("dashboard.modules")}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ModuleCard
              title={module.title}
              description={module.description}
              icon={module.icon}
              path={module.path}
              color={module.color}
              isRtl={isRtl}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ModuleShortcuts;
