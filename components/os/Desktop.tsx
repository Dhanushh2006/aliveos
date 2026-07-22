"use client";

import { WindowManager } from "./WindowManager";

import { useState } from "react";
import { motion } from "framer-motion";
import { Taskbar } from "./Taskbar";
import { Dock } from "./Dock";


export function Desktop() {
    
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[1000] overflow-hidden bg-[#040608]"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(103,232,249,0.12),transparent_55%)]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Welcome */}
      <div className="absolute left-12 top-12">
        <h1 className="text-5xl font-bold text-white">
          Welcome to AliveOS
        </h1>

        <p className="mt-3 text-white/60">
          Your adaptive operating system is ready.
        </p>
      </div>
      <WindowManager />
          
      

<Taskbar />
    </motion.div>
  );
}