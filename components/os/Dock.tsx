"use client";

import { Brain, Folder, Globe, Settings, Terminal } from "lucide-react";
import { motion } from "framer-motion";

type WindowId = "ai" | "files";

type App = {
  icon: typeof Folder;
  label: string;
  id?: WindowId;
};

const apps: App[] = [
  {
    icon: Folder,
    label: "Files",
    id: "files",
  },
  {
    icon: Brain,
    label: "AI",
    id: "ai",
  },
  {
    icon: Globe,
    label: "Browser",
  },
  {
    icon: Terminal,
    label: "Terminal",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

interface DockProps {
  onOpen: (id: WindowId) => void;
}
export function Dock({
  onOpen,
}: DockProps) {
  return (
    <div className="absolute bottom-24 left-1/2 z-40 flex -translate-x-1/2 gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-3xl">
      {apps.map(({ icon: Icon, label, id }) => (
        <motion.button
  onClick={() => {
    if (id) {
      onOpen(id);
    }
  }}
          key={label}
          whileHover={{
            y: -10,
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="rounded-xl bg-white/5 p-4 transition hover:bg-white/10"
        >
          <Icon className="h-6 w-6 text-white" />
        </motion.button>
      ))}
    </div>
  );
}