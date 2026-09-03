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
  CommandDialog,
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
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleSelect = (action: () => void) => {
    action();
    onOpenChange(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />

      <CommandList className="max-h-[380px] overflow-y-auto p-2">
        <CommandEmpty className="py-6 text-center text-xs text-muted-foreground">
          No matching results found.
        </CommandEmpty>

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

        <CommandSeparator className="my-1 border-white/5" />

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
              <div className="flex items-center gap-2 truncate pr-2">
                <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" />
                <span className="truncate">{p.name}</span>
              </div>
              <span className="label-caps text-[9px] text-muted-foreground shrink-0">{p.domain}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-1 border-white/5" />

        <CommandGroup heading="Skills & Tooling">
          {skills.slice(0, 6).map((s) => (
            <CommandItem
              key={s.name}
              onSelect={() => handleSelect(() => navigate({ to: "/about" }))}
              className="flex items-center justify-between"
            >
              <span>{s.name}</span>
              <span className="num text-[11px] text-muted-foreground font-mono">
                {s.x} yrs · {s.y}%
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-1 border-white/5" />

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

      <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 text-[11px] text-muted-foreground bg-white/[0.02]">
        <span>Use ↑↓ to navigate, Enter to select</span>
        <span className="font-mono">ESC or ⌘K to close</span>
      </div>
    </CommandDialog>
  );
}
