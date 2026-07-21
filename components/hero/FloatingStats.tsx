"use client";

import { motion } from "framer-motion";

const stats = [
  {
    title: "128 FPS",
    subtitle: "Realtime Rendering",
    top: "8%",
    left: "8%",
    delay: 0,
  },
  {
    title: "3 AI Agents",
    subtitle: "Running",
    top: "18%",
    right: "8%",
    delay: 0.3,
  },
  {
    title: "4 ms",
    subtitle: "Latency",
    bottom: "18%",
    left: "10%",
    delay: 0.6,
  },
  {
    title: "99.9%",
    subtitle: "Stability",
    bottom: "8%",
    right: "10%",
    delay: 0.9,
  },
];

export function FloatingStats() {
  return (
    <>
      {stats.map((item) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            delay: item.delay,
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.06,
          }}
          className="absolute z-20 w-44 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.35)]"
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
          }}
        >
          <div className="text-2xl font-bold text-white">
            {item.title}
          </div>

          <div className="mt-1 text-sm text-white/60">
            {item.subtitle}
          </div>
        </motion.div>
      ))}
    </>
  );
}