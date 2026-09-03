import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Activity,
  AlertTriangle,
  Server,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  Database,
  Layers,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/reveal";
import { projects, profile, type Project } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    return {
      meta: [
        { title: `${p?.name ?? "Case Study"} — ${profile.name}` },
        { name: "description", content: p?.blurb ?? "Data science case study deep dive." },
        { property: "og:title", content: `${p?.name} — ${profile.name}` },
        { property: "og:description", content: p?.blurb },
      ],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { project } = Route.useLoaderData();
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const cs = project.caseStudy;

  return (
    <SiteShell>
      <article className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Case Studies</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-mono text-slate-200 hover:border-primary/50 transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Source Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-xs font-mono text-primary hover:bg-primary/20 transition-colors font-semibold"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="label-caps text-primary font-semibold">{project.domain}</span>
            <span className="text-slate-600">·</span>
            <span className="label-caps text-slate-300">{project.scale}</span>
            <span className="text-slate-600">·</span>
            <span className="num label-caps text-emerald-400 font-semibold">
              {project.status === "prod" ? "In Production" : "Research Prototype"}
            </span>
          </div>

          <h1 className="text-display font-bold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl">
            {project.name}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">{project.blurb}</p>

          {/* Quick Metrics Bar */}
          <div className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {cs.results.metrics.slice(0, 4).map((m, idx) => (
              <div key={idx} className="rounded-2xl border border-white/[0.08] bg-surface/80 p-5 backdrop-blur-xl">
                <span className="label-caps text-[10px] text-slate-400 line-clamp-1 font-semibold">
                  {m.name}
                </span>
                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-white">{m.final}</span>
                  <span
                    className={`flex items-center text-xs font-mono font-bold ${
                      m.direction === "up" ? "text-emerald-400" : "text-indigo-400"
                    }`}
                  >
                    {m.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 1. TL;DR Summary Block */}
        <Reveal type="pop">
          <section className="mt-14 rounded-2xl border border-primary/30 bg-primary/[0.06] p-7 sm:p-9 shadow-lg backdrop-blur-xl">
            <div className="flex items-center gap-2.5 mb-5">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-bold text-white">Executive TL;DR</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-1.5">
                <span className="label-caps text-[10px] text-primary font-bold">01. The Problem</span>
                <p className="text-sm text-slate-300 leading-relaxed">{cs.tldr[0]}</p>
              </div>
              <div className="space-y-1.5">
                <span className="label-caps text-[10px] text-primary font-bold">02. The Approach</span>
                <p className="text-sm text-slate-300 leading-relaxed">{cs.tldr[1]}</p>
              </div>
              <div className="space-y-1.5">
                <span className="label-caps text-[10px] text-primary font-bold">03. The Result</span>
                <p className="text-sm text-slate-300 leading-relaxed">{cs.tldr[2]}</p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 2. Context & Constraints */}
        <Reveal type="pop" delay={0.1}>
          <section className="mt-16 space-y-7">
            <div className="border-b border-white/[0.06] pb-4">
              <h2 className="text-h2 font-bold text-white">1. Context & Operational Constraints</h2>
              <p className="text-sm text-slate-400 mt-1">
                Data volume, latency ceilings, and business realities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-5 backdrop-blur-xl">
                <span className="label-caps text-[10px] text-slate-400 flex items-center gap-1.5 font-semibold">
                  <Database className="h-3.5 w-3.5 text-primary" /> Data Scale
                </span>
                <p className="mt-2 text-sm font-bold text-white">{cs.context.dataVolume}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-5 backdrop-blur-xl">
                <span className="label-caps text-[10px] text-slate-400 flex items-center gap-1.5 font-semibold">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" /> Latency / SLA
                </span>
                <p className="mt-2 text-sm font-bold text-white">{cs.context.sla}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-5 backdrop-blur-xl">
                <span className="label-caps text-[10px] text-slate-400 flex items-center gap-1.5 font-semibold">
                  <Server className="h-3.5 w-3.5 text-indigo-400" /> Stakeholders
                </span>
                <p className="mt-2 text-sm font-bold text-white">{cs.context.stakeholders}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-6 backdrop-blur-xl">
              <p className="label-caps text-xs text-white mb-3.5 font-bold">
                Key Constraints Handled:
              </p>
              <ul className="space-y-2.5 text-sm text-slate-300">
                {cs.context.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-primary font-bold">▸</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* 3. Exploratory Data Analysis & Chart */}
        <Reveal type="pop" delay={0.15}>
          <section className="mt-16 space-y-7">
            <div className="border-b border-white/[0.06] pb-4">
              <h2 className="text-h2 font-bold text-white">2. Data Distribution & EDA Findings</h2>
              <p className="text-sm text-slate-400 mt-1">
                Identifying structural signals before writing modeling code.
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{cs.eda.summary}</p>

            <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-7 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-slate-200 font-semibold">{cs.eda.yLabel}</span>
                <span>Distribution Breakdown</span>
              </div>

              {/* Custom SVG EDA Bar Visualizer */}
              <div className="space-y-4">
                {cs.eda.points.map((pt, i) => {
                  const maxVal = Math.max(...cs.eda.points.map((p) => p.value));
                  const pct = (pt.value / maxVal) * 100;
                  return (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium">{pt.label}</span>
                        <span className="text-emerald-400 font-bold">{pt.value}</span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.04] border border-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-5 text-center font-mono text-[11px] text-slate-500">
                {cs.eda.xLabel}
              </p>
            </div>
          </section>
        </Reveal>

        {/* 4. Modeling Approach & Iteration Log */}
        <Reveal type="pop" delay={0.2}>
          <section className="mt-16 space-y-7">
            <div className="border-b border-white/[0.06] pb-4">
              <h2 className="text-h2 font-bold text-white">3. Modeling Architecture & Iterations</h2>
              <p className="text-sm text-slate-400 mt-1">
                From baseline to production — including what failed along the way.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <span className="label-caps text-xs text-slate-400 font-semibold">Initial Baseline:</span>
              <p className="mt-1 text-sm text-slate-200">{cs.approach.baseline}</p>
            </div>

            {/* Iteration Timeline Cards */}
            <div className="space-y-3.5">
              {cs.approach.iterations.map((iter, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-6 transition-all duration-300 ${
                    iter.status === "final"
                      ? "border-primary bg-primary/10 shadow-[0_0_25px_rgba(99,102,241,0.15)] ring-1 ring-primary/40"
                      : "border-white/[0.08] bg-surface/80 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {iter.status === "final" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-slate-500 shrink-0" />
                      )}
                      <h3 className="font-display font-bold text-sm sm:text-base text-white">
                        Iteration {i + 1}: {iter.name}
                      </h3>
                    </div>
                    <span className="num rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary font-bold">
                      {iter.score}
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {iter.description}
                  </p>
                </div>
              ))}
            </div>

            {/* What Failed Callout */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6">
              <div className="flex items-center gap-2 mb-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                <AlertTriangle className="h-4 w-4" />
                <span>Explicitly What Failed & Why:</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{cs.approach.whatFailed}</p>
            </div>
          </section>
        </Reveal>

        {/* 5. Results & Evaluation Table + Hero Chart */}
        <Reveal type="pop" delay={0.25}>
          <section className="mt-16 space-y-7">
            <div className="border-b border-white/[0.06] pb-4">
              <h2 className="text-h2 font-bold text-white">4. Results & Measured Uplift</h2>
              <p className="text-sm text-slate-400 mt-1">
                Rigorous comparison against baseline heuristics.
              </p>
            </div>

            {/* Metric Comparison Table */}
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/80 shadow-lg backdrop-blur-xl">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/[0.06] bg-white/[0.02] text-[11px] font-mono uppercase text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Metric Evaluation</th>
                    <th className="px-6 py-4 font-semibold">Baseline</th>
                    <th className="px-6 py-4 font-semibold">Final Shipped</th>
                    <th className="px-6 py-4 text-right font-semibold">Attributed Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {cs.results.metrics.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-semibold text-white">{row.name}</td>
                      <td className="px-6 py-4 font-mono text-slate-400">{row.baseline}</td>
                      <td className="px-6 py-4 font-mono font-bold text-primary">
                        {row.final}
                      </td>
                      <td className="px-6 py-4 font-mono text-right font-bold">
                        <span
                          className={`inline-flex items-center gap-1 ${
                            row.direction === "up" ? "text-emerald-400" : "text-indigo-400"
                          }`}
                        >
                          {row.direction === "up" ? (
                            <TrendingUp className="h-3.5 w-3.5" />
                          ) : (
                            <TrendingDown className="h-3.5 w-3.5" />
                          )}
                          {row.delta}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hero Results Chart */}
            <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-7 shadow-lg backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    {cs.results.heroChart.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {cs.results.heroChart.subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-[0_0_6px_#6366f1]" /> Predicted
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" /> Actual / Benchmark
                  </span>
                </div>
              </div>

              {/* Hand-Rolled Hero SVG Curve Chart */}
              <HeroChartSVG data={cs.results.heroChart.data} />
            </div>
          </section>
        </Reveal>

        {/* 6. Deployment & Monitoring Architecture */}
        <Reveal type="pop" delay={0.3}>
          <section className="mt-16 space-y-7">
            <div className="border-b border-white/[0.06] pb-4">
              <h2 className="text-h2 font-bold text-white">5. Production Deployment & Drift Strategy</h2>
              <p className="text-sm text-slate-400 mt-1">
                Infrastructure lifecycle, latency, and continuous monitoring.
              </p>
            </div>

            {/* Architecture Pipeline Flow Diagram */}
            <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-7 shadow-lg backdrop-blur-xl">
              <p className="label-caps text-xs text-white mb-5 font-bold">
                End-to-End Execution Pipeline:
              </p>
              <div className="space-y-3">
                {cs.deployment.pipeline.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="num grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-primary/10 border border-primary/25 font-mono text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-xs sm:text-sm text-slate-200">
                      {step}
                    </div>
                    {i < cs.deployment.pipeline.length - 1 && (
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-3.5 sm:grid-cols-2 pt-5 border-t border-white/[0.06]">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <span className="label-caps text-[10px] text-slate-400 font-semibold">
                    Drift Detection Strategy:
                  </span>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                    {cs.deployment.driftStrategy}
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <span className="label-caps text-[10px] text-slate-400 font-semibold">
                    Execution Profile:
                  </span>
                  <p className="mt-1.5 text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">{cs.deployment.latency}</span> ·{" "}
                    {cs.deployment.cadence}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 7. Retrospective */}
        <Reveal type="pop" delay={0.35}>
          <section className="mt-16 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-7 sm:p-9 backdrop-blur-xl">
            <div className="flex items-center gap-2.5 mb-3.5">
              <Activity className="h-5 w-5 text-emerald-400" />
              <h2 className="font-display text-lg font-bold text-white">
                6. Retrospective: What I Would Do Differently
              </h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{cs.retrospective}</p>
          </section>
        </Reveal>

        {/* Bottom Pagination Links */}
        <div className="mt-20 flex items-center justify-between border-t border-white/[0.06] pt-8">
          {prevProject ? (
            <Link
              to="/projects/$slug"
              params={{ slug: prevProject.slug }}
              className="group flex flex-col text-left"
            >
              <span className="label-caps text-[10px] text-slate-500 group-hover:text-primary">
                ← Previous Case Study
              </span>
              <span className="font-display text-sm font-bold text-white group-hover:text-primary mt-1">
                {prevProject.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              to="/projects/$slug"
              params={{ slug: nextProject.slug }}
              className="group flex flex-col text-right"
            >
              <span className="label-caps text-[10px] text-slate-500 group-hover:text-primary">
                Next Case Study →
              </span>
              <span className="font-display text-sm font-bold text-white group-hover:text-primary mt-1">
                {nextProject.name}
              </span>
            </Link>
          )}
        </div>
      </article>
    </SiteShell>
  );
}

function HeroChartSVG({
  data,
}: {
  data: {
    step: string | number;
    actual: number;
    predicted: number;
    lower?: number;
    upper?: number;
  }[];
}) {
  const w = 700;
  const h = 220;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 40;

  const allVals = data.flatMap((d) => [
    d.actual,
    d.predicted,
    d.lower ?? d.predicted,
    d.upper ?? d.predicted,
  ]);
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const range = max - min || 1;

  const px = (i: number) => padL + (i / (data.length - 1)) * (w - padL - padR);
  const py = (v: number) => h - padB - ((v - min) / range) * (h - padT - padB);

  const predPoints = data.map((d, i) => `${px(i)},${py(d.predicted)}`).join(" L ");
  const actPoints = data.map((d, i) => `${px(i)},${py(d.actual)}`).join(" L ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto select-none overflow-visible">
      {/* Grid lines */}
      {[0, 0.5, 1].map((ratio) => {
        const val = min + ratio * range;
        const y = py(val);
        return (
          <g key={ratio}>
            <line x1={padL} x2={w - padR} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            <text
              x={padL - 8}
              y={y + 4}
              textAnchor="end"
              className="fill-slate-500 font-mono text-[9px]"
            >
              {val > 10 ? Math.round(val) : val.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Actual Curve (Emerald) */}
      <path
        d={`M ${actPoints}`}
        fill="none"
        stroke="#34d399"
        strokeWidth="2.5"
        strokeDasharray="4 4"
      />

      {/* Predicted Curve (Electric Indigo) */}
      <path
        d={`M ${predPoints}`}
        fill="none"
        stroke="#6366f1"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Points */}
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={px(i)} cy={py(d.actual)} r={3.5} fill="#34d399" />
          <circle cx={px(i)} cy={py(d.predicted)} r={4} fill="#6366f1" />
          <text
            x={px(i)}
            y={h - padB + 16}
            textAnchor="middle"
            className="fill-slate-500 font-mono text-[9px]"
          >
            {d.step}
          </text>
        </g>
      ))}
    </svg>
  );
}
