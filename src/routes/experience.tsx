import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Building, MapPin, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
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
  return (
    <SiteShell>
      <Section
        eyebrow="Track Record"
        title="Where the Models Went Live"
        lead="Every bullet follows a strict engineering formula: Action Verb → Target Asset → Measurable Delta → Specific Method."
      >
        <div className="mt-12 relative">
          {/* Vertical Progress Rail */}
          <div className="absolute left-4 sm:left-6 top-3 bottom-8 w-[2px] bg-gradient-to-b from-primary via-teal-400 to-border" />

          <div className="space-y-12">
            {experience.map((job, idx) => (
              <div key={job.company} className="relative pl-12 sm:pl-16">
                {/* Timeline Milestone Dot */}
                <div className="absolute left-2 sm:left-4 top-1.5 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full border-2 border-primary bg-background shadow-[0_0_10px_rgba(61,219,198,0.5)]">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>

                {/* Experience Card */}
                <article className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md transition-all hover:border-primary/50">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-border/80 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-surface-raised font-mono text-xs font-bold text-primary border border-border">
                          {job.logo}
                        </span>
                        <h2 className="font-display text-xl font-semibold text-foreground">
                          {job.title}
                        </h2>
                      </div>
                      <p className="mt-1 font-mono text-sm text-primary font-medium">
                        {job.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {job.start} — {job.end}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Context Line */}
                  <p className="text-xs font-mono text-muted-foreground bg-surface/60 px-3 py-2 rounded-lg border border-border/60 mb-5">
                    Context: {job.context}
                  </p>

                  {/* Bullet Formula Entries: Verb -> what -> measurable delta -> method */}
                  <div className="space-y-3.5">
                    {job.impact.map((item, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-3 text-sm leading-relaxed">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary/80" />
                        <div>
                          <span className="font-semibold text-primary">{item.verb} </span>
                          <span className="text-foreground">{item.what} </span>
                          <span className="num font-bold text-teal-300 font-mono">
                            [{item.metric}]{" "}
                          </span>
                          <span className="text-muted-foreground">{item.how}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/80 pt-4">
                    <span className="label-caps text-[10px] text-muted-foreground mr-1">
                      Stack:
                    </span>
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-border bg-surface-raised/60 px-2 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Linked Case Studies */}
                  {job.linkedProjects && job.linkedProjects.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-xs font-mono">
                      <span className="text-muted-foreground">Linked Deep-Dives:</span>
                      {job.linkedProjects.map((slug) => (
                        <Link
                          key={slug}
                          to="/projects/$slug"
                          params={{ slug }}
                          className="inline-flex items-center gap-1 rounded bg-primary/10 border border-primary/30 px-2 py-0.5 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <span>{slug}</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
