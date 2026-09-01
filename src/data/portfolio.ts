// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — swap this sample data for your real
// details later. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Avery Chandra",
  role: "Data Scientist",
  tagline: "I turn noisy data into decisions that ship.",
  summary:
    "Six years building forecasting, ranking and causal-inference systems in production. I care about the boring parts — data contracts, evaluation harnesses, monitoring — because that is what makes a model survive contact with reality.",
  location: "Bengaluru, India · Remote friendly",
  email: "avery@example.com",
  github: "https://github.com/example",
  linkedin: "https://linkedin.com/in/example",
  resumeUrl: "#",
};

export const metrics = [
  { label: "Years in production ML", value: "6" },
  { label: "Models shipped", value: "23" },
  { label: "Forecast error reduced", value: "31%" },
  { label: "Pipelines maintained", value: "40+" },
];

// x = years of experience, y = self-rated depth (0-100), r = usage frequency
export const skills = [
  { name: "Python", group: "Language", x: 6.5, y: 95, r: 10 },
  { name: "SQL", group: "Language", x: 7, y: 92, r: 10 },
  { name: "R", group: "Language", x: 2.5, y: 55, r: 4 },
  { name: "PyTorch", group: "ML", x: 4, y: 82, r: 8 },
  { name: "scikit-learn", group: "ML", x: 6, y: 90, r: 9 },
  { name: "XGBoost", group: "ML", x: 5, y: 88, r: 8 },
  { name: "Causal Inference", group: "ML", x: 3, y: 74, r: 6 },
  { name: "dbt", group: "Data Eng", x: 3.5, y: 78, r: 7 },
  { name: "Airflow", group: "Data Eng", x: 4.5, y: 80, r: 8 },
  { name: "Spark", group: "Data Eng", x: 3, y: 68, r: 6 },
  { name: "MLflow", group: "MLOps", x: 3, y: 76, r: 7 },
  { name: "Docker", group: "MLOps", x: 5, y: 84, r: 8 },
  { name: "AWS SageMaker", group: "MLOps", x: 2.5, y: 65, r: 5 },
  { name: "Streamlit", group: "Viz", x: 4, y: 80, r: 6 },
  { name: "Plotly", group: "Viz", x: 5, y: 85, r: 7 },
];

export const skillGroups = ["Language", "ML", "Data Eng", "MLOps", "Viz"] as const;

export const experience = [
  {
    company: "Northwind Analytics",
    role: "Senior Data Scientist",
    period: "2023 — Present",
    location: "Remote",
    bullets: [
      "Led demand-forecasting rebuild across 12k SKUs; cut WAPE from 24% to 16.5%.",
      "Designed an offline/online evaluation harness now used by four teams.",
      "Mentored three juniors through their first production deployments.",
    ],
    stack: ["Python", "PyTorch", "Airflow", "dbt", "Snowflake"],
  },
  {
    company: "Lumen Retail",
    role: "Data Scientist",
    period: "2021 — 2023",
    location: "Bengaluru",
    bullets: [
      "Built a uplift model for promo targeting; +8.4% incremental margin in A/B test.",
      "Shipped a feature store that removed 60% of duplicated pipeline logic.",
    ],
    stack: ["Python", "XGBoost", "Spark", "AWS"],
  },
  {
    company: "Cobalt Labs",
    role: "Analytics Engineer",
    period: "2020 — 2021",
    location: "Pune",
    bullets: [
      "Modelled the core event schema powering all executive reporting.",
      "Automated 30+ manual reports into a single self-serve layer.",
    ],
    stack: ["SQL", "dbt", "Looker"],
  },
];

export type Project = {
  slug: string;
  name: string;
  domain: "Forecasting" | "NLP" | "Causal" | "Vision";
  scale: "Prototype" | "Production";
  blurb: string;
  problem: string;
  approach: string;
  impact: string;
  stack: string[];
  link: string;
};

export const projects: Project[] = [
  {
    slug: "demand-forecast",
    name: "Hierarchical Demand Forecasting",
    domain: "Forecasting",
    scale: "Production",
    blurb: "Reconciled forecasts across SKU, store and region with a temporal fusion transformer.",
    problem: "Planners kept overriding forecasts because store-level and regional numbers disagreed.",
    approach:
      "TFT base learner plus MinT reconciliation, backtested over 36 rolling origins with per-hierarchy loss reporting.",
    impact: "WAPE 24% → 16.5%, override rate down two thirds.",
    stack: ["PyTorch", "Airflow", "Snowflake"],
    link: "#",
  },
  {
    slug: "promo-uplift",
    name: "Promotion Uplift Engine",
    domain: "Causal",
    scale: "Production",
    blurb: "Two-model uplift estimation to target discounts at persuadable customers only.",
    problem: "Blanket discounts were cannibalising full-price demand.",
    approach: "T-learner with propensity trimming, validated with Qini curves on a holdout randomised arm.",
    impact: "+8.4% incremental margin, 22% lower discount spend.",
    stack: ["XGBoost", "Spark", "dbt"],
    link: "#",
  },
  {
    slug: "ticket-router",
    name: "Support Ticket Router",
    domain: "NLP",
    scale: "Production",
    blurb: "Fine-tuned encoder routing tickets into 41 queues with confidence-based deferral.",
    problem: "Manual triage added a 6-hour delay to every ticket.",
    approach: "DistilBERT fine-tune, calibrated with temperature scaling, low-confidence cases deferred to humans.",
    impact: "82% auto-routed at 96% precision; median first response down to 40 minutes.",
    stack: ["Transformers", "FastAPI", "Docker"],
    link: "#",
  },
  {
    slug: "shelf-audit",
    name: "Shelf Audit Vision",
    domain: "Vision",
    scale: "Prototype",
    blurb: "On-device detection of out-of-stock facings from phone photos.",
    problem: "Field audits were sampled monthly and always stale.",
    approach: "YOLO-style detector distilled to a mobile backbone, active-learning loop on uncertain frames.",
    impact: "Prototype hit 0.87 mAP on the internal benchmark.",
    stack: ["PyTorch", "ONNX", "Streamlit"],
    link: "#",
  },
  {
    slug: "churn-early-warning",
    name: "Churn Early Warning",
    domain: "Causal",
    scale: "Prototype",
    blurb: "Survival model flagging accounts at risk 60 days ahead of renewal.",
    problem: "Success teams found out about churn at renewal, too late to act.",
    approach: "Cox proportional hazards with time-varying covariates, SHAP-driven reason codes.",
    impact: "Concordance 0.79; piloted with two account teams.",
    stack: ["lifelines", "Python", "Plotly"],
    link: "#",
  },
];

export const certifications = [
  { name: "AWS Certified Machine Learning — Specialty", issuer: "Amazon Web Services", year: "2024", id: "AWS-MLS-0000" },
  { name: "Professional Data Engineer", issuer: "Google Cloud", year: "2023", id: "GCP-PDE-0000" },
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2022", id: "DLAI-0000" },
  { name: "Databricks Certified Data Engineer Associate", issuer: "Databricks", year: "2022", id: "DBX-0000" },
];

export const education = [
  { school: "Indian Institute of Technology", degree: "M.Tech, Computer Science", year: "2020" },
  { school: "University of Pune", degree: "B.E., Information Technology", year: "2018" },
];
