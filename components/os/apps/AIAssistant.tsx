"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Window } from "../Window";
import { useEffect, useRef, useState } from "react";
import { Send, Copy, Check } from "lucide-react";

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
const [copied, setCopied] = useState<string | null>(null);

async function handleSend() {
  const text = input.trim();

  if (!text) return;

  const userMessage: Message = {
    id: Date.now(),
    role: "user",
    content: text,
  };

  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const conversation = [
  {
    role: "user",
    parts: [
      {
        text: `You are Alive AI.

You are the intelligent operating system inside AliveOS.

Always answer professionally.

Always use Markdown.

When writing code always use fenced code blocks.

Keep answers concise.`,
      },
    ],
  },

  ...messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [
      {
        text: m.content,
      },
    ],
  })),

  {
    role: "user",
    parts: [
      {
        text,
      },
    ],
  },
];

const res = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    messages: conversation,
  }),
});

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: data.reply,
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: "❌ Failed to contact Alive AI.",
      },
    ]);
  }

  setLoading(false);
}
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);
  return (
    <Window
  title="AI Assistant"
  className="left-12 top-20 h-[620px] w-[520px]"
  zIndex={zIndex}
  onFocus={onFocus}
  onClose={onClose}
>
      <div className="flex h-full min-h-0 flex-col overflow-hidden">

  <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-2">

  {messages.map((message, index) => (
    <div
      key={index}
      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
        message.role === "assistant"
          ? "bg-cyan-500/10 text-cyan-200 self-start"
          : "bg-cyan-500 text-white self-end ml-auto"
      }`}
    >
      <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h1: ({ children }) => (
      <h1 className="mb-3 text-3xl font-bold text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-5 text-2xl font-semibold text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-4 text-xl font-semibold text-white">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 text-white/90">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="ml-5 list-disc space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="ml-5 list-decimal space-y-1">
        {children}
      </ol>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-cyan-300">
        {children}
      </strong>
    ),
    code({ className, children }) {
  const match = /language-(\w+)/.exec(className || "");
  const code = String(children).replace(/\n$/, "");

  if (match) {
    return (
      <div className="relative my-3 overflow-hidden rounded-xl">
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(code);

            setTimeout(() => {
              setCopied(null);
            }, 2000);
          }}
          className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-lg bg-black/60 px-3 py-1 text-xs text-white transition hover:bg-black/80"
        >
          {copied === code ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>

        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          customStyle={{
            borderRadius: "12px",
            margin: 0,
            padding: "18px",
            fontSize: "14px",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  }

  return (
    <code className="rounded bg-black/40 px-1 py-0.5 text-cyan-300">
      {children}
    </code>
  );
}
  }}
>
  {message.content}
</ReactMarkdown>
    </div>
  ))}

  {loading && (
    <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300 animate-pulse">
      <div className="flex items-center gap-2">
  <div className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce" />
  <div className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:150ms]" />
  <div className="h-2 w-2 rounded-full bg-cyan-300 animate-bounce [animation-delay:300ms]" />
</div>
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