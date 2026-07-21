"use client";

import { motion } from "framer-motion";

interface BootScreenProps {
  bootStep: number;
}

export function BootScreen({ bootStep }: BootScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
    >
      <div className="w-[520px] rounded-2xl border border-cyan-400/10 bg-black/60 p-8 backdrop-blur-xl">
        <p className="mb-6 text-center tracking-[0.35em] uppercase text-cyan-300">
          AliveOS
        </p>

        <BootProgress
          title="Initializing Neural Engine..."
          active={bootStep >= 0}
          complete={bootStep > 0}
        />

        <BootProgress
          title="Loading Memory Graph..."
          active={bootStep >= 1}
          complete={bootStep > 1}
        />

        <BootProgress
          title="Starting AI Kernel..."
          active={bootStep >= 2}
          complete={bootStep > 2}
        />

        {bootStep >= 3 && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-3xl font-bold text-cyan-300"
          >
            Welcome to AliveOS
          </motion.h2>
        )}
      </div>
    </motion.div>
  );
}

function BootProgress({
  title,
  active,
  complete,
}: {
  title: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-white">{title}</p>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          animate={{
            width: complete ? "100%" : active ? "55%" : "0%",
          }}
          transition={{ duration: 0.7 }}
          className="h-full bg-cyan-400"
        />
      </div>
    </div>
  );
}