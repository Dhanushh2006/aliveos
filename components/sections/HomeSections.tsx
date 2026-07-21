import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

const principles = [
  "Responsive by default",
  "Server-first rendering",
  "Motion with restraint",
  "Client islands only where needed",
];

export function VisionSection() {
  return (
    <Section
      id="vision"
      eyebrow="Vision"
      title="A site that feels alive starts with disciplined foundations."
      description="Phase 1 establishes the architecture, tokens, layout primitives, and motion contract that every future interactive layer will depend on."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle) => (
          <Card key={principle}>
            <p className="text-lg font-medium text-white">{principle}</p>
            <p className="mt-3 text-sm leading-6 text-white/52">
              Built as a reusable rule of the system, not a one-off page flourish.
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function SystemSection() {
  return (
    <Section
      id="system"
      eyebrow="System"
      title="Modular structure for a production Next.js application."
      description="The foundation separates routing, layout, primitives, motion infrastructure, constants, and utility code so later phases can scale cleanly."
      className="border-y border-white/[0.07] bg-white/[0.025]"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <Card tone="elevated">
          <p className="text-sm text-cyan-100">01</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Design Tokens</h3>
          <p className="mt-4 text-sm leading-6 text-white/56">
            Global color, typography, spacing, shadows, surfaces, and selection styles are centralized in CSS variables.
          </p>
        </Card>
        <Card tone="elevated">
          <p className="text-sm text-cyan-100">02</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Reusable Primitives</h3>
          <p className="mt-4 text-sm leading-6 text-white/56">
            Buttons, cards, badges, containers, and sections define a consistent interface language.
          </p>
        </Card>
        <Card tone="elevated">
          <p className="text-sm text-cyan-100">03</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">Motion Boundary</h3>
          <p className="mt-4 text-sm leading-6 text-white/56">
            The animation provider detects reduced-motion preferences and gives future animated layers a shared contract.
          </p>
        </Card>
      </div>
    </Section>
  );
}

export function CraftSection() {
  return (
    <Section
      id="craft"
      eyebrow="Craft"
      title="Premium dark UI without sacrificing clarity."
      description="The visual system borrows the restraint of Apple and the operational polish of Linear: crisp hierarchy, glass surfaces, luminous accents, and careful contrast."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="flex flex-col justify-between gap-10" tone="elevated">
          <div>
            <h3 className="text-2xl font-semibold text-white">Phase 1 Scope</h3>
            <p className="mt-4 text-sm leading-6 text-white/56">
              No 3D scene, no AI workflow, and no external animation package yet. This keeps the base small and ready for intentional expansion.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Architecture", "Design System", "SEO", "Responsive Layout"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/64">
                {item}
              </span>
            ))}
          </div>
        </Card>
        <div className="grid gap-5 sm:grid-cols-2">
          {["Typography", "Surfaces", "Navigation", "Accessibility"].map((item) => (
            <Card key={item}>
              <h3 className="text-xl font-semibold text-white">{item}</h3>
              <p className="mt-3 text-sm leading-6 text-white/54">
                Production-ready defaults that will remain stable as richer interactions are added.
              </p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
