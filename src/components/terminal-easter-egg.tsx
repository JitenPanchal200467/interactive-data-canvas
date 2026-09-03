import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { TerminalSquare, X, Maximize2, Minimize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { profile, projects, certifications, skills, experience } from "@/data/portfolio";

const routes: Record<string, string> = {
  home: "/",
  about: "/about",
  experience: "/experience",
  projects: "/projects",
  certifications: "/certifications",
  resume: "/resume",
  contact: "/contact",
};

const HELP_LINES = [
  "┌── DATA SCIENCE INTERACTIVE TERMINAL (Python / SQL REPL) ──────────┐",
  "│  help                      Show this command list                 │",
  "│  whoami                    Inspect author profile & specialty     │",
  "│  ls [projects]             List portfolio routes or case studies  │",
  "│  cd <route>                Navigate client router (e.g. cd about) │",
  "│  cat <project-slug>        View TL;DR for a specific case study   │",
  "│  SELECT * FROM experience  Query work history as an ASCII table   │",
  "│  df.describe()             Summary stats of career metrics        │",
  "│  skills [n]                Top n skills sorted by depth score     │",
  "│  certs                     List active engineering credentials    │",
  "│  import antigravity        Trigger XKCD Python antigravity module │",
  "│  clear / exit              Clear output buffer or close session   │",
  "└───────────────────────────────────────────────────────────────────┘",
];

export function TerminalEasterEgg({
  openOverride,
  onOpenChange,
}: {
  openOverride?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [lines, setLines] = useState<string[]>([
    `Python 3.12.2 / DuckDB 1.0 (Interactive Data REPL)`,
    `Type "help" or run "SELECT * FROM experience;" to begin.`,
  ]);

  const isOpen = openOverride !== undefined ? openOverride : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Global hotkeys (`~` or `` ` ``)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if ((e.key === "`" || e.key === "~") && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines, isOpen]);

  // Tab completion helper
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = input.trim();
      const commands = [
        "help",
        "whoami",
        "ls",
        "cd",
        "cat",
        "SELECT * FROM experience",
        "df.describe()",
        "skills",
        "certs",
        "import antigravity",
        "clear",
        "exit",
      ];
      const match = commands.find((c) => c.startsWith(current));
      if (match) setInput(match);
    }
  };

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const out: string[] = [`$ ${cmd}`];
    const lower = cmd.toLowerCase();

    // SQL Parser
    if (lower.startsWith("select")) {
      if (lower.includes("from experience")) {
        let rows = experience;
        if (lower.includes("where company")) {
          const match = cmd.match(/company\s*=\s*['"]?([^'"]+)['"]?/i);
          if (match && match[1]) {
            const searchCompany = match[1].toLowerCase();
            rows = experience.filter((e) => e.company.toLowerCase().includes(searchCompany));
          }
        }
        out.push(
          "┌──────────────────────┬──────────────────────────────────┬─────────────┬────────────┐",
          "│ COMPANY              │ TITLE                            │ PERIOD      │ STACK COUNT│",
          "├──────────────────────┼──────────────────────────────────┼─────────────┼────────────┤",
        );
        rows.forEach((r) => {
          const c = r.company.padEnd(20).slice(0, 20);
          const t = r.title.padEnd(32).slice(0, 32);
          const p = `${r.start} - ${r.end}`.padEnd(11).slice(0, 11);
          const s = `${r.stack.length} tools`.padEnd(10).slice(0, 10);
          out.push(`│ ${c} │ ${t} │ ${p} │ ${s} │`);
        });
        out.push(
          "└──────────────────────┴──────────────────────────────────┴─────────────┴────────────┘",
          `(${rows.length} rows returned)`,
        );
      } else if (lower.includes("from projects")) {
        out.push(
          "┌──────────────────────┬─────────────┬────────────┬──────────────────────────────────┐",
          "│ SLUG                 │ DOMAIN      │ SCALE      │ PRIMARY STACK                    │",
          "├──────────────────────┼─────────────┼────────────┼──────────────────────────────────┤",
        );
        projects.forEach((p) => {
          const sl = p.slug.padEnd(20).slice(0, 20);
          const dm = p.domain.padEnd(11).slice(0, 11);
          const sc = p.scale.padEnd(10).slice(0, 10);
          const st = p.stack.slice(0, 3).join(", ").padEnd(32).slice(0, 32);
          out.push(`│ ${sl} │ ${dm} │ ${sc} │ ${st} │`);
        });
        out.push(
          "└──────────────────────┴─────────────┴────────────┴──────────────────────────────────┘",
        );
      } else {
        out.push(
          `Query error: table not recognized. Try 'SELECT * FROM experience' or 'SELECT * FROM projects'`,
        );
      }
    } else if (lower === "df.describe()") {
      out.push(
        "┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐",
        "│ STAT         │ MODELS_PROD  │ ATTRIB_REVENUE│ AVG_WAPE_CUT │ TOTAL_SKUS   │",
        "├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤",
        "│ count        │ 12.00        │ $14.80M      │ -31.80%      │ 12,000       │",
        "│ mean         │ 4.00/yr      │ $4.93M/role  │ -24.50%      │ 4,000/team   │",
        "│ p95_latency  │ 34.00ms      │ $8.40M peak  │ -58.10%      │ 40,000/day   │",
        "└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘",
      );
    } else if (lower === "import antigravity") {
      out.push(
        "🚀 import antigravity",
        "Opening Python antigravity module... Flying above the browser canvas!",
        "“I wrote 20 lines of Python yesterday and suddenly I'm floating in the sky.” — https://xkcd.com/353/",
      );
    } else {
      const parts = cmd.split(/\s+/);
      const head = parts[0] ?? "";
      const args = parts.slice(1);

      switch (head.toLowerCase()) {
        case "help":
          out.push(...HELP_LINES);
          break;
        case "whoami":
          out.push(
            `Name:      ${profile.name}`,
            `Role:      ${profile.role} (${profile.specialty})`,
            `Tagline:   ${profile.tagline}`,
            `Location:  ${profile.location}`,
            `Email:     ${profile.email}`,
          );
          break;
        case "ls":
          if (args[0] === "projects") {
            projects.forEach((p) => out.push(`  ${p.slug.padEnd(24)} [${p.domain}] ${p.name}`));
          } else {
            out.push("Available routes: " + Object.keys(routes).join("   "));
            out.push(`Type "ls projects" to see all case study slugs.`);
          }
          break;
        case "cd": {
          const target = routes[args[0]?.toLowerCase() ?? ""];
          if (!target) {
            out.push(`cd: unknown destination: ${args[0] ?? ""}. Try 'cd projects' or 'cd about'`);
          } else {
            out.push(`Routing to ${target}...`);
            setTimeout(() => {
              navigate({ to: target });
              setIsOpen(false);
            }, 300);
          }
          break;
        }
        case "cat": {
          const slug = args[0]?.toLowerCase();
          const p = projects.find((item) => item.slug === slug);
          if (!p) {
            out.push(
              `cat: project not found: ${args[0] ?? ""}. Run 'ls projects' to see valid slugs.`,
            );
          } else {
            out.push(
              `============================================================`,
              `CASE STUDY: ${p.name.toUpperCase()}`,
              `Domain: ${p.domain} | Scale: ${p.scale} | Status: ${p.status}`,
              `------------------------------------------------------------`,
              `PROBLEM:  ${p.problem}`,
              `APPROACH: ${p.approach}`,
              `IMPACT:   ${p.impact}`,
              `STACK:    ${p.stack.join(", ")}`,
              `============================================================`,
              `To inspect full charts & architecture, visit: /projects/${p.slug}`,
            );
          }
          break;
        }
        case "skills": {
          const n = Number(args[0]) || 6;
          out.push(`Top ${n} Skills by Production Depth:`);
          [...skills]
            .sort((a, b) => b.y - a.y)
            .slice(0, n)
            .forEach((s) => {
              const bars = "█".repeat(Math.round(s.y / 8));
              out.push(`  ${s.name.padEnd(20)} [${bars.padEnd(13)}] ${s.y}% (${s.x} yrs)`);
            });
          break;
        }
        case "certs":
          certifications.forEach((c) =>
            out.push(`  [${c.year}] ${c.name} — ${c.issuer} (${c.id})`),
          );
          break;
        case "contact":
          out.push(
            `Email: ${profile.email}`,
            `LinkedIn: ${profile.linkedin}`,
            `GitHub: ${profile.github}`,
          );
          break;
        case "clear":
          setLines([]);
          setInput("");
          return;
        case "exit":
        case "quit":
          setIsOpen(false);
          setInput("");
          return;
        default:
          out.push(
            `zsh: command not found: ${head}. Type "help" for a list of supported commands.`,
          );
      }
    }

    setLines((prev) => [...prev, ...out]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open terminal drawer"
        className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-slate-400 transition-colors hover:text-white hover:border-white/20 hover:bg-white/[0.06] cursor-pointer"
      >
        <TerminalSquare className="h-4 w-4" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={`p-0 overflow-hidden border border-white/10 bg-[#0a0d14] shadow-2xl ring-1 ring-white/10 ${
            expanded
              ? "max-w-5xl h-[88vh] max-h-[850px]"
              : "max-w-3xl h-[70vh] sm:h-[60vh] min-h-[340px] max-h-[580px]"
          } flex flex-col`}
        >
          <DialogTitle className="sr-only">Interactive Data Science Terminal</DialogTitle>
          <DialogDescription className="sr-only">
            Execute python and SQL commands to explore the portfolio data.
          </DialogDescription>

          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#10141f] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full bg-red-500/80 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setIsOpen(false)}
                title="Close"
              />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 sm:ml-3 font-mono text-[11px] sm:text-xs font-semibold text-slate-400 truncate max-w-[180px] sm:max-w-xs">
                data-science-repl ~ {profile.name.toLowerCase().replace(/\s+/g, "")}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400">
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle full height"
              >
                {expanded ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-white transition-colors cursor-pointer"
                aria-label="Close terminal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Monospace Output Window */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 selection:bg-indigo-500/30"
            aria-live="polite"
          >
            {lines.map((l, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap ${
                  l.startsWith("$")
                    ? "text-indigo-400 font-semibold"
                    : l.startsWith("┌") ||
                        l.startsWith("│") ||
                        l.startsWith("├") ||
                        l.startsWith("└")
                      ? "text-emerald-400 font-mono text-[10px] sm:text-xs overflow-x-auto"
                      : l.includes("Error") || l.includes("failed")
                        ? "text-amber-400"
                        : "text-slate-400"
                }`}
              >
                {l}
              </div>
            ))}

            {/* Input Prompt Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                run(input);
              }}
              className="mt-3 flex items-center gap-2"
            >
              <span className="text-indigo-400 font-bold select-none">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-sm placeholder:text-slate-600"
                placeholder="Type command or SQL query..."
              />
            </form>
            <div ref={endRef} />
          </div>

          {/* Terminal Bottom Status Bar */}
          <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#10141f] px-4 py-2 text-[10px] font-mono text-slate-500">
            <span className="truncate mr-2">Tab: autocomplete · ↑↓: history</span>
            <span className="shrink-0">ESC: close session</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
