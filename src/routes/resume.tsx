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
import { Reveal } from "@/components/reveal";
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
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-surface/80 p-4 sm:p-5 shadow-lg backdrop-blur-xl">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-1">
            <button
              onClick={() => setViewMode("interactive")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "interactive"
                  ? "bg-primary text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Interactive Resume</span>
            </button>

            <button
              onClick={() => setViewMode("pdf")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "pdf"
                  ? "bg-primary text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Embedded PDF Document</span>
            </button>
          </div>

          {/* Direct Download & External Open */}
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-300 transition-all hover:bg-white/[0.08] hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Open in New Tab</span>
            </a>

            <a
              href="/resume.pdf"
              download="Jiten_Panchal_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:bg-primary/90"
            >
              <FileDown className="h-4 w-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* View Mode: Embedded PDF Viewer */}
        {viewMode === "pdf" && (
          <div className="mt-8 rounded-2xl border border-white/[0.08] bg-surface/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 px-2 mb-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 text-primary font-semibold">
                <FileText className="h-4 w-4" />
                <span>Resume.pdf (High Fidelity View)</span>
              </span>
              <span>2 Pages · Formatted</span>
            </div>

            <div className="relative w-full h-[850px] rounded-xl overflow-hidden bg-black/40 border border-white/[0.08]">
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
            <Reveal type="pop">
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-7 sm:p-9 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-primary/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.06] pb-6">
                  <div>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                      {profile.name}
                    </h1>
                    <p className="mt-1 font-mono text-sm sm:text-base text-primary font-semibold">
                      {profile.role}
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      {profile.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 font-mono text-xs text-slate-400 shrink-0">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{profile.location}</span>
                    </div>
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-2 text-slate-200 hover:text-primary transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      <span>{profile.email}</span>
                    </a>
                    {profile.phone && (
                      <a
                        href={`tel:${profile.phone}`}
                        className="flex items-center gap-2 text-slate-200 hover:text-primary transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5 text-indigo-400" />
                        <span>{profile.phone}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-4 mt-1.5 pt-2 border-t border-white/[0.06]">
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-primary hover:underline font-semibold"
                      >
                        <Github className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                      </a>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-primary hover:underline font-semibold"
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
                    <p key={idx} className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Experience Section */}
            <Reveal type="pop" delay={0.1}>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-7 sm:p-9 shadow-lg backdrop-blur-xl space-y-7 transition-all duration-300 hover:border-primary/50">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold text-white">
                    Work & Internship Experience
                  </h2>
                </div>

                <div className="space-y-8">
                  {experience.map((job, idx) => (
                    <div
                      key={idx}
                      className="border-b border-white/[0.06] pb-7 last:border-0 last:pb-0 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <h3 className="font-display text-base sm:text-lg font-bold text-white">
                            {job.title}
                          </h3>
                          <p className="font-mono text-xs sm:text-sm text-primary font-semibold">
                            {job.company}
                          </p>
                        </div>
                        <div className="font-mono text-xs text-slate-400">
                          <span>
                            {job.start} – {job.end}
                          </span>{" "}
                          · <span>{job.location}</span>
                        </div>
                      </div>

                      <p className="text-xs font-mono text-slate-300 bg-white/[0.02] px-3.5 py-1.5 rounded-lg border border-white/[0.06]">
                        Focus: {job.context}
                      </p>

                      <ul className="space-y-2 mt-2">
                        {job.impact.map((item, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                            <div>
                              <strong className="text-white font-semibold">{item.verb} </strong>
                              <span className="text-slate-200">{item.what} </span>
                              <span className="num font-mono font-bold text-emerald-400">
                                [{item.metric}]{" "}
                              </span>
                              <span className="text-slate-400">{item.how}</span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-md bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-white/[0.08]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Featured Projects Section */}
            <Reveal type="pop" delay={0.15}>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-7 sm:p-9 shadow-lg backdrop-blur-xl space-y-7 transition-all duration-300 hover:border-primary/50">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                  <Layers className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold text-white">
                    Flagship Systems & Projects
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {projects.slice(0, 4).map((proj) => (
                    <div
                      key={proj.slug}
                      className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-primary/50 hover:shadow-[0_12px_28px_rgba(99,102,241,0.1)] transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-2">
                          <span className="label-caps text-primary font-semibold">{proj.domain}</span>
                          <span className="rounded-full bg-white/[0.04] px-2 py-0.5 border border-white/10 text-[10px]">
                            {proj.scale}
                          </span>
                        </div>

                        <h3 className="font-display text-base font-bold text-white">
                          {proj.name}
                        </h3>

                        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                          {proj.blurb}
                        </p>

                        <div className="mt-3.5 flex flex-wrap gap-1">
                          {proj.stack.slice(0, 5).map((t) => (
                            <span
                              key={t}
                              className="rounded bg-black/30 px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-white/[0.06]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs font-mono">
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Source Code</span>
                        </a>

                        <span className="text-emerald-400 font-bold">{proj.kpiChips[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Education Section */}
            <Reveal type="pop" delay={0.2}>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-7 sm:p-9 shadow-lg backdrop-blur-xl space-y-7 transition-all duration-300 hover:border-primary/50">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold text-white">
                    Education Background
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 hover:border-primary/40 transition-colors"
                    >
                      <div>
                        <span className="num label-caps text-[10px] text-primary font-semibold">
                          {edu.year}
                        </span>
                        <h3 className="font-display text-sm font-bold text-white mt-1">
                          {edu.degree}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{edu.school}</p>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {edu.location}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="num font-mono text-xs font-bold text-emerald-400">
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Technical Skills Categorized Grid */}
            <Reveal type="pop" delay={0.25}>
              <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-7 sm:p-9 shadow-lg backdrop-blur-xl space-y-7 transition-all duration-300 hover:border-primary/50">
                <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl font-bold text-white">
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
            </Reveal>

            {/* Certifications & Achievements */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Certifications */}
              <Reveal type="pop" delay={0.3}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-surface/80 p-7 shadow-lg backdrop-blur-xl space-y-4 transition-all duration-300 hover:border-primary/50">
                  <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-3">
                    <Award className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-lg font-bold text-white">
                      Certifications & Courses
                    </h2>
                  </div>

                  <ul className="space-y-3">
                    {certifications.map((c) => (
                      <li
                        key={c.name}
                        className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-white">{c.name}</p>
                          <p className="text-[11px] text-slate-400">{c.issuer}</p>
                        </div>
                        <span className="num font-mono text-[11px] text-emerald-400 font-semibold shrink-0">
                          {c.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Achievements */}
              <Reveal type="pop" delay={0.35}>
                <div className="h-full rounded-2xl border border-white/[0.08] bg-surface/80 p-7 shadow-lg backdrop-blur-xl space-y-4 transition-all duration-300 hover:border-primary/50">
                  <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-3">
                    <Sparkles className="h-5 w-5 text-emerald-400" />
                    <h2 className="font-display text-lg font-bold text-white">
                      Honors & Achievements
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {achievements.map((a, idx) => (
                      <div
                        key={idx}
                        className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="label-caps text-emerald-400 font-semibold">{a.badge}</span>
                          <span>{a.year}</span>
                        </div>
                        <h3 className="font-display text-sm font-bold text-white mt-1">
                          {a.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {a.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </Section>
    </SiteShell>
  );
}

function SkillCategoryCard({
  title,
  skills,
}: {
  title: string;
  skills: readonly string[];
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-all hover:border-primary/40">
      <h3 className="font-display text-xs font-bold text-white mb-3">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span
            key={s}
            className="rounded bg-black/30 px-2 py-0.5 font-mono text-[11px] text-slate-300 border border-white/[0.06]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
