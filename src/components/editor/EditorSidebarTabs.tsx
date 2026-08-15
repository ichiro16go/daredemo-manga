"use client";

import { LucideIcon } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface EditorSidebarTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  tabs: TabItem[];
}

export function EditorSidebarTabs({ activeTab, onTabChange, tabs }: EditorSidebarTabsProps) {
  return (
    <aside className="w-16 border-r border-zinc-800 bg-zinc-900/20 flex flex-col items-center py-4 gap-4 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`group relative h-12 w-12 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
              isActive
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/15"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/20"
            }`}
            title={tab.label}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[9px] font-semibold">{tab.label.slice(0, 4)}</span>
            
            {/* Tooltip */}
            <span className="absolute left-16 px-2 py-1 bg-zinc-900 text-xs text-zinc-100 rounded border border-zinc-800 shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
              {tab.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
