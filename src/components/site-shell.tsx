import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { Menu, X, Search, FileDown, TerminalSquare, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { TerminalEasterEgg } from "@/components/terminal-easter-egg";
import { CommandPalette } from "@/components/command-palette";
import { CustomCursor } from "@/components/custom-cursor";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certifications" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
] as const;

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
        {/* 2px Scroll Progress Hairline Indicator */}
        <div
          ref={scrollProgressRef}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-teal-400 to-accent transition-[width] duration-75 ease-out"
          style={{ width: "0%" }}
          aria-hidden="true"
        />

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3.5">
          {/* Brand Wordmark */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/30 font-mono text-sm font-bold transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-[0_0_15px_rgba(61,219,198,0.4)]">
              {profile.name.slice(0, 1)}
            </span>
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {profile.name}
              </span>
              <span className="text-[11px] text-muted-foreground font-mono hidden sm:inline-block -mt-0.5">
                {profile.role}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-1.5 lg:gap-2 md:flex"
            aria-label="Main Navigation"
          >
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{
                  className: "!text-primary !bg-surface-raised font-semibold shadow-sm",
                }}
                className="rounded-lg px-3 py-1.5 text-xs lg:text-sm text-muted-foreground transition-all hover:text-foreground hover:bg-surface-raised/60"
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
              className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search</span>
              <kbd className="num ml-1 rounded border border-border bg-surface-raised px-1 py-0.5 text-[9px] text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* GitHub Quick Link */}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:text-primary hover:border-primary/50"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* Terminal Easter Egg Toggle */}
            <TerminalEasterEgg openOverride={terminalOpen} onOpenChange={setTerminalOpen} />

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav className="grid gap-1 border-t border-border bg-surface px-5 py-4 md:hidden animate-in slide-in-from-top-2 duration-150">
            <button
              onClick={() => {
                setOpen(false);
                setCmdOpen(true);
              }}
              className="flex items-center gap-2.5 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground mb-2"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search projects, skills (⌘K)</span>
            </button>

            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "!text-primary !bg-surface-raised font-medium" }}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface-raised"
              >
                {n.label}
              </Link>
            ))}

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium text-foreground mt-2"
            >
              <FileDown className="h-4 w-4 text-primary" />
              <span>Download Resume (PDF)</span>
            </a>
          </nav>
        )}
      </header>

      {/* Main Page Slot */}
      <main className="flex-1">{children}</main>

      {/* Custom Interactive Cursor for Desktop */}
      <CustomCursor />

      {/* Global Command Palette */}
      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        onTriggerTerminal={() => setTerminalOpen(true)}
      />

      {/* Global Footer */}
      <footer className="mt-24 border-t border-border bg-surface/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:px-8 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p>
              © {new Date().getFullYear()} {profile.name} · {profile.role}
            </p>
            <span className="hidden sm:inline text-border">|</span>
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1 text-xs"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors flex items-center gap-1 text-xs"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTerminalOpen(true)}
              className="label-caps hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
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
    <section className={`mx-auto max-w-7xl px-5 sm:px-8 py-16 ${className ?? ""}`}>
      {eyebrow && <p className="label-caps mb-3">{eyebrow}</p>}
      <h1 className="text-h1">{title}</h1>
      {lead && (
        <p className="mt-4 max-w-2xl text-muted-foreground text-base leading-relaxed">{lead}</p>
      )}
      {children}
    </section>
  );
}
