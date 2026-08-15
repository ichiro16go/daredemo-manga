"use client";

import { useState } from "react";
import { Layout, User, Image as ImageIcon, MessageSquare, Paintbrush } from "lucide-react";
import { EditorHeader } from "@/components/editor/EditorHeader";
import { EditorSidebarTabs } from "@/components/editor/EditorSidebarTabs";
import { EditorSidebarPanel } from "@/components/editor/EditorSidebarPanel";
import { CanvasViewport } from "@/components/editor/CanvasViewport";
import { InspectorPanel } from "@/components/editor/InspectorPanel";

type EditorTabType = "panels" | "characters" | "backgrounds" | "bubbles" | "coloring";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<EditorTabType>("panels");
  const [zoom, setZoom] = useState(100);

  const sidebarTabs = [
    { id: "panels", label: "コマ割り", icon: Layout },
    { id: "characters", label: "キャラ", icon: User },
    { id: "backgrounds", label: "背景生成", icon: ImageIcon },
    { id: "bubbles", label: "吹き出し", icon: MessageSquare },
    { id: "coloring", label: "自動着彩", icon: Paintbrush },
  ];

  const handleZoomIn = () => setZoom((prev) => Math.min(200, prev + 10));
  const handleZoomOut = () => setZoom((prev) => Math.max(50, prev - 10));

  const handleTabChange = (id: string) => {
    const validTabs: string[] = ["panels", "characters", "backgrounds", "bubbles", "coloring"];
    const isValidTab = (tab: string): tab is EditorTabType => validTabs.includes(tab);
    if (isValidTab(id)) {
      setActiveTab(id);
    }
  };

  const activeTabLabel = sidebarTabs.find((t) => t.id === activeTab)?.label || "";

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full">
      <EditorHeader
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <EditorSidebarTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={sidebarTabs}
        />
        
        <EditorSidebarPanel
          activeTab={activeTab}
          title={activeTabLabel}
        />
        
        <CanvasViewport zoom={zoom} />
        
        <InspectorPanel />
      </div>
    </div>
  );
}
