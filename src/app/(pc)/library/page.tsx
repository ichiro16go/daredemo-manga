"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, BookOpen, UserSquare, Calendar, Eye, EyeOff, Sparkles } from "lucide-react";

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<"works" | "characters">("works");

  const mockWorks = [
    {
      id: "work-1",
      title: "異世界転生したけど画力がゼロだった件",
      updatedAt: "2026-07-25",
      status: "public",
      pages: 4,
      coverColor: "from-purple-500/20 to-indigo-500/30",
    },
    {
      id: "work-2",
      title: "猫型AIと過ごす日常",
      updatedAt: "2026-07-24",
      status: "private",
      pages: 1,
      coverColor: "from-pink-500/20 to-orange-500/30",
    },
  ];

  const mockCharacters = [
    {
      id: "char-1",
      name: "ルナ (魔法使い)",
      createdAt: "2026-07-25",
      prompt: "銀髪、青い瞳、フード付きのローブを羽織った10代の少女、ファンタジーアニメ風",
      avatarColor: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    },
    {
      id: "char-2",
      name: "ケンタ (主人公のライバル)",
      createdAt: "2026-07-23",
      prompt: "黒髪ツンツン、勝気な表情、赤いパーカー、学園モノ",
      avatarColor: "bg-rose-500/10 border-rose-500/20 text-rose-400",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">ライブラリ</h1>
          <p className="text-zinc-500 text-sm mt-1">保存された作品やキャラクターを管理・編集します。</p>
        </div>

        {activeTab === "works" ? (
          <Link
            href="/editor"
            className="flex h-10 items-center gap-1.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-semibold shadow-lg shadow-purple-600/15 active:scale-95 transition-all duration-150 text-white"
          >
            <Plus className="h-4 w-4" />
            新規作品を作成
          </Link>
        ) : (
          <Link
            href="/mobile/character"
            className="flex h-10 items-center gap-1.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-semibold shadow-lg shadow-purple-600/15 active:scale-95 transition-all duration-150 text-white"
          >
            <Sparkles className="h-4 w-4" />
            新規キャラを生成
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800/80 mb-6 gap-6 select-none">
        <button
          onClick={() => setActiveTab("works")}
          className={`flex items-center gap-2 pb-3.5 text-sm font-semibold transition-all duration-150 border-b-2 relative ${
            activeTab === "works"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>作品一覧</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
            {mockWorks.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("characters")}
          className={`flex items-center gap-2 pb-3.5 text-sm font-semibold transition-all duration-150 border-b-2 relative ${
            activeTab === "characters"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <UserSquare className="h-4 w-4" />
          <span>キャラクター一覧</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
            {mockCharacters.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "works" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWorks.map((work) => (
            <div
              key={work.id}
              className="group relative flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-200 overflow-hidden shadow-lg"
            >
              {/* Dummy Book Cover Illustration */}
              <div className={`h-40 bg-gradient-to-br ${work.coverColor} relative flex items-center justify-center p-6 border-b border-zinc-800/40 group-hover:opacity-95 transition-opacity`}>
                <BookOpen className="h-10 w-10 text-zinc-400/60" />
                <div className="absolute top-3 left-3 text-xs font-semibold px-2 py-0.5 bg-zinc-950/40 border border-zinc-800/30 text-zinc-300 rounded-full">
                  {work.pages} ページ
                </div>
                {work.status === "public" ? (
                  <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center gap-1.5">
                    <Eye className="h-3 w-3" /> 公開中
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 bg-zinc-500/10 border border-zinc-800/40 text-zinc-400 rounded-full flex items-center gap-1.5">
                    <EyeOff className="h-3 w-3" /> 非公開
                  </div>
                )}
              </div>

              {/* Work Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-zinc-100 group-hover:text-purple-400 transition-colors line-clamp-1">
                    {work.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>更新: {work.updatedAt}</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Link
                    href="/editor"
                    className="flex-1 h-9 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold transition-all"
                  >
                    編集する
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCharacters.map((char) => (
            <div
              key={char.id}
              className="group relative flex flex-col bg-zinc-900/40 border border-zinc-800/80 rounded-2xl hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all duration-200 p-5 shadow-lg"
            >
              {/* Profile/Avatar header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`h-12 w-12 rounded-2xl ${char.avatarColor} border flex items-center justify-center font-extrabold text-lg`}>
                  {char.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 group-hover:text-purple-400 transition-colors">
                    {char.name}
                  </h3>
                  <div className="text-[10px] text-zinc-500 mt-0.5">作成: {char.createdAt}</div>
                </div>
              </div>

              {/* Prompt box */}
              <div className="flex-1 bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-3 text-xs text-zinc-400 leading-relaxed mb-4 min-h-[4rem] line-clamp-3">
                <span className="font-semibold text-zinc-500 block mb-0.5">生成プロンプト:</span>
                {char.prompt}
              </div>

              <div className="flex gap-2">
                <Link
                  href="/mobile/character"
                  className="flex-1 h-9 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold transition-all"
                >
                  対話修正
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
