import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion, useScroll } from "motion/react";
import { SiteShell, Section } from "@/components/site-shell";
import { Reveal } from "@/components/reveal";
import { experience, profile } from "@/data/portfolio";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: `Experience & Track Record — ${profile.name}` },
      {
        name: "description",
        content:
          "Measurable machine learning impact, leadership, and production engineering track record across senior data science roles.",
      },
      { property: "og:title", content: `Experience — ${profile.name}` },
      {
        property: "og:description",
        content: "Production data science track record and attributed business ROI.",
      },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic Scroll Progress for Vertical Rail Fill
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 70%"],
  });

  return (
    <SiteShell>
      <Section
        eyebrow="Track Record"
        title="Where the Models Went Live"
        lead="Every bullet follows a strict engineering formula: Action Verb → Target Asset → Measurable Delta → Specific Method."
      >
        <div ref={containerRef} className="mt-12 relative">
          {/* Vertical Progress Rail Track (Faint Base) */}
          <div
            className="absolute left-4 sm:left-6 top-4 bottom-8 w-[2px] bg-border/40 rounded-full"
            aria-hidden="true"
          />

          {/* Animated Dynamic Scroll Fill Rail */}
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-4 sm:left-6 top-4 bottom-8 w-[2px] bg-gradient-to-b from-primary via-teal-300 to-accent rounded-full shadow-[0_0_10px_rgba(61,219,198,0.7)]"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experience.map((job, idx) => (
              <TimelineItem key={job.company} job={job} idx={idx} />
            ))}
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function TimelineItem({
  job,
  idx,
}: {
  job: (typeof experience)[number];
  idx: number;
}) {
  return (
    <div className="relative pl-12 sm:pl-16">
      {/* Milestone Node on the Rail */}
      <div className="absolute left-4 sm:left-6 top-6 sm:top-7 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
        <div className="grid h-6 w-6 place-items-center rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(61,219,198,0.7)]">
          <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_6px_#3ddbc7]" />
        </div>
      </div>

      {/* Subtle Horizontal Connector Line */}
      <div
        className="absolute left-4 sm:left-6 top-6 sm:top-7 w-8 sm:w-10 h-[1px] bg-gradient-to-r from-primary/80 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Experience Card with Identical Reveal Transition as Projects Page */}
      <Reveal delay={idx * 0.08} type="pop">
        <article className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_16px_36px_rgba(61,219,198,0.14)]">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-border/80 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-surface-raised font-mono text-xs font-bold text-primary border border-border">
                  {job.logo}
                </span>
                <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {job.title}
                </h2>
              </div>
              <p className="mt-1 font-mono text-sm text-primary font-medium">
                {job.company}
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {job.start} — {job.end}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>
            </div>
          </div>

          {/* Context Line */}
          <p className="text-xs font-mono text-muted-foreground bg-surface/60 px-3 py-2 rounded-lg border border-border/60 mb-5">
            Context: {job.context}
          </p>

          {/* Bullet Formula Entries: Verb -> what -> measurable delta -> method */}
          <div className="space-y-3.5">
            {job.impact.map((item, bIdx) => (
              <div key={bIdx} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary/80 shadow-[0_0_6px_rgba(61,219,198,0.6)]" />
                <div>
                  <span className="font-semibold text-primary">{item.verb} </span>
                  <span className="text-foreground">{item.what} </span>
                  <span className="num font-bold text-teal-300 font-mono">
                    [{item.metric}]{" "}
                  </span>
                  <span className="text-muted-foreground">{item.how}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/80 pt-4">
            <span className="label-caps text-[10px] text-muted-foreground mr-1">
              Stack:
            </span>
            {job.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-surface-raised/60 px-2 py-0.5 font-mono text-xs text-muted-foreground group-hover:border-border/90"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Linked Case Studies */}
          {job.linkedProjects && job.linkedProjects.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
              <span className="text-muted-foreground">Linked Deep-Dives:</span>
              {job.linkedProjects.map((slug) => (
                <Link
                  key={slug}
                  to="/projects/$slug"
                  params={{ slug }}
                  preload="intent"
                  className="inline-flex items-center gap-1 rounded bg-primary/10 border border-primary/30 px-2 py-0.5 text-primary hover:bg-primary/20 transition-colors"
                >
                  <span>{slug}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          )}
        </article>
      </Reveal>
    </div>
  );
}
