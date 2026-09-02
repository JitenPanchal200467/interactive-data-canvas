import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { TerminalSquare } from "lucide-react";
import { profile, projects, certifications, skills } from "@/data/portfolio";

const routes: Record<string, string> = {
  home: "/",
  about: "/about",
  experience: "/experience",
  projects: "/projects",
  certifications: "/certifications",
  contact: "/contact",
};

const HELP = [
  "available commands:",
  "  help                 show this list",
  "  ls                   list pages",
  "  cd <page>            navigate to a page",
  "  whoami               who is behind this site",
  "  skills [n]           top n skills by depth",
  "  projects             list case studies",
  "  certs                list certifications",
  "  clear                clear the screen",
  "  exit                 close the terminal",
];

export function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>([
    `${profile.name.toLowerCase().replace(/\s+/g, "")}@portfolio — type "help" to begin`,
  ]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "`" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines, open]);

  function run(raw: string) {
    const cmd = raw.trim();
    const out: string[] = [`$ ${cmd}`];
    const [head, ...args] = cmd.split(/\s+/);

    switch (head) {
      case "":
        break;
      case "help":
        out.push(...HELP);
        break;
      case "ls":
        out.push(Object.keys(routes).join("   "));
        break;
      case "cd": {
        const target = routes[args[0] ?? ""];
        if (!target) out.push(`cd: no such page: ${args[0] ?? ""}`);
        else {
          out.push(`navigating to /${args[0]}`);
          setTimeout(() => {
            navigate({ to: target });
            setOpen(false);
          }, 250);
        }
        break;
      }
      case "whoami":
        out.push(`${profile.name} — ${profile.role}`, profile.tagline);
        break;
      case "skills": {
        const n = Number(args[0]) || 5;
        [...skills]
          .sort((a, b) => b.y - a.y)
          .slice(0, n)
          .forEach((s) => out.push(`  ${s.name.padEnd(18)} ${"█".repeat(Math.round(s.y / 10))} ${s.y}`));
        break;
      }
      case "projects":
        projects.forEach((p) => out.push(`  ${p.slug.padEnd(22)} ${p.domain} · ${p.scale}`));
        break;
      case "certs":
        certifications.forEach((c) => out.push(`  [${c.year}] ${c.name}`));
        break;
      case "clear":
        setLines([]);
        setInput("");
        return;
      case "exit":
        setOpen(false);
        setInput("");
        return;
      default:
        out.push(`command not found: ${head} — try "help"`);
    }

    setLines((l) => [...l, ...out]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        className="rounded-md border border-border px-2 py-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <TerminalSquare className="h-4 w-4" />
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-4 sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lift)]"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="ml-2 num text-xs text-muted-foreground">portfolio — zsh</span>
            </div>
            <div className="h-72 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
              {lines.map((l, i) => (
                <div key={i} className={l.startsWith("$") ? "text-primary" : "text-muted-foreground"}>
                  {l}
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  run(input);
                }}
                className="flex items-center gap-2"
              >
                <span className="text-primary">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  spellCheck={false}
                  className="flex-1 bg-transparent text-foreground outline-none"
                />
              </form>
              <div ref={endRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
