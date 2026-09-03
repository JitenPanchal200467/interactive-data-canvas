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
        <div ref={containerRef} className="mt-14 relative">
          {/* Vertical Progress Rail Track */}
          <div
            className="absolute left-4 sm:left-6 top-4 bottom-8 w-[2px] bg-white/[0.08] rounded-full"
            aria-hidden="true"
          />

          {/* Animated Dynamic Scroll Fill Rail */}
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-4 sm:left-6 top-4 bottom-8 w-[2px] bg-gradient-to-b from-primary via-indigo-400 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-16">
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
        <div className="grid h-6 w-6 place-items-center rounded-full border-2 border-primary bg-background shadow-[0_0_12px_rgba(99,102,241,0.8)]">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
        </div>
      </div>

      {/* Subtle Horizontal Connector Line */}
      <div
        className="absolute left-4 sm:left-6 top-6 sm:top-7 w-8 sm:w-10 h-[1px] bg-gradient-to-r from-primary to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Experience Card */}
      <Reveal delay={idx * 0.08} type="pop">
        <article className="group relative rounded-2xl border border-white/[0.08] bg-surface/80 p-6 sm:p-8 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-white/[0.06] pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 font-mono text-xs font-bold text-primary border border-primary/20">
                  {job.logo}
                </span>
                <h2 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {job.title}
                </h2>
              </div>
              <p className="mt-1 font-mono text-sm text-primary font-semibold">
                {job.company}
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {job.start} — {job.end}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                {job.location}
              </span>
            </div>
          </div>

          {/* Context Line */}
          <p className="text-xs font-mono text-slate-300 bg-white/[0.03] px-3.5 py-2 rounded-xl border border-white/[0.06] mb-5">
            Focus: {job.context}
          </p>

          {/* Bullet Formula Entries */}
          <div className="space-y-3.5">
            {job.impact.map((item, bIdx) => (
              <div key={bIdx} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                <div>
                  <span className="font-bold text-white">{item.verb} </span>
                  <span className="text-slate-200">{item.what} </span>
                  <span className="num font-bold text-emerald-400 font-mono">
                    [{item.metric}]{" "}
                  </span>
                  <span className="text-slate-400">{item.how}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
            <span className="label-caps text-[10px] text-slate-500 mr-1 font-semibold">
              Stack:
            </span>
            {job.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-xs text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Linked Case Studies */}
          {job.linkedProjects && job.linkedProjects.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
              <span className="text-slate-400">Linked Deep-Dive:</span>
              {job.linkedProjects.map((slug) => (
                <Link
                  key={slug}
                  to="/projects/$slug"
                  params={{ slug }}
                  preload="intent"
                  className="inline-flex items-center gap-1 rounded-lg bg-primary/10 border border-primary/30 px-2.5 py-1 text-primary hover:bg-primary/20 transition-colors font-semibold"
                >
                  <span>{slug}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          )}
        </article>
      </Reveal>
    </div>
  );
}
