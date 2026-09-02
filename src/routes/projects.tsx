import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Github, ExternalLink, Activity, Sparkles, Layers } from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import { DecisionTreeFilter } from "@/components/decision-tree-filter";
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

        {/* Project Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
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
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]">
      <div>
        {/* Card Header & Status */}
        <div className="flex items-center justify-between border-b border-border/80 bg-surface/40 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isProd
                  ? "bg-primary shadow-[0_0_8px_rgba(61,219,198,0.8)]"
                  : "bg-accent shadow-[0_0_8px_rgba(245,181,68,0.8)]"
              }`}
            />
            <span className="label-caps text-[10px] font-semibold text-foreground">
              {project.domain} · {project.scale}
            </span>
          </div>

          <span className="num rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            {project.status === "prod" ? "● Live In Prod" : "● Research Prototype"}
          </span>
        </div>

        {/* Card Main Body */}
        <div className="p-5">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
            <Link to="/projects/$slug" params={{ slug: project.slug }}>
              {project.name}
            </Link>
          </h2>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{project.blurb}</p>

          {/* 3 Quick KPI Numeral Chips */}
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-border bg-surface/50 p-2.5">
            {project.kpiChips.map((kpi, idx) => (
              <div key={idx} className="text-center">
                <span className="block font-mono text-xs font-semibold text-primary">{kpi}</span>
                <span className="block text-[9.5px] font-mono text-muted-foreground mt-0.5">
                  {idx === 0 ? "Primary Metric" : idx === 1 ? "Secondary Gain" : "Scale"}
                </span>
              </div>
            ))}
          </div>

          {/* Live Mini-Chart Sparkline Preview */}
          <div className="mt-4 rounded-xl border border-border/70 bg-background/60 p-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1.5">
              <span className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-accent" /> Convergence & Metric Trend
              </span>
              <span>Final: {project.sparkline[project.sparkline.length - 1]}</span>
            </div>
            <MiniSparkline data={project.sparkline} />
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-surface-raised/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Rail */}
      <div className="flex items-center justify-between border-t border-border bg-surface/20 px-5 py-3.5">
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
              className="text-muted-foreground hover:text-foreground transition-colors"
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
              className="text-muted-foreground hover:text-foreground transition-colors"
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
        stroke="#3ddbc7"
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
            fill={idx === data.length - 1 ? "#3ddbc7" : "#151b24"}
            stroke="#3ddbc7"
            strokeWidth="1.5"
          />
        );
      })}
    </svg>
  );
}
