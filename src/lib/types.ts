// Type definitions for DPS Dashboard

export type ExperimentStatus = "running" | "completed" | "draft";
export type ExperimentType = "ab" | "switchback";

export interface Experiment {
  id: number;
  name: string;
  status: ExperimentStatus;
  type: ExperimentType;
  targetGroups: number;
  variations: number;
  createdOn: string;
  createdBy: string;
  email: string;
  region: string;
  city: string;
  // New fields for enhanced dashboard
  objective: string;
  primaryMetric: string;
  startedOn?: string;
  endedOn?: string;
  daysRunning?: number;
  significance?: number; // 0-100 percentage
  lift?: number; // percentage change (can be negative)
}

export interface Campaign {
  id: string;
  name: string;
  timeLeft: string;
  budgetLeft: string | null;
  status: "active" | "paused" | "completed";
}

export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  change: number;
  changeType: "positive" | "negative" | "neutral";
  prefix?: string;
  suffix?: string;
  format: "currency" | "currency_whole" | "number" | "percentage";
}

export interface TargetGroup {
  id: string;
  priority: number;
  vendorFilters: VendorFilter[];
  conditions: Condition[];
  components: ComponentConfig[];
}

export interface VendorFilter {
  id: string;
  field: string;
  clause: "is" | "is_not" | "contains" | "starts_with";
  values: string[];
}

export interface Condition {
  id: string;
  type: string;
  operator: string;
  value: string;
}

export interface ComponentConfig {
  type: string;
  control: string;
  variations: VariationValue[];
}

export interface VariationValue {
  id: string;
  name: string;
  value: string;
  isSameAsControl: boolean;
}

export interface PricingComponent {
  id: string;
  name: string;
  type: string;
  value: string;
  description: string;
}

// Form state for creating/editing experiments
export interface ExperimentFormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  targetGroups: TargetGroup[];
  importedAssignment: string | null;
}

// Dashboard filter state
export interface DashboardFilters {
  duration: string;
  comparison: string;
  city: string;
  zone: string;
  verticalType: string;
  vendorChain: string;
}

// Table column definition
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

// Pagination state
export interface PaginationState {
  page: number;
  rowsPerPage: number;
  total: number;
}

// Sort state
export interface SortState {
  column: string | null;
  direction: "asc" | "desc";
}
