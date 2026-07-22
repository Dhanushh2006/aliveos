"use client";

import { Search } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

const commands = [
  { id: "ai", label: "AI Assistant" },
  { id: "terminal", label: "Terminal" },
  { id: "files", label: "File Explorer" },
];

export function CommandPalette({
  open,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 backdrop-blur-sm pt-32">
      <div className="w-[650px] rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl">

        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <Search size={18} />
          <input
            autoFocus
            placeholder="Search AliveOS..."
            className="flex-1 bg-transparent outline-none text-white"
          />
        </div>

        <div>
          {commands.map((command) => (
            <button
              key={command.id}
              onClick={() => {
                onSelect(command.id);
                onClose();
              }}
              className="flex w-full px-5 py-4 hover:bg-white/5 text-left"
            >
              {command.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}