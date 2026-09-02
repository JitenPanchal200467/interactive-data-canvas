import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  FileText,
  FileDown,
  Briefcase,
  Layers,
  Award,
  Mail,
  Home,
  Terminal as TerminalIcon,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { profile, projects, skills } from "@/data/portfolio";

export function CommandPalette({
  open,
  onOpenChange,
  onTriggerTerminal,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTriggerTerminal?: () => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const handleSelect = (action: () => void) => {
    action();
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 p-4 pt-[15vh] backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="flex flex-col overflow-hidden bg-transparent">
          <CommandInput placeholder="Search projects, skills, routes, or commands..." />

          <CommandList className="max-h-[360px] overflow-y-auto p-2">
            <CommandEmpty>No matching results found.</CommandEmpty>

            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/" }))}>
                <Home className="h-4 w-4 text-primary" />
                <span>Home</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/about" }))}>
                <FileText className="h-4 w-4 text-primary" />
                <span>About & Methodology</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/experience" }))}>
                <Briefcase className="h-4 w-4 text-primary" />
                <span>Experience & Track Record</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/projects" }))}>
                <Layers className="h-4 w-4 text-primary" />
                <span>Projects & Case Studies</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/certifications" }))}>
                <Award className="h-4 w-4 text-primary" />
                <span>Certifications</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/resume" }))}>
                <FileDown className="h-4 w-4 text-primary" />
                <span>Resume & Qualifications</span>
              </CommandItem>
              <CommandItem onSelect={() => handleSelect(() => navigate({ to: "/contact" }))}>
                <Mail className="h-4 w-4 text-primary" />
                <span>Contact & Inquiries</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Case Studies">
              {projects.map((p) => (
                <CommandItem
                  key={p.slug}
                  onSelect={() =>
                    handleSelect(() =>
                      navigate({ to: `/projects/$slug`, params: { slug: p.slug } }),
                    )
                  }
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    <span>{p.name}</span>
                  </div>
                  <span className="label-caps text-[10px] text-muted-foreground">{p.domain}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Skills & Tooling">
              {skills.slice(0, 8).map((s) => (
                <CommandItem
                  key={s.name}
                  onSelect={() => handleSelect(() => navigate({ to: "/about" }))}
                  className="flex items-center justify-between"
                >
                  <span>{s.name}</span>
                  <span className="num text-xs text-muted-foreground">
                    {s.x} yrs · {s.y}% depth
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Actions & Tools">
              <CommandItem
                onSelect={() =>
                  handleSelect(() => {
                    if (onTriggerTerminal) onTriggerTerminal();
                  })
                }
              >
                <TerminalIcon className="h-4 w-4 text-primary" />
                <span>Open Interactive Python/SQL Terminal</span>
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  handleSelect(() => {
                    window.open(profile.resumeUrl, "_blank");
                  })
                }
              >
                <Download className="h-4 w-4 text-accent" />
                <span>Download Resume (PDF)</span>
              </CommandItem>
              <CommandItem
                onSelect={() =>
                  handleSelect(() => {
                    window.open(profile.github, "_blank");
                  })
                }
              >
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <span>Visit GitHub Profile</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>

          <div className="flex items-center justify-between border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
            <span>Use ↑↓ to navigate, Enter to select</span>
            <span>Press ⌘K anytime</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
