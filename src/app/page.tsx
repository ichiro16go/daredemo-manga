import Link from "next/link";
import { BookOpen, Palette, Smartphone, Sparkles, Laptop, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-zinc-950 text-white overflow-hidden font-sans select-none">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[100px] pointer-events-none" />
      
      {/* Decorative Grid Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 mb-4 animate-fade-in">
          <div className="p-2.5 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl shadow-lg shadow-purple-500/30">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            daredemo-manga
          </span>
        </div>

        {/* Catchphrase */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mb-6 leading-[1.15]">
          アイデアさえあれば、<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            誰でも漫画家
          </span>
          になれる場所
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          画力は不要。AIの力を借りて、キャラクター作成、ネーム、線画、背景、着彩まで。すべての工程をストレスなく。
        </p>

        {/* Client Selector (Portal Cards) */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
          {/* PC Editor Portal Card */}
          <div className="group relative flex flex-col justify-between p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl hover:border-purple-500/40 hover:bg-zinc-900/80 transition-all duration-300 shadow-xl backdrop-blur-sm">
            <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full flex items-center gap-1">
              <Laptop className="h-3 w-3" /> PC推奨
            </div>
            
            <div className="text-left mb-8">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl w-fit mb-4 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all duration-300">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                フル機能・漫画エディタ
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                キャンバス操作、線画化、自動着彩、ポーズ指定、背景生成など、作品を創り上げるためのプロ仕様フル機能。
              </p>
            </div>

            <Link
              href="/library"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-semibold hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/20 active:scale-[0.98] transition-all duration-200"
            >
              エディタに入る (ライブラリ画面へ)
            </Link>
          </div>

          {/* Mobile PWA Portal Card */}
          <div className="group relative flex flex-col justify-between p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl hover:border-blue-500/40 hover:bg-zinc-900/80 transition-all duration-300 shadow-xl backdrop-blur-sm">
            <div className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full flex items-center gap-1">
              <Smartphone className="h-3 w-3" /> スマホ推奨
            </div>

            <div className="text-left mb-8">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl w-fit mb-4 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                モバイル読者 & キャラ生成
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                他クリエイターの作品を快適にスクロール閲覧。空いた時間にスマホからキャラクターだけを創ることも可能。
              </p>
            </div>

            <Link
              href="/mobile"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-sm font-semibold hover:from-blue-500 hover:to-cyan-500 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all duration-200"
            >
              スマホ版を起動する (PWA)
            </Link>
          </div>
        </div>

        {/* Feature quick badges */}
        <div className="flex flex-wrap justify-center gap-y-3 gap-x-6 text-xs text-zinc-500 border-t border-zinc-900 pt-8 w-full max-w-2xl">
          <span className="flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-purple-500" /> AI一貫性キャラクター生成</span>
          <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4 text-blue-500" /> 縦スクロール型マンガビューワー</span>
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> 完全に独立したセキュアなDB</span>
        </div>
      </main>
    </div>
  );
}
