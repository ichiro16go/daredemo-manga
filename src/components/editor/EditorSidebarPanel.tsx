"use client";

import { Sparkles } from "lucide-react";

interface EditorSidebarPanelProps {
  activeTab: string;
  title: string;
}

export function EditorSidebarPanel({ activeTab, title }: EditorSidebarPanelProps) {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-900/10 flex flex-col p-4 select-none">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-purple-400" />
        {title}
      </h3>

      {/* Tab Panels */}
      {activeTab === "panels" && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500 leading-relaxed">コマのテンプレートを選択、または直接キャンバス上に作成します。</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="h-20 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 text-xs transition-colors">
              <div className="h-6 w-12 border-2 border-zinc-700 rounded" />
              1コマ
            </button>
            <button className="h-20 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 text-xs transition-colors">
              <div className="h-6 w-12 border-2 border-zinc-700 divide-x divide-zinc-700 rounded flex" />
              2コマ (均等)
            </button>
            <button className="h-20 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 text-xs transition-colors">
              <div className="h-6 w-12 border-2 border-zinc-700 divide-y divide-zinc-700 rounded flex flex-col" />
              2コマ (上下)
            </button>
            <button className="h-20 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 text-xs transition-colors">
              <div className="h-6 w-12 border-2 border-dashed border-purple-500/50 rounded flex items-center justify-center text-[8px] text-purple-400">
                + カスタム
              </div>
              自由分割
            </button>
          </div>
        </div>
      )}

      {activeTab === "characters" && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500 leading-relaxed">ライブラリ内のキャラ、または新規作成したキャラをコマにドラッグ配置します。</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors cursor-grab">
              <div className="h-10 w-10 rounded-lg bg-blue-500/15 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">ル</div>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">ルナ (魔法使い)</h4>
                <span className="text-[9px] text-zinc-500">ファンタジー・10代</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors cursor-grab">
              <div className="h-10 w-10 rounded-lg bg-rose-500/15 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold">ケ</div>
              <div>
                <h4 className="text-xs font-bold text-zinc-200">ケンタ (ライバル)</h4>
                <span className="text-[9px] text-zinc-500">学園モノ・男子</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "backgrounds" && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500 leading-relaxed">テキストの指示を基に、コマやシーンに合った背景をAI生成します。</p>
          <textarea
            className="w-full h-24 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-purple-600 transition-all resize-none"
            placeholder="例: 暗い森の中、月明かりが木々の隙間から差し込んでいる。モノクロ、マンガ背景風。"
          />
          <button className="w-full h-9 bg-purple-600 hover:bg-purple-500 text-xs font-semibold rounded-lg text-white shadow-lg shadow-purple-600/10 active:scale-95 transition-all flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            AI背景生成
          </button>
        </div>
      )}

      {activeTab === "bubbles" && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500 leading-relaxed">感情やセリフに応じた吹き出しを配置し、日本語テキストをダブルクリックで編集します。</p>
          <div className="grid grid-cols-2 gap-2">
            <button className="h-16 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center justify-center text-xs transition-colors">
              💬 通常
            </button>
            <button className="h-16 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center justify-center text-xs transition-colors">
              💭 モヤモヤ
            </button>
            <button className="h-16 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center justify-center text-xs transition-colors">
              💥 フラッシュ
            </button>
            <button className="h-16 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl flex items-center justify-center text-xs transition-colors">
              📢 四角
            </button>
          </div>
        </div>
      )}

      {activeTab === "coloring" && (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500 leading-relaxed">完成した線画マンガに、AI自動着彩を実行します。スタイルプリセットを選択できます。</p>
          <div className="space-y-2">
            <button className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 border border-purple-500/40 text-purple-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors">
              🎨 アニメ塗り風
            </button>
            <button className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors">
              🖌️ 水彩塗り風
            </button>
            <button className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors">
              🌅 映画風シネマティック
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
