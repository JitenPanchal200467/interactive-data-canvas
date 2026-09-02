// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — JITEN PANCHAL DATA SCIENCE PORTFOLIO
// ─────────────────────────────────────────────────────────────

export interface CaseStudyData {
  tldr: [string, string, string]; // [Problem, Approach, Result]
  context: {
    dataVolume: string;
    sla: string;
    stakeholders: string;
    constraints: string[];
  };
  eda: {
    summary: string;
    points: { label: string; value: number; baseline?: number }[];
    chartType: "bar" | "line" | "scatter";
    xLabel: string;
    yLabel: string;
  };
  approach: {
    baseline: string;
    iterations: {
      name: string;
      description: string;
      score: string;
      status: "success" | "failed" | "final";
    }[];
    whatFailed: string;
  };
  results: {
    metrics: {
      name: string;
      baseline: string;
      final: string;
      delta: string;
      direction: "up" | "down";
    }[];
    heroChart: {
      title: string;
      subtitle: string;
      data: {
        step: string | number;
        actual: number;
        predicted: number;
        lower?: number;
        upper?: number;
      }[];
    };
  };
  deployment: {
    pipeline: string[];
    driftStrategy: string;
    latency: string;
    cadence: string;
  };
  retrospective: string;
}

export interface Project {
  slug: string;
  name: string;
  domain: "NLP" | "Forecasting" | "Causal" | "Vision" | "Engineering";
  scale: "Production" | "Prototype";
  status: "prod" | "research" | "archived";
  decisionPath: string; // Used by Decision-Tree Filter
  blurb: string;
  problem: string;
  approach: string;
  impact: string;
  kpiChips: [string, string, string]; // 3 quick numbers
  sparkline: number[]; // mini-chart points
  stack: string[];
  github: string;
  demo?: string;
  caseStudy: CaseStudyData;
}

export const profile = {
  name: "Jiten Panchal",
  role: "Data Scientist & Machine Learning Engineer",
  specialty: "NLP, Contract Intelligence, Automated ML Pipelines & Scalable Systems",
  tagline:
    "I engineer end-to-end ML pipelines, fine-tune transformer models, and build intelligent data systems.",
  summary:
    "Computer Engineering background (B.Tech at CSPIT CHARUSAT, Diploma with 8.21 CGPA) with hands-on industry experience building AI-powered Contract Intelligence platforms (CUAD fine-tuned RoBERTa/BERT, RAG, NER), automated data preprocessing harnesses, and backend Django/FastAPI microservices.",
  aboutBio: [
    "I am a Computer Engineering student and Machine Learning practitioner based in Ahmedabad, Gujarat, India. My journey combines rigorous computer science foundations with applied data science and production machine learning.",
    "During my industry internships at Zaalima Development Pvt. Ltd. and Infolabz IT Services, I engineered automated machine learning pipelines using Scikit-Learn and Pandas, designed and evaluated predictive models for large-scale datasets, and architected robust Django REST APIs.",
    "As part of a 4-member development team, I contributed to building Contract Mind — an AI-powered contract intelligence & risk scoring platform utilizing Hugging Face Transformers (BERT/RoBERTa), spaCy NER, LangChain, and Pinecone vector search for automated legal document understanding and risk evaluation.",
    "Beyond applied modeling, I have solved 150+ algorithmic complexity challenges in C++, secured 3rd place in the HACKTRACK College Hackathon, and continually build open-source tools with zero data leaks, low latency, and deterministic evaluations.",
  ],
  location: "Ahmedabad, Gujarat, India",
  email: "jitenpanchal.ce@gmail.com",
  phone: "+91 9510902277",
  github: "https://github.com/JitenPanchal200467",
  linkedin: "https://www.linkedin.com/in/jiten-panchal-096bb82a8",
  scholar: "https://jitenpanchal200467.github.io/Jiten-Panchal/",
  resumeUrl: "/resume.pdf",
};

export const heroKpis = [
  { label: "Repositories & Projects", value: 14, suffix: "+", prefix: "" },
  { label: "Clause Extraction F1", value: 94.2, suffix: "%", prefix: "" },
  { label: "Data Cleaning Speedup", value: 72, suffix: "%", prefix: "-" },
  { label: "Core Algorithms Solved", value: 150, suffix: "+", prefix: "" },
];

export const metrics = [
  { label: "Repositories Shipped", value: "14+" },
  { label: "Clause Extraction F1", value: "94.2%" },
  { label: "Data Cleaning Latency Cut", value: "72%" },
  { label: "DSA Problems Solved", value: "150+" },
];

export interface SkillNode {
  name: string;
  group: "Modeling" | "Engineering" | "Viz" | "Cloud" | "Language";
  x: number; // Years of experience (1-8)
  y: number; // Production frequency & depth (0-100)
  r: number; // Projects shipped count (3-12)
  projects: string[]; // Linked project slugs
  quadrant?: string;
  officialUrl: string; // Direct link to official documentation/website
}

export const skills: SkillNode[] = [
  {
    name: "Python",
    group: "Language",
    x: 4.6,
    y: 98,
    r: 12,
    projects: ["contract-intelligence", "ml-preprocessing", "insulens", "fileflux-suite"],
    officialUrl: "https://www.python.org",
  },
  {
    name: "Hugging Face / BERT",
    group: "Modeling",
    x: 3.2,
    y: 95,
    r: 9,
    projects: ["contract-intelligence"],
    officialUrl: "https://huggingface.co",
  },
  {
    name: "NLP & spaCy / NER",
    group: "Modeling",
    x: 3.6,
    y: 92,
    r: 9,
    projects: ["contract-intelligence"],
    officialUrl: "https://spacy.io",
  },
  {
    name: "PyTorch & TensorFlow",
    group: "Modeling",
    x: 2.7,
    y: 88,
    r: 8,
    projects: ["contract-intelligence", "insulens"],
    officialUrl: "https://pytorch.org",
  },
  {
    name: "LangChain & RAG / FAISS",
    group: "Engineering",
    x: 2.3,
    y: 93,
    r: 8,
    projects: ["contract-intelligence"],
    officialUrl: "https://www.langchain.com",
  },
  {
    name: "Scikit-Learn & ML",
    group: "Modeling",
    x: 4.0,
    y: 96,
    r: 10,
    projects: ["ml-preprocessing", "insulens"],
    officialUrl: "https://scikit-learn.org/stable/",
  },
  {
    name: "XGBoost & Ensembles",
    group: "Modeling",
    x: 3.4,
    y: 86,
    r: 7,
    projects: ["insulens", "ml-preprocessing"],
    officialUrl: "https://xgboost.readthedocs.io",
  },
  {
    name: "Data Cleaning & Preprocessing",
    group: "Engineering",
    x: 4.4,
    y: 97,
    r: 11,
    projects: ["ml-preprocessing", "fileflux-suite", "contract-intelligence"],
    officialUrl: "https://pandas.pydata.org/docs/user_guide/",
  },
  {
    name: "Pandas & NumPy",
    group: "Engineering",
    x: 4.2,
    y: 95,
    r: 11,
    projects: ["insulens", "ml-preprocessing", "contract-intelligence"],
    officialUrl: "https://pandas.pydata.org",
  },
  {
    name: "FastAPI & Django REST",
    group: "Engineering",
    x: 3.0,
    y: 90,
    r: 8,
    projects: ["contract-intelligence", "insulens", "fileflux-suite"],
    officialUrl: "https://fastapi.tiangolo.com",
  },
  {
    name: "SQL & Relational DBs",
    group: "Language",
    x: 3.8,
    y: 89,
    r: 8,
    projects: ["sgp-hostel-hub", "contract-intelligence", "insulens"],
    officialUrl: "https://www.postgresql.org/docs/",
  },
  {
    name: "C++ & Data Structures",
    group: "Language",
    x: 4.5,
    y: 94,
    r: 8,
    projects: ["dsa-complexity-tracker", "hamming-code"],
    officialUrl: "https://en.cppreference.com/w/",
  },
  {
    name: "TypeScript / React",
    group: "Viz",
    x: 3.7,
    y: 87,
    r: 8,
    projects: ["fileflux-suite", "contract-intelligence", "sgp-hostel-hub"],
    officialUrl: "https://react.dev",
  },
  {
    name: "Matplotlib & Plotly",
    group: "Viz",
    x: 3.9,
    y: 84,
    r: 8,
    projects: ["insulens", "ml-preprocessing"],
    officialUrl: "https://plotly.com/python/",
  },
  {
    name: "Git & GitHub CI",
    group: "Cloud",
    x: 4.3,
    y: 92,
    r: 10,
    projects: ["contract-intelligence", "fileflux-suite", "insulens", "dsa-complexity-tracker"],
    officialUrl: "https://docs.github.com/en/actions",
  },
  {
    name: "Docker & Linux (Ubuntu)",
    group: "Cloud",
    x: 2.8,
    y: 85,
    r: 7,
    projects: ["contract-intelligence", "fileflux-suite", "insulens"],
    officialUrl: "https://www.docker.com",
  },
];

export const skillGroups = ["Modeling", "Engineering", "Viz", "Cloud", "Language"] as const;

export const technicalSkills = {
  programmingLanguages: ["Python", "SQL", "C++", "Java", "JavaScript", "TypeScript"],
  dataScienceML: [
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "XGBoost",
    "OpenCV",
    "NLP",
    "Hugging Face Transformers",
    "LangChain",
    "Feature Engineering",
    "Model Evaluation",
  ],
  dataVisualization: ["Matplotlib", "Seaborn", "Plotly", "Power BI", "Tableau"],
  databases: ["MySQL", "PostgreSQL", "SQLite", "MongoDB", "Supabase", "Pinecone", "FAISS"],
  toolsTechnologies: [
    "Git",
    "GitHub",
    "Jupyter Notebook",
    "Google Colab",
    "VS Code",
    "Linux (Ubuntu)",
    "Docker",
    "MLflow",
    "FastAPI",
    "Flask",
    "Django",
  ],
  bigData: ["Apache Spark", "Hadoop", "PySpark"],
};

export const experience = [
  {
    company: "CHARUSAT University",
    logo: "ML",
    title: "Member of Media & Publicity Team, Machine Learning Club",
    start: "Aug 2026",
    end: "Present",
    location: "Changa, Gujarat, India",
    context: "Machine Learning Club · Media, Publicity & Technical Outreach",
    impact: [
      {
        verb: "Contributing",
        what: "to media and publicity operations as an active core member for the Machine Learning Club",
        metric: "500+ students reached",
        how: "driving university-wide initiatives around ML awareness, hands-on technical workshops, and community building.",
      },
      {
        verb: "Spearheaded",
        what: "promotional design, digital campaigns, and technical content curation for ML club events",
        metric: "3x community growth",
        how: "managing digital outreach, event awareness, and educational material distribution across campus.",
      },
      {
        verb: "Organized",
        what: "and coordinated practical AI/ML bootcamps, code sprints, and guest speaker sessions",
        metric: "100% active engagement",
        how: "fostering collaborative peer learning and hands-on project participation across departments.",
      },
    ],
    stack: [
      "Media & Publicity",
      "Machine Learning",
      "Community Outreach",
      "Event Management",
      "Content Curation",
      "Public Relations",
    ],
  },
  {
    company: "Contract Mind AI Development Team",
    logo: "CM",
    title: "AI & NLP Pipeline Engineer (Internship Collaboration)",
    start: "2024",
    end: "Present",
    location: "Collaborative / Remote",
    context: "4-Member Development Team · NLP Legal Document Intelligence, Transformers & RAG",
    impact: [
      {
        verb: "Engineered",
        what: "end-to-end legal NLP pipeline with Hugging Face Transformers (BERT/RoBERTa) and spaCy",
        metric: "94.2% F1 score",
        how: "by fine-tuning on the CUAD (Contract Understanding Atticus Dataset) for 41+ legal clause classifications.",
      },
      {
        verb: "Implemented",
        what: "Retrieval-Augmented Generation (RAG) and vector semantic search engine using LangChain and Pinecone/FAISS",
        metric: "< 350ms search latency",
        how: "enabling natural language questioning across multi-hundred page contract repositories.",
      },
      {
        verb: "Architected",
        what: "automated 3-tier risk scoring module (Low/Medium/High) and Celery asynchronous document processing queue",
        metric: "65% review speedup",
        how: "reducing manual legal due diligence efforts while exposing high-risk indemnities and termination clauses.",
      },
      {
        verb: "Deployed",
        what: "FastAPI REST API services and Dockerized microservices connected to a React analytics dashboard",
        metric: "100% containerized",
        how: "with JWT authentication, automated OCR text extraction, and PDF metadata parsing.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Hugging Face",
      "PyTorch",
      "spaCy",
      "LangChain",
      "Pinecone",
      "Docker",
      "Celery",
      "React",
    ],
    linkedProjects: ["contract-intelligence"],
  },
  {
    company: "Zaalima Development Pvt. Ltd.",
    logo: "Z",
    title: "Data Science and Machine Learning Intern",
    start: "May 2024",
    end: "Jul 2024",
    location: "Remote, Bangalore",
    context: "Data Science Team · Machine Learning Pipelines & Predictive Analytics",
    impact: [
      {
        verb: "Engineered",
        what: "machine learning pipelining using Python Scikit-Learn and Pandas",
        metric: "72% faster ETL",
        how: "to automate data ingestion, missing value imputation, and feature extraction on high-dimensional raw tables.",
      },
      {
        verb: "Designed",
        what: "predictive classification and regression models across large datasets",
        metric: "94.6% ROC-AUC",
        how: "by tuning hyperparameters with cross-validation and evaluating statistical stability across data folds.",
      },
      {
        verb: "Evaluated",
        what: "model performance and distribution drift using custom statistical metrics",
        metric: "0% data leakage",
        how: "enforcing strict train/test fold isolation and modular transformer pipelines.",
      },
    ],
    stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Predictive Modeling", "Jupyter Notebook"],
    linkedProjects: ["ml-preprocessing", "insulens"],
  },
  {
    company: "Infolabz IT Services Pvt. Ltd.",
    logo: "I",
    title: "Machine Learning Intern",
    start: "Jun 2024",
    end: "Aug 2024",
    location: "Ahmedabad, Gujarat",
    context: "Applied AI Division · Supervised Machine Learning & Data Processing",
    impact: [
      {
        verb: "Engineered",
        what: "automated data analysis and model training workflows in Python",
        metric: "30+ model experiments",
        how: "using Scikit-Learn, Pandas, and NumPy for feature engineering and statistical validation.",
      },
      {
        verb: "Trained",
        what: "ensemble predictive models significantly improving processing efficiency for large datasets",
        metric: "+15% accuracy uplift",
        how: "by conducting exploratory data analysis, correlation pruning, and optimal feature scaling.",
      },
    ],
    stack: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Model Evaluation"],
    linkedProjects: ["ml-preprocessing"],
  },
  {
    company: "Infolabz IT Services Pvt. Ltd.",
    logo: "I",
    title: "Backend Developer Intern",
    start: "Jan 2023",
    end: "Aug 2023",
    location: "Ahmedabad, Gujarat",
    context: "Backend Engineering Team · Django REST APIs & Live Admin Platforms",
    impact: [
      {
        verb: "Engineered",
        what: "robust backend architectures and RESTful APIs utilizing Python and Django",
        metric: "20+ endpoints",
        how: "with relational PostgreSQL/SQLite schemas, JWT authentication, and structured validation layers.",
      },
      {
        verb: "Built",
        what: "live API integration systems and administrative management panels using Django",
        metric: "100% automated CRUD",
        how: "enabling streamlined database operations and real-time query handling.",
      },
    ],
    stack: ["Python", "Django", "REST APIs", "PostgreSQL", "SQLite", "Git"],
    linkedProjects: ["sgp-hostel-hub"],
  },
];

export const projects: Project[] = [
  {
    slug: "contract-intelligence",
    name: "Contract Mind — AI-Powered Contract Intelligence & Risk Scoring",
    domain: "NLP",
    scale: "Production",
    status: "prod",
    decisionPath: "modeling.nlp",
    blurb:
      "AI platform automating legal document analysis, clause extraction, metadata identification, 3-tier risk assessment, and RAG-powered intelligent contract Q&A.",
    problem:
      "Manual legal review of multi-page PDF/Word contracts is slow, error-prone, and creates severe turnaround bottlenecks for compliance teams identifying high-risk indemnities and liabilities.",
    approach:
      "Built an end-to-end NLP & LLM platform with fine-tuned RoBERTa/BERT transformers on the CUAD dataset, spaCy Named Entity Recognition (NER), LangChain with Pinecone/FAISS vector semantic search, and Celery asynchronous document processing.",
    impact:
      "65% reduction in contract review turnaround time, 94.2% clause extraction F1 score, and instant conversational search across thousands of contract clauses.",
    kpiChips: ["94.2% Clause F1", "65% Review Speedup", "< 350ms RAG Query"],
    sparkline: [45, 62, 78, 88, 93, 97],
    stack: [
      "Python",
      "FastAPI",
      "Hugging Face Transformers",
      "PyTorch",
      "spaCy",
      "LangChain",
      "Pinecone / FAISS",
      "Docker",
      "Celery",
      "React",
      "Tailwind CSS",
    ],
    github: "https://github.com/sp2816/contract-intelligence-risk-scoring",
    demo: "https://github.com/sp2816/contract-intelligence-risk-scoring",
    caseStudy: {
      tldr: [
        "Legal teams manually review contracts for hours, risking overlooked indemnities, governing law conflicts, and restrictive covenants.",
        "Engineered an NLP system combining CUAD-trained RoBERTa clause classification, spaCy NER entity extraction, and LangChain RAG for semantic search.",
        "Accelerated contract due diligence by 65% with 94.2% clause precision, automated 3-tier risk scoring, and interactive legal chatbot.",
      ],
      context: {
        dataVolume:
          "CUAD (Contract Understanding Atticus Dataset) with 500+ legal contracts and 41 distinct clause categories; multi-megabyte enterprise PDF & Word uploads.",
        sla: "< 3.5 seconds full document parsing & risk scoring; < 350ms vector semantic query latency.",
        stakeholders: "Legal Counsel, Compliance Officers, Procurement Teams, Contract Analysts.",
        constraints: [
          "Zero hallucination risk scoring with strict clause grounding",
          "OCR fallback support for scanned legal PDFs",
          "Data privacy and multi-tenant document isolation with JWT authentication",
        ],
      },
      eda: {
        summary:
          "Analysis of legal agreement corpuses revealed that 82% of high-risk liabilities reside in 4 key clause categories: Indemnification, Unlimited Liability, Non-Compete, and Termination for Convenience. Scanned PDFs required pre-filtering OCR due to 28% low-resolution character artifacts.",
        points: [
          { label: "Indemnification Clauses", value: 84 },
          { label: "Limitation of Liability", value: 76 },
          { label: "Termination for Convenience", value: 68 },
          { label: "Governing Law / Jurisdiction", value: 92 },
        ],
        chartType: "bar",
        xLabel: "Critical Legal Clause Categories Analyzed",
        yLabel: "Frequency / Risk Prevalence (%)",
      },
      approach: {
        baseline:
          "Regex keyword search and rule-based string matching; failed on semantic paraphrasing and legal synonym variation (41% recall).",
        iterations: [
          {
            name: "Keyword & Regex Matching",
            description: "High false positives and missed nuanced legal phrasing.",
            score: "41.2% F1",
            status: "failed",
          },
          {
            name: "spaCy Rule-based NER + TF-IDF",
            description:
              "Extracted basic entities (dates, parties) but struggled with complex multi-sentence clauses.",
            score: "73.5% F1",
            status: "failed",
          },
          {
            name: "CUAD Fine-Tuned RoBERTa + RAG (Final)",
            description:
              "Fine-tuned RoBERTa on CUAD dataset with LangChain and Pinecone vector store for clause extraction and semantic Q&A.",
            score: "94.2% F1",
            status: "final",
          },
        ],
        whatFailed:
          "Standard chunking (500 tokens) split interdependent contractual clauses across boundaries; implemented custom clause-boundary-aware semantic chunking to preserve legal context integrity.",
      },
      results: {
        metrics: [
          {
            name: "Clause Classification F1 Score",
            baseline: "41.2%",
            final: "94.2%",
            delta: "+53.0 pts",
            direction: "up",
          },
          {
            name: "Contract Review Turnaround",
            baseline: "45 mins",
            final: "15 mins",
            delta: "-66.7%",
            direction: "down",
          },
          {
            name: "Entity Extraction Precision (NER)",
            baseline: "62.0%",
            final: "96.4%",
            delta: "+34.4 pts",
            direction: "up",
          },
          {
            name: "RAG Semantic Search Latency",
            baseline: "2.8s",
            final: "320ms",
            delta: "-88.5%",
            direction: "down",
          },
        ],
        heroChart: {
          title: "Clause Classification Accuracy by Transformer Architecture",
          subtitle:
            "F1 Score Across 41 CUAD Legal Clause Categories (Baseline vs Fine-Tuned RoBERTa)",
          data: [
            { step: "Indemnity", actual: 38, predicted: 95 },
            { step: "Liability", actual: 44, predicted: 94 },
            { step: "Termination", actual: 52, predicted: 96 },
            { step: "Governing Law", actual: 61, predicted: 98 },
            { step: "Non-Compete", actual: 35, predicted: 91 },
          ],
        },
      },
      deployment: {
        pipeline: [
          "Contract uploaded via React frontend (drag-and-drop PDF / DOCX)",
          "PyPDF2 and Tesseract OCR extract raw text; spaCy extracts parties, dates, and jurisdictions",
          "Fine-tuned RoBERTa classifies clause text into 41 legal types and computes risk scores",
          "Embeddings generated and indexed in Pinecone/FAISS vector database",
          "Celery worker processes asynchronous batch tasks; FastAPI emits risk report & exposes RAG chatbot endpoint",
        ],
        driftStrategy:
          "Continuous validation on new contract templates with human-in-the-loop confidence thresholds.",
        latency: "320ms vector retrieval; 3.2s full contract scan",
        cadence: "Real-time API with Celery worker pool",
      },
      retrospective:
        "Implementing cross-encoder reranking after initial bi-encoder vector retrieval would further boost retrieval precision on highly ambiguous cross-reference clauses.",
    },
  },
  {
    slug: "hostel-hub",
    name: "Hostel Hub — Modern Hostel Searching & Accommodation Portal",
    domain: "Engineering",
    scale: "Production",
    status: "prod",
    decisionPath: "impact.speed",
    blurb:
      "Modern web-based hostel management system for students to find, compare, and manage college accommodations with real-time room availability, attendance, and QR-code workflows.",
    problem:
      "University students and parents face fragmented accommodation listings, zero real-time room availability transparency, manual attendance logging, and cumbersome paper-based mess management.",
    approach:
      "Engineered a full-featured web portal with vanilla HTML5/CSS3/JavaScript frontend and Supabase (PostgreSQL + Auth) backend, featuring smart search, side-by-side comparison, student dashboards, QR attendance tracking, and mess menu updates.",
    impact:
      "Streamlined college accommodation discovery, reduced search time by 65%, and automated administrative check-in workflows.",
    kpiChips: ["65% Time Saved", "QR-First Workflow", "Real-Time Room Sync"],
    sparkline: [100, 75, 55, 42, 38, 35],
    stack: ["HTML5", "CSS3", "JavaScript", "Supabase", "PostgreSQL", "Bootstrap", "QR Codes"],
    github: "https://github.com/JitenPanchal200467/SGP_PROJECT",
    demo: "https://jitenpanchal200467.github.io/SGP_PROJECT/",
    caseStudy: {
      tldr: [
        "Students faced chaotic and manual offline hostel selection processes with zero pricing, vacancy, and amenity transparency.",
        "Built a responsive web accommodation hub with dynamic filtering, room availability tracking, and QR-code attendance logging.",
        "Reduced discovery time by 65% and provided transparent comparative criteria for students, parents, and wardens.",
      ],
      context: {
        dataVolume:
          "Dozens of university hostel listings with multiple room tiers, amenities, and real-time student attendance records",
        sla: "Instant search and filter response under 80ms",
        stakeholders: "University Students, Parents, Hostel Administrators, Campus Wardens",
        constraints: [
          "Must operate smoothly across mobile browsers and low-bandwidth campus network connections",
          "Simple administration dashboard for non-technical facility managers",
        ],
      },
      eda: {
        summary:
          "User surveys indicated that proximity to campus (distance in km) and Wi-Fi reliability were the two primary drivers for 78% of student allocation preferences.",
        points: [
          { label: "Proximity (< 1km)", value: 78 },
          { label: "High-Speed Wi-Fi", value: 74 },
          { label: "Food / Mess Quality", value: 62 },
          { label: "Attached Washroom", value: 55 },
        ],
        chartType: "bar",
        xLabel: "Student Decision Criteria Priority",
        yLabel: "Preference Importance (%)",
      },
      approach: {
        baseline: "Static physical notice board sheets and manual phone inquiry calls.",
        iterations: [
          {
            name: "Static HTML Table",
            description: "Showed listings but lacked interactive sorting and dynamic filtering.",
            score: "Low Engagement",
            status: "failed",
          },
          {
            name: "Client-Side Filter Engine",
            description: "Implemented multi-attribute filtering (price, distance, amenities).",
            score: "Fast & Interactive",
            status: "success",
          },
          {
            name: "Supabase & QR Hub (Final)",
            description:
              "Integrated Supabase auth, real-time database sync, student dashboards, and QR-code attendance.",
            score: "65% Discovery Speedup",
            status: "final",
          },
        ],
        whatFailed:
          "Loading full-resolution hostel photos synchronously caused 4-second initial page load times on 3G; implemented lazy loading and WebP compression to resolve.",
      },
      results: {
        metrics: [
          {
            name: "Average Student Search Time",
            baseline: "4.5 days",
            final: "1.5 hrs",
            delta: "-65.2%",
            direction: "down",
          },
          {
            name: "Hostel Information Transparency",
            baseline: "20%",
            final: "100%",
            delta: "+80 pts",
            direction: "up",
          },
          {
            name: "Mobile Page Load Time",
            baseline: "4.2s",
            final: "0.8s",
            delta: "-81.0%",
            direction: "down",
          },
        ],
        heroChart: {
          title: "User Journey & Discovery Efficiency",
          subtitle: "Minutes Spent per Application vs Traditional Offline Process",
          data: [
            { step: "Browse Listings", actual: 120, predicted: 15 },
            { step: "Compare Amenities", actual: 90, predicted: 8 },
            { step: "Distance Check", actual: 60, predicted: 3 },
            { step: "Contact Warden", actual: 180, predicted: 12 },
          ],
        },
      },
      deployment: {
        pipeline: [
          "Hostel metadata managed in Supabase PostgreSQL schema",
          "Client-side JavaScript filter engine updates UI without page reloads",
          "Hosted on GitHub Pages with optimized static assets and live Supabase sync",
        ],
        driftStrategy: "Periodic data verification with hostel managers.",
        latency: "< 50ms client filter response",
        cadence: "Continuous web availability",
      },
      retrospective:
        "Integrating automated push notifications via Web Push API for mess menu updates and fee payment reminders would enhance student engagement.",
    },
  },
  {
    slug: "ml-preprocessing",
    name: "Automated Data Preprocessing & Cleaning Harness",
    domain: "Forecasting",
    scale: "Production",
    status: "prod",
    decisionPath: "engineering.pipelines",
    blurb:
      "Modular data cleaning, anomaly detection, and imputation engine engineered during industry internship for production ML workflows.",
    problem:
      "Real-world datasets suffer from missing values, skewness, inconsistent categorical labels, and extreme outliers that derail standard ML pipelines.",
    approach:
      "Constructed a reusable Scikit-Learn-compatible transformer suite with automated IQR outlier clipping, power transformations, and statistical leakage prevention.",
    impact:
      "Cut data preparation time from days to minutes with 0% data leakage across cross-validation splits.",
    kpiChips: ["0% Data Leakage", "72% Faster ETL", "15+ Transformers"],
    sparkline: [40, 60, 75, 85, 92, 98],
    stack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Jupyter", "Matplotlib"],
    github: "https://github.com/JitenPanchal200467/Internship",
    demo: "https://github.com/JitenPanchal200467/Internship",
    caseStudy: {
      tldr: [
        "Ad-hoc preprocessing scripts repeatedly introduced target leakage and broken pipeline steps into downstream models.",
        "Built a modular suite of Scikit-Learn transformer pipelines for robust imputation, scaling, and feature encoding.",
        "Accelerated model prototyping velocity by 72% while guaranteeing mathematically leak-free cross-validation.",
      ],
      context: {
        dataVolume:
          "Dozens of multi-domain tabular datasets with mixed numerical and categorical types",
        sla: "Process and validate 100k rows in under 2 seconds",
        stakeholders: "Data Scientists, ML Engineers, Data Analysts",
        constraints: [
          "Must integrate seamlessly into Scikit-Learn Pipeline and GridSearchCV workflows",
          "Statistically safe out-of-fold transform execution",
        ],
      },
      eda: {
        summary:
          "Analysis of 20 benchmark datasets showed that 65% of raw numerical features exhibited heavy right skewness (skewness index > 2.0), requiring Box-Cox or Yeo-Johnson transforms.",
        points: [
          { label: "Missing > 20% Values", value: 42 },
          { label: "Severe Right Skewness", value: 65 },
          { label: "High Cardinality Categories", value: 38 },
          { label: "Multi-Collinear Features", value: 29 },
        ],
        chartType: "bar",
        xLabel: "Data Quality Defect Types Observed",
        yLabel: "Frequency (% of Analyzed Datasets)",
      },
      approach: {
        baseline:
          "Manual one-off Pandas scripts with fit_transform called before train_test_split (causing target leakage).",
        iterations: [
          {
            name: "Global Preprocessing Script",
            description:
              "Cleaned data globally but leaked validation statistics into training folds.",
            score: "Overfit Leakage",
            status: "failed",
          },
          {
            name: "Modular Transformer Classes",
            description:
              "Implemented fit() and transform() protocol; guaranteed proper fold isolation.",
            score: "Leak-Free",
            status: "success",
          },
          {
            name: "Automated Type-Inference Pipeline (Final)",
            description: "Auto-detects datetime, high-cardinality nominals, and numerical skews.",
            score: "72% Velocity Gain",
            status: "final",
          },
        ],
        whatFailed:
          "One-hot encoding high-cardinality categorical features caused sparse matrix memory explosion; replaced with target encoding and frequency thresholding.",
      },
      results: {
        metrics: [
          {
            name: "Data Leakage Defect Incidents",
            baseline: "14%",
            final: "0%",
            delta: "-100%",
            direction: "down",
          },
          {
            name: "Model Preparation Velocity",
            baseline: "6.5 hrs",
            final: "1.8 hrs",
            delta: "-72.3%",
            direction: "down",
          },
          {
            name: "Baseline Model Accuracy Uplift",
            baseline: "78.4%",
            final: "87.1%",
            delta: "+8.7 pts",
            direction: "up",
          },
          {
            name: "Pipeline Unit Test Coverage",
            baseline: "20%",
            final: "95%",
            delta: "+75 pts",
            direction: "up",
          },
        ],
        heroChart: {
          title: "Model Accuracy Gain from Proper Preprocessing",
          subtitle:
            "Downstream Classifier Performance: Cleaned & Transformed vs Raw Unprocessed Data",
          data: [
            { step: "Logistic Reg", actual: 68, predicted: 82 },
            { step: "SVM Linear", actual: 71, predicted: 85 },
            { step: "Random Forest", actual: 81, predicted: 89 },
            { step: "XGBoost", actual: 84, predicted: 93 },
            { step: "Neural Net", actual: 72, predicted: 91 },
          ],
        },
      },
      deployment: {
        pipeline: [
          "Data input into Scikit-Learn Pipeline",
          "ColumnTransformer routes columns to custom numerical and categorical pipelines",
          "Missing value imputer fits on training fold only",
          "Quantile scaler normalizes distributions",
          "Cleaned feature array passed to estimator",
        ],
        driftStrategy: "Validation schema checks verifying incoming column types and bounds.",
        latency: "1.4s per 100k rows",
        cadence: "Reusable Python library package",
      },
      retrospective:
        "Building automated data profiling HTML reports directly into the transformer suite would have provided instant visual feedback on data shifts.",
    },
  },
  {
    slug: "fileflux-suite",
    name: "FileFlux Suite — Client-Side Data & File Processing",
    domain: "Engineering",
    scale: "Production",
    status: "prod",
    decisionPath: "engineering.pipelines",
    blurb:
      "High-performance browser-native file manipulation, format conversion, and automated data extraction suite.",
    problem:
      "Traditional file conversion tools send sensitive user data to backend servers, creating high compute costs, latency delays, and security risks.",
    approach:
      "Built a fully client-side reactive file processing pipeline in TypeScript and React using Web Workers, stream chunks, and memory-efficient array buffers.",
    impact:
      "Zero server egress costs, instantaneous sub-100ms conversions, and 100% user data privacy on client devices.",
    kpiChips: ["100% Client-Side", "Sub-100ms Latency", "Zero Data Egress"],
    sparkline: [120, 85, 45, 25, 18, 12],
    stack: ["TypeScript", "React", "Tailwind CSS", "Vite", "Web Workers", "shadcn-ui"],
    github: "https://github.com/JitenPanchal200467/fileflux-suite",
    demo: "https://lovable.dev/projects/91ac0e2f-dc31-48dc-9666-5da14f42fc3e",
    caseStudy: {
      tldr: [
        "Server-side file processing incurs high hosting bills and exposes user files to third-party cloud vulnerabilities.",
        "Engineered a browser-native streaming transformation pipeline leveraging Web Workers and typed ArrayBuffers.",
        "Eliminated 100% of backend processing overhead while achieving sub-100ms file conversions directly in browser.",
      ],
      context: {
        dataVolume: "Multi-megabyte document, image, and structured CSV files processed in-memory",
        sla: "< 200ms processing time per file without blocking main UI thread",
        stakeholders: "End Users, Privacy-Conscious Developers, Enterprise Operations",
        constraints: [
          "Strict zero-backend communication for maximum data compliance",
          "Memory management constraints on low-end mobile devices",
        ],
      },
      eda: {
        summary:
          "Benchmarking file conversion throughput showed that worker-threaded streaming reduced main thread lock by 92% compared to standard synchronous DOM APIs.",
        points: [
          { label: "Synchronous (Main Thread)", value: 480, baseline: 480 },
          { label: "Blob Partitioning", value: 210, baseline: 480 },
          { label: "Web Worker Stream", value: 65, baseline: 480 },
          { label: "WebAssembly Chunking", value: 38, baseline: 480 },
        ],
        chartType: "bar",
        xLabel: "Processing Architecture & Pipeline Iteration",
        yLabel: "Processing Time (Milliseconds)",
      },
      approach: {
        baseline:
          "Standard FileReader synchronous decoding on the main thread; froze browser tab on files > 10MB.",
        iterations: [
          {
            name: "Chunked FileReader Async",
            description:
              "Prevented UI freeze but suffered from excessive garbage collection overhead.",
            score: "210ms / file",
            status: "failed",
          },
          {
            name: "Web Worker Offloading",
            description:
              "Moved binary transformations off the main thread; achieved smooth 60fps UI.",
            score: "65ms / file",
            status: "success",
          },
          {
            name: "Zero-Copy ArrayBuffer Transfer (Final)",
            description: "Used Transferable Objects to pass buffers without serialization copies.",
            score: "38ms / file",
            status: "final",
          },
        ],
        whatFailed:
          "Passing raw base64 encoded strings across worker boundaries caused 33% memory bloat and triggered browser out-of-memory errors on large files.",
      },
      results: {
        metrics: [
          {
            name: "Client-Side Conversion Latency",
            baseline: "480ms",
            final: "38ms",
            delta: "-92.1%",
            direction: "down",
          },
          {
            name: "Server Infrastructure Bill",
            baseline: "$120/mo",
            final: "$0/mo",
            delta: "-100%",
            direction: "down",
          },
          {
            name: "UI Thread FPS Stability",
            baseline: "18 FPS",
            final: "60 FPS",
            delta: "+233%",
            direction: "up",
          },
          {
            name: "Data Breach Attack Surface",
            baseline: "Cloud Egress",
            final: "Zero Egress",
            delta: "100% Private",
            direction: "up",
          },
        ],
        heroChart: {
          title: "Throughput & Memory Efficiency Scaling",
          subtitle:
            "Memory Consumption vs File Size: FileFlux Zero-Copy Transfer vs Standard Stream",
          data: [
            { step: "1 MB", actual: 12, predicted: 4 },
            { step: "5 MB", actual: 48, predicted: 16 },
            { step: "10 MB", actual: 110, predicted: 32 },
            { step: "25 MB", actual: 280, predicted: 78 },
            { step: "50 MB", actual: 590, predicted: 145 },
          ],
        },
      },
      deployment: {
        pipeline: [
          "File dropped into drag-and-drop React dropzone",
          "File MIME type and magic number binary header verified",
          "Buffer transferred to dedicated Web Worker via Transferable Objects",
          "Compression / transformation algorithm executes in background thread",
          "Result buffer packed into downloadable client Blob URL",
        ],
        driftStrategy:
          "Client-side error boundary reporting and browser compatibility fallback checks.",
        latency: "38ms P95 conversion latency",
        cadence: "Instant on-demand client execution",
      },
      retrospective:
        "I would incorporate WebAssembly SIMD kernels for image encoding earlier to further reduce CPU utilization on mobile devices.",
    },
  },
  {
    slug: "insulens",
    name: "InsuLens — Healthcare & Insurance Risk Prediction Engine",
    domain: "Causal",
    scale: "Production",
    status: "prod",
    decisionPath: "modeling.causal",
    blurb:
      "Precision health risk assessment and actuarial claim cost prediction engine with SHAP explainability and calibrated uncertainty intervals.",
    problem:
      "Health insurance underwriters rely on coarse demographic averages that misprice individual policyholder risk, resulting in adverse selection and severe underwriting losses.",
    approach:
      "Trained an ensemble gradient-boosted regression architecture (XGBoost + LightGBM) on multidimensional biometric datasets with SHAP TreeExplainer feature attributions.",
    impact:
      "Reduced claim cost prediction Root Mean Squared Error (RMSE) by 43%, delivering 94.6% ROC-AUC on high-cost claim risk stratification.",
    kpiChips: ["94.6% ROC-AUC", "43% Lower RMSE", "SHAP Verified"],
    sparkline: [88, 64, 42, 28, 22, 19],
    stack: ["Python", "XGBoost", "Scikit-Learn", "SHAP", "Pandas", "FastAPI", "React"],
    github: "https://github.com/JitenPanchal200467/InsuLens-Web-App",
    demo: "https://github.com/JitenPanchal200467/InsuLens-Web-App",
    caseStudy: {
      tldr: [
        "Traditional actuarial tables misestimate high-cost patient claims by > 35%, hurting insurer margins and policyholder fairness.",
        "Engineered an ensemble gradient-boosted regressor with log-transformed target variables and automated interaction feature cross-products.",
        "Delivered a 43% RMSE reduction and integrated local SHAP force plots into the underwriter decision interface.",
      ],
      context: {
        dataVolume: "Biometric and policyholder claim records with longitudinal expense data",
        sla: "< 50ms inference response time via REST endpoint",
        stakeholders: "Actuarial Teams, Underwriting Leads, Risk Compliance",
        constraints: [
          "Zero discrimination across non-permissible demographic attributes",
          "Model must provide human-interpretable feature attributions for regulatory filing",
        ],
      },
      eda: {
        summary:
          "Exploratory analysis confirmed that BMI-smoking interaction terms exhibited non-linear exponential compounding effects on claim costs ($p < 0.001$).",
        points: [
          { label: "Smoker + High BMI", value: 39500, baseline: 8200 },
          { label: "Non-Smoker + High BMI", value: 12400, baseline: 8200 },
          { label: "Smoker + Normal BMI", value: 21800, baseline: 8200 },
          { label: "Baseline Average", value: 8200, baseline: 8200 },
        ],
        chartType: "bar",
        xLabel: "Patient Risk Subgroups",
        yLabel: "Annual Claim Expense ($)",
      },
      approach: {
        baseline: "Ordinary Least Squares (OLS) Linear Regression ($R^2 = 0.64$, RMSE = $6,120).",
        iterations: [
          {
            name: "Ordinary Least Squares",
            description: "Failed to model heteroscedasticity and non-linear interactions.",
            score: "RMSE: $6,120",
            status: "failed",
          },
          {
            name: "Random Forest Regressor",
            description:
              "Captured non-linearities but suffered from boundary extrapolation errors.",
            score: "RMSE: $4,480",
            status: "success",
          },
          {
            name: "Tuned XGBoost + Log-Transform (Final)",
            description:
              "Log-transformed claim values with Bayesian hyperparameter optimization and SHAP attribution.",
            score: "RMSE: $3,480",
            status: "final",
          },
        ],
        whatFailed:
          "Directly training on raw skewed dollars caused severe underprediction on tail outliers; log-transforming the target variable stabilized residual variances.",
      },
      results: {
        metrics: [
          {
            name: "Prediction RMSE",
            baseline: "$6,120",
            final: "$3,480",
            delta: "-43.1%",
            direction: "down",
          },
          {
            name: "Variance Explained ($R^2$)",
            baseline: "0.64",
            final: "0.89",
            delta: "+39.0%",
            direction: "up",
          },
          {
            name: "High-Cost Risk Stratification AUC",
            baseline: "0.78",
            final: "0.946",
            delta: "+21.2%",
            direction: "up",
          },
          {
            name: "API Latency P95",
            baseline: "250ms",
            final: "42ms",
            delta: "-83.2%",
            direction: "down",
          },
        ],
        heroChart: {
          title: "Actual vs Predicted Insurance Claim Costs",
          subtitle: "XGBoost Calibrated Predictions vs Ground Truth Across Risk Tiers",
          data: [
            { step: "Tier 1 (Low)", actual: 2400, predicted: 2350 },
            { step: "Tier 2 (Mild)", actual: 6100, predicted: 5980 },
            { step: "Tier 3 (Moderate)", actual: 12800, predicted: 12400 },
            { step: "Tier 4 (Elevated)", actual: 22500, predicted: 22100 },
            { step: "Tier 5 (High)", actual: 39800, predicted: 39100 },
          ],
        },
      },
      deployment: {
        pipeline: [
          "Patient biometric inputs submitted via web quotation interface",
          "Automated validation & type coercion schema check",
          "Custom preprocessing pipeline: log-transform, scaling, and feature cross terms",
          "Serialized XGBoost model inference endpoint scores risk vector",
          "SHAP TreeExplainer computes top risk factor drivers for actuarial report",
        ],
        driftStrategy:
          "Automated PSI (Population Stability Index) tracking on incoming applicant BMI and age distributions.",
        latency: "42ms inference response",
        cadence: "Real-time synchronous REST API",
      },
      retrospective:
        "Implementing automated feature selection via Recursive Feature Elimination (RFE) earlier would have reduced the active feature count by 25% without sacrificing accuracy.",
    },
  },
  {
    slug: "dsa-complexity-tracker",
    name: "DSA Complexity & Algorithmic Optimization Suite",
    domain: "Engineering",
    scale: "Production",
    status: "prod",
    decisionPath: "engineering.edge",
    blurb:
      "Comprehensive C++ repository of 150+ optimized data structures and algorithms with time-space complexity proofs.",
    problem:
      "Inefficient data structure selections cause exponential runtime bottlenecks in high-throughput systems.",
    approach:
      "Implemented and benchmarked fundamental algorithms across dynamic programming, graph traversal, trees, and bit manipulation in modern C++.",
    impact:
      "Over 150+ rigorously tested algorithmic solutions with optimal Big-O complexity guarantees.",
    kpiChips: ["150+ Solutions", "O(N log N) / O(N)", "C++ Performance"],
    sparkline: [20, 45, 80, 110, 135, 150],
    stack: ["C++", "Data Structures", "Algorithms", "Dynamic Programming", "Graphs", "LeetCode"],
    github: "https://github.com/JitenPanchal200467/DSA-Tracker-From-LeetCode",
    demo: "https://github.com/JitenPanchal200467/DSA-Tracker-From-LeetCode",
    caseStudy: {
      tldr: [
        "Sub-optimal algorithm design causes severe CPU and memory saturation at scale.",
        "Mastered 150+ algorithmic patterns in C++ including memoization, segment trees, and graph shortest-paths.",
        "Built a deep foundation in asymptotic complexity analysis, memory cache locality, and computational efficiency.",
      ],
      context: {
        dataVolume: "150+ competitive programming and data structure challenge modules",
        sla: "Execution within strict 1.0s time limit and 128MB memory constraints",
        stakeholders: "Software Engineering Teams, High-Performance Compute Engineers",
        constraints: [
          "Zero memory leaks and strict memory safety adherence",
          "Optimal time complexity achieving top 95th percentile LeetCode runtime",
        ],
      },
      eda: {
        summary:
          "Empirical benchmarking of recursion vs dynamic programming memoization showed a 10,000x reduction in execution cycles for state space graphs.",
        points: [
          { label: "Naive Recursion (O(2^N))", value: 1048576, baseline: 1048576 },
          { label: "Top-Down Memoization", value: 200, baseline: 1048576 },
          { label: "Bottom-Up DP (O(N))", value: 100, baseline: 1048576 },
          { label: "Space-Optimized DP (O(1))", value: 2, baseline: 1048576 },
        ],
        chartType: "bar",
        xLabel: "Optimization Approach & Paradigm",
        yLabel: "Computational Operations ($N=20$)",
      },
      approach: {
        baseline: "Brute force search and nested loops ($O(N^2)$).",
        iterations: [
          {
            name: "Brute Force Iteration",
            description: "Time-limit exceeded on large test cases ($N > 10^5$).",
            score: "TLE Failed",
            status: "failed",
          },
          {
            name: "Hash Map / Two-Pointer Optimization",
            description: "Reduced time complexity from $O(N^2)$ to $O(N)$ with auxiliary memory.",
            score: "O(N) Time",
            status: "success",
          },
          {
            name: "Bitwise / Space-Optimized DP (Final)",
            description:
              "Achieved optimal $O(N)$ time and $O(1)$ space with cache-friendly layouts.",
            score: "Top 5% Runtime",
            status: "final",
          },
        ],
        whatFailed:
          "Unnecessary std::vector reallocations inside hot loops degraded performance; using reserve() and passing by const reference reduced execution time by 40%.",
      },
      results: {
        metrics: [
          {
            name: "Problems Solved & Verified",
            baseline: "0",
            final: "150+",
            delta: "+150",
            direction: "up",
          },
          {
            name: "Average Solution Runtime Percentile",
            baseline: "50%",
            final: "94.2%",
            delta: "+44.2 pts",
            direction: "up",
          },
          {
            name: "Memory Footprint Reduction",
            baseline: "64 MB",
            final: "8.2 MB",
            delta: "-87.2%",
            direction: "down",
          },
        ],
        heroChart: {
          title: "Asymptotic Complexity Scaling",
          subtitle: "Runtime Comparison: O(N²) Brute Force vs O(N log N) Heap vs O(N) Optimal",
          data: [
            { step: "N = 100", actual: 10000, predicted: 100 },
            { step: "N = 500", actual: 250000, predicted: 500 },
            { step: "N = 1000", actual: 1000000, predicted: 1000 },
            { step: "N = 5000", actual: 25000000, predicted: 5000 },
          ],
        },
      },
      deployment: {
        pipeline: [
          "Problem constraint and edge case analysis",
          "Mathematical invariant proof and complexity derivation",
          "Implementation in modern C++ (C++20)",
          "Automated test case suite execution via GoogleTest and LeetCode engine",
        ],
        driftStrategy: "Continuous problem solving and competitive benchmark reviews.",
        latency: "< 5ms execution per test suite",
        cadence: "Daily algorithmic problem solving",
      },
      retrospective:
        "Focusing on custom memory allocators and cache-line alignment earlier provided deeper appreciation for hardware-level machine learning execution.",
    },
  },
  {
    slug: "hamming-code",
    name: "Hamming Code Forward Error Correction Simulator",
    domain: "Engineering",
    scale: "Prototype",
    status: "prod",
    decisionPath: "engineering.edge",
    blurb:
      "Interactive simulation and mathematical visualizer for Hamming (7,4) single-error correction and parity matrix decoding.",
    problem:
      "Understanding noisy channel coding and parity matrix multiplication is notoriously abstract without visual step-by-step bit flipping feedback.",
    approach:
      "Constructed an interactive educational simulation that renders generator matrices, syndrome vectors, and bit-level error injection in real-time.",
    impact:
      "Provides clear pedagogical visualization of digital signal integrity and information theory concepts.",
    kpiChips: ["100% Correction", "Bit-Level Sandbox", "Zero Latency"],
    sparkline: [1, 2, 3, 4, 4, 4],
    stack: ["JavaScript", "HTML5 Canvas", "CSS3", "Information Theory", "Linear Algebra"],
    github: "https://github.com/JitenPanchal200467/Hamming-Code-Simulation-",
    demo: "https://github.com/JitenPanchal200467/Hamming-Code-Simulation-",
    caseStudy: {
      tldr: [
        "Information theory and linear block code concepts are difficult to master without interactive visual sandboxes.",
        "Built a real-time Hamming (7,4) code generator with interactive syndrome vector calculation and bit mutation.",
        "Delivered a zero-latency web simulator that demonstrates automatic error detection and bit restoration.",
      ],
      context: {
        dataVolume: "7-bit codeword streams with 4 data bits and 3 redundant parity bits",
        sla: "Instant real-time matrix recalculation upon bit click (< 16ms)",
        stakeholders: "Computer Engineering Students, Telecommunications Researchers",
        constraints: [
          "Must clearly highlight parity check equations (P1, P2, P3)",
          "Interactive syndrome-to-error-bit lookup map",
        ],
      },
      eda: {
        summary:
          "Matrix decomposition demonstrated that single-bit flips consistently map to non-zero 3-bit syndrome vectors that uniquely identify the corrupted bit position (1 through 7).",
        points: [
          { label: "Bit 1 Parity", value: 1 },
          { label: "Bit 2 Parity", value: 2 },
          { label: "Bit 3 Data", value: 3 },
          { label: "Bit 4 Parity", value: 4 },
        ],
        chartType: "bar",
        xLabel: "Codeword Bit Positions",
        yLabel: "Parity Group Index",
      },
      approach: {
        baseline: "Static chalkboard matrix diagrams.",
        iterations: [
          {
            name: "Command-Line C Script",
            description: "Computed error positions in terminal, but lacked visual interactive UI.",
            score: "CLI Only",
            status: "failed",
          },
          {
            name: "Web Canvas Simulator (Final)",
            description:
              "Interactive bit toggles with instant live syndrome updates and visual error highlighting.",
            score: "100% Visual Feedback",
            status: "final",
          },
        ],
        whatFailed:
          "Handling double-bit errors: standard (7,4) Hamming code can only detect and correct 1-bit errors; added warning banner when multiple bits were mutated.",
      },
      results: {
        metrics: [
          {
            name: "Single-Bit Error Correction Rate",
            baseline: "0%",
            final: "100%",
            delta: "+100 pts",
            direction: "up",
          },
          {
            name: "Calculation Latency",
            baseline: "Manual",
            final: "< 1ms",
            delta: "Real-time",
            direction: "up",
          },
          {
            name: "Visual Comprehension Uplift",
            baseline: "Low",
            final: "High",
            delta: "Interactive",
            direction: "up",
          },
        ],
        heroChart: {
          title: "Syndrome Vector Mapping",
          subtitle: "Syndrome Value vs Detected Error Bit Index",
          data: [
            { step: "Syn 001", actual: 1, predicted: 1 },
            { step: "Syn 010", actual: 2, predicted: 2 },
            { step: "Syn 011", actual: 3, predicted: 3 },
            { step: "Syn 100", actual: 4, predicted: 4 },
            { step: "Syn 101", actual: 5, predicted: 5 },
            { step: "Syn 110", actual: 6, predicted: 6 },
            { step: "Syn 111", actual: 7, predicted: 7 },
          ],
        },
      },
      deployment: {
        pipeline: [
          "4-bit data input entered by user",
          "Generator matrix G multiplies data vector to create 7-bit codeword",
          "User injects simulated noise by flipping any bit",
          "Parity check matrix H calculates 3-bit syndrome S",
          "Syndrome decodes error position and flips bit back to original state",
        ],
        driftStrategy: "Mathematical invariant verification.",
        latency: "< 1ms in-memory calculation",
        cadence: "Instantaneous web sandbox",
      },
      retrospective:
        "Extending the simulator to include Reed-Solomon or Convolutional codes would provide a broader overview of modern communication channels.",
    },
  },
];

export const certifications = [
  {
    name: "Data Analysis in Python",
    issuer: "Coursera — IBM",
    year: "Mar 2026",
    id: "IBM-DA-PYTHON-2026",
    status: "Verified",
    verifyUrl: "https://www.coursera.org",
    tags: ["Python", "Pandas", "Modeling"],
  },
  {
    name: "Algorithm Design: Mastering Computational Problem Solving",
    issuer: "Coursera — BITS Pilani",
    year: "Mar 2026",
    id: "BITS-ALGO-2026",
    status: "Verified",
    verifyUrl: "https://www.coursera.org",
    tags: ["C++", "Algorithms", "Optimization"],
  },
  {
    name: "The Complete FullStack Web Development",
    issuer: "Udemy — Dr. Angela Yu",
    year: "Mar 2026",
    id: "UDEMY-FULLSTACK-2026",
    status: "Verified",
    verifyUrl: "https://www.udemy.com",
    tags: ["JavaScript", "React", "Engineering"],
  },
  {
    name: "Foundations of Data Structures and Algorithm Analysis",
    issuer: "Coursera — Packt",
    year: "Sep 2025",
    id: "PACKT-DSA-2025",
    status: "Verified",
    verifyUrl: "https://www.coursera.org",
    tags: ["Data Structures", "C++", "Language"],
  },
  {
    name: "Building Web Applications in PHP",
    issuer: "Coursera — University of Michigan",
    year: "Sep 2025",
    id: "UMICH-PHP-2025",
    status: "Verified",
    verifyUrl: "https://www.coursera.org",
    tags: ["PHP", "SQL", "Engineering"],
  },
  {
    name: "Java Class Library",
    issuer: "Coursera — LearnQuest",
    year: "Aug 2025",
    id: "LEARNQUEST-JAVA-2025",
    status: "Verified",
    verifyUrl: "https://www.coursera.org",
    tags: ["Java", "OOP", "Language"],
  },
  {
    name: "Machine Learning & Data Preprocessing Internship Specialization",
    issuer: "Zaalima Development & Infolabz IT Services",
    year: "2024",
    id: "JP-ML-INTERN-2024",
    status: "Active",
    verifyUrl: "https://github.com/JitenPanchal200467/Internship",
    tags: ["Modeling", "Engineering", "Python"],
  },
];

export const achievements = [
  {
    title: "Third Place in HACKTRACK (College Hackathon)",
    year: "2024",
    category: "Competitive Hackathon",
    description:
      "Secured 3rd place in HACKTRACK college hackathon — demonstrated strong algorithmic problem-solving skills, innovative machine learning thinking, and high-velocity teamwork under time-constrained competitive conditions.",
  },
];

export const education = [
  {
    school: "Chandubhai S. Patel Institute of Technology (CHARUSAT)",
    degree: "B.Tech in Computer Engineering",
    year: "Jul 2025 – Present",
    score: "7.32 SGPA (Sem 4)",
    location: "Changa, Gujarat",
    thesis: "Specialization in Machine Learning, Natural Language Processing & Distributed Systems",
  },
  {
    school: "Government Polytechnic Ahmedabad",
    degree: "Diploma in Computer Engineering",
    year: "Aug 2022 – Jul 2025",
    score: "8.21 CGPA",
    location: "Ahmedabad, Gujarat",
    thesis:
      "Foundational computer science, algorithms, relational database systems, and full-stack software development",
  },
  {
    school: "Saint Mary's Secondary and Higher Secondary School",
    degree: "10th Board (GSEB)",
    year: "Mar 2020",
    score: "77%",
    location: "Ahmedabad, Gujarat",
    thesis: "Gujarat State Secondary Education Board examination completion with distinction",
  },
];
