// Design tokens and constants for DPS Dashboard

// Navigation items
export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", id: "dashboard" },
  { label: "Components", href: "/components", id: "components" },
  { label: "Price Rules", href: "/price-rules", id: "price-rules" },
  { label: "Campaigns", href: "/campaigns", id: "campaigns" },
  { label: "Experiments", href: "/experiments", id: "experiments" },
  { label: "Subscriptions", href: "/subscriptions", id: "subscriptions" },
  { label: "Vendors", href: "/vendors", id: "vendors" },
] as const;

// Filter options
export const DURATION_OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "1m", label: "Last 1 month" },
  { value: "3m", label: "Last 3 months" },
  { value: "6m", label: "Last 6 months" },
  { value: "1y", label: "Last 1 year" },
] as const;

export const COMPARISON_OPTIONS = [
  { value: "percentage", label: "Percentage" },
  { value: "absolute", label: "Absolute" },
] as const;

// Experiment statuses
export const EXPERIMENT_STATUS = {
  ENABLED: "enabled",
  DISABLED: "disabled",
  DRAFT: "draft",
  COMPLETED: "completed",
} as const;

// Status colors (for badges) - Using Subframe semantic colors
export const STATUS_COLORS = {
  enabled: "bg-success-50 text-success-700 border-success-200",
  disabled: "bg-neutral-100 text-neutral-600 border-neutral-200",
  draft: "bg-warning-50 text-warning-700 border-warning-200",
  completed: "bg-brand-50 text-brand-700 border-brand-200",
} as const;

// KPI metric types
export const KPI_METRICS = {
  DELIVERY_FEE: "delivery_fee",
  TOTAL_ORDERS: "total_orders",
  GMV: "gmv",
  AFV: "afv",
  CVR: "cvr",
} as const;

// Component types for pricing
export const COMPONENT_TYPES = [
  { value: "delivery_fee", label: "Delivery Fee" },
  { value: "minimum_order_value", label: "Minimum Order Value" },
  { value: "service_fee", label: "Service Fee" },
  { value: "small_order_fee", label: "Small Order Fee" },
  { value: "surge_fee", label: "Surge Fee" },
] as const;

// Animation variants for Framer Motion
export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

export const SLIDE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
} as const;

export const SLIDE_IN_RIGHT = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
} as const;

export const STAGGER_CHILDREN = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
} as const;

// Table pagination
export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;
export const DEFAULT_ROWS_PER_PAGE = 10;

// Regions/Countries
export const REGIONS = [
  { value: "all", label: "All" },
  { value: "germany", label: "Germany" },
  { value: "sweden", label: "Sweden" },
  { value: "argentina", label: "Argentina" },
  { value: "singapore", label: "Singapore" },
  { value: "uk", label: "United Kingdom" },
] as const;

// Cities (for filtering)
export const CITIES = [
  { value: "all", label: "All" },
  { value: "berlin", label: "Berlin" },
  { value: "stockholm", label: "Stockholm" },
  { value: "london", label: "London" },
  { value: "buenos_aires", label: "Buenos Aires" },
] as const;

// Vendor chains
export const VENDOR_CHAINS = [
  { value: "all", label: "All" },
  { value: "mcdonalds", label: "McDonald's" },
  { value: "burger_king", label: "Burger King" },
  { value: "kfc", label: "KFC" },
  { value: "subway", label: "Subway" },
  { value: "dominos", label: "Domino's" },
  { value: "starbucks", label: "Starbucks" },
] as const;

// Vertical types
export const VERTICAL_TYPES = [
  { value: "all", label: "All" },
  { value: "restaurants", label: "Restaurants" },
  { value: "grocery", label: "Grocery" },
  { value: "convenience", label: "Convenience" },
  { value: "pharmacy", label: "Pharmacy" },
] as const;
