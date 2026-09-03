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
        title="Let's Connect & Collaborate"
        lead="Open to machine learning engineering roles, AI contract intelligence consulting, and technical collaboration."
      >
        {/* Direct Link Contact Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="mt-14 grid gap-8 md:grid-cols-5">
          {/* Form */}
          <div className="md:col-span-3 rounded-2xl border border-white/[0.08] bg-surface/80 p-7 sm:p-9 shadow-lg backdrop-blur-xl">
            <h2 className="font-display text-xl font-bold text-white">
              Send a Direct Message
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Direct inbox delivery — message arrives directly in my personal inbox.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-7 text-center animate-in fade-in zoom-in-95 duration-200">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 mb-3" />
                <h3 className="font-display font-bold text-xl text-white">
                  Message Dispatched!
                </h3>
                <p className="mt-2 text-sm text-slate-300 max-w-sm mx-auto">
                  Thank you, <span className="text-white font-bold">{formData.name}</span>.
                  I have received your note and will reply to{" "}
                  <span className="text-primary font-mono font-semibold">{formData.email}</span> within 24 hours.
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
                  className="mt-6 rounded-xl bg-white/[0.06] border border-white/10 px-5 py-2.5 text-xs font-mono text-white hover:bg-white/[0.1] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                {/* Honeypot field */}
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
                    <label className="label-caps text-[10px] text-slate-400 font-semibold">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="label-caps text-[10px] text-slate-400 font-semibold">
                      Your Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="label-caps text-[10px] text-slate-400 font-semibold">
                    Subject / Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#121622] px-4 py-3 text-sm text-white outline-none focus:border-primary transition-colors"
                  >
                    <option value="Hiring / Role Opportunity">
                      Full-time Data Science / ML Engineering Role
                    </option>
                    <option value="Consulting / Architecture Review">
                      Technical Advising / AI Review
                    </option>
                    <option value="Speaking / Workshop">Workshop / Event Collaboration</option>
                    <option value="Other">General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="label-caps text-[10px] text-slate-400 font-semibold">
                    Message / Context <span className="text-primary">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the system or project you are building, timeline, or role details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>

                {error && <p className="text-xs text-rose-400">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Guidelines & SLA */}
          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-6 sm:p-7 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Clock className="h-4 w-4" />
                <h3 className="font-display font-bold text-sm text-white">
                  Response Commitment
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                I reply to all serious inquiries within 24 hours. If reaching out about a
                role, including team size, tech stack, and scope is greatly appreciated.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-surface/70 p-6 sm:p-7 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <h3 className="font-display font-bold text-sm text-white">
                  Direct Email
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Feel free to email directly at:
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
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </>
  );

  const className =
    "block rounded-2xl border border-white/[0.08] bg-surface/80 p-5 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-lg";

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
