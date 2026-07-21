"use client";

import { Window } from "../Window";

interface AIAssistantProps {
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
}

export function AIAssistant({
  zIndex,
  onFocus,
  onClose,
}: AIAssistantProps) {
  return (
    <Window
  title="AI Assistant"
  className="left-12 top-20 h-[430px] w-[420px]"
  zIndex={zIndex}
  onFocus={onFocus}
  onClose={onClose}
>
      <div className="space-y-5">

        <div className="rounded-xl bg-cyan-500/10 p-4 text-cyan-300">
          Hello 👋
        </div>

        <div className="rounded-xl bg-white/5 p-4 text-white">
          Welcome to AliveOS.
        </div>

        <input
          placeholder="Ask Alive AI..."
          className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-white outline-none"
        />

      </div>
    </Window>
  );
}