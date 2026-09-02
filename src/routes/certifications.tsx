import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, ExternalLink, Shield, CheckCircle2 } from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import { Reveal } from "@/components/reveal";
import { certifications, profile } from "@/data/portfolio";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: `Certifications & Credentials — ${profile.name}` },
      {
        name: "description",
        content:
          "Cloud, ML, and Data Engineering professional certifications with verification identifiers.",
      },
      { property: "og:title", content: `Certifications — ${profile.name}` },
      {
        property: "og:description",
        content: "Professional cloud, data engineering, and machine learning credentials.",
      },
    ],
  }),
  component: CertificationsPage,
});

function CertificationsPage() {
  return (
    <SiteShell>
      <Section
        eyebrow="Credentials"
        title="Formal Certifications, Verified"
        lead="Rigorous industry certifications backing practical machine learning and distributed data systems."
      >
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {certifications.map((c, idx) => (
            <Reveal key={c.name} delay={idx * 0.08} type="pop">
              <div className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_16px_36px_rgba(61,219,198,0.14)] h-full">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                        <BadgeCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="label-caps text-[10px] text-primary font-semibold">
                          {c.issuer}
                        </span>
                        <h2 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          {c.name}
                        </h2>
                      </div>
                    </div>

                    <span className="num label-caps rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold text-emerald-400">
                      {c.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground bg-surface/60 p-2.5 rounded-lg border border-border/60">
                    <span>Issued: {c.year}</span>
                    <span className="text-foreground">ID: {c.id}</span>
                  </div>

                  {/* Skill tag mapping */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {c.verifyUrl && (
                  <div className="mt-6 border-t border-border pt-4">
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:underline"
                    >
                      <span>Verify Credential Badge</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </SiteShell>
  );
}
