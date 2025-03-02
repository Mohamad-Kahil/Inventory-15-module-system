import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  ShoppingCart,
  Briefcase,
  Calendar,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Package,
  Factory,
  ShoppingBag,
  Package2,
  CreditCard,
  Truck,
  FileSpreadsheet,
  Building,
  LineChart,
  Megaphone,
} from "lucide-react";

interface SidebarProps {
  expanded: boolean;
  isRtl?: boolean;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  expanded: boolean;
  isRtl?: boolean;
  badge?: string;
  subItems?: { label: string; path: string }[];
}

const NavItem = ({
  icon,
  label,
  path,
  expanded,
  isRtl,
  badge,
  subItems,
}: NavItemProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const hasSubItems = subItems && subItems.length > 0;

  return (
    <div className="mb-0.25">
      <NavLink
        to={hasSubItems ? "#" : path}
        onClick={(e) => {
          if (hasSubItems) {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={({ isActive }) =>
          cn(
            "flex items-center px-3 py-0.5 rounded-md text-sm transition-colors",
            "hover:bg-[#10b981]/20 hover:text-[#10b981]",
            isActive && !hasSubItems
              ? "bg-[#10b981]/10 text-[#10b981] font-medium"
              : "text-muted-foreground",
            isRtl ? "flex-row-reverse text-right" : "text-left",
          )
        }
      >
        <div
          className={cn(
            "flex items-center",
            expanded ? "w-full" : "justify-center",
            isRtl && expanded ? "flex-row-reverse" : "",
          )}
        >
          <span
            className={cn("flex-shrink-0", expanded && isRtl ? "ml-3" : "mr-3")}
          >
            {icon}
          </span>
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              {t(label)}
            </motion.span>
          )}
          {expanded && badge && (
            <Badge variant="outline" className={isRtl ? "mr-auto" : "ml-auto"}>
              {badge}
            </Badge>
          )}
          {expanded && hasSubItems && (
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "transform rotate-90",
                isRtl ? "mr-auto" : "ml-auto",
              )}
            />
          )}
        </div>
      </NavLink>

      {expanded && hasSubItems && isOpen && (
        <div className={cn("mt-1 space-y-1", isRtl ? "mr-7" : "ml-7")}>
          {subItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-0.5 rounded-md text-xs transition-colors",
                  "hover:bg-[#10b981]/20 hover:text-[#10b981]",
                  isActive
                    ? "bg-[#10b981]/5 text-[#10b981] font-medium"
                    : "text-muted-foreground",
                  isRtl ? "flex-row-reverse text-right" : "text-left",
                )
              }
            >
              {t(item.label)}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ expanded, isRtl = false }: SidebarProps) => {
  const { t } = useLanguage();

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "nav.dashboard",
      path: "/",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "nav.users",
      path: "/users",
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "nav.products",
      path: "/products",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "nav.customers",
      path: "/customers",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      label: "nav.suppliers",
      path: "/suppliers",
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      label: "nav.purchases",
      path: "/purchases",
    },
    {
      icon: <Package2 className="h-5 w-5" />,
      label: "nav.inventory",
      path: "/inventory",
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "nav.sales",
      path: "/sales",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "nav.pos",
      path: "/pos",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "nav.invoicing",
      path: "/invoicing",
    },
    {
      icon: <Truck className="h-5 w-5" />,
      label: "nav.logistics",
      path: "/logistics",
    },
    {
      icon: <Building className="h-5 w-5" />,
      label: "nav.production",
      path: "/production",
    },
    {
      icon: <FileSpreadsheet className="h-5 w-5" />,
      label: "nav.accounting",
      path: "/accounting",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "nav.analytics",
      path: "/analytics",
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      label: "nav.planning",
      path: "/planning",
    },
    {
      icon: <Megaphone className="h-5 w-5" />,
      label: "nav.marketing",
      path: "/marketing",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "nav.settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "h-full border-r border-border bg-[#0f172a] text-white flex flex-col",
        expanded ? "w-[280px]" : "w-[80px]",
        isRtl ? "right-0 border-l" : "left-0 border-r",
      )}
      dir={isRtl ? "rtl" : "ltr"}
      style={{ position: "fixed" }}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b border-[#1e293b] px-4",
          expanded
            ? isRtl
              ? "justify-end"
              : "justify-start"
            : "justify-center",
        )}
      >
        {expanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn("flex items-center", isRtl && "flex-row-reverse")}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-md bg-[#10b981] flex items-center justify-center text-white font-bold",
                isRtl ? "ml-2" : "mr-2",
              )}
            >
              IN
            </div>
            <h1 className="text-xl font-bold">{t("app.title")}</h1>
          </motion.div>
        ) : (
          <div className="h-8 w-8 rounded-md bg-[#10b981] flex items-center justify-center text-white font-bold">
            IN
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 py-1 max-h-[calc(100vh-8rem)]">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              expanded={expanded}
              isRtl={isRtl}
              badge={item.badge}
              subItems={item.subItems}
            />
          ))}
        </nav>
      </ScrollArea>

      <div className="mt-auto p-4 border-t border-[#1e293b]">
        {expanded ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-2"
          >
            <div className="text-xs text-muted-foreground">
              <span className="block">{t("app.version")}: 1.0.0</span>
              <Separator className="my-2" />
              <span className="block">{t("app.copyright")} © 2024</span>
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-center">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
