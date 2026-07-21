"use client";

import { Cpu, Wifi, BatteryCharging, Bell } from "lucide-react";
import { useEffect, useState } from "react";

export function Taskbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,0,0,.35)]">

      <Cpu className="w-5 h-5 text-cyan-300" />

      <Wifi className="w-5 h-5 text-white/80" />

      <BatteryCharging className="w-5 h-5 text-green-400" />

      <Bell className="w-5 h-5 text-white/80" />

      <div className="w-px h-6 bg-white/20" />

      <p className="font-medium text-white">
        {time}
      </p>

    </div>
  );
}