import { siteConfig } from "@/lib/constants/site";
import { Container } from "@/components/ui/Section";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] py-10">
      <Container className="flex flex-col gap-4 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>{siteConfig.name} for CodeStorm 2026 Month 2.</p>
        <p>Phase 1 foundation: design system, architecture, and responsive shell.</p>
      </Container>
    </footer>
  );
}
