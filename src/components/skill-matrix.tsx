import { useState } from "react";
import { skills, skillGroups } from "@/data/portfolio";

const colors: Record<string, string> = {
  Language: "var(--chart-1)",
  ML: "var(--chart-2)",
  "Data Eng": "var(--chart-3)",
  MLOps: "var(--chart-4)",
  Viz: "var(--chart-5)",
};

const W = 720;
const H = 420;
const PAD = 48;

export function SkillMatrix() {
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  const maxX = 8;
  const px = (x: number) => PAD + (x / maxX) * (W - PAD * 2);
  const py = (y: number) => H - PAD - (y / 100) * (H - PAD * 2);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {skillGroups.map((g) => (
          <button
            key={g}
            onClick={() => setActive((a) => (a === g ? null : g))}
            className="rounded-full border px-3 py-1 text-xs transition-colors"
            style={{
              borderColor: colors[g],
              color: active === g || active === null ? colors[g] : "var(--muted-foreground)",
              opacity: active === null || active === g ? 1 : 0.45,
            }}
          >
            {g}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Skill depth versus years of experience">
        {[0, 25, 50, 75, 100].map((t) => (
          <g key={t}>
            <line x1={PAD} x2={W - PAD} y1={py(t)} y2={py(t)} stroke="var(--grid-line)" />
            <text x={PAD - 10} y={py(t) + 4} textAnchor="end" fontSize="10" fill="var(--muted-foreground)">
              {t}
            </text>
          </g>
        ))}
        {[0, 2, 4, 6, 8].map((t) => (
          <g key={t}>
            <line x1={px(t)} x2={px(t)} y1={PAD} y2={H - PAD} stroke="var(--grid-line)" />
            <text x={px(t)} y={H - PAD + 18} textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">
              {t}y
            </text>
          </g>
        ))}

        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          years of hands-on experience
        </text>
        <text
          x={14}
          y={H / 2}
          textAnchor="middle"
          fontSize="11"
          fill="var(--muted-foreground)"
          transform={`rotate(-90 14 ${H / 2})`}
        >
          depth (self-rated)
        </text>

        {skills.map((s) => {
          const dim = active !== null && active !== s.group;
          const isHover = hover === s.name;
          return (
            <g
              key={s.name}
              opacity={dim ? 0.15 : 1}
              onMouseEnter={() => setHover(s.name)}
              onMouseLeave={() => setHover(null)}
              style={{ transition: "opacity 200ms" }}
            >
              <circle
                cx={px(s.x)}
                cy={py(s.y)}
                r={isHover ? s.r + 4 : s.r}
                fill={colors[s.group]}
                fillOpacity={0.28}
                stroke={colors[s.group]}
                strokeWidth={1.5}
                style={{ transition: "r 150ms" }}
              />
              <text
                x={px(s.x)}
                y={py(s.y) - s.r - 6}
                textAnchor="middle"
                fontSize={isHover ? 12 : 10}
                fill={isHover ? "var(--foreground)" : "var(--muted-foreground)"}
              >
                {s.name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-xs text-muted-foreground">
        Filter by group, hover a point. Bubble size reflects how often I reach for it.
      </p>
    </div>
  );
}
