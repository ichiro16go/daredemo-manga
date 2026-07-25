"use client";

import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, Bell, Search, Award } from "lucide-react";

interface WorkCardProps {
  id: string;
  author: string;
  avatarLetter: string;
  title: string;
  pages: number;
  initialLikes: number;
  initialComments: number;
  initialIsLiked?: boolean;
  coverGradient: string;
}

function WorkCard({
  author,
  avatarLetter,
  title,
  pages,
  initialLikes,
  initialComments,
  initialIsLiked = false,
  coverGradient
}: WorkCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl overflow-hidden shadow-xl mb-6">
      {/* Author Bar */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
            {avatarLetter}
          </div>
          <div className="text-left">
            <h4 className="text-xs font-bold text-zinc-100">{author}</h4>
            <span className="text-[9px] text-zinc-500">2時間前</span>
          </div>
        </div>
        <div className="text-[9px] font-semibold px-2 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700/50 rounded-full">
          {pages}P
        </div>
      </div>

      {/* Cover Artwork Canvas placeholder */}
      <div className={`h-64 bg-gradient-to-tr ${coverGradient} relative flex flex-col justify-end p-5 border-t border-b border-zinc-900 group`}>
        {/* Transparent dark gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        {/* Comic Mock frames inside the cover */}
        <div className="absolute inset-4 border border-white/10 rounded-xl pointer-events-none flex flex-col gap-2 p-3">
          <div className="h-2/5 border border-dashed border-white/5 rounded-lg" />
          <div className="flex-1 flex gap-2">
            <div className="flex-1 border border-dashed border-white/5 rounded-lg" />
            <div className="flex-1 border border-dashed border-white/5 rounded-lg" />
          </div>
        </div>

        <h3 className="relative z-10 font-bold text-sm leading-snug tracking-tight text-white mb-1.5 drop-shadow">
          {title}
        </h3>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-all active:scale-90 ${
              isLiked ? "text-pink-500" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Heart className={`h-4.5 w-4.5 ${isLiked ? "fill-pink-500 text-pink-500" : ""}`} />
            <span>{likes}</span>
          </button>
          
          <button className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors">
            <MessageCircle className="h-4.5 w-4.5" />
            <span>{initialComments}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-full transition-all active:scale-90 ${
              isBookmarked ? "text-yellow-500" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Bookmark className={`h-4.5 w-4.5 ${isBookmarked ? "fill-yellow-500 text-yellow-500" : ""}`} />
          </button>
          
          <button className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors">
            <Share2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MobileFeedPage() {
  const [feedType, setFeedType] = useState<"all" | "ranking">("all");

  const feedItems: WorkCardProps[] = [
    {
      id: "w-1",
      author: "タカシ",
      avatarLetter: "T",
      title: "異世界転生したけど画力がゼロだった件",
      pages: 4,
      initialLikes: 142,
      initialComments: 18,
      initialIsLiked: true,
      coverGradient: "from-purple-900/65 via-indigo-900/60 to-zinc-900"
    },
    {
      id: "w-2",
      author: "サクラ",
      avatarLetter: "S",
      title: "猫型AIと過ごす日常",
      pages: 1,
      initialLikes: 89,
      initialComments: 7,
      coverGradient: "from-pink-900/65 via-rose-950/60 to-zinc-900"
    },
    {
      id: "w-3",
      author: "コウヘイ",
      avatarLetter: "K",
      title: "サイバーパンク高校生の憂鬱",
      pages: 8,
      initialLikes: 256,
      initialComments: 34,
      coverGradient: "from-cyan-900/65 via-blue-950/60 to-zinc-900"
    }
  ];

  return (
    <div className="flex-1 flex flex-col p-4 select-none">
      {/* Mobile Top Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1.5">
          <Award className="h-5 w-5 text-blue-500" />
          <span className="font-extrabold text-md tracking-tight">daredemoフィード</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-zinc-900/60 rounded-full text-zinc-400 hover:text-zinc-200">
            <Search className="h-4 w-4" />
          </button>
          <button className="p-2 bg-zinc-900/60 rounded-full text-zinc-400 hover:text-zinc-200">
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Feed Filter tab selectors */}
      <div className="flex bg-zinc-900/50 border border-zinc-900 rounded-2xl p-1 mb-6">
        <button
          onClick={() => setFeedType("all")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            feedType === "all"
              ? "bg-zinc-800 text-blue-400 shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          新着フィード
        </button>
        <button
          onClick={() => setFeedType("ranking")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            feedType === "ranking"
              ? "bg-zinc-800 text-blue-400 shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          人気ランキング
        </button>
      </div>

      {/* Scrollable Work feed cards */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {(feedType === "all" ? feedItems : [...feedItems].sort((a, b) => b.initialLikes - a.initialLikes)).map((item) => (
          <WorkCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
