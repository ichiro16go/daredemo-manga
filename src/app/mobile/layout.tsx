"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Sparkles, Home, Battery, Wifi } from "lucide-react";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/mobile", label: "読む", icon: BookOpen },
    { href: "/mobile/character", label: "キャラ生成", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-sans overflow-y-auto py-0 md:py-8">
      {/* Smartphone Frame Wrapper (Only shows on Desktop viewports) */}
      <div className="relative w-full md:w-[390px] h-screen md:h-[844px] md:rounded-[48px] md:border-[10px] md:border-zinc-800 bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden shadow-2xl md:ring-1 md:ring-zinc-700/50">
        
        {/* Smartphone Notch / Top status bar (Only visible on Desktop mockup or if we style it as such) */}
        <div className="h-11 bg-zinc-950 flex items-center justify-between px-6 select-none shrink-0 border-b border-zinc-900/60">
          {/* Mock Time */}
          <span className="text-xs font-bold text-zinc-300">15:32</span>
          {/* Mock Notch */}
          <div className="hidden md:block w-28 h-4.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
          {/* Mock Status Icons */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-4 w-4" />
          </div>
        </div>

        {/* Mobile Viewport Content Area (Scrollable scroll-container) */}
        <main className="flex-1 flex flex-col overflow-y-auto pb-16 relative">
          {children}
        </main>

        {/* Persistent Bottom Tab Bar Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800/80 flex items-center justify-around px-4 z-40 select-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all ${
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "scale-105" : "scale-100"} transition-transform`} />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
          
          {/* Exit PWA Back to Portal */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-zinc-500 hover:text-zinc-300"
          >
            <Home className="h-5 w-5" />
            <span className="text-[10px]">ポータル</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
