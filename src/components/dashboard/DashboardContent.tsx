import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import MetricsGrid from "./MetricsGrid";
import ChartsSection from "./ChartsSection";
import ModuleShortcuts from "./ModuleShortcuts";

interface DashboardContentProps {
  className?: string;
}

const DashboardContent = ({ className }: DashboardContentProps) => {
  const { t } = useLanguage();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {t("dashboard.title")}
        </h1>
        <p className="text-muted-foreground">
          {t("dashboard.welcome")}! {t("dashboard.overview")}
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MetricsGrid />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ChartsSection />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ModuleShortcuts />
      </motion.div>
    </motion.div>
  );
};

export default DashboardContent;
