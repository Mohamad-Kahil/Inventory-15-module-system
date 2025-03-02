import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLanguage } from "@/hooks/useLanguage";
import { motion, AnimatePresence } from "framer-motion";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { direction } = useLanguage();
  const isRtl = direction === "rtl";

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div
      className={`flex h-screen bg-background ${isRtl ? "flex-row-reverse" : "flex-row"}`}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key="sidebar"
          initial={{ width: sidebarExpanded ? 280 : 80 }}
          animate={{ width: sidebarExpanded ? 280 : 80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-20 h-full"
        >
          <Sidebar expanded={sidebarExpanded} isRtl={isRtl} />
        </motion.div>
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          sidebarExpanded={sidebarExpanded}
        />
        <main className="flex-1 overflow-auto bg-muted/20 p-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto py-6 px-4 md:px-6"
          >
            {children || <Outlet />}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
