import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck, Cpu, Code2, LineChart, CheckCircle2 } from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import { SkillMatrix } from "@/components/skill-matrix";
import { Reveal } from "@/components/reveal";
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
        eyebrow="Methodology & Philosophy"
        title="Engineering for Production Reality"
        lead="Writing model code is the easiest 10% of applied AI. The real engineering discipline lies in data quality isolation, deterministic pipelines, and zero-drift evaluation harnesses."
      >
        {/* Core Principles Grid with Pop-Up Scroll */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={i} delay={i * 0.08} type="pop">
                <div className="group h-full rounded-2xl border border-white/[0.08] bg-surface/80 p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {p.title}
                    </h2>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Story & Education Section with Pop-Up */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Reveal delay={0.1} type="pop" className="md:col-span-2">
            <div className="h-full space-y-5 rounded-2xl border border-white/[0.08] bg-surface/80 p-7 sm:p-9 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary/40">
              <h2 className="text-h2 font-bold text-white">The Engineering Foundations</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Throughout my computer engineering training and industry internships at Zaalima
                Development and Infolabz IT Services, I observed that machine learning systems
                frequently falter in production not due to mathematical inadequacy, but because of
                undetected data drift, target leakage during preprocessing, and high latency serving
                bottlenecks.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                My approach unites rigorous modeling (fine-tuning RoBERTa/BERT on legal Atticus corpuses,
                ensemble risk regressors, and LangChain RAG vector stores) with deterministic software engineering
                (vectorized Pandas/NumPy pipelines, asynchronous Celery workers, Dockerized FastAPI microservices,
                and high-throughput C++ data structures).
              </p>
              <div className="border-t border-white/[0.08] pt-5 flex flex-wrap items-center gap-5">
                <Link
                  to="/experience"
                  preload="intent"
                  className="text-xs sm:text-sm font-mono font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
                >
                  View internship track record & impact →
                </Link>
                <Link
                  to="/resume"
                  preload="intent"
                  className="text-xs sm:text-sm font-mono font-semibold text-emerald-400 hover:underline inline-flex items-center gap-1.5"
                >
                  Inspect full Resume / CV →
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Academic Background */}
          <Reveal delay={0.2} type="pop">
            <aside className="h-full rounded-2xl border border-white/[0.08] bg-surface/80 p-7 flex flex-col justify-between shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary/40">
              <div>
                <div className="flex items-center gap-2.5 mb-5 border-b border-white/[0.06] pb-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="label-caps font-semibold text-white">Education</span>
                </div>
                <ul className="space-y-5">
                  {education.map((e) => (
                    <li
                      key={e.school}
                      className="border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
                    >
                      <p className="text-sm font-bold text-white">{e.degree}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{e.school}</p>
                      <p className="num text-[11px] text-emerald-400 mt-1 font-mono">{e.year} · {e.score}</p>
                      {e.thesis && (
                        <p className="text-[11px] text-slate-400 mt-1.5 italic">
                          "{e.thesis}"
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] text-slate-400 font-mono">
                <span className="text-primary">●</span> Rigorous computer science foundations with 150+ DSA problems solved.
              </div>
            </aside>
          </Reveal>
        </div>

        {/* Live Skill Matrix */}
        <Reveal delay={0.15} type="pop" className="mt-20">
          <div className="mb-6 border-b border-white/[0.06] pb-4">
            <span className="label-caps text-primary font-semibold">Interactive Matrix</span>
            <h2 className="text-h1 mt-1 font-bold text-white">2D Production Skill Matrix</h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1">
              Hover nodes to inspect years of experience, production frequency, and linked project case studies.
            </p>
          </div>
          <SkillMatrix />
        </Reveal>
      </Section>
    </SiteShell>
  );
}
