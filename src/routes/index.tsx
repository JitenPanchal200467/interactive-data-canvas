import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { Reveal } from "@/components/reveal";
import { SkillMatrix } from "@/components/skill-matrix";
import { profile, metrics, projects } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${profile.role} Portfolio` },
      { name: "description", content: profile.summary.slice(0, 155) },
      { property: "og:title", content: `${profile.name} — ${profile.role}` },
      { property: "og:description", content: profile.tagline },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <section className="grid-bg relative isolate overflow-hidden border-b border-border">
        <HeroCanvas />
        <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-5 py-24 [&_a]:pointer-events-auto [&_dl]:pointer-events-auto">
          <p className="label-caps">{profile.role} · {profile.location}</p>
          <h1 className="text-display mt-4 max-w-4xl">{profile.tagline}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              See the work <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Get in touch
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="bg-card p-5">
                <dt className="label-caps">{m.label}</dt>
                <dd className="num mt-2 text-3xl text-primary">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="label-caps mb-3">Skill matrix</p>
        <h2 className="text-h2 mb-6">Depth against time served</h2>
        <SkillMatrix />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-h2">Selected work</h2>
          <Link to="/projects" className="text-sm text-primary hover:underline">
            All case studies
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
            <Link
              to="/projects"
              className="block h-full rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary"
            >
              <p className="label-caps">{p.domain} · {p.scale}</p>
              <h3 className="mt-2 font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
