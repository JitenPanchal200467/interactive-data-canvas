import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck, Cpu, Code2, LineChart, CheckCircle2 } from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import { SkillMatrix } from "@/components/skill-matrix";
import { profile, education } from "@/data/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${profile.name} — ${profile.role}` },
      {
        name: "description",
        content: `How ${profile.name} works: production modeling methodology, evaluation harnesses, drift monitoring, and academic background.`,
      },
      { property: "og:title", content: `About & Methodology — ${profile.name}` },
      { property: "og:description", content: profile.tagline },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    title: "1. Frame the existing decision before fitting any curve",
    desc: "I write down how the business decision is made today, who executes it, and what measurable error threshold would justify an automated model. If a simple heuristic captures 80% of value with zero maintenance overhead, I advocate shipping the heuristic.",
    icon: LineChart,
  },
  {
    title: "2. Build evaluation harnesses that mirror deployment reality",
    desc: "Random train/test splits are fantasy. In production, models face temporal drift, cold-start items, and delayed labels. I mandate rolling-origin backtests, slice-level metrics, and randomized holdout control arms before any model reaches staging.",
    icon: ShieldCheck,
  },
  {
    title: "3. Conformal intervals & selective deferral over raw point predictions",
    desc: "A model that knows when it is uncertain is 10x more valuable than a slightly more accurate black box. I calibrate confidence outputs using Platt scaling and conformal prediction so downstream systems can safely defer low-confidence edge cases to human specialists.",
    icon: Cpu,
  },
  {
    title: "4. Fast feedback loops beat complex single-shot architectures",
    desc: "The best data science code is the code that enables quick iterations. I invest heavily in vectorized data pipelines (Polars, dbt, Feast) so backtests run in minutes rather than days.",
    icon: Code2,
  },
];

function AboutPage() {
  return (
    <SiteShell>
      <Section
        eyebrow="Methodology & Background"
        title="A Data Scientist Who Builds for Production Reality"
        lead="Writing model code is the easiest 10% of machine learning. The real challenge is making the pipeline reproducible, deterministic, and resilient to distributional shift."
      >
        {/* Core Principles Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="font-display text-base font-semibold text-foreground">
                    {p.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Story & Education Section */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="text-h2 text-foreground">The Philosophy Behind the Work</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Throughout my computer engineering training and industry internships at Zaalima
              Development and Infolabz IT Services, I have observed that models frequently fail in
              production not because of algorithmic inadequacy, but because of unhandled data
              quality defects, data leakage during transformations, and high-latency serving bottlenecks.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              My engineering approach unites rigorous machine learning (fine-tuned transformer
              architectures for legal contract understanding, ensemble regression, and RAG retrieval)
              with deterministic software systems (vectorized Pandas/NumPy pipelines, asynchronous
              Celery workers, Dockerized microservices, and client-side zero-latency processing).
            </p>
            <div className="border-t border-border pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/experience"
                className="text-xs font-mono font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                View internship track record & impact →
              </Link>
              <Link
                to="/resume"
                className="text-xs font-mono font-semibold text-accent hover:underline inline-flex items-center gap-1"
              >
                Inspect full Resume / CV →
              </Link>
            </div>
          </div>

          {/* Academic Background */}
          <aside className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="label-caps font-semibold text-foreground">Education</span>
              </div>
              <ul className="space-y-5">
                {education.map((e) => (
                  <li
                    key={e.school}
                    className="border-b border-border/60 pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold text-foreground">{e.degree}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{e.school}</p>
                    <p className="num text-[11px] text-primary mt-1 font-mono">{e.year}</p>
                    {e.thesis && (
                      <p className="text-[11px] text-muted-foreground/80 mt-1.5 italic">
                        Thesis: "{e.thesis}"
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-border text-[11px] text-muted-foreground">
              <span className="text-primary">●</span> Strong foundational focus on stochastic
              optimization and distributed systems.
            </div>
          </aside>
        </div>

        {/* Live Skill Matrix */}
        <div className="mt-16">
          <div className="mb-6">
            <p className="label-caps mb-1 text-primary">Interactive Toolkit</p>
            <h2 className="text-h2 font-semibold">2D Skill Dispersion Matrix</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Hover quadrants or nodes to inspect years of experience, production frequency, and
              linked project case studies.
            </p>
          </div>
          <SkillMatrix />
        </div>
      </Section>
    </SiteShell>
  );
}
