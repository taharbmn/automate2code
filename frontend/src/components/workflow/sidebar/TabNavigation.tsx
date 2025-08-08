import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
  const tabWidth = `${100 / tabs.length}%`;
  
  return (
    <div className="p-4">
      <div className="relative bg-surface border border-border rounded-full px-3 p-1">
        <div className="grid relative" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
          <motion.div
            className="absolute inset-y-1 bg-primary rounded-full"
            initial={false}
            animate={{
              x: `${activeIndex * 100}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{ width: tabWidth }}
          />
          
          {tabs.map((tab) => {
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex gap-3 items-center justify-center cursor-pointer py-3 text-sm font-medium transition-all relative z-10 rounded-full ${
                  activeTab === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon strokeWidth={2} className="w-[18px] h-[18px] text-white" />
                <span className="hidden sm:inline text-white">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
