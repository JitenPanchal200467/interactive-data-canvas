import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Section } from "@/components/site-shell";
import { SkillMatrix } from "@/components/skill-matrix";
import { profile, education } from "@/data/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About ${profile.name} — ${profile.role}` },
      { name: "description", content: `How ${profile.name} works: methods, tooling and background in production data science.` },
      { property: "og:title", content: `About ${profile.name}` },
      { property: "og:description", content: profile.tagline },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <Section eyebrow="About" title="A data scientist who likes shipping" lead={profile.summary}>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4 text-muted-foreground">
            <p>
              I start every problem by writing down how the decision gets made today, and what would have to be true for a
              model to improve it. That framing kills a surprising number of projects early — and makes the survivors much
              easier to defend.
            </p>
            <p>
              In practice that means heavy investment in evaluation before modelling: backtests that mirror deployment,
              slice-level metrics, and a clear baseline. Once a model is live I care most about drift monitoring and the
              feedback loop that lets it improve without a rewrite.
            </p>
            <p>
              Outside work I write about forecasting reconciliation, maintain a couple of small open-source utilities, and
              spend an unreasonable amount of time tuning my plotting defaults.
            </p>
          </div>
          <aside className="rounded-xl border border-border bg-card p-5">
            <p className="label-caps">Education</p>
            <ul className="mt-3 space-y-4">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="text-sm font-medium">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.school}</p>
                  <p className="num text-xs text-muted-foreground">{e.year}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-12">
          <h2 className="text-h2 mb-6">Toolkit</h2>
          <SkillMatrix />
        </div>
      </Section>
    </SiteShell>
  );
}
