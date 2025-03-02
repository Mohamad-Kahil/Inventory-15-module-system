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
    <div className="flex h-screen bg-background" dir={isRtl ? "rtl" : "ltr"}>
      <AnimatePresence initial={false}>
        <motion.div
          key="sidebar"
          initial={{ width: sidebarExpanded ? 280 : 80 }}
          animate={{ width: sidebarExpanded ? 280 : 80 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 z-20 h-full"
          style={{
            [isRtl ? "right" : "left"]: 0, // Explicitly position sidebar
          }}
        >
          <Sidebar expanded={sidebarExpanded} isRtl={isRtl} />
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="flex-1 flex flex-col overflow-hidden"
        animate={{
          marginLeft: isRtl ? 0 : sidebarExpanded ? 280 : 80,
          marginRight: isRtl ? (sidebarExpanded ? 280 : 80) : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Header
          toggleSidebar={toggleSidebar}
          sidebarExpanded={sidebarExpanded}
        />
        <main className="flex-1 overflow-auto bg-[#0f172a] p-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto py-4 px-0"
          >
            {children || <Outlet />}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
};

export default MainLayout;
