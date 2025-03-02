import React, { useState } from "react";
import {
  Bell,
  Moon,
  Sun,
  Globe,
  ChevronDown,
  Menu,
  Search,
  HelpCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  toggleSidebar?: () => void;
  sidebarExpanded?: boolean;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  notifications?: Array<{ id: string; title: string; read: boolean }>;
}

const Header = ({
  toggleSidebar = () => {},
  sidebarExpanded = true,
  userName = "John Doe",
  userRole = "Administrator",
  userAvatar = "",
  notifications = [
    { id: "1", title: "New user registered", read: false },
    { id: "2", title: "Monthly report available", read: false },
    { id: "3", title: "System update scheduled", read: true },
  ],
}: HeaderProps) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, direction, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");
  const isRtl = direction === "rtl";

  return (
    <header className="h-16 w-full bg-background border-b border-border flex items-center justify-between px-4 sticky top-0 z-10">
      <div className={cn("flex items-center", isRtl && "flex-row-reverse")}>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(isRtl ? "ml-2" : "mr-2")}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl font-semibold hidden md:block"
        >
          {t("app.title")}
        </motion.h1>
      </div>

      {/* Search Bar - Expandable */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search
            className={cn(
              "absolute top-2.5 text-muted-foreground h-4 w-4",
              isRtl ? "right-3" : "left-3",
            )}
          />
          <Input
            placeholder={t("app.search")}
            className={cn(
              "bg-muted/30 border-none h-9",
              isRtl ? "pr-10" : "pl-10",
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-1 md:gap-2",
          isRtl && "flex-row-reverse",
        )}
      >
        {/* Help */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("app.help")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Mobile Search */}
        <div className="md:hidden">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("app.search")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Language Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="relative"
              >
                <Globe className="h-5 w-5" />
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold opacity-70">
                  {language.toUpperCase()}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRtl ? "Switch to English" : "التبديل إلى العربية"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Theme Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{theme === "dark" ? t("theme.light") : t("theme.dark")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Notifications */}
        <DropdownMenu
          open={isNotificationsOpen}
          onOpenChange={setIsNotificationsOpen}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        variant="destructive"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("notifications.title")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent align={isRtl ? "start" : "end"} className="w-80">
            <DropdownMenuLabel>{t("notifications.title")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground">
                {t("notifications.empty")}
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="py-3 cursor-pointer"
                >
                  <div
                    className={cn(
                      "flex items-start gap-2 w-full",
                      isRtl && "flex-row-reverse text-right",
                    )}
                  >
                    <div
                      className={`h-2 w-2 mt-1.5 rounded-full ${notification.read ? "bg-muted" : "bg-primary"}`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${notification.read ? "text-muted-foreground" : "font-medium"}`}
                      >
                        {notification.title}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary">
              {t("notifications.markAllRead")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center gap-2 px-2",
                isRtl && "flex-row-reverse",
              )}
            >
              <Avatar className="h-8 w-8 border-2 border-primary/20">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "hidden md:flex flex-col",
                  isRtl ? "items-end" : "items-start",
                )}
              >
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">
                  {t(`roles.${userRole.toLowerCase()}`)}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRtl ? "start" : "end"} className="w-56">
            <DropdownMenuLabel>{t("user.myAccount")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={isRtl ? "text-right" : ""}>
              {t("user.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem className={isRtl ? "text-right" : ""}>
              {t("user.settings")}
            </DropdownMenuItem>
            <DropdownMenuItem className={isRtl ? "text-right" : ""}>
              {t("user.help")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn("text-destructive", isRtl && "text-right")}
            >
              {t("user.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Search Expanded */}
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 left-0 right-0 bg-background border-b border-border p-2 md:hidden z-20"
        >
          <div className="relative w-full">
            <Search
              className={cn(
                "absolute top-2.5 text-muted-foreground h-4 w-4",
                isRtl ? "right-3" : "left-3",
              )}
            />
            <Input
              placeholder={t("app.search")}
              className={cn(
                "bg-muted/30 border-none h-9",
                isRtl ? "pr-10" : "pl-10",
              )}
              autoFocus
            />
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
