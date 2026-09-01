import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import { certifications, profile } from "@/data/portfolio";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: `Certifications — ${profile.name}` },
      { name: "description", content: "Cloud, ML and data engineering certifications with issuing body and credential IDs." },
      { property: "og:title", content: `Certifications — ${profile.name}` },
      { property: "og:description", content: "Cloud, ML and data engineering credentials." },
    ],
  }),
  component: Certifications,
});

function Certifications() {
  return (
    <SiteShell>
      <Section
        eyebrow="Certifications"
        title="Credentials, verified"
        lead="Formal certifications backing the practical work. Credential IDs are shown for verification."
      >
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <div key={c.name} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <h2 className="font-display text-base font-semibold">{c.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                <p className="num mt-2 text-xs text-muted-foreground">
                  {c.year} · {c.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
