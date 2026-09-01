import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section } from "@/components/site-shell";
import { projects, profile, type Project } from "@/data/portfolio";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects & Case Studies — ${profile.name}` },
      { name: "description", content: "Forecasting, causal inference, NLP and vision case studies with problem, approach and measured impact." },
      { property: "og:title", content: `Projects — ${profile.name}` },
      { property: "og:description", content: "Case studies with problem, approach and measured impact." },
    ],
  }),
  component: Projects,
});

const domains = ["All", "Forecasting", "Causal", "NLP", "Vision"] as const;
const scales = ["All", "Production", "Prototype"] as const;

function Projects() {
  const [domain, setDomain] = useState<(typeof domains)[number]>("All");
  const [scale, setScale] = useState<(typeof scales)[number]>("All");
  const [open, setOpen] = useState<string | null>(projects[0]?.slug ?? null);

  const filtered = projects.filter(
    (p) => (domain === "All" || p.domain === domain) && (scale === "All" || p.scale === scale),
  );

  return (
    <SiteShell>
      <Section
        eyebrow="Projects"
        title="Case studies, not screenshots"
        lead="Narrow the tree by domain and maturity — each node expands into problem, approach and impact."
      >
        <div className="mt-8 flex flex-wrap gap-6">
          <Filter label="Domain" options={domains} value={domain} onChange={setDomain} />
          <Filter label="Maturity" options={scales} value={scale} onChange={setScale} />
        </div>

        <p className="num mt-4 text-xs text-muted-foreground">
          {filtered.length} / {projects.length} matching
        </p>

        <div className="mt-6 space-y-3">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} open={open === p.slug} onToggle={() => setOpen(open === p.slug ? null : p.slug)} />
          ))}
          {filtered.length === 0 && (
            <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No projects match that branch. Widen a filter.
            </p>
          )}
        </div>
      </Section>
    </SiteShell>
  );
}

function Filter<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="label-caps mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              value === o
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, open, onToggle }: { project: Project; open: boolean; onToggle: () => void }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <button onClick={onToggle} className="flex w-full items-start justify-between gap-4 p-5 text-left">
        <div>
          <p className="label-caps">
            {project.domain} · {project.scale}
          </p>
          <h2 className="mt-1 font-display text-lg font-semibold">{project.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{project.blurb}</p>
        </div>
        <span className="num text-primary">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="grid gap-4 border-t border-border p-5 md:grid-cols-3">
          <Block title="Problem" body={project.problem} />
          <Block title="Approach" body={project.approach} />
          <Block title="Impact" body={project.impact} highlight />
          <div className="md:col-span-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-border px-2.5 py-1 num text-xs text-muted-foreground">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function Block({ title, body, highlight }: { title: string; body: string; highlight?: boolean }) {
  return (
    <div>
      <p className="label-caps mb-2">{title}</p>
      <p className={`text-sm ${highlight ? "text-primary" : "text-muted-foreground"}`}>{body}</p>
    </div>
  );
}
