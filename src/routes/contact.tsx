import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  BookOpen,
  Clock,
  Sparkles,
} from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact ${profile.name} — ${profile.role}` },
      {
        name: "description",
        content: `Get in touch with ${profile.name} about data science leadership, forecasting systems, or technical consulting.`,
      },
      { property: "og:title", content: `Contact & Inquiries — ${profile.name}` },
      {
        property: "og:description",
        content: "Open to senior data science roles, advisory, and technical consulting.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Hiring / Role Opportunity",
    message: "",
    honeypot: "", // Bot honeypot trap
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Bot honeypot validation
    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate instant client dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <SiteShell>
      <Section
        eyebrow="Contact & Collaboration"
        title="Let's Talk About Your Data Problem"
        lead="Open to senior data science roles, technical advising on forecasting architectures, and guest speaking."
      >
        {/* Direct Link Contact Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            icon={<Mail className="h-4 w-4" />}
            label="Direct Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactCard
            icon={<Linkedin className="h-4 w-4" />}
            label="LinkedIn"
            value="Connect on LinkedIn"
            href={profile.linkedin}
          />
          <ContactCard
            icon={<Github className="h-4 w-4" />}
            label="GitHub"
            value="Explore Repositories"
            href={profile.github}
          />
          <ContactCard
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={profile.location}
          />
        </div>

        {/* Contact Form & Response Commitment */}
        <div className="mt-12 grid gap-8 md:grid-cols-5">
          {/* Form */}
          <div className="md:col-span-3 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Send a Direct Message
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Direct inbox delivery — no recruiter spam.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center animate-in fade-in zoom-in-95 duration-200">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-3" />
                <h3 className="font-display font-semibold text-lg text-foreground">
                  Message Dispatched!
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                  Thank you, <span className="text-foreground font-semibold">{formData.name}</span>.
                  I have received your note and will reply to{" "}
                  <span className="text-primary font-mono">{formData.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "Hiring / Role Opportunity",
                      message: "",
                      honeypot: "",
                    });
                  }}
                  className="mt-6 rounded-lg bg-surface border border-border px-4 py-2 text-xs font-mono text-foreground hover:bg-surface-raised transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="company_trap"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="label-caps text-[10px] text-muted-foreground">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="label-caps text-[10px] text-muted-foreground">
                      Your Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="label-caps text-[10px] text-muted-foreground">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary transition-colors"
                  >
                    <option value="Hiring / Role Opportunity">
                      Full-time Senior Data Scientist Opportunity
                    </option>
                    <option value="Consulting / Architecture Review">
                      Technical Consulting / Forecasting Review
                    </option>
                    <option value="Speaking / Workshop">Guest Lecture / Workshop</option>
                    <option value="Other">General Discussion</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="label-caps text-[10px] text-muted-foreground">
                    Message / Context <span className="text-primary">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the decision or system you are trying to build, existing data scale, and desired timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary transition-colors"
                  />
                </div>

                {error && <p className="text-xs text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Guidelines & SLA */}
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-border bg-surface/50 p-6">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Clock className="h-4 w-4" />
                <h3 className="font-display font-semibold text-sm text-foreground">
                  Response Commitment
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                I reply to all serious inquiries within 24 hours. If you are reaching out about a
                role, including team size, tech stack, and current data maturity helps kick off the
                conversation faster.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/50 p-6">
              <div className="flex items-center gap-2 mb-2 text-accent">
                <Sparkles className="h-4 w-4" />
                <h3 className="font-display font-semibold text-sm text-foreground">
                  Fastest Route
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Prefer email directly? Send a note to:
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 block font-mono text-xs text-primary hover:underline font-semibold"
              >
                {profile.email}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function ContactCard({
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
  const content = (
    <>
      <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold">
        {icon}
        <span className="label-caps">{label}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </>
  );

  const className =
    "block rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/60 hover:shadow-md";

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
