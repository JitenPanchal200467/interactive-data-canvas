import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { TerminalEasterEgg } from "@/components/terminal-easter-egg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certifications" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground num text-sm font-bold">
              {profile.name.slice(0, 1)}
            </span>
            <span className="font-display text-sm font-semibold">{profile.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-primary bg-secondary" }}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <TerminalEasterEgg />
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="rounded-md border border-border p-2 md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-border px-5 py-3 md:hidden">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="rounded-md px-2 py-2 text-sm text-muted-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-24 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="label-caps">Press ` anywhere for the terminal</p>
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
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      {eyebrow && <p className="label-caps mb-3">{eyebrow}</p>}
      <h1 className="text-h1">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-muted-foreground">{lead}</p>}
      {children}
    </section>
  );
}
