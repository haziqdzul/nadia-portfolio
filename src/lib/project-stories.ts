export type ProjectStory = Readonly<{
  problem: string;
  reasoning: string;
  solution: string;
  outcome: string;
  before: readonly string[];
  after: readonly string[];
}>;

// Editorial summaries of the existing portfolio facts, not invented impact metrics.
export const projectStories: Readonly<Record<string, ProjectStory>> = {
  statsdw: {
    problem: "A national statistics data warehouse needs more than a working platform. Requirements, data readiness, acceptance and user adoption all have to connect.",
    reasoning: "Treat delivery as a sequence of validation points: clarify requirements, prepare data, test with users, then support rollout and training.",
    solution: "Supported requirements and readiness work, a two-day expansion workshop, follow-up coaching, user training and acceptance activities.",
    outcome: "The delivery record includes UAT in March 2025, go-live in June and final acceptance testing in July. Nadia’s contribution spans requirements through adoption support.",
    before: ["Requirements", "Data readiness", "User questions", "Acceptance activities"],
    after: ["February · Training", "March · UAT", "April · PAT / TOT / TOK", "June · Go-live", "July · FAT"],
  },
  oracle: {
    problem: "Schemas written for Doris and StarRocks could not be carried into Oracle without reviewing types, identifiers and source inconsistencies.",
    reasoning: "Make each mapping explicit and keep unresolved source issues visible. Type compatibility needs review in the context of the target schema.",
    solution: "Adapted source schemas into Oracle DDL, standardized type mappings and documented source issues for review across Kuala Lumpur, Labuan and Putrajaya.",
    outcome: "Oracle-oriented schema definitions and documented mapping decisions formed the technical output. No deployment or performance improvement is claimed here.",
    before: ["Doris / StarRocks", "datetime", "double", "Source inconsistencies"],
    after: ["Oracle DDL", "DATE / TIMESTAMP · review precision", "NUMBER · review precision and scale", "Issues documented for review"],
  },
  enforcement: {
    problem: "Subject-matter expertise needed to become explicit, structured requirements that a delivery team could work with.",
    reasoning: "Organize expert input into a consistent thematic framework, then connect it to the processes and use cases it describes.",
    solution: "Structured SME input in a seven-column framework and mapped nine use cases for a federal enforcement agency.",
    outcome: "Nine mapped use cases and the structured framework made the requirements and processes explicit. Confidential workshop content is not reproduced.",
    before: ["Expert observations", "Business rules", "Process context", "Open questions"],
    after: ["Seven-column framework", "Consistent thematic grouping", "Nine mapped use cases", "Explicit requirements"],
  },
  cidb: {
    problem: "Consultant performance records needed preparation before they could support consistent comparison.",
    reasoning: "Start with the quality and structure of the records, then design views that help users compare consultant profiles.",
    solution: "Prepared consultant data and built Tableau views for performance profiling at CIDB Malaysia.",
    outcome: "The work produced Tableau views supporting consultant comparison. The visual here is schematic; it contains no actual scores or client records.",
    before: ["Consultant records", "Data preparation needs", "Individual profiles"],
    after: ["Prepared comparison data", "Tableau performance views", "Comparable consultant profiles"],
  },
  esg: {
    problem: "ESG and climate-risk questions required statistical analysis in an insurance context.",
    reasoning: "Use statistical methods to examine sustainability questions while keeping analytical interpretation connected to the business context.",
    solution: "Applied statistics to ESG and climate-risk analysis during the MCIS Insurance Berhad internship.",
    outcome: "Contributed analysis to sustainability work. Specific findings and confidential insurer data are not published in this portfolio.",
    before: ["ESG questions", "Climate-risk context", "Statistical inputs"],
    after: ["Statistical analysis", "Contextual interpretation", "Sustainability analysis support"],
  },
};
