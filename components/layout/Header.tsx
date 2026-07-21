"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Section";

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

export function Header() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(siteConfig.nav[0]?.href ?? "#top");

  const sectionIds = useMemo(
    () => siteConfig.nav.map((item) => item.href.replace("#", "")),
    [],
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 18);
  });

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.18, 0.32, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.58, ease: [0.16, 1, 0.3, 1] as const };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <Container className="px-0">
        <motion.div
          animate={{
            height: isScrolled ? 56 : 68,
            borderColor: isScrolled ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.09)",
            backgroundColor: isScrolled ? "rgba(5,5,6,0.78)" : "rgba(5,5,6,0.52)",
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: "easeOut" }}
          className="relative flex items-center justify-between gap-4 rounded-lg border px-3 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:px-4"
        >
          <a
            href="#top"
            onClick={closeMenu}
            className="group flex min-w-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
            aria-label="AliveOS home"
          >
            <span className="relative grid size-9 shrink-0 place-items-center rounded-lg border border-white/12 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition group-hover:border-cyan-200/35">
              <span className="absolute inset-1 rounded-md bg-[radial-gradient(circle_at_50%_30%,rgba(103,232,249,0.24),transparent_58%)] opacity-70" />
              <span className="relative size-2.5 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(103,232,249,0.95)]" />
            </span>
            <span className="truncate text-sm font-semibold text-white">{siteConfig.name}</span>
          </a>

          <nav className="hidden items-center rounded-full border border-white/[0.08] bg-white/[0.045] p-1 md:flex" aria-label="Primary navigation">
            {siteConfig.nav.map((item, index) => {
              const isActive = activeHref === item.href;

              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={navItemVariants}
                  initial={prefersReducedMotion ? false : "hidden"}
                  animate="visible"
                  transition={{ ...transition, delay: prefersReducedMotion ? 0 : 0.08 + index * 0.04 }}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
                    isActive ? "text-white" : "text-white/56 hover:text-white",
                  )}
                  aria-current={isActive ? "location" : undefined}
                  onClick={closeMenu}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </motion.a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <motion.a
              href="#craft"
              whileHover={prefersReducedMotion ? undefined : { y: -1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className="hidden h-10 items-center justify-center gap-2 rounded-full border border-white/14 bg-white text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.16)] transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:inline-flex sm:px-4"
            >
              Enter OS
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </motion.a>

            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white transition hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 md:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </motion.div>
      </Container>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-7xl rounded-lg border border-white/12 bg-black/82 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:hidden"
          >
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {siteConfig.nav.map((item) => {
                const isActive = activeHref === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-4 py-3 text-base font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
                      isActive ? "bg-white/[0.09] text-white" : "text-white/62 hover:bg-white/[0.06] hover:text-white",
                    )}
                  >
                    {item.label}
                    <span className={cn("size-1.5 rounded-full", isActive ? "bg-cyan-200" : "bg-white/20")} />
                  </a>
                );
              })}
              <a
                href="#craft"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-base font-semibold text-black transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                Enter OS
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
