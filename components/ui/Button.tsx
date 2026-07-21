import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "border-white/20 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:bg-white/90",
  secondary:
    "border-white/10 bg-white/[0.07] text-white hover:border-white/20 hover:bg-white/[0.11]",
  ghost: "border-transparent text-white/70 hover:bg-white/[0.06] hover:text-white",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-medium tracking-normal transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300",
        "motion-safe:hover:-translate-y-0.5",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
