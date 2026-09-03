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
    <div className="rounded-2xl border border-white/[0.08] bg-surface/80 p-6 md:p-8 shadow-xl backdrop-blur-xl relative overflow-hidden">
      {/* Header with Classification badge and Reset Escape Hatch */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-5 mb-6">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary border border-primary/25">
            <GitBranch className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-display font-bold text-base sm:text-lg text-white">
                Decision-Tree Project Navigator
              </h2>
              <span className="num label-caps text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/25 font-semibold">
                Interactive Classifier
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
              Filter case studies by modeling paradigm, system constraint, or business outcome.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {selectedPath && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-slate-300 transition-colors hover:text-white hover:bg-white/[0.08]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Show All ({totalProjectsCount})</span>
            </button>
          )}
          <span className="num rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
            {matchedProjectsCount} / {totalProjectsCount} Matched
          </span>
        </div>
      </div>

      {/* Decision Tree Interactive Node Graph */}
      <div className="space-y-6">
        {/* Node Split 1 (Root Level) */}
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_6px_rgba(99,102,241,0.8)]" />
            <span className="label-caps font-semibold text-xs text-slate-300">
              Split 1: {decisionTree.question}
            </span>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-3">
            {decisionTree.options.map((opt) => {
              const isSelected = level1 === opt.pathCode;
              return (
                <button
                  key={opt.pathCode}
                  onClick={() => handleSelectLevel1(opt.pathCode)}
                  className={`group relative text-left rounded-xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-primary bg-primary/15 shadow-[0_0_20px_rgba(99,102,241,0.2)] ring-1 ring-primary"
                      : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`font-display text-sm sm:text-base font-bold transition-colors ${
                        isSelected ? "text-primary" : "text-white group-hover:text-primary"
                      }`}
                    >
                      {opt.label}
                    </span>
                    {isSelected ? (
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-white shrink-0">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                    )}
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Node Split 2 (Child Level) */}
        {activeLevel1Option?.next && (
          <div className="border-t border-dashed border-white/10 pt-6 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center gap-2 mb-3.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
              <span className="label-caps font-semibold text-xs text-slate-300">
                Split 2 ({activeLevel1Option.label}): {activeLevel1Option.next.question}
              </span>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3">
              {activeLevel1Option.next.options.map((opt) => {
                const isSelected = level2 === opt.pathCode;
                return (
                  <button
                    key={opt.pathCode}
                    onClick={() => handleSelectLevel2(opt.pathCode, opt.predicate)}
                    className={`group relative text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500"
                        : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-emerald-500/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`font-display text-sm font-bold transition-colors ${
                          isSelected ? "text-emerald-400" : "text-white group-hover:text-emerald-400"
                        }`}
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-black shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
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
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4 text-xs font-mono text-slate-400">
        <span className="text-primary font-semibold">Classification Path:</span>
        <span className="rounded-lg bg-white/[0.04] px-2.5 py-0.5 text-slate-300 border border-white/10">
          root
        </span>
        {level1 && (
          <>
            <span>→</span>
            <span className="rounded-lg bg-primary/15 text-primary border border-primary/30 px-2.5 py-0.5 font-medium">
              {activeLevel1Option?.label}
            </span>
          </>
        )}
        {level2 && (
          <>
            <span>→</span>
            <span className="rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 font-medium">
              {activeLevel2Option?.label}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
