type AnalystContext = Readonly<{
  id: string;
  title: string;
  category: string;
  domain: string;
  metric: string;
  metricContext: string;
  stack: readonly string[];
  decision: string;
}>;

export type AnalystExample = AnalystContext & (
  | { kind: "dashboard"; src: string }
  | { kind: "model"; src: string; alt: string }
  | { kind: "sql"; code: string }
);

export const analystExamples: readonly AnalystExample[] = [
  {
    id: "revenue", kind: "dashboard", category: "Storytelling",
    title: "Revenue is not the whole story", domain: "Revenue optimization",
    metric: "25% margin", metricContext: "Synthetic all-region baseline: $40k gross profit ÷ $160k net revenue. Change the region to investigate the mix.",
    stack: ["Metric design", "Dashboard UX", "JavaScript"],
    decision: "Compare revenue with gross margin before allocating sales effort. A high-revenue region may contribute less profit; the region filter exposes that trade-off.",
    src: "/labs/revenue-dashboard.html",
  },
  {
    id: "model", kind: "model", category: "Metric definition",
    title: "One grain. Consistent measures.", domain: "Trusted commercial reporting",
    metric: "1 row / order line", metricContext: "Explicit fact-table grain, with three dimensions. Structural design measure; no client ROI is claimed.",
    stack: ["Dimensional modelling", "Data contracts", "SQL"],
    decision: "Define net revenue once at order-line grain, then aggregate by date, region, or product. Shared definitions keep Finance and Sales from comparing incompatible totals.",
    src: "/labs/commercial-model.svg", alt: "Star schema: fact_order_line connects many-to-one to dim_date, dim_region and dim_product. The fact holds quantity, net revenue and cost; gross margin is derived from sums.",
  },
  {
    id: "sql", kind: "sql", category: "Performance tuning",
    title: "Aggregate once. Explain the change.", domain: "Reporting efficiency",
    metric: "3 → 1 scan paths", metricContext: "Illustrative query-design comparison: three repeated source aggregations consolidated into one. Actual scans and speed require EXPLAIN ANALYZE on your engine and data.",
    stack: ["PostgreSQL", "CTEs", "Window functions"],
    decision: "Compare monthly revenue and prior-month movement in one result set. Filter before aggregation, then calculate the trend over the smaller result. Benchmark before claiming a speed improvement.",
    code: `-- Synthetic reporting pattern; not a measured client optimization.
-- Bind :start_month to a month boundary, including one prior month.
WITH monthly AS (
  SELECT
    date_trunc('month', ordered_at) AS month,
    SUM(net_revenue) AS revenue,
    SUM(net_revenue - cost) AS profit
  FROM fact_order_line
  WHERE ordered_at >= :start_month
    AND ordered_at < :end_month
  GROUP BY 1
), trend AS (
  SELECT *,
    LAG(revenue) OVER (ORDER BY month) AS previous_revenue
  FROM monthly
)
SELECT month, revenue, profit,
  ROUND(100.0 * profit / NULLIF(revenue, 0), 1) AS margin_pct,
  ROUND(100.0 * (revenue - previous_revenue)
    / NULLIF(previous_revenue, 0), 1) AS revenue_change_pct
FROM trend
ORDER BY month;

-- LAG compares returned months. Use a calendar spine when
-- months without orders must appear in the comparison.
-- Validate totals, null/zero handling, execution plans,
-- buffers and timings before/after on the same workload.`,
  },
];
