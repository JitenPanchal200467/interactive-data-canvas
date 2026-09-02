import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  GitBranch,
  Terminal as TerminalIcon,
  FileDown,
  Layers,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/reveal";
import { SkillMatrix } from "@/components/skill-matrix";
import { HeroCanvas } from "@/components/hero-canvas";
import { profile, heroKpis, projects } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.role} Portfolio` },
      { name: "description", content: profile.summary.slice(0, 155) },
      { property: "og:title", content: `${profile.name} — ${profile.role}` },
      { property: "og:description", content: profile.tagline },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <SiteShell>
      {/* 3D Interactive Hero Canvas Section */}
      <section className="grid-bg relative isolate overflow-hidden border-b border-border">
        <HeroCanvas />
        <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />

        <div className="pointer-events-none relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-10 sm:py-16 [&_a]:pointer-events-auto [&_dl]:pointer-events-auto [&_button]:pointer-events-auto">
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2">
            <span className="label-caps font-semibold text-primary">
              {profile.role} · {profile.location}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-display mt-3 max-w-3xl tracking-tight text-foreground font-semibold">
            {profile.tagline}
          </h1>

          {/* Condensed Summary Narrative */}
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            {profile.summary}
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_rgba(61,219,198,0.35)] hover:opacity-95"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-all hover:bg-surface-raised hover:border-primary/40"
            >
              <span>Methodology & Matrix</span>
            </Link>

            <Link
              to="/resume"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-raised/40 px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary/60 hover:text-primary"
            >
              <FileDown className="h-4 w-4 text-primary" />
              <span>Resume & CV</span>
            </Link>
          </div>

          <p className="label-caps mt-4 text-muted-foreground/60 text-[10px] sm:text-[11px]">
            Interactive 3D field: Drag or move cursor to perturb data manifold. Hover nodes to
            inspect tools.
          </p>

          {/* Animated KPI Count-Up Numerals */}
          <dl className="mt-8 sm:mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4 shadow-xl">
            {heroKpis.map((kpi) => (
              <KpiCard key={kpi.label} kpi={kpi} />
            ))}
          </dl>
        </div>
      </section>

      {/* Decision-Tree Entry Teaser */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 border-b border-border/60">
        <div className="rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              <span className="label-caps text-primary text-xs font-semibold">
                Decision-Tree Navigator
              </span>
            </div>
            <h2 className="text-h2 font-semibold text-foreground">
              Evaluate Work by Your Problem Domain
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Filter models by business impact, algorithmic depth, or latency constraints using an
              interactive classification tree.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/projects"
              search={{ path: "modeling.nlp" }}
              className="rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-mono text-foreground hover:border-primary transition-colors"
            >
              Legal AI & NLP
            </Link>
            <Link
              to="/projects"
              search={{ path: "modeling.causal" }}
              className="rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-mono text-foreground hover:border-accent transition-colors"
            >
              Healthcare Risk ML
            </Link>
            <Link
              to="/projects"
              search={{ path: "engineering.edge" }}
              className="rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-mono text-foreground hover:border-teal-400 transition-colors"
            >
              C++ DSA & Edge
            </Link>
          </div>
        </div>
      </section>

      {/* Live Scatter-Plot Skill Matrix Section (Gimmick A) */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="label-caps mb-2 text-primary">Skill Matrix</p>
            <h2 className="text-h2 font-semibold">Production Frequency Against Time Served</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Plotted on 2D quadrants: bubble radius represents number of shipped production
              applications.
            </p>
          </div>
          <Link
            to="/about"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-primary hover:underline"
          >
            Read full engineering principles →
          </Link>
        </div>

        <SkillMatrix />
      </section>

      {/* Selected Production Case Studies */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
          <div>
            <p className="label-caps mb-1 text-primary">Selected Work</p>
            <h2 className="text-h2 font-semibold">Production Deep-Dives</h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
          >
            <span>View all {projects.length} case studies</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col justify-between h-full rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/60 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.5)]"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span className="label-caps text-primary">{p.domain}</span>
                    <span className="rounded bg-surface-raised px-1.5 py-0.5 border border-border">
                      {p.scale}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {p.blurb}
                  </p>

                  <div className="mt-4 rounded-xl border border-border/80 bg-surface/40 p-2.5 text-center">
                    <span className="block font-mono text-xs font-bold text-primary">
                      {p.kpiChips[0]}
                    </span>
                    <span className="block font-mono text-[9px] text-muted-foreground mt-0.5">
                      Attributed Outcome
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs font-semibold text-primary">
                  <span>Read 7-Step Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function KpiCard({ kpi }: { kpi: (typeof heroKpis)[number] }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 900;
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Number((kpi.value * easeOutProgress).toFixed(kpi.value % 1 !== 0 ? 1 : 0)));

            if (currentStep >= steps) {
              setCount(kpi.value);
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, kpi.value]);

  return (
    <div ref={ref} className="bg-card p-6">
      <dt className="label-caps text-xs">{kpi.label}</dt>
      <dd className="num mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-primary">
        {kpi.prefix}
        {count}
        {kpi.suffix}
      </dd>
    </div>
  );
}
