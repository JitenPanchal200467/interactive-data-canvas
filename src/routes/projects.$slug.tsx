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
      <article className="mx-auto max-w-4xl px-5 py-12">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between gap-4 border-b border-border pb-6">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-mono text-foreground hover:border-primary transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Code</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-mono text-primary hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="label-caps text-primary">{project.domain}</span>
            <span className="text-muted-foreground">·</span>
            <span className="label-caps">{project.scale}</span>
            <span className="text-muted-foreground">·</span>
            <span className="num label-caps text-muted-foreground">
              {project.status === "prod" ? "In Production" : "Prototype"}
            </span>
          </div>

          <h1 className="text-display font-semibold tracking-tight text-foreground">
            {project.name}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{project.blurb}</p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {cs.results.metrics.slice(0, 4).map((m, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card p-4">
                <span className="label-caps text-[10px] text-muted-foreground line-clamp-1">
                  {m.name}
                </span>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-mono text-2xl font-bold text-primary">{m.final}</span>
                  <span
                    className={`flex items-center text-xs font-mono font-medium ${
                      m.direction === "up" ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {m.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-surface-raised px-2.5 py-1 font-mono text-xs text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 1. TL;DR Summary Block */}
        <section className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Executive TL;DR</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1">
              <span className="label-caps text-[10px] text-primary">01. The Problem</span>
              <p className="text-sm text-foreground/90 leading-relaxed">{cs.tldr[0]}</p>
            </div>
            <div className="space-y-1">
              <span className="label-caps text-[10px] text-primary">02. The Approach</span>
              <p className="text-sm text-foreground/90 leading-relaxed">{cs.tldr[1]}</p>
            </div>
            <div className="space-y-1">
              <span className="label-caps text-[10px] text-primary">03. The Result</span>
              <p className="text-sm text-foreground/90 leading-relaxed">{cs.tldr[2]}</p>
            </div>
          </div>
        </section>

        {/* 2. Context & Constraints */}
        <section className="mt-14 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-h2 text-foreground">1. Context & Operational Constraints</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Data volume, latency ceilings, and business realities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="label-caps text-[10px] text-muted-foreground flex items-center gap-1.5">
                <Database className="h-3.5 w-3.5 text-primary" /> Data Scale
              </span>
              <p className="mt-2 text-sm font-medium text-foreground">{cs.context.dataVolume}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="label-caps text-[10px] text-muted-foreground flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" /> Latency / SLA
              </span>
              <p className="mt-2 text-sm font-medium text-foreground">{cs.context.sla}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <span className="label-caps text-[10px] text-muted-foreground flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-teal-400" /> Stakeholders
              </span>
              <p className="mt-2 text-sm font-medium text-foreground">{cs.context.stakeholders}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface/50 p-5">
            <p className="label-caps text-xs text-foreground mb-3 font-semibold">
              Key Constraints Handled:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {cs.context.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-primary font-bold">▸</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Exploratory Data Analysis & Chart */}
        <section className="mt-14 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-h2 text-foreground">2. Data Distribution & EDA Findings</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Identifying structural signals before writing modeling code.
            </p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{cs.eda.summary}</p>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{cs.eda.yLabel}</span>
              <span>Distribution Breakdown</span>
            </div>

            {/* Custom SVG EDA Bar Visualizer */}
            <div className="space-y-3">
              {cs.eda.points.map((pt, i) => {
                const maxVal = Math.max(...cs.eda.points.map((p) => p.value));
                const pct = (pt.value / maxVal) * 100;
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-foreground">{pt.label}</span>
                      <span className="text-primary font-semibold">{pt.value}</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-surface-raised">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-teal-400 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
              {cs.eda.xLabel}
            </p>
          </div>
        </section>

        {/* 4. Modeling Approach & Iteration Log */}
        <section className="mt-14 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-h2 text-foreground">3. Modeling Architecture & Iterations</h2>
            <p className="text-sm text-muted-foreground mt-1">
              From baseline to production — including what failed along the way.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface/60 p-4">
            <span className="label-caps text-xs text-muted-foreground">Initial Baseline:</span>
            <p className="mt-1 text-sm text-foreground">{cs.approach.baseline}</p>
          </div>

          {/* Iteration Timeline Cards */}
          <div className="space-y-3">
            {cs.approach.iterations.map((iter, i) => (
              <div
                key={i}
                className={`rounded-xl border p-5 ${
                  iter.status === "final"
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(61,219,198,0.1)]"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {iter.status === "final" ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground/60" />
                    )}
                    <h3 className="font-display font-semibold text-sm sm:text-base text-foreground">
                      Iteration {i + 1}: {iter.name}
                    </h3>
                  </div>
                  <span className="num rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-primary font-semibold">
                    {iter.score}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {iter.description}
                </p>
              </div>
            ))}
          </div>

          {/* What Failed Callout */}
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-5">
            <div className="flex items-center gap-2 mb-2 text-destructive font-semibold text-xs uppercase tracking-wider font-mono">
              <AlertTriangle className="h-4 w-4" />
              <span>Explicitly What Failed & Why:</span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">{cs.approach.whatFailed}</p>
          </div>
        </section>

        {/* 5. Results & Evaluation Table + Hero Chart */}
        <section className="mt-14 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-h2 text-foreground">4. Results & Measured Uplift</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Rigorous comparison against baseline heuristics.
            </p>
          </div>

          {/* Metric Comparison Table */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-surface/80 text-[11px] font-mono uppercase text-muted-foreground">
                <tr>
                  <th className="px-5 py-3.5">Metric Evaluation</th>
                  <th className="px-5 py-3.5">Baseline</th>
                  <th className="px-5 py-3.5">Final Shipped</th>
                  <th className="px-5 py-3.5 text-right">Attributed Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {cs.results.metrics.map((row, i) => (
                  <tr key={i} className="hover:bg-surface/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">{row.name}</td>
                    <td className="px-5 py-3.5 font-mono text-muted-foreground">{row.baseline}</td>
                    <td className="px-5 py-3.5 font-mono font-semibold text-primary">
                      {row.final}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-right font-semibold">
                      <span
                        className={`inline-flex items-center gap-1 ${
                          row.direction === "up" ? "text-emerald-400" : "text-accent"
                        }`}
                      >
                        {row.direction === "up" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
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
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-sm text-foreground">
                  {cs.results.heroChart.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {cs.results.heroChart.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-primary">
                  <span className="h-2 w-2 rounded-full bg-primary" /> Predicted
                </span>
                <span className="flex items-center gap-1 text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" /> Actual / Benchmark
                </span>
              </div>
            </div>

            {/* Hand-Rolled Hero SVG Curve Chart */}
            <HeroChartSVG data={cs.results.heroChart.data} />
          </div>
        </section>

        {/* 6. Deployment & Monitoring Architecture */}
        <section className="mt-14 space-y-6">
          <div className="border-b border-border pb-3">
            <h2 className="text-h2 text-foreground">5. Production Deployment & Drift Strategy</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Infrastructure lifecycle, latency, and continuous monitoring.
            </p>
          </div>

          {/* Architecture Pipeline Flow Diagram */}
          <div className="rounded-2xl border border-border bg-surface/50 p-6">
            <p className="label-caps text-xs text-foreground mb-4 font-semibold">
              End-to-End Execution Pipeline:
            </p>
            <div className="space-y-2.5">
              {cs.deployment.pipeline.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="num grid h-6 w-6 shrink-0 place-items-center rounded-md bg-surface-raised border border-border font-mono text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div className="flex-1 rounded-lg border border-border bg-card px-3.5 py-2 text-xs sm:text-sm text-foreground">
                    {step}
                  </div>
                  {i < cs.deployment.pipeline.length - 1 && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 pt-4 border-t border-border">
              <div className="rounded-xl border border-border bg-card p-3.5">
                <span className="label-caps text-[10px] text-muted-foreground">
                  Drift Detection Strategy:
                </span>
                <p className="mt-1 text-xs text-foreground leading-relaxed">
                  {cs.deployment.driftStrategy}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3.5">
                <span className="label-caps text-[10px] text-muted-foreground">
                  Execution Profile:
                </span>
                <p className="mt-1 text-xs text-foreground">
                  <span className="font-semibold text-primary">{cs.deployment.latency}</span> ·{" "}
                  {cs.deployment.cadence}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. What I'd Do Differently (Retrospective) */}
        <section className="mt-14 rounded-2xl border border-accent/40 bg-accent/5 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-5 w-5 text-accent" />
            <h2 className="font-display text-lg font-semibold text-foreground">
              6. Retrospective: What I Would Do Differently
            </h2>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">{cs.retrospective}</p>
        </section>

        {/* Bottom Pagination Links */}
        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          {prevProject ? (
            <Link
              to="/projects/$slug"
              params={{ slug: prevProject.slug }}
              className="group flex flex-col text-left"
            >
              <span className="label-caps text-[10px] text-muted-foreground group-hover:text-primary">
                ← Previous Project
              </span>
              <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary">
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
              <span className="label-caps text-[10px] text-muted-foreground group-hover:text-primary">
                Next Project →
              </span>
              <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary">
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
            <line x1={padL} x2={w - padR} y1={y} y2={y} stroke="var(--grid-line)" strokeWidth={1} />
            <text
              x={padL - 8}
              y={y + 4}
              textAnchor="end"
              className="fill-muted-foreground font-mono text-[9px]"
            >
              {val > 10 ? Math.round(val) : val.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Actual Curve */}
      <path
        d={`M ${actPoints}`}
        fill="none"
        stroke="#f5b544"
        strokeWidth="2.5"
        strokeDasharray="4 4"
      />

      {/* Predicted Curve */}
      <path
        d={`M ${predPoints}`}
        fill="none"
        stroke="#3ddbc7"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Points */}
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={px(i)} cy={py(d.actual)} r={3.5} fill="#f5b544" />
          <circle cx={px(i)} cy={py(d.predicted)} r={4} fill="#3ddbc7" />
          <text
            x={px(i)}
            y={h - padB + 16}
            textAnchor="middle"
            className="fill-muted-foreground font-mono text-[9px]"
          >
            {d.step}
          </text>
        </g>
      ))}
    </svg>
  );
}
