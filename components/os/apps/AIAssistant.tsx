"use client";

import { Window } from "../Window";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

interface AIAssistantProps {
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
}
type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export function AIAssistant({
  zIndex,
  onFocus,
  onClose,
}: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
  {
    id: 1,
    role: "assistant",
    content: "👋 Welcome to AliveOS. I'm Alive AI. Ask me anything.",
  },
]);
const messagesEndRef = useRef<HTMLDivElement>(null);
const [loading, setLoading] = useState(false);
const [input, setInput] = useState("");

function handleSend() {
  if (!input.trim()) return;

  const text = input.trim();

const userMessage: Message = {
  id: Date.now(),
  role: "user",
  content: text,
};

setMessages((prev) => [...prev, userMessage]);
setInput("");

  setLoading(true);

  setTimeout(() => {
  let response = "";

  switch (text.toLowerCase()) {
    case "hello":
    case "hi":
      response = "Hello! 👋 Welcome to AliveOS.";
      break;

    case "who are you":
      response = "I'm Alive AI, your intelligent operating system assistant.";
      break;

    case "help":
      response =
        "You can ask me about AliveOS, open applications, or use the terminal.";
      break;

    default:
      response =
        "I'm still running in offline mode. A real AI model will be connected soon.";
  }

  setMessages((prev) => [
    ...prev,
    {
      id: Date.now() + 1,
      role: "assistant",
      content: response,
    },
  ]);

  setLoading(false);
}, 900);
}
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);
  return (
    <Window
  title="AI Assistant"
  className="left-12 top-20 h-[430px] w-[420px]"
  zIndex={zIndex}
  onFocus={onFocus}
  onClose={onClose}
>
      <div className="flex h-full flex-col">

  <div className="flex-1 space-y-3 overflow-y-auto">

  {messages.map((message, index) => (
    <div
      key={index}
      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
        message.role === "assistant"
          ? "bg-cyan-500/10 text-cyan-200 self-start"
          : "bg-cyan-500 text-white self-end ml-auto"
      }`}
    >
      {message.content}
    </div>
  ))}

  {loading && (
    <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300 animate-pulse">
      🤖 Alive AI is thinking...
    </div>
  )}
  <div ref={messagesEndRef} />

</div>

<div className="mt-4 flex gap-3">

    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Ask Alive AI..."
      className="flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSend();
        }
      }}
    />

    <button
  onClick={handleSend}
  disabled={loading}
  className="rounded-2xl bg-cyan-500 px-5 text-white transition-all hover:scale-105 hover:bg-cyan-400 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
>
  <Send size={18} />
</button>

</div>

</div>

</Window>

);
}