"use client";

interface CanvasViewportProps {
  zoom: number;
}

export function CanvasViewport({ zoom }: CanvasViewportProps) {
  return (
    <section className="flex-1 bg-zinc-950 p-8 flex items-center justify-center relative overflow-auto">
      {/* Fabric.js Canvas Wrapper Mock */}
      <div
        className="bg-white text-black shadow-2xl relative select-none cursor-default border-4 border-zinc-900 flex flex-col"
        style={{
          width: "420px",
          height: "594px",
          transform: `scale(${zoom / 100})`,
          transformOrigin: "center center",
          transition: "transform 0.15s ease-out"
        }}
      >
        {/* Comic page template inside */}
        <div className="p-4 flex-1 flex flex-col gap-4">
          {/* Top Panel (Panel 1) */}
          <div className="h-2/5 border-[3px] border-black bg-zinc-50 flex items-center justify-center relative group overflow-hidden">
            <div className="text-xs text-zinc-400 font-medium">1コマ目 (背景・キャラクター未配置)</div>
            <div className="absolute inset-0 border-2 border-dashed border-purple-500 opacity-0 group-hover:opacity-40 transition-opacity" />
          </div>

          {/* Bottom Panels Layout (Panel 2 & 3 split) */}
          <div className="flex-1 flex gap-4">
            <div className="flex-1 border-[3px] border-black bg-zinc-50 flex items-center justify-center relative group overflow-hidden">
              <div className="text-xs text-zinc-400 font-medium p-4 text-center">2コマ目</div>
              <div className="absolute inset-0 border-2 border-dashed border-purple-500 opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="flex-1 border-[3px] border-black bg-zinc-50 flex items-center justify-center relative group overflow-hidden">
              <div className="text-xs text-zinc-400 font-medium p-4 text-center">3コマ目</div>
              <div className="absolute inset-0 border-2 border-dashed border-purple-500 opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </div>
        
        {/* Page indicator bottom */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-zinc-500">
          PAGE 1 / 1
        </div>
      </div>
    </section>
  );
}
