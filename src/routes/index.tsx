import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  GitBranch,
  FileDown,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Terminal as TerminalIcon,
  CheckCircle2,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/reveal";
import { HeroCanvas } from "@/components/hero-canvas";
import { profile, heroKpis, projects } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.role}` },
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
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.06] pb-16 sm:pb-24 pt-12 sm:pt-20">
        <HeroCanvas />
        <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />

        <div className="pointer-events-none relative z-10 mx-auto max-w-7xl px-5 sm:px-8 [&_a]:pointer-events-auto [&_dl]:pointer-events-auto [&_button]:pointer-events-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono text-emerald-400 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>Available for Machine Learning & Data Science Roles</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-display mt-5 max-w-4xl tracking-tight text-white font-bold">
            Engineering Production ML Pipelines &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
              Contract Intelligence
            </span>
          </h1>

          {/* Value Prop Narrative */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal">
            {profile.summary}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-primary/90 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/20 hover:text-white"
            >
              <span>Methodology & Background</span>
            </Link>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-slate-300 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-primary/50 hover:text-white"
            >
              <FileDown className="h-4 w-4 text-primary" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* KPI Metrics Strip */}
          <dl className="mt-14 sm:mt-18 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {heroKpis.map((kpi) => (
              <KpiCard key={kpi.label} kpi={kpi} />
            ))}
          </dl>
        </div>
      </section>

      {/* Flagship Production Deep-Dives */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-white/[0.06] pb-6">
          <div>
            <span className="label-caps text-primary font-semibold">Featured Work</span>
            <h2 className="text-h1 mt-1 text-white font-bold">Production Case Studies</h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-400">
              End-to-end ML systems: fine-tuned transformers, deterministic pipelines, and zero-leak evaluations.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            <span>View all {projects.length} case studies</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} type="pop">
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                preload="intent"
                className="group flex flex-col justify-between h-full rounded-2xl border border-white/[0.08] bg-surface/80 p-6 sm:p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="label-caps text-primary font-semibold">{p.domain}</span>
                    <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 border border-white/10 text-slate-300 text-[10px]">
                      {p.scale}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
                    {p.name}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {p.blurb}
                  </p>

                  <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                    <span className="block font-mono text-xs font-bold text-emerald-400">
                      {p.kpiChips[0]}
                    </span>
                    <span className="block font-mono text-[9px] text-slate-500 mt-0.5 uppercase tracking-wider">
                      Primary Attributed Metric
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs font-semibold text-primary">
                  <span>Explore Deep-Dive</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core Engineering Focus Areas */}
      <section className="border-t border-b border-white/[0.06] bg-white/[0.01] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="label-caps text-primary font-semibold">Specialization</span>
            <h2 className="text-h1 mt-1 text-white font-bold">Engineering Principles & Capabilities</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 leading-relaxed">
              Bridging the gap between theoretical machine learning research and resilient production software.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-6 sm:p-7 backdrop-blur-xl shadow-md space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Transformers & RAG Systems
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Fine-tuned RoBERTa/BERT on domain corpuses (CUAD), spaCy custom NER, vector semantic search with LangChain and Pinecone/FAISS.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-6 sm:p-7 backdrop-blur-xl shadow-md space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                Automated ML Pipelines
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Scikit-Learn transformer suites with automated outlier handling, Box-Cox transformations, and strict out-of-fold data leakage prevention.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-6 sm:p-7 backdrop-blur-xl shadow-md space-y-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                High-Performance Serving
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Asynchronous microservices with FastAPI & Celery, Docker containerization, and low-latency algorithmic design with 150+ C++ challenges solved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tooling Teaser */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20">
        <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-r from-indigo-950/40 via-surface to-emerald-950/30 p-8 sm:p-12 backdrop-blur-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              <span className="label-caps text-primary text-xs font-semibold">
                Interactive Toolkit
              </span>
            </div>
            <h2 className="text-h2 font-bold text-white">
              Explore Skills Matrix & Decision-Tree Filter
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Inspect production frequency across 16+ core data engineering tools, or filter case studies dynamically by business problem domain.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/about"
              className="rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-primary/90 shadow-md shadow-indigo-500/20"
            >
              Interactive Skill Matrix →
            </Link>
            <Link
              to="/projects"
              className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:bg-white/10 transition-colors"
            >
              Decision-Tree Filter
            </Link>
          </div>
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
    <div
      ref={ref}
      className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5 sm:p-6 backdrop-blur-xl shadow-md transition-all hover:border-white/15"
    >
      <dt className="label-caps text-[10px] sm:text-xs text-slate-400 font-semibold">{kpi.label}</dt>
      <dd className="num mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-white">
        <span className="text-primary">{kpi.prefix}</span>
        {count}
        <span className="text-emerald-400">{kpi.suffix}</span>
      </dd>
    </div>
  );
}
