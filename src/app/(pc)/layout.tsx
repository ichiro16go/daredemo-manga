"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, FolderHeart, PenTool, Home, Settings, User } from "lucide-react";

export default function PcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/library", label: "ライブラリ", icon: FolderHeart },
    { href: "/editor", label: "漫画エディタ", icon: PenTool },
  ];

  return (
    <div className="flex h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between select-none">
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 p-6 border-b border-zinc-800/80 hover:bg-zinc-800/20 transition-all duration-200">
            <div className="p-1.5 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg shadow-md shadow-purple-500/10">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300 text-lg">
              daredemo-manga
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40 transition-all duration-150"
            >
              <Home className="h-4 w-4" />
              <span>ポータルに戻る</span>
            </Link>

            <div className="h-px bg-zinc-800/60 my-4" />

            <div className="text-xs font-semibold text-zinc-500 px-3.5 mb-2 uppercase tracking-wider">
              Workspaces
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/10"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile section */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <User className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-zinc-200">ゲストユーザー</div>
              <div className="text-[10px] text-zinc-500">Free Plan</div>
            </div>
          </div>
          <button className="p-2 text-zinc-500 hover:text-zinc-300 rounded-lg hover:bg-zinc-800/40 transition-all duration-150">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
