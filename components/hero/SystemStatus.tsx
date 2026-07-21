"use client";

import { motion } from "framer-motion";

const metrics = [
  { label: "Rendering", value: "128 FPS" },
  { label: "AI Agents", value: "3 Active" },
  { label: "Latency", value: "4 ms" },
  { label: "Stability", value: "99.9%" },
];

export function SystemStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-[0.25em] text-cyan-300 uppercase">
          System Status
        </h3>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs text-white/60">
            Online
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-5">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            whileHover={{
              scale: 1.04,
            }}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
          >
            <div className="text-xs text-white/45">
              {metric.label}
            </div>

            <div className="mt-2 text-xl font-bold text-white">
              {metric.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}