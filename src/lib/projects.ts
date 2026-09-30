export const categories = ["All", "Requirements", "Data engineering", "Dashboards", "Training & UAT", "Analysis"] as const;
export type Category = (typeof categories)[number];
export const skillGroups = [
  { title: "Business analysis", skills: ["Requirements", "SME workshops", "Process mapping", "Thematic analysis"] },
  { title: "Data", skills: ["SQL", "Oracle", "Doris / StarRocks", "Data modelling", "Data cleaning", "Data readiness"] },
  { title: "Visualisation", skills: ["Tableau", "Power BI"] },
  { title: "Delivery", skills: ["UAT", "Training", "Statistics", "ESG analysis"] },
] as const;
export type Skill = (typeof skillGroups)[number]["skills"][number];
export type Visual = "timeline" | "mapping" | "matrix" | "scatter" | "heat";
export type ReportProject = Readonly<{
  id: string;
  client: string;
  title: string;
  description: string;
  categories: readonly Exclude<Category, "All">[];
  skills: readonly Skill[];
  highlights: readonly string[];
  visual: Visual;
}>;

// Project facts supplied by the linked reference. Visual samples are illustrative.
export const reportProjects: readonly ReportProject[] = [
  {
    id: "statsdw", client: "Department of Statistics Malaysia · STATSDW",
    title: "Rolling out a national statistics data warehouse",
    description: "Contributed to STATSDW delivery through the June 2025 go-live and July final acceptance testing milestones by supporting requirements, data readiness, user training, and acceptance activities, including a two-day expansion workshop and follow-up coaching.",
    categories: ["Requirements", "Training & UAT"],
    skills: ["Requirements", "Data readiness", "SME workshops", "Training", "UAT"],
    highlights: ["Go-live · June 2025", "FAT · July 2025", "Two-day workshop"], visual: "timeline",
  },
  {
    id: "oracle", client: "Public-sector health data programme",
    title: "Migrating a data warehouse schema to Oracle",
    description: "Produced Oracle-oriented schema definitions for vaccine-forecasting data across Kuala Lumpur, Labuan, and Putrajaya by adapting Doris/StarRocks types and documenting source inconsistencies for review.",
    categories: ["Data engineering"], skills: ["SQL", "Oracle", "Doris / StarRocks", "Data modelling"],
    highlights: ["Kuala Lumpur", "Labuan", "Putrajaya"], visual: "mapping",
  },
  {
    id: "enforcement", client: "Federal enforcement agency",
    title: "Turning SME knowledge into nine use cases",
    description: "Produced a structured requirements framework covering nine use cases by organizing SME input into a seven-column thematic model and mapping the associated processes.",
    categories: ["Requirements"], skills: ["SME workshops", "Thematic analysis", "Requirements", "Process mapping"],
    highlights: ["Seven-column framework", "Nine use cases"], visual: "matrix",
  },
  {
    id: "cidb", client: "CIDB Malaysia",
    title: "Profiling consultant performance in construction",
    description: "Built Tableau views for consultant performance comparison at CIDB Malaysia by preparing consultant records and structuring the data for consistent profiling.",
    categories: ["Data engineering", "Dashboards"], skills: ["Tableau", "Data cleaning", "Statistics"],
    highlights: ["Consultant comparisons", "Performance profiling"], visual: "scatter",
  },
  {
    id: "esg", client: "MCIS Insurance Berhad · Internship",
    title: "ESG and climate risk analysis for an insurer",
    description: "Contributed statistical analysis to ESG and climate-risk questions at MCIS Insurance Berhad, connecting quantitative work to sustainability analysis during an insurance internship.",
    categories: ["Analysis"], skills: ["Statistics", "ESG analysis"],
    highlights: ["ESG analysis", "Climate risk"], visual: "heat",
  },
];


