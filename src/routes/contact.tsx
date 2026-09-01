import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${profile.name} — ${profile.role}` },
      { name: "description", content: `Get in touch with ${profile.name} about data science roles, consulting or collaboration.` },
      { property: "og:title", content: `Contact ${profile.name}` },
      { property: "og:description", content: "Open to roles, consulting and collaboration." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <SiteShell>
      <Section
        eyebrow="Contact"
        title="Let's talk about your data problem"
        lead="Open to senior data science roles, forecasting consulting and the occasional guest lecture."
      >
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card icon={<Mail className="h-4 w-4" />} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <Card icon={<Github className="h-4 w-4" />} label="GitHub" value="View repositories" href={profile.github} />
          <Card icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" value="Connect" href={profile.linkedin} />
          <Card icon={<MapPin className="h-4 w-4" />} label="Based in" value={profile.location} />
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6">
          <p className="label-caps">Fastest route</p>
          <p className="mt-3 text-muted-foreground">
            Email works best. Include the decision you're trying to improve and what data exists today — I'll reply with an
            honest read on whether modelling is the right move.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Mail className="h-4 w-4" /> {profile.email}
          </a>
        </div>
      </Section>
    </SiteShell>
  );
}

function Card({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="flex items-center gap-2 label-caps">{icon} {label}</span>
      <span className="mt-2 block text-sm">{value}</span>
    </>
  );
  const cls = "block rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
