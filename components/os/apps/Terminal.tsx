"use client";

import { Window } from "../Window";

interface TerminalProps {
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
}

export function Terminal({
  zIndex,
  onFocus,
  onClose,
}: TerminalProps) {
  return (
    <Window
      title="Terminal"
      className="left-[300px] top-[170px] h-[360px] w-[520px]"
      zIndex={zIndex}
      onFocus={onFocus}
      onClose={onClose}
    >
      <div className="font-mono text-sm text-green-400 space-y-2">

        <p>{">"} AliveOS Terminal v1.0</p>

        <p>{">"} Initializing AI Runtime...</p>

        <p>{">"} Connected.</p>

        <div className="flex">

          <span>{">"}</span>

          <input
            className="ml-2 flex-1 bg-transparent outline-none text-white"
            placeholder="Type a command..."
          />

        </div>

      </div>
    </Window>
  );
}