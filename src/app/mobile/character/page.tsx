"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Check } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  imageColor?: string; // Simulates generated character thumbnail
  charName?: string;
}

export default function MobileCharacterPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "キャラクター作成へようこそ！どんなキャラクターを作りたいですか？\n「銀髪の魔法使いの少女」や「黒髪パーカーの男子高生」のように教えてください！✨",
      timestamp: "15:32",
    }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSend = () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    // Simulate AI Generation feedback loop
    setTimeout(() => {
      const isRevision = messages.length > 1; // If messages are more than greeting + user response, it's a revision
      
      const aiResponse: ChatMessage = isRevision 
        ? {
            id: `m-${Date.now() + 1}`,
            sender: "ai",
            text: `ご指示「${userMessage.text}」を反映して、キャラクターを修正・再生成しました！いかがでしょうか？🎨\n（ライブラリにも最新の差分が保存されました）`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            imageColor: "from-blue-600/30 via-purple-600/25 to-zinc-900",
            charName: "ルナ (魔法使い) - 差分修正"
          }
        : {
            id: `m-${Date.now() + 1}`,
            sender: "ai",
            text: `新しいキャラクターを生成しました！✨ 「ルナ」と名付けました。\n\n「ポーズをガッツポーズにして」「怒った表情にして」「服の色を赤にして」といった対話指示で、このまま修正することができます！`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            imageColor: "from-purple-600/30 via-indigo-600/25 to-zinc-900",
            charName: "ルナ (魔法使い)"
          };

      setMessages((prev) => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSuggest = (text: string) => {
    setInput(text);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden select-none h-full relative">
      {/* Header */}
      <header className="px-4 h-12 flex items-center justify-between border-b border-zinc-900/60 shrink-0">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4.5 w-4.5 text-blue-400" />
          <span className="font-extrabold text-sm tracking-tight">AIキャラ生成</span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 border border-emerald-500/20 rounded-full flex items-center gap-1">
          <Check className="h-3 w-3" /> Online
        </span>
      </header>

      {/* Suggestion Chips (Quick prompts) */}
      {messages.length === 1 && !isGenerating && (
        <div className="px-4 pt-3 flex gap-2 overflow-x-auto shrink-0 scrollbar-none z-10">
          <button
            onClick={() => handleSuggest("ファンタジー風の銀髪の魔法使いの少女")}
            className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-medium text-zinc-300 active:scale-95 transition-all shrink-0"
          >
            🧙‍♀️ 銀髪の魔法少女
          </button>
          <button
            onClick={() => handleSuggest("学園モノの赤いパーカーを着た男子高校生")}
            className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-medium text-zinc-300 active:scale-95 transition-all shrink-0"
          >
            🎒 パーカーの男子高生
          </button>
        </div>
      )}

      {/* Message Chat Timeline Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 flex flex-col">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === "user" ? "self-end items-end" : "self-start items-start"
            }`}
          >
            {/* Sender bubble */}
            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-zinc-900 text-zinc-200 rounded-tl-none border border-zinc-900"
              }`}
            >
              {msg.text}
            </div>

            {/* Generated Image Thumbnail inside the chat (If AI returns an image) */}
            {msg.imageColor && (
              <div className="mt-3.5 w-full bg-zinc-900/40 border border-zinc-900 rounded-2xl overflow-hidden shadow-md flex flex-col p-3.5 gap-3">
                <div className={`h-44 rounded-xl bg-gradient-to-tr ${msg.imageColor} relative flex items-center justify-center border border-zinc-800`}>
                  <User className="h-12 w-12 text-zinc-400/40" />
                  <div className="absolute top-2.5 left-2.5 text-[9px] font-semibold px-2 py-0.5 bg-zinc-950/40 border border-zinc-800/20 text-zinc-300 rounded-full">
                    AI Character Draft
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-zinc-200 block">{msg.charName}</span>
                  <span className="text-[8px] text-zinc-500">保存済み - エディタで配置可能</span>
                </div>
              </div>
            )}

            <span className="text-[8px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {/* AI Generator Loading Animation */}
        {isGenerating && (
          <div className="self-start flex flex-col max-w-[85%] items-start">
            <div className="bg-zinc-900 text-zinc-400 p-3.5 rounded-2xl rounded-tl-none border border-zinc-900 text-xs flex items-center gap-2">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce" />
              </div>
              <span>AIがキャラクターを思い描いています...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Persistent Bottom Chat Form Bar */}
      <div className="px-4 py-3 bg-zinc-950 border-t border-zinc-900 shrink-0 select-none">
        <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isGenerating}
            placeholder={isGenerating ? "生成中..." : "追加の指示を入力、または修正..."}
            className="flex-1 bg-transparent py-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none min-w-0"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className={`p-1.5 rounded-xl transition-all ${
              input.trim() && !isGenerating
                ? "bg-blue-600 text-white hover:bg-blue-500 active:scale-90"
                : "text-zinc-600 cursor-not-allowed"
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
