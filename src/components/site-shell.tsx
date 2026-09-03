import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { Menu, X, Search, FileDown, TerminalSquare, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { TerminalEasterEgg } from "@/components/terminal-easter-egg";
import { CommandPalette } from "@/components/command-palette";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certifications" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

let hasPrintedSecBanner = false;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  const routerState = useRouterState();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0 && scrollProgressRef.current) {
            const currentProgress = (window.scrollY / totalScroll) * 100;
            scrollProgressRef.current.style.width = `${Math.min(100, Math.max(0, currentProgress))}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // DevTools Anti-Self-XSS Console Notice
  useEffect(() => {
    if (typeof window !== "undefined" && !hasPrintedSecBanner) {
      hasPrintedSecBanner = true;
      console.log(
        "%c🛑 SECURITY NOTICE",
        "color: #ff5555; font-size: 18px; font-weight: 900; background: #0b1118; padding: 6px 12px; border: 1px solid #ff5555; border-radius: 6px;",
      );
      console.log(
        "%cThis browser console is intended for developers. Never copy-paste untrusted code or snippets here — doing so can compromise your session security.",
        "color: #3ddbc7; font-size: 12px; font-family: monospace;",
      );
    }
  }, []);

  const isLoading = routerState.status === "pending" || routerState.isLoading;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/25 selection:text-white">
      {/* Global Route Transition Loading Indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 z-[200] h-[2px] overflow-hidden bg-primary/20 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-r from-primary via-indigo-300 to-emerald-400 animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.9)]" />
        </div>
      )}

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        {/* Scroll Progress Hairline Indicator */}
        <div
          ref={scrollProgressRef}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-sky-400 to-emerald-400 transition-[width] duration-75 ease-out"
          style={{ width: "0%" }}
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3.5">
          {/* Brand Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/25 font-mono text-sm font-bold transition-all group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              {profile.name.slice(0, 1)}
            </span>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                {profile.name}
              </span>
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block -mt-0.5">
                {profile.role}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-1 lg:gap-1.5 md:flex"
            aria-label="Main Navigation"
          >
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                preload="intent"
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{
                  className: "!text-white !bg-white/[0.08] !border-white/10 font-semibold shadow-sm",
                }}
                className="rounded-lg border border-transparent px-3 py-1.5 text-xs lg:text-sm text-slate-400 transition-all hover:text-white hover:bg-white/[0.04]"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => setCmdOpen(true)}
              aria-label="Search and command palette"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400 transition-colors hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="num ml-1 rounded border border-white/10 bg-white/[0.06] px-1 py-0.5 text-[9px] text-slate-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Quick Link */}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* Terminal Easter Egg Toggle */}
            <TerminalEasterEgg openOverride={terminalOpen} onOpenChange={setTerminalOpen} />

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav className="grid gap-1 border-t border-white/[0.06] bg-surface/95 backdrop-blur-2xl px-5 py-4 md:hidden animate-in slide-in-from-top-2 duration-150">
            <button
              onClick={() => {
                setOpen(false);
                setCmdOpen(true);
              }}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs text-slate-300 mb-2 font-mono"
            >
              <Search className="h-3.5 w-3.5 text-primary" />
              <span>Search projects, skills (⌘K)</span>
            </button>

            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                preload="intent"
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "!text-white !bg-white/[0.08] font-semibold" }}
                className="rounded-lg px-3.5 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.04] transition-colors"
              >
                {n.label}
              </Link>
            ))}

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-primary/10 px-3.5 py-2.5 text-xs font-semibold text-white mt-2"
            >
              <FileDown className="h-4 w-4 text-primary" />
              <span>Download Resume (PDF)</span>
            </a>
          </nav>
        )}
      </header>

      {/* Main Page Slot */}
      <main
        key={routerState.location.pathname}
        className="flex-1 animate-in fade-in zoom-in-[0.99] duration-300 ease-out"
      >
        {children}
      </main>

      {/* Global Command Palette */}
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        onTriggerTerminal={() => setTerminalOpen(true)}
      />

      {/* Global Footer */}
      <footer className="mt-28 border-t border-white/[0.06] bg-surface/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:px-8 py-12 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p className="text-slate-300 font-medium">
              © {new Date().getFullYear()} {profile.name} · {profile.role}
            </p>
            <span className="hidden sm:inline text-white/10">|</span>
            <div className="flex items-center gap-4">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTerminalOpen(true)}
              className="label-caps hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer text-[10px]"
            >
              <TerminalSquare className="h-3.5 w-3.5 text-primary" />
              <span>Press ` or click for terminal</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24 ${className ?? ""}`}>
      {eyebrow && <p className="label-caps mb-3 text-primary font-semibold">{eyebrow}</p>}
      <h1 className="text-h1 text-white font-bold">{title}</h1>
      {lead && (
        <p className="mt-4 max-w-2xl text-slate-300/90 text-base sm:text-lg leading-relaxed">{lead}</p>
      )}
      {children}
    </section>
  );
}
