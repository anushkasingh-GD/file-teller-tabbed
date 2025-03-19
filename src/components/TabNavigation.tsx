
import React from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  return (
    <div className={cn("flex", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative py-2 px-4 text-sm font-medium transition-colors duration-200",
            tab.id === activeTab 
              ? "text-app-blue tab-active" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
          <div className="tab-underline" />
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
