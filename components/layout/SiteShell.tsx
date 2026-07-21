import { AnimationProvider } from "@/components/motion/AnimationProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_82%_26%,rgba(52,211,153,0.11),transparent_26%),linear-gradient(180deg,#050506_0%,#090a0d_48%,#030304_100%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
        <Header />
        <main id="top" className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </AnimationProvider>
  );
}
