"use client";

import { motion, useDragControls } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { ReactNode } from "react";

interface WindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  zIndex?: number;
  onFocus?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
}

export function Window({
  title,
  children,
  className = "",
  zIndex = 10,
  onFocus,
  onClose,
  onMinimize,
}: WindowProps) {
    const dragControls = useDragControls();
  return (
    <motion.div
  drag
  dragControls={dragControls}
  dragListener={false}
  onPointerDown={onFocus}
  dragMomentum={false}
  dragElastic={0.08}
  whileDrag={{ scale: 1.02 }}
  initial={{ opacity: 0, scale: 0.92, y: 30 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.45 }}
  className={`absolute flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/8 backdrop-blur-3xl shadow-[0_25px_90px_rgba(0,0,0,.45)] ${className}`}
  style={{ zIndex }}
>
      {/* Title Bar */}
      <div
  className="flex cursor-grab active:cursor-grabbing items-center justify-between border-b border-white/10 px-5 py-3"
  onPointerDown={(e) => dragControls.start(e)}
>

        <div className="flex gap-2">

          <button
  onClick={onClose}
  className="h-3 w-3 rounded-full bg-red-500 transition hover:scale-110"
/>

          <div className="h-3 w-3 rounded-full bg-yellow-500" />

          <div className="h-3 w-3 rounded-full bg-green-500" />

        </div>

        <h3 className="text-sm font-medium text-white">
          {title}
        </h3>

        <div className="flex gap-3 text-white/50">

          <button
  onClick={onMinimize}
  className="text-white/60 transition hover:text-white"
>
  <Minus size={15} />
</button>

          <button className="text-white/60 transition hover:text-white">
  <Square size={13} />
</button>

          <X size={15} />

        </div>

      </div>

      <div className="flex flex-1 flex-col overflow-hidden p-5">
    {children}
</div>

    </motion.div>
  );
}