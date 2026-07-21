"use client";

import { FloatingStats } from "@/components/hero/FloatingStats";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Section";

const AliveCoreScene = dynamic(
  () => import("@/components/three/AliveCoreScene").then((mod) => mod.AliveCoreScene),
  {
    ssr: false,
    loading: () => <HeroSceneFallback />,
  },
);

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
};

const copyVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function prefersLiteExperience() {
  if (typeof navigator === "undefined") return true;

  const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  return memory <= 4 || cores <= 4 || coarsePointer;
}

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_45%,rgba(103,232,249,0.22),transparent_30%),radial-gradient(circle_at_34%_32%,rgba(52,211,153,0.14),transparent_24%),linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
      <div className="relative size-52 rounded-full border border-cyan-100/20 bg-cyan-100/10 shadow-[0_0_90px_rgba(103,232,249,0.18)] sm:size-72">
        <div className="absolute inset-8 rounded-full border border-white/15 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]" />
        <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 shadow-[0_0_70px_rgba(255,255,255,0.28)] sm:size-28" />
        <div className="absolute -inset-8 rounded-full border border-emerald-200/10" />
      </div>
    </div>
  );
}

function HeroVisual() {
  const reducedMotion = useReducedMotion();
  const [liteMode, setLiteMode] = useState(true);

useEffect(() => {
  const frame = window.requestAnimationFrame(() => {
    setLiteMode(Boolean(reducedMotion) || prefersLiteExperience());
  });

  return () => {
    window.cancelAnimationFrame(frame);
  };
}, [reducedMotion]);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.94, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="relative min-h-[430px] overflow-hidden rounded-lg border border-white/10 bg-black/45 shadow-[0_45px_160px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:min-h-[560px] lg:min-h-[650px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(103,232,249,0.24),transparent_34%),radial-gradient(circle_at_22%_24%,rgba(52,211,153,0.12),transparent_28%),radial-gradient(circle_at_80%_72%,rgba(255,255,255,0.1),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.015))]" />
      <div className="pointer-events-none absolute inset-5 rounded-lg border border-white/[0.07]" />
      <div className="pointer-events-none absolute left-6 right-6 top-6 z-10 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/56">
          <Cpu aria-hidden="true" className="size-4 text-cyan-100" />
          Living Kernel
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
          Responsive
        </span>
      </div>
      <div className="absolute inset-0 pt-12">
  {liteMode ? <HeroSceneFallback /> : <AliveCoreScene />}
  <FloatingStats />
</div>
      <div className="pointer-events-none absolute inset-x-8 bottom-8 z-10 grid gap-3 sm:grid-cols-3">
        {[
          ["Breath", "Ambient"],
          ["Input", "Pointer"],
          ["Pulse", "Click"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/[0.08] bg-black/28 p-4 backdrop-blur-xl">
            <p className="text-xs text-white/42">{label}</p>
            <p className="mt-1 text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_52%_18%,rgba(103,232,249,0.18),transparent_28%),radial-gradient(circle_at_18%_30%,rgba(52,211,153,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.035),transparent_48%)]" />
      <Container className="grid min-h-[calc(100vh-11rem)] items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: reducedMotion ? 0 : 0.09, delayChildren: reducedMotion ? 0 : 0.1 }}
          className="max-w-4xl"
        >
          <motion.div variants={copyVariants} transition={transition}>
            <Badge>CodeStorm 2026 / AliveOS</Badge>
          </motion.div>
          <motion.h1
            variants={copyVariants}
            transition={transition}
            className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-7xl lg:text-8xl"
          >
            A living operating system for the web.
          </motion.h1>
          <motion.p
            variants={copyVariants}
            transition={transition}
            className="mt-7 max-w-2xl text-lg leading-8 text-white/64 sm:text-xl"
          >
            AliveOS turns a homepage into a responsive digital organism: ambient, precise, cinematic, and aware of user presence from the first frame.
          </motion.p>
          <motion.div variants={copyVariants} transition={transition} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <motion.a
              href="#system"
              whileHover={reducedMotion ? undefined : { y: -2, scale: 1.015 }}
              whileTap={reducedMotion ? undefined : { scale: 0.985 }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-6 text-base font-semibold text-black shadow-[0_0_36px_rgba(255,255,255,0.18)] transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              Enter the System
              <ArrowRight aria-hidden="true" className="size-4" />
            </motion.a>
            <motion.a
              href="#craft"
              whileHover={reducedMotion ? undefined : { y: -2, scale: 1.015 }}
              whileTap={reducedMotion ? undefined : { scale: 0.985 }}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.07] px-6 text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:border-white/20 hover:bg-white/[0.11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
            >
              View Craft
            </motion.a>
          </motion.div>
        </motion.div>

        <HeroVisual />
      </Container>
    </section>
  );
}

