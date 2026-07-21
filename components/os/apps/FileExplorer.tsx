"use client";

import { Folder, FileText, Image, Music } from "lucide-react";
import { Window } from "../Window";

interface FileExplorerProps {
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
}

const files = [
  { icon: Folder, name: "Projects" },
  { icon: FileText, name: "Hackathon Notes.md" },
  { icon: Image, name: "HeroRender.png" },
  { icon: Music, name: "Ambient.mp3" },
];

export function FileExplorer({
  zIndex,
  onFocus,
  onClose,
}: FileExplorerProps) {
  return (
    <Window
      title="File Explorer"
      className="left-12 top-20 h-[430px] w-[420px]"
      zIndex={zIndex}
      onFocus={onFocus}
      onClose={onClose}
    >
      <div className="space-y-3">
        {files.map(({ icon: Icon, name }) => (
          <div
            key={name}
            className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 transition hover:bg-white/10"
          >
            <Icon className="h-5 w-5 text-cyan-300" />
            <span className="text-white">{name}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}