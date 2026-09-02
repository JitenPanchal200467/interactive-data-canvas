# Jiten Panchal — Data Science & Machine Learning Portfolio

An interactive, production-grade web application and data science portfolio designed to showcase end-to-end machine learning pipelines, transformer fine-tuning (CUAD RoBERTa, spaCy NER, RAG), data engineering harnesses, and algorithmic depth.

---

## 🚀 Key Features

- **3D Interactive Data Manifold**: Real-time particle lattice and floating interactive nodes built with Three.js & React Three Fiber.
- **Decision-Tree Problem Navigator**: Interactive classification engine that lets recruiters and engineers filter production case studies by business domain, latency constraints, and algorithmic depth.
- **Dynamic Skill Matrix**: Dual-view matrix featuring a **Structured Production Matrix** with mastery meters and direct links to official documentation, plus an auto-scaled **2D Dispersion Map**.
- **Interactive & Embedded PDF Resume**: Dedicated `/resume` route featuring interactive section breakdowns and an embedded dual-mode PDF viewer with direct download actions.
- **Python / DuckDB REPL Terminal Easter Egg**: Integrated terminal modal (toggleable via `~` or ` ` ` key) allowing users to run SQL queries (`SELECT * FROM experience;`) and CLI commands.
- **Global Command Palette (`⌘K`)**: Fast fuzzy-search navigation across case studies, skills, certifications, and career milestones.
- **Custom Reactive Magnetic Cursor**: Physics-eased trailing aura with dynamic hover state transformations.
- **Responsive & Accessible**: Optimized for all viewports from 320px mobile to 4K ultra-wide displays with custom sleek dark-mode scrollbars.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (Full-stack React with SSR & Nitro)
- **Routing**: [TanStack Router](https://tanstack.com/router) (Type-safe file-based routing)
- **State & Data**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **3D & Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Components & Icons**: Radix UI primitives + Lucide React
- **Build Tool**: [Vite](https://vitejs.dev/)

---

## 📁 Project Structure

```text
interactive-data-canvas/
├── public/                     # Static assets & public files
│   ├── favicon.svg             # Vector theme favicon
│   ├── favicon.ico             # Fallback ICO icon
│   ├── resume.pdf              # High-fidelity resume PDF
│   └── robots.txt              # SEO crawling rules
├── src/
│   ├── components/             # Reusable UI & Interactive features
│   │   ├── command-palette.tsx # ⌘K command palette modal
│   │   ├── custom-cursor.tsx   # Hardware-accelerated custom cursor
│   │   ├── decision-tree-filter.tsx # Interactive decision tree
│   │   ├── hero-canvas.tsx     # Lazy-loaded 3D hero wrapper
│   │   ├── hero-field.tsx      # Three.js particle canvas
│   │   ├── reveal.tsx          # Scroll reveal transition component
│   │   ├── site-shell.tsx      # Global layout, header & navigation
│   │   ├── skill-matrix.tsx    # Dual-mode skill matrix
│   │   ├── terminal-easter-egg.tsx # REPL & SQL terminal modal
│   │   └── ui/                 # Accessible Radix UI components
│   ├── data/
│   │   └── portfolio.ts        # Single source of truth (Projects, Skills, Experience)
│   ├── routes/                 # File-based TanStack Router pages
│   │   ├── __root.tsx          # Root HTML layout and metadata
│   │   ├── index.tsx           # Homepage & 3D hero
│   │   ├── about.tsx           # Engineering philosophy & background
│   │   ├── experience.tsx      # Internship & career timeline
│   │   ├── projects.tsx        # Case studies gallery & filter tree
│   │   ├── projects.$slug.tsx  # In-depth architectural case studies
│   │   ├── certifications.tsx  # Verified credentials & courses
│   │   ├── resume.tsx          # Dual-view interactive resume page
│   │   └── contact.tsx         # Contact form & social channels
│   ├── router.tsx              # Router instance definition
│   └── styles.css              # Tailwind v4 theme, fonts, custom scrollbars
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 Local Development

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or bun

### Setup & Run

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/jiten-panchal-portfolio.git
cd jiten-panchal-portfolio/interactive-data-canvas

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:8080` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Deployment

The project is optimized for instant deployment on **Vercel**, **Cloudflare Pages**, or **Netlify**:

- **Vercel**: Import repository $\rightarrow$ set Root Directory to `interactive-data-canvas` $\rightarrow$ output directory `.output/public` $\rightarrow$ Deploy.
- **Cloudflare Pages**: Connect Git $\rightarrow$ build command `npm run build` $\rightarrow$ build output directory `.output/public`.

---

## 👤 Author

**Jiten Panchal**  
_Data Scientist & Machine Learning Engineer_

- 📍 Ahmedabad, Gujarat, India
- 📧 [jitenpanchal.ce@gmail.com](mailto:jitenpanchal.ce@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/jiten-panchal-096bb82a8)
- 🐙 [GitHub](https://github.com/JitenPanchal200467)
