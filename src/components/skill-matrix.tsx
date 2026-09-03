import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Brain,
  Layers,
  Code2,
  Cloud,
  LineChart,
  Sparkles,
  ArrowRight,
  ExternalLink,
  LayoutGrid,
  Activity,
  BookOpen,
} from "lucide-react";
import { skills, skillGroups, type SkillNode } from "@/data/portfolio";

const groupConfig: Record<
  string,
  { stroke: string; fill: string; text: string; bg: string; border: string; icon: any }
> = {
  Modeling: {
    stroke: "#6366f1",
    fill: "rgba(99, 102, 241, 0.22)",
    text: "#818cf8",
    bg: "rgba(99, 102, 241, 0.12)",
    border: "rgba(99, 102, 241, 0.35)",
    icon: Brain,
  },
  Engineering: {
    stroke: "#10b981",
    fill: "rgba(16, 185, 129, 0.22)",
    text: "#34d399",
    bg: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.35)",
    icon: Layers,
  },
  Language: {
    stroke: "#06b6d4",
    fill: "rgba(6, 182, 212, 0.22)",
    text: "#22d3ee",
    bg: "rgba(6, 182, 212, 0.12)",
    border: "rgba(6, 182, 212, 0.35)",
    icon: Code2,
  },
  Cloud: {
    stroke: "#8b5cf6",
    fill: "rgba(139, 92, 246, 0.22)",
    text: "#a78bfa",
    bg: "rgba(139, 92, 246, 0.12)",
    border: "rgba(139, 92, 246, 0.35)",
    icon: Cloud,
  },
  Viz: {
    stroke: "#f59e0b",
    fill: "rgba(245, 158, 11, 0.22)",
    text: "#fbbf24",
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.35)",
    icon: LineChart,
  },
};

const defaultColor = {
  stroke: "#6366f1",
  fill: "rgba(99, 102, 241, 0.22)",
  text: "#818cf8",
  bg: "rgba(99, 102, 241, 0.12)",
  border: "rgba(99, 102, 241, 0.35)",
  icon: Sparkles,
};

export function SkillMatrix() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "chart">("cards");

  const filteredSkills = useMemo(() => {
    if (!activeGroup) return skills;
    return skills.filter((s) => s.group === activeGroup);
  }, [activeGroup]);

  // Dynamic range computation for readable, non-overlapping 2D scatter
  const minX = 2.0;
  const maxX = 5.0;
  const minY = 75;
  const maxY = 100;

  const W = 860;
  const H = 460;
  const PAD_LEFT = 70;
  const PAD_RIGHT = 50;
  const PAD_TOP = 45;
  const PAD_BOTTOM = 65;

  const px = (x: number) => PAD_LEFT + ((x - minX) / (maxX - minX)) * (W - PAD_LEFT - PAD_RIGHT);
  const py = (y: number) =>
    H - PAD_BOTTOM - ((y - minY) / (maxY - minY)) * (H - PAD_TOP - PAD_BOTTOM);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-7">
      {/* Header Controls: Filters & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="label-caps text-xs text-slate-400 mr-1 hidden sm:inline font-semibold">
            Category:
          </span>
          <button
            onClick={() => setActiveGroup(null)}
            className={`rounded-full border px-3.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
              activeGroup === null
                ? "border-primary bg-primary/20 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                : "border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            All Skills ({skills.length})
          </button>
          {skillGroups.map((g) => {
            const conf = groupConfig[g] ?? defaultColor;
            const isSelected = activeGroup === g;
            return (
              <button
                key={g}
                onClick={() => setActiveGroup(isSelected ? null : g)}
                className="rounded-full border px-3.5 py-1 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                style={{
                  borderColor: isSelected ? conf.stroke : "rgba(255, 255, 255, 0.08)",
                  backgroundColor: isSelected ? conf.bg : "transparent",
                  color: isSelected ? conf.text : "rgba(148, 163, 184, 0.9)",
                  boxShadow: isSelected ? `0 0 15px ${conf.fill}` : "none",
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: conf.stroke }} />
                <span>{g}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.02] p-1 self-start md:self-auto">
          <button
            onClick={() => setViewMode("cards")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "cards"
                ? "bg-primary text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Structured Matrix</span>
          </button>
          <button
            onClick={() => setViewMode("chart")}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "chart"
                ? "bg-primary text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>2D Dispersion Map</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: STRUCTURED INTERACTIVE CARDS */}
      {viewMode === "cards" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-200">
          {filteredSkills.map((s) => {
            const conf = groupConfig[s.group] ?? defaultColor;
            const IconComponent = conf.icon;

            return (
              <div
                key={s.name}
                className="group/card flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-white/[0.04] hover:shadow-lg"
              >
                <div>
                  {/* Card Header: Icon + Title + Official Link */}
                  <div className="flex items-start justify-between gap-3">
                    <a
                      href={s.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 group-hover/card:opacity-95"
                    >
                      <div
                        className="grid h-9 w-9 place-items-center rounded-xl border text-base shrink-0"
                        style={{
                          backgroundColor: conf.bg,
                          borderColor: conf.border,
                          color: conf.stroke,
                        }}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display text-sm font-bold text-white group-hover/card:text-primary transition-colors">
                            {s.name}
                          </h4>
                          <ExternalLink className="h-3 w-3 text-slate-500 opacity-60 group-hover/card:opacity-100 group-hover/card:text-primary transition-opacity" />
                        </div>
                        <span className="label-caps text-[9px] font-semibold" style={{ color: conf.text }}>
                          {s.group}
                        </span>
                      </div>
                    </a>

                    <span
                      className="num font-mono text-xs font-bold"
                      style={{ color: conf.stroke }}
                    >
                      {s.y}%
                    </span>
                  </div>

                  {/* Production Depth Meter */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Production Mastery</span>
                      <span className="text-white font-semibold">{s.x} Years Active</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06] border border-white/[0.06]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${s.y}%`,
                          backgroundColor: conf.stroke,
                          boxShadow: `0 0 8px ${conf.stroke}`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer: Official Docs Link + Applied Project Case Studies */}
                <div className="mt-5 border-t border-white/[0.06] pt-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <a
                      href={s.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
                    >
                      <BookOpen className="h-3 w-3" />
                      <span>Official Docs ↗</span>
                    </a>
                    <span className="text-slate-500">
                      {s.projects.length} In Production
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {s.projects.map((slug) => (
                      <Link
                        key={slug}
                        to="/projects/$slug"
                        params={{ slug }}
                        className="inline-flex items-center gap-1 rounded-md bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-300 border border-white/[0.08] hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        <span>{slug}</span>
                        <ArrowRight className="h-2.5 w-2.5 opacity-60" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: 2D DISPERSION SCATTER MAP (Click to open docs + clean hover tooltips) */}
      {viewMode === "chart" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="relative overflow-hidden rounded-xl border border-border bg-[#080d14] p-3">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto select-none overflow-visible"
              role="img"
              aria-label="Interactive 2D Skill Depth Scatter Chart"
            >
              <defs>
                <linearGradient id="gridGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(61, 219, 199, 0.05)" />
                  <stop offset="100%" stopColor="rgba(61, 219, 199, 0)" />
                </linearGradient>
              </defs>

              {/* Chart Background Grid */}
              <rect
                x={PAD_LEFT}
                y={PAD_TOP}
                width={W - PAD_LEFT - PAD_RIGHT}
                height={H - PAD_TOP - PAD_BOTTOM}
                fill="url(#gridGrad)"
                stroke="var(--color-border)"
                strokeWidth={1}
                rx={6}
              />

              {/* Horizontal Grid lines */}
              {[75, 80, 85, 90, 95, 100].map((val) => (
                <g key={`y-${val}`}>
                  <line
                    x1={PAD_LEFT}
                    x2={W - PAD_RIGHT}
                    y1={py(val)}
                    y2={py(val)}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray={val === 85 || val === 95 ? "3 3" : "none"}
                    strokeWidth={1}
                  />
                  <text
                    x={PAD_LEFT - 10}
                    y={py(val) + 4}
                    textAnchor="end"
                    className="fill-muted-foreground font-mono text-[11px]"
                  >
                    {val}%
                  </text>
                </g>
              ))}

              {/* Vertical Grid lines */}
              {[2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0].map((val) => (
                <g key={`x-${val}`}>
                  <line
                    x1={px(val)}
                    x2={px(val)}
                    y1={PAD_TOP}
                    y2={H - PAD_BOTTOM}
                    stroke="rgba(255,255,255,0.06)"
                    strokeDasharray={val === 3.5 ? "4 4" : "none"}
                    strokeWidth={1}
                  />
                  <text
                    x={px(val)}
                    y={H - PAD_BOTTOM + 20}
                    textAnchor="middle"
                    className="fill-muted-foreground font-mono text-[11px]"
                  >
                    {val.toFixed(1)}y
                  </text>
                </g>
              ))}

              {/* Axis Labels */}
              <text
                x={W / 2}
                y={H - 12}
                textAnchor="middle"
                className="fill-muted-foreground font-mono text-xs uppercase tracking-wider"
              >
                Years of Hands-On Production Experience →
              </text>
              <text
                x={18}
                y={H / 2}
                textAnchor="middle"
                transform={`rotate(-90 18 ${H / 2})`}
                className="fill-muted-foreground font-mono text-xs uppercase tracking-wider"
              >
                Production Frequency & Mastery (%) →
              </text>

              {/* Scatter Bubbles: Clickable directly to official docs */}
              {filteredSkills.map((s) => {
                const conf = groupConfig[s.group] ?? defaultColor;
                const cx = px(s.x);
                const cy = py(s.y);
                const isHovered = hoveredSkill?.name === s.name;
                const radius = isHovered ? 14 : 9;

                return (
                  <g
                    key={s.name}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => {
                      if (s.officialUrl) window.open(s.officialUrl, "_blank", "noreferrer");
                    }}
                    onMouseEnter={() => setHoveredSkill(s)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Pulsing ring on hover */}
                    {isHovered && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={radius + 8}
                        fill="none"
                        stroke={conf.stroke}
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        className="animate-spin origin-center"
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                      />
                    )}

                    {/* Skill Node Bubble */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={radius}
                      fill={conf.bg}
                      stroke={conf.stroke}
                      strokeWidth={isHovered ? 2.5 : 1.8}
                      className="transition-all duration-150"
                      style={{
                        filter: isHovered
                          ? `drop-shadow(0 0 10px ${conf.stroke})`
                          : `drop-shadow(0 0 3px ${conf.stroke}40)`,
                      }}
                    />

                    {/* Skill Label */}
                    <text
                      x={cx}
                      y={cy - radius - 5}
                      textAnchor="middle"
                      className={`font-mono text-[10.5px] font-semibold pointer-events-none transition-all ${
                        isHovered
                          ? "fill-foreground scale-110 font-bold"
                          : "fill-foreground/80 hover:fill-foreground"
                      }`}
                      style={{
                        textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.9)",
                      }}
                    >
                      {s.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detailed Inspector Strip on Hover */}
          {hoveredSkill ? (
            <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl border text-base"
                  style={{
                    backgroundColor: (groupConfig[hoveredSkill.group] ?? defaultColor).bg,
                    borderColor: (groupConfig[hoveredSkill.group] ?? defaultColor).border,
                    color: (groupConfig[hoveredSkill.group] ?? defaultColor).stroke,
                  }}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-semibold text-base text-foreground">
                      {hoveredSkill.name}
                    </h4>
                    <a
                      href={hoveredSkill.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded bg-primary/20 border border-primary/40 px-2 py-0.5 text-[11px] font-mono text-primary hover:bg-primary/30 font-semibold"
                    >
                      <span>Official Documentation</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    Category: <span className="text-primary">{hoveredSkill.group}</span> ·{" "}
                    <span className="text-foreground">{hoveredSkill.x} Years Experience</span> ·{" "}
                    <span className="text-teal-300 font-bold">
                      {hoveredSkill.y}% Production Depth
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-muted-foreground">Applied in:</span>
                {hoveredSkill.projects.map((slug) => (
                  <Link
                    key={slug}
                    to="/projects/$slug"
                    params={{ slug }}
                    className="inline-flex items-center gap-1 rounded bg-surface-raised border border-border px-2 py-1 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors font-medium"
                  >
                    <span>{slug}</span>
                    <ArrowRight className="h-3 w-3 opacity-70" />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-surface/30 p-3.5 text-center text-xs font-mono text-muted-foreground">
              Click any skill node on the 2D map to open its official documentation, or hover to
              inspect production depth.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
