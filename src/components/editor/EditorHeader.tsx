"use client";

import Link from "next/link";
import { ChevronLeft, Undo, Redo, ZoomOut, ZoomIn, Download, Share2 } from "lucide-react";

interface EditorHeaderProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function EditorHeader({ zoom, onZoomIn, onZoomOut }: EditorHeaderProps) {
  return (
    <header className="h-14 border-b border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-between px-4 select-none">
      <div className="flex items-center gap-4">
        <Link
          href="/library"
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 transition-all"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="text-left">
          <h2 className="text-sm font-bold text-zinc-200">無題のマンガ</h2>
          <p className="text-[10px] text-zinc-500">自動保存されました: 2026-07-25 15:30</p>
        </div>
      </div>

      {/* History & Zoom Controls */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-zinc-500 hover:text-zinc-300 rounded-lg hover:bg-zinc-800/40 transition-all" title="元に戻す">
          <Undo className="h-4 w-4" />
        </button>
        <button className="p-2 text-zinc-500 hover:text-zinc-300 rounded-lg hover:bg-zinc-800/40 transition-all" title="やり直す">
          <Redo className="h-4 w-4" />
        </button>
        <div className="w-px h-4 bg-zinc-800 mx-2" />
        <div className="flex items-center gap-1.5 bg-zinc-950/40 px-2.5 py-1 rounded-lg border border-zinc-800">
          <button onClick={onZoomOut} className="p-1 text-zinc-500 hover:text-zinc-300 transition-all">
            <ZoomOut className="h-3 w-3" />
          </button>
          <span className="text-xs font-semibold text-zinc-400 w-10 text-center">{zoom}%</span>
          <button onClick={onZoomIn} className="p-1 text-zinc-500 hover:text-zinc-300 transition-all">
            <ZoomIn className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button className="h-9 flex items-center gap-1.5 px-3.5 rounded-lg border border-zinc-800 hover:bg-zinc-800/40 text-xs font-semibold text-zinc-300 transition-all">
          <Download className="h-3.5 w-3.5" />
          書き出し
        </button>
        <button className="h-9 flex items-center gap-1.5 px-3.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg shadow-purple-600/10 active:scale-95 transition-all">
          <Share2 className="h-3.5 w-3.5" />
          シェア・投稿
        </button>
      </div>
    </header>
  );
}
