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
    description: "Supported requirements, data readiness, user training, UAT, and rollout for DOSM, including a two-day expansion workshop and follow-up coaching.",
    categories: ["Requirements", "Training & UAT"],
    skills: ["Requirements", "Data readiness", "SME workshops", "Training", "UAT"],
    highlights: ["Go-live · June 2025", "FAT · July 2025", "Two-day workshop"], visual: "timeline",
  },
  {
    id: "oracle", client: "Public-sector health data programme",
    title: "Migrating a data warehouse schema to Oracle",
    description: "Adapted Doris and StarRocks schemas for vaccine forecasting into Oracle DDL, standardizing type mappings and documenting source inconsistencies for review.",
    categories: ["Data engineering"], skills: ["SQL", "Oracle", "Doris / StarRocks", "Data modelling"],
    highlights: ["Kuala Lumpur", "Labuan", "Putrajaya"], visual: "mapping",
  },
  {
    id: "enforcement", client: "Federal enforcement agency",
    title: "Turning SME knowledge into nine use cases",
    description: "Organized subject-matter expert input into a seven-column thematic framework and mapped nine use cases to make requirements and processes explicit.",
    categories: ["Requirements"], skills: ["SME workshops", "Thematic analysis", "Requirements", "Process mapping"],
    highlights: ["Seven-column framework", "Nine use cases"], visual: "matrix",
  },
  {
    id: "cidb", client: "CIDB Malaysia",
    title: "Profiling consultant performance in construction",
    description: "Prepared consultant records and built Tableau views to support consistent comparisons of consultant performance for the Construction Industry Development Board.",
    categories: ["Data engineering", "Dashboards"], skills: ["Tableau", "Data cleaning", "Statistics"],
    highlights: ["Consultant comparisons", "Performance profiling"], visual: "scatter",
  },
  {
    id: "esg", client: "MCIS Insurance Berhad · Internship",
    title: "ESG and climate risk analysis for an insurer",
    description: "Applied statistical methods to ESG and climate-risk questions during an insurance internship, supporting sustainability analysis.",
    categories: ["Analysis"], skills: ["Statistics", "ESG analysis"],
    highlights: ["ESG analysis", "Climate risk"], visual: "heat",
  },
];


