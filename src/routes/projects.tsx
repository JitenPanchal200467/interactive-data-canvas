import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Github, ExternalLink, Activity, Sparkles, Layers } from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import { DecisionTreeFilter } from "@/components/decision-tree-filter";
import { Reveal } from "@/components/reveal";
import { projects, profile, type Project } from "@/data/portfolio";

export interface ProjectsSearch {
  path?: string | undefined;
}

export const Route = createFileRoute("/projects")({
  validateSearch: (search: Record<string, unknown>): ProjectsSearch => {
    const rawPath = search["path"];
    return {
      path: typeof rawPath === "string" ? rawPath : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: `Projects & Case Studies — ${profile.name}` },
      {
        name: "description",
        content:
          "Production data science case studies: FileFlux processing, InsuLens health risk prediction, automated preprocessing harnesses, and C++ algorithmic suites.",
      },
      { property: "og:title", content: `Case Studies & Projects — ${profile.name}` },
      {
        property: "og:description",
        content: "Production machine learning case studies with measurable business ROI.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [path, setPath] = useState<string | null>(search.path ?? null);
  const [filterPredicate, setFilterPredicate] = useState<
    ((domain: string, slug: string, stack: string[]) => boolean) | null
  >(null);

  // Sync state if URL search query changes
  useEffect(() => {
    if (search.path !== undefined) {
      setPath(search.path);
    }
  }, [search.path]);

  const handlePathChange = (
    newPath: string | null,
    predicate?: (domain: string, slug: string, stack: string[]) => boolean,
  ) => {
    setPath(newPath);
    setFilterPredicate(() => (predicate ? predicate : null));
    navigate({
      to: "/projects",
      search: { path: newPath ?? undefined },
      replace: true,
    });
  };

  const filteredProjects = useMemo(() => {
    if (!filterPredicate) return projects;
    return projects.filter((p) => filterPredicate(p.domain, p.slug, p.stack));
  }, [filterPredicate]);

  return (
    <SiteShell>
      <Section
        eyebrow="Case Studies"
        title="Engineering Case Studies, Not Screenshots"
        lead="Every project below went through production fire: messy edge cases, tight latency budgets, and rigorous evaluation harnesses."
      >
        {/* Gimmick B: Decision-Tree Project Navigator */}
        <div className="mt-8 mb-12">
          <DecisionTreeFilter
            selectedPath={path}
            onPathChange={handlePathChange}
            totalProjectsCount={projects.length}
            matchedProjectsCount={filteredProjects.length}
          />
        </div>

        {/* Project Cards Grid with Scroll Pop-Up */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((p, idx) => (
            <Reveal key={p.slug} delay={idx * 0.08} type="pop">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <Layers className="mx-auto h-8 w-8 text-muted-foreground/50 mb-3" />
            <h3 className="font-display font-semibold text-foreground">
              No case studies match that branch
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try selecting another tree split or click Show All to reset the classification filter.
            </p>
            <button
              onClick={() => handlePathChange(null)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Section>
    </SiteShell>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isProd = project.scale === "Production";

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]">
      <div>
        {/* Card Header & Status */}
        <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-6 py-4">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isProd
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : "bg-indigo-400 shadow-[0_0_8px_#818cf8]"
              }`}
            />
            <span className="label-caps text-[10px] font-semibold text-white">
              {project.domain} · {project.scale}
            </span>
          </div>

          <span className="num rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-slate-400">
            {project.status === "prod" ? "● Live In Prod" : "● Research Prototype"}
          </span>
        </div>

        {/* Card Main Body */}
        <div className="p-6">
          <h2 className="font-display text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            <Link to="/projects/$slug" params={{ slug: project.slug }}>
              {project.name}
            </Link>
          </h2>

          <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">{project.blurb}</p>

          {/* 3 Quick KPI Numeral Chips */}
          <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            {project.kpiChips.map((kpi, idx) => (
              <div key={idx} className="text-center">
                <span className="block font-mono text-xs font-bold text-emerald-400">{kpi}</span>
                <span className="block text-[9px] font-mono text-slate-500 mt-0.5 uppercase tracking-wider">
                  {idx === 0 ? "Primary Gain" : idx === 1 ? "Secondary" : "Scale"}
                </span>
              </div>
            ))}
          </div>

          {/* Live Mini-Chart Sparkline Preview */}
          <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 p-3.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Activity className="h-3.5 w-3.5 text-indigo-400" /> Metric Convergence Trend
              </span>
              <span className="text-emerald-400 font-semibold">Final: {project.sparkline[project.sparkline.length - 1]}</span>
            </div>
            <MiniSparkline data={project.sparkline} />
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Rail */}
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-white/[0.01] px-6 py-4">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="inline-flex items-center gap-1.5 font-display text-xs font-semibold text-primary transition-transform group-hover:translate-x-1"
        >
          <span>Deep-Dive Case Study</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="View source code on GitHub"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label="Launch interactive demo"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function MiniSparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 320;
  const h = 40;
  const pad = 6;

  const points = data.map((val, idx) => {
    const x = pad + (idx / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((val - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(" L ")}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10 select-none overflow-visible">
      <path
        d={pathD}
        fill="none"
        stroke="#6366f1"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((val, idx) => {
        const x = pad + (idx / (data.length - 1)) * (w - pad * 2);
        const y = h - pad - ((val - min) / range) * (h - pad * 2);
        return (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r={idx === data.length - 1 ? 3.5 : 2}
            fill={idx === data.length - 1 ? "#34d399" : "#1e1b4b"}
            stroke={idx === data.length - 1 ? "#34d399" : "#6366f1"}
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
