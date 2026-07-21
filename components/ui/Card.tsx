import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = ComponentPropsWithoutRef<"article"> & {
  tone?: "default" | "elevated";
};

export function Card({ className, tone = "default", ...props }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border p-5 backdrop-blur-xl",
        tone === "default" && "border-white/10 bg-white/[0.045]",
        tone === "elevated" &&
          "border-white/14 bg-white/[0.07] shadow-[0_24px_80px_rgba(0,0,0,0.34)]",
        className,
      )}
      {...props}
    />
  );
}
