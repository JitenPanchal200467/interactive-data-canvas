import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  FileDown,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Sparkles,
  Layers,
  FileText,
  CheckCircle2,
  TerminalSquare,
  BookOpen,
  Eye,
} from "lucide-react";
import { SiteShell, Section } from "@/components/site-shell";
import {
  profile,
  education,
  experience,
  technicalSkills,
  certifications,
  achievements,
  projects,
} from "@/data/portfolio";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: `Resume & Curriculum Vitae — ${profile.name}` },
      {
        name: "description",
        content: `Official resume and technical profile of ${profile.name}: Education at CHARUSAT, ML/NLP Internships, Contract Mind AI, and Technical Skills.`,
      },
      { property: "og:title", content: `Resume — ${profile.name}` },
      { property: "og:description", content: profile.summary },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");

  return (
    <SiteShell>
      <Section
        eyebrow="Curriculum Vitae"
        title="Resume & Qualifications"
        lead="Complete record of education, production machine learning internships, legal AI contract intelligence projects, and verified credentials."
      >
        {/* Action Toolbar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-surface p-1">
            <button
              onClick={() => setViewMode("interactive")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                viewMode === "interactive"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-raised"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Interactive Resume</span>
            </button>

            <button
              onClick={() => setViewMode("pdf")}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                viewMode === "pdf"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-raised"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Embedded PDF Document</span>
            </button>
          </div>

          {/* Direct Download & External Open */}
          <div className="flex items-center gap-2.5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-surface-raised hover:border-primary/50"
            >
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Open in New Tab</span>
            </a>

            <a
              href="/resume.pdf"
              download="Jiten_Panchal_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_15px_rgba(61,219,198,0.4)] hover:opacity-95"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* View Mode: Embedded PDF Viewer */}
        {viewMode === "pdf" && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-border pb-3 px-2 mb-3 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-2 text-primary">
                <FileText className="h-4 w-4" />
                <span>Resume.pdf (High Fidelity View)</span>
              </span>
              <span>2 Pages · Formatted</span>
            </div>

            <div className="relative w-full h-[850px] rounded-xl overflow-hidden bg-surface border border-border/60">
              <iframe
                src="/resume.pdf#toolbar=1&navpanes=0"
                className="w-full h-full border-0 rounded-xl"
                title="Jiten Panchal Resume PDF"
              />
            </div>
          </div>
        )}

        {/* View Mode: Interactive Resume */}
        {viewMode === "interactive" && (
          <div className="mt-8 space-y-10 animate-in fade-in duration-200">
            {/* Header / Profile Card */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    {profile.name}
                  </h1>
                  <p className="mt-1 font-mono text-sm sm:text-base text-primary font-medium">
                    {profile.role}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                    {profile.summary}
                  </p>
                </div>

                <div className="flex flex-col gap-2 font-mono text-xs text-muted-foreground shrink-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{profile.location}</span>
                  </div>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>{profile.email}</span>
                  </a>
                  {profile.phone && (
                    <a
                      href={`tel:${profile.phone}`}
                      className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      <span>{profile.phone}</span>
                    </a>
                  )}
                  <div className="flex items-center gap-4 mt-1 pt-1 border-t border-border/80">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Bio Narrative */}
              <div className="pt-6 space-y-3">
                <h2 className="label-caps text-xs text-primary font-semibold">
                  Professional Profile
                </h2>
                {profile.aboutBio.map((paragraph, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center gap-2.5 border-b border-border pb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Work & Internship Experience
                </h2>
              </div>

              <div className="space-y-8">
                {experience.map((job, idx) => (
                  <div
                    key={idx}
                    className="border-b border-border/70 pb-6 last:border-0 last:pb-0 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="font-display text-base font-semibold text-foreground">
                          {job.title}
                        </h3>
                        <p className="font-mono text-xs sm:text-sm text-primary font-medium">
                          {job.company}
                        </p>
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        <span>
                          {job.start} – {job.end}
                        </span>{" "}
                        · <span>{job.location}</span>
                      </div>
                    </div>

                    <p className="text-xs font-mono text-muted-foreground/80 bg-surface/60 px-3 py-1.5 rounded-lg border border-border/50">
                      Focus: {job.context}
                    </p>

                    <ul className="space-y-2 mt-2">
                      {job.impact.map((item, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <div>
                            <strong className="text-foreground">{item.verb} </strong>
                            <span className="text-foreground/90">{item.what} </span>
                            <span className="num font-mono font-bold text-teal-300">
                              [{item.metric}]{" "}
                            </span>
                            <span className="text-muted-foreground">{item.how}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-muted-foreground border border-border"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects Section */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center gap-2.5 border-b border-border pb-4">
                <Layers className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Flagship Projects & Systems
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {projects.slice(0, 4).map((proj) => (
                  <div
                    key={proj.slug}
                    className="flex flex-col justify-between rounded-xl border border-border bg-surface/40 p-5 hover:border-primary/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-2">
                        <span className="label-caps text-primary">{proj.domain}</span>
                        <span className="rounded bg-surface-raised px-1.5 py-0.5 border border-border">
                          {proj.scale}
                        </span>
                      </div>

                      <h3 className="font-display text-base font-semibold text-foreground">
                        {proj.name}
                      </h3>

                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {proj.blurb}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {proj.stack.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground border border-border/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3 text-xs font-mono">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>Source Code</span>
                      </a>

                      <span className="text-teal-300 font-semibold">{proj.kpiChips[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center gap-2.5 border-b border-border pb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Education Background
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-border bg-surface/40 p-5"
                  >
                    <div>
                      <span className="num label-caps text-[10px] text-primary font-semibold">
                        {edu.year}
                      </span>
                      <h3 className="font-display text-sm font-semibold text-foreground mt-1">
                        {edu.degree}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{edu.school}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        {edu.location}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between">
                      <span className="num font-mono text-xs font-bold text-teal-300">
                        {edu.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Categorized Grid */}
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center gap-2.5 border-b border-border pb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Technical Skills & Competencies
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <SkillCategoryCard
                  title="Programming Languages"
                  skills={technicalSkills.programmingLanguages}
                />
                <SkillCategoryCard
                  title="Data Science & ML"
                  skills={technicalSkills.dataScienceML}
                />
                <SkillCategoryCard
                  title="Data Visualization"
                  skills={technicalSkills.dataVisualization}
                />
                <SkillCategoryCard
                  title="Databases & Vector Stores"
                  skills={technicalSkills.databases}
                />
                <SkillCategoryCard
                  title="Tools & Frameworks"
                  skills={technicalSkills.toolsTechnologies}
                />
                <SkillCategoryCard title="Big Data Systems" skills={technicalSkills.bigData} />
              </div>
            </div>

            {/* Certifications & Achievements */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Certifications */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex items-center gap-2.5 border-b border-border pb-3">
                  <Award className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Certifications & Courses
                  </h2>
                </div>

                <ul className="space-y-3">
                  {certifications.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-foreground">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground">{c.issuer}</p>
                      </div>
                      <span className="num font-mono text-[11px] text-primary shrink-0">
                        {c.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex items-center gap-2.5 border-b border-border pb-3">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Honors & Achievements
                  </h2>
                </div>

                <div className="space-y-4">
                  {achievements.map((a, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-accent/30 bg-accent/5 p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-sm font-semibold text-foreground">
                          {a.title}
                        </h3>
                        <span className="num font-mono text-xs text-accent font-semibold">
                          {a.year}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {a.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>
    </SiteShell>
  );
}

function SkillCategoryCard({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4 space-y-2.5">
      <h3 className="label-caps text-[11px] text-primary font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span
            key={s}
            className="rounded bg-surface-raised px-2 py-0.5 font-mono text-xs text-foreground border border-border"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
