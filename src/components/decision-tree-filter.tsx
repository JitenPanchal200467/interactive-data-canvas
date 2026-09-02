import { useState, useEffect } from "react";
import { GitBranch, Sparkles, RefreshCw, ChevronRight, Check } from "lucide-react";

export interface DecisionNode {
  id: string;
  question: string;
  options: {
    label: string;
    description: string;
    next?: DecisionNode;
    predicate?: (projectDomain: string, projectSlug: string, stack: string[]) => boolean;
    pathCode: string;
  }[];
}

const decisionTree: DecisionNode = {
  id: "root",
  question: "What capability are you evaluating today?",
  options: [
    {
      label: "Modeling Depth & AI",
      description: "Transformer fine-tuning, RAG, NER, ensemble ML & explainability",
      pathCode: "modeling",
      next: {
        id: "modeling-split",
        question: "Which modeling paradigm interests you?",
        options: [
          {
            label: "NLP & Legal Intelligence",
            description: "CUAD fine-tuned RoBERTa, RAG & clause risk scoring",
            pathCode: "modeling.nlp",
            predicate: (domain, slug) => domain === "NLP" || slug === "contract-intelligence",
          },
          {
            label: "Causal Risk & Health Modeling",
            description: "XGBoost, SHAP attributions & claim risk prediction",
            pathCode: "modeling.causal",
            predicate: (domain, slug) => domain === "Causal" || slug === "insulens",
          },
          {
            label: "Automated Data Preprocessing",
            description: "Leak-free Scikit-Learn transformers & IQR imputation",
            pathCode: "modeling.forecasting",
            predicate: (domain, slug) => domain === "Forecasting" || slug === "ml-preprocessing",
          },
        ],
      },
    },
    {
      label: "Data & Systems Engineering",
      description: "Real-time streaming, latency budgets & edge computation",
      pathCode: "engineering",
      next: {
        id: "eng-split",
        question: "Which system constraint matters most?",
        options: [
          {
            label: "C++ & Algorithmic Complexity",
            description: "150+ DSA patterns, cache locality & Hamming FEC",
            pathCode: "engineering.edge",
            predicate: (domain, slug) =>
              slug === "dsa-complexity-tracker" || slug === "hamming-code",
          },
          {
            label: "Pipelines & Web Workers",
            description: "Client-side Web Workers & automated transformer ETL",
            pathCode: "engineering.pipelines",
            predicate: (domain, slug, stack) =>
              slug === "fileflux-suite" || slug === "ml-preprocessing" || stack.includes("FastAPI"),
          },
        ],
      },
    },
    {
      label: "Attributed Business Impact",
      description: "Due diligence turnaround, cloud cost elimination & workflow speedup",
      pathCode: "impact",
      next: {
        id: "impact-split",
        question: "Which business outcome target?",
        options: [
          {
            label: "Legal Risk & Cost Avoidance",
            description: "65% review speedup, 94.6% ROC-AUC & zero cloud hosting bill",
            pathCode: "impact.margin",
            predicate: (domain, slug) =>
              slug === "contract-intelligence" || slug === "insulens" || slug === "fileflux-suite",
          },
          {
            label: "Workflow & Accommodation Search",
            description: "65% accommodation search cut & leak-free ML preparation",
            pathCode: "impact.speed",
            predicate: (domain, slug) =>
              slug === "hostel-hub" ||
              slug === "ml-preprocessing" ||
              slug === "contract-intelligence",
          },
        ],
      },
    },
  ],
};

export function DecisionTreeFilter({
  selectedPath,
  onPathChange,
  totalProjectsCount,
  matchedProjectsCount,
}: {
  selectedPath: string | null;
  onPathChange: (
    path: string | null,
    predicate?: (domain: string, slug: string, stack: string[]) => boolean,
  ) => void;
  totalProjectsCount: number;
  matchedProjectsCount: number;
}) {
  const [level1, setLevel1] = useState<string | null>(null);
  const [level2, setLevel2] = useState<string | null>(null);

  // Sync state with incoming path prop (e.g. from URL ?path=...)
  useEffect(() => {
    if (!selectedPath) {
      setLevel1(null);
      setLevel2(null);
      return;
    }
    const parts = selectedPath.split(".");
    if (parts[0]) setLevel1(parts[0]);
    if (parts[1]) setLevel2(`${parts[0]}.${parts[1]}`);
  }, [selectedPath]);

  const activeLevel1Option = decisionTree.options.find((o) => o.pathCode === level1);
  const activeLevel2Option = activeLevel1Option?.next?.options.find((o) => o.pathCode === level2);

  const handleSelectLevel1 = (pathCode: string) => {
    if (level1 === pathCode) {
      handleReset();
      return;
    }
    setLevel1(pathCode);
    setLevel2(null);
    onPathChange(pathCode, (domain, slug, stack) => {
      if (pathCode === "modeling")
        return domain === "Forecasting" || domain === "Causal" || domain === "NLP";
      if (pathCode === "engineering")
        return (
          slug === "fileflux-suite" ||
          slug === "dsa-complexity-tracker" ||
          slug === "hamming-code" ||
          slug === "ml-preprocessing" ||
          stack.includes("FastAPI")
        );
      if (pathCode === "impact")
        return (
          slug === "contract-intelligence" ||
          slug === "hostel-hub" ||
          slug === "insulens" ||
          slug === "fileflux-suite"
        );
      return true;
    });
  };

  const handleSelectLevel2 = (
    pathCode: string,
    predicate?: (d: string, s: string, st: string[]) => boolean,
  ) => {
    setLevel2(pathCode);
    onPathChange(pathCode, predicate);
  };

  const handleReset = () => {
    setLevel1(null);
    setLevel2(null);
    onPathChange(null);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6 shadow-xl relative overflow-hidden">
      {/* Header with Classification badge and Reset Escape Hatch */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary border border-primary/30">
            <GitBranch className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-semibold text-sm sm:text-base text-foreground">
                Decision-Tree Project Navigator
              </h2>
              <span className="num label-caps text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                DecisionTreeClassifier
              </span>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Traverse the evaluation splits to classify case studies by your hiring focus.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedPath && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Show All ({totalProjectsCount})</span>
            </button>
          )}
          <span className="num rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs font-semibold text-primary">
            {matchedProjectsCount} / {totalProjectsCount} Case Studies
          </span>
        </div>
      </div>

      {/* Decision Tree Interactive Node Graph */}
      <div className="space-y-6">
        {/* Node Split 1 (Root Level) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="label-caps font-medium text-xs text-foreground">
              Split 1: {decisionTree.question}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {decisionTree.options.map((opt) => {
              const isSelected = level1 === opt.pathCode;
              return (
                <button
                  key={opt.pathCode}
                  onClick={() => handleSelectLevel1(opt.pathCode)}
                  className={`group relative text-left rounded-xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(61,219,198,0.15)] ring-1 ring-primary"
                      : "border-border bg-surface/50 hover:bg-surface-raised hover:border-border/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`font-display text-sm font-semibold transition-colors ${
                        isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                      }`}
                    >
                      {opt.label}
                    </span>
                    {isSelected ? (
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Split 2 (Child Level - Slides in on Selection) */}
        {activeLevel1Option?.next && (
          <div className="border-t border-dashed border-border/80 pt-5 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="label-caps font-medium text-xs text-foreground">
                Split 2 ({activeLevel1Option.label}): {activeLevel1Option.next.question}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {activeLevel1Option.next.options.map((opt) => {
                const isSelected = level2 === opt.pathCode;
                return (
                  <button
                    key={opt.pathCode}
                    onClick={() => handleSelectLevel2(opt.pathCode, opt.predicate)}
                    className={`group relative text-left rounded-xl border p-3.5 transition-all duration-200 ${
                      isSelected
                        ? "border-accent bg-accent/10 shadow-[0_0_15px_rgba(245,181,68,0.15)] ring-1 ring-accent"
                        : "border-border bg-surface/50 hover:bg-surface-raised hover:border-accent/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`font-display text-sm font-semibold transition-colors ${
                          isSelected ? "text-accent" : "text-foreground group-hover:text-accent"
                        }`}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-accent text-accent-foreground">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Path Breadcrumb Ribbon */}
      <div className="mt-5 flex items-center gap-2 border-t border-border pt-3 text-xs font-mono text-muted-foreground">
        <span className="text-primary font-semibold">Tree Path:</span>
        <span className="rounded bg-surface-raised px-2 py-0.5 text-foreground border border-border">
          root
        </span>
        {level1 && (
          <>
            <span>→</span>
            <span className="rounded bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 font-medium">
              {activeLevel1Option?.label}
            </span>
          </>
        )}
        {level2 && (
          <>
            <span>→</span>
            <span className="rounded bg-accent/15 text-accent border border-accent/30 px-2 py-0.5 font-medium">
              {activeLevel2Option?.label}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
