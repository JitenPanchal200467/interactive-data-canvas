import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section } from "@/components/site-shell";
import { experience, profile } from "@/data/portfolio";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: `Experience — ${profile.name}` },
      { name: "description", content: "Roles, teams and measurable outcomes across six years of production data science." },
      { property: "og:title", content: `Experience — ${profile.name}` },
      { property: "og:description", content: "Roles, teams and measurable outcomes in production data science." },
    ],
  }),
  component: Experience,
});

function Experience() {
  return (
    <SiteShell>
      <Section
        eyebrow="Experience"
        title="Where the models went live"
        lead="Each role below lists the outcome first — the stack is just how it got there."
      >
        <ol className="mt-10 space-y-6 border-l border-border pl-6">
          {experience.map((job) => (
            <li key={job.company} className="relative">
              <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-lg font-semibold">
                    {job.role} · <span className="text-primary">{job.company}</span>
                  </h2>
                  <p className="num text-xs text-muted-foreground">
                    {job.period} · {job.location}
                  </p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-primary">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <span key={s} className="rounded-full border border-border px-2.5 py-1 num text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </SiteShell>
  );
}
