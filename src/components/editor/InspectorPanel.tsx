"use client";

import { Layers, Settings, Maximize2 } from "lucide-react";

export function InspectorPanel() {
  return (
    <aside className="w-64 border-l border-zinc-800 bg-zinc-900/40 p-4 flex flex-col justify-between select-none">
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            レイヤー
          </h3>
          <div className="space-y-1 bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-1.5">
            <div className="flex items-center justify-between text-xs px-2.5 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg font-medium">
              <span>💬 吹き出し(1)</span>
              <span className="text-[10px] text-zinc-600 font-bold">TOP</span>
            </div>
            <div className="flex items-center justify-between text-xs px-2.5 py-1.5 hover:bg-zinc-800/40 text-zinc-400 rounded-lg">
              <span>👤 キャラクター(ルナ)</span>
            </div>
            <div className="flex items-center justify-between text-xs px-2.5 py-1.5 hover:bg-zinc-800/40 text-zinc-400 rounded-lg">
              <span>🌅 コマ枠・レイアウト</span>
            </div>
            <div className="flex items-center justify-between text-xs px-2.5 py-1.5 hover:bg-zinc-800/40 text-zinc-400 rounded-lg">
              <span>🎨 背景レイヤー</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-1.5">
            <Settings className="h-3.5 w-3.5" />
            オブジェクト設定
          </h3>
          <p className="text-[10px] text-zinc-500 leading-relaxed bg-zinc-950/10 p-2.5 rounded-xl border border-dashed border-zinc-800">
            キャンバス上の要素を選択すると、その要素の位置、スケール、反転、重なりなどのプロパティがここに表示されます。
          </p>
        </div>
      </div>

      <div className="h-px bg-zinc-800/80 my-4" />

      {/* Canvas Help tips */}
      <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
        <Maximize2 className="h-3.5 w-3.5 text-zinc-600" />
        <span>Spaceキーを押しながらドラッグでパン(移動)</span>
      </div>
    </aside>
  );
}
