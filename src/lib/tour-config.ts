// Tour step configuration for the guided presentation walkthrough
// Each step targets an element via data-tour attribute and shows a contextual hint

export interface TourStep {
  id: string;
  target: string; // Value of data-tour attribute on the target element
  message: string;
  route: string | null; // Route this step applies to, null = any
  position: "top" | "bottom" | "left" | "right";
}

export const TOUR_STEPS: TourStep[] = [
  // ── Dashboard ──────────────────────────────────────────────
  {
    id: "dashboard-kpis",
    target: "dashboard-kpis",
    message:
      "Key metrics at a glance — delivery fee, orders, GMV, average food value, and conversion rate.",
    route: "/",
    position: "bottom",
  },
  {
    id: "dashboard-date-range",
    target: "dashboard-date-range",
    message:
      "Filter all dashboard data by date range — pick presets or a custom range.",
    route: "/",
    position: "left",
  },
  {
    id: "dashboard-charts",
    target: "dashboard-charts",
    message:
      "Six analytical views — order trends, delivery fees, city performance, and vertical breakdown.",
    route: "/",
    position: "top",
  },
  {
    id: "nav-experiments",
    target: "nav-experiments",
    message: "Navigate to Experiments to explore the experimentation platform.",
    route: "/",
    position: "right",
  },

  // ── Experiments List ───────────────────────────────────────
  {
    id: "experiments-table",
    target: "experiments-table",
    message:
      "All experiments with status, type, statistical significance, and measured lift.",
    route: "/experiments",
    position: "top",
  },
  {
    id: "experiments-filters",
    target: "experiments-filters",
    message:
      "Search by name, and use quick filters for near-significant or winning experiments.",
    route: "/experiments",
    position: "bottom",
  },
  {
    id: "experiments-create",
    target: "experiments-create",
    message:
      "Open the experiment builder to see the full configuration flow.",
    route: "/experiments",
    position: "left",
  },

  // ── Experiment Form ────────────────────────────────────────
  {
    id: "form-left-panel",
    target: "form-left-panel",
    message:
      "Experiment details — name, hypothesis, objective, type, zones, verticals, and traffic split.",
    route: "/experiments",
    position: "right",
  },
  {
    id: "form-type",
    target: "form-type",
    message:
      "A/B tests split traffic between variations. Switchback alternates over time windows.",
    route: "/experiments",
    position: "right",
  },
  {
    id: "form-target-groups",
    target: "form-target-groups",
    message:
      "Target groups combine vendor filters, conditions, and pricing components. Add or import them.",
    route: "/experiments",
    position: "bottom",
  },
  {
    id: "form-vendor-filters",
    target: "form-vendor-filters",
    message:
      "Granular vendor filtering — select field, condition, and values. Drag to reorder priority.",
    route: "/experiments",
    position: "right",
  },
  {
    id: "form-components",
    target: "form-components",
    message:
      "Configure pricing levers for each variation. Click the eye icon for tier details.",
    route: "/experiments",
    position: "right",
  },
  {
    id: "form-conditions",
    target: "form-conditions",
    message:
      "Time-based, customer type, and location conditions refine when experiments apply.",
    route: "/experiments",
    position: "right",
  },
];
