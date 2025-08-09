"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface TabContentProps {
  activeTab: string;
  children: React.ReactNode;
}

export default function TabContent({ activeTab, children }: TabContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}