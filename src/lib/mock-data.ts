// Mock data for DPS Dashboard prototype

import type {
  Experiment,
  Campaign,
  KPIMetric,
  PricingComponent,
  TargetGroup,
} from "./types";

// KPI Metrics for Dashboard
export const kpiMetrics: KPIMetric[] = [
  {
    id: "delivery_fee",
    label: "Average Delivery Fee",
    value: 2.26,
    change: 0.48,
    changeType: "positive",
    prefix: "EUR",
    format: "currency",
  },
  {
    id: "total_orders",
    label: "Total Orders",
    value: 62154,
    change: -2.2,
    changeType: "negative",
    format: "number",
  },
  {
    id: "gmv",
    label: "Gross Merchandise Value (GMV)",
    value: 200638,
    change: 0.48,
    changeType: "positive",
    prefix: "EUR",
    format: "currency",
  },
  {
    id: "afv",
    label: "Average Food Value (AFV)",
    value: 14.06,
    change: -0.06,
    changeType: "negative",
    prefix: "EUR",
    format: "currency",
  },
  {
    id: "cvr",
    label: "Conversion Rate (CVR)",
    value: 60.81,
    change: 1.32,
    changeType: "positive",
    suffix: "%",
    format: "percentage",
  },
];

// Active Experiments for Dashboard
export const activeExperiments: {
  id: string;
  name: string;
  activeDuration: string;
  significance: string;
}[] = [
  {
    id: "AR_20240406_R_B0_O_ElasticityCaba",
    name: "AR_20240406_R_B0_O_ElasticityCaba",
    activeDuration: "28 days",
    significance: "25%",
  },
  {
    id: "AR_20240405_L_D0_P_MOVKiosks",
    name: "AR_20240405_L_D0_P_MOVKiosks",
    activeDuration: "16 days",
    significance: "25%",
  },
  {
    id: "AR_20240306_D_G0_O_BV_SanMiguel",
    name: "AR_20240306_D_G0_O_BV_SanMiguel",
    activeDuration: "9 days",
    significance: "25%",
  },
  {
    id: "CL_20240131_Z_Z0_O_SBF_Tucuman",
    name: "CL_20240131_Z_Z0_O_SBF_Tucuman",
    activeDuration: "5 days",
    significance: "25%",
  },
];

// Active Campaigns for Dashboard
export const activeCampaigns: Campaign[] = [
  {
    id: "PY_DFS0_MOV3499_DRINKS_DMT",
    name: "PY - DFS0/MOV3499 - DRINKS DMT",
    timeLeft: "28 days",
    budgetLeft: "3%",
    status: "active",
  },
  {
    id: "PY_DFS0_MOV2499_ESPECIAL_FIESTAS",
    name: "PY - DFS0/MOV2499 - ESPECIAL FIESTAS",
    timeLeft: "16 days",
    budgetLeft: null,
    status: "active",
  },
  {
    id: "PY_DFS0_DBMOV1299_2499_SBX",
    name: "PY - DFS0/DBMOV1299 a 2499 - SBX",
    timeLeft: "9 days",
    budgetLeft: "28%",
    status: "active",
  },
  {
    id: "PY_DFS0_DBMOV1499_1999_REST_AMBA",
    name: "PY - DFS0/DBMOV1499 a 1999 - REST AMBA",
    timeLeft: "5 days",
    budgetLeft: null,
    status: "active",
  },
];

// Experiments list for Experiments page
export const experiments: Experiment[] = [
  {
    id: 207,
    name: "Experiment Name 1",
    status: "enabled",
    alreadyStarted: true,
    targetGroups: 2,
    variations: 2,
    createdOn: "02.08.2023",
    createdBy: "tupac.shakur",
    email: "tupac.shakur@deliveryhero.com",
    region: "Germany",
    city: "Berlin",
  },
  {
    id: 392,
    name: "Experiment Name 2",
    status: "enabled",
    alreadyStarted: true,
    targetGroups: 1,
    variations: 1,
    createdOn: "02.08.2023",
    createdBy: "eric.clapton",
    email: "eric.clapton@foodpanda.sg",
    region: "Singapore",
    city: "Singapore",
  },
  {
    id: 1596,
    name: "MOV Surge Test",
    status: "disabled",
    alreadyStarted: false,
    targetGroups: 2,
    variations: 2,
    createdOn: "02.08.2023",
    createdBy: "tupac.shakur",
    email: "tupac.shakur@deliveryhero.com",
    region: "Germany",
    city: "Berlin",
  },
  {
    id: 903,
    name: "Experiment Name 4",
    status: "disabled",
    alreadyStarted: false,
    targetGroups: 1,
    variations: 1,
    createdOn: "02.08.2023",
    createdBy: "rekha.bhardwaj",
    email: "rekha.bhardwaj@foodpanda.sg",
    region: "Singapore",
    city: "Singapore",
  },
  {
    id: 873,
    name: "Experiment Name 5",
    status: "disabled",
    alreadyStarted: true,
    targetGroups: 6,
    variations: 6,
    createdOn: "02.08.2023",
    createdBy: "rekha.bhardwaj",
    email: "rekha.bhardwaj@foodpanda.sg",
    region: "Singapore",
    city: "Singapore",
  },
  {
    id: 267,
    name: "Experiment Name 6",
    status: "disabled",
    alreadyStarted: false,
    targetGroups: 6,
    variations: 6,
    createdOn: "02.08.2023",
    createdBy: "rekha.bhardwaj",
    email: "rekha.bhardwaj@foodpanda.sg",
    region: "Singapore",
    city: "Singapore",
  },
  {
    id: 1823,
    name: "Experiment Name 7",
    status: "disabled",
    alreadyStarted: false,
    targetGroups: 7,
    variations: 7,
    createdOn: "02.08.2023",
    createdBy: "tupac.shakur",
    email: "tupac.shakur@deliveryhero.com",
    region: "Germany",
    city: "Munich",
  },
  {
    id: 632,
    name: "Experiment Name 8",
    status: "disabled",
    alreadyStarted: true,
    targetGroups: 11,
    variations: 11,
    createdOn: "02.08.2023",
    createdBy: "tupac.shakur",
    email: "tupac.shakur@deliveryhero.com",
    region: "Germany",
    city: "Hamburg",
  },
  {
    id: 890,
    name: "Experiment Name 9",
    status: "disabled",
    alreadyStarted: false,
    targetGroups: 2,
    variations: 2,
    createdOn: "02.08.2023",
    createdBy: "eric.clapton",
    email: "eric.clapton@foodpanda.sg",
    region: "Singapore",
    city: "Singapore",
  },
  {
    id: 452,
    name: "Experiment Name 10",
    status: "disabled",
    alreadyStarted: true,
    targetGroups: 2,
    variations: 2,
    createdOn: "02.08.2023",
    createdBy: "eric.clapton",
    email: "eric.clapton@foodpanda.sg",
    region: "Singapore",
    city: "Singapore",
  },
];

// Pricing components for dropdowns
export const pricingComponents: PricingComponent[] = [
  {
    id: "df_london_258",
    name: "McDonalds - London - 2,5,8",
    type: "delivery_fee",
    value: "Distance based: 2€, 5€, 8€",
    description: "Distance-based delivery fee for McDonalds in London area",
  },
  {
    id: "mov_london_12",
    name: "McDonalds - London - 12",
    type: "minimum_order_value",
    value: "12€",
    description: "Minimum order value of 12€",
  },
  {
    id: "mov_london_11",
    name: "McDonalds - London - 11",
    type: "minimum_order_value",
    value: "11€",
    description: "Minimum order value of 11€",
  },
  {
    id: "mov_london_10",
    name: "McDonalds - London - 10",
    type: "minimum_order_value",
    value: "10€",
    description: "Minimum order value of 10€",
  },
  {
    id: "sf_central_london",
    name: "central-london-sf",
    type: "service_fee",
    value: "2% of basket value",
    description: "Service fee for central London area",
  },
  {
    id: "sf_greater_london",
    name: "greater-london-sf",
    type: "service_fee",
    value: "1.5% of basket value",
    description: "Service fee for greater London area",
  },
];

// Automatic assignments for import dropdown
export const automaticAssignments = [
  {
    id: "aa_mcdonalds_berlin",
    name: "McDonalds Berlin - Standard Pricing",
    targetGroups: 3,
    description: "Standard pricing for all McDonalds in Berlin",
  },
  {
    id: "aa_mcdonalds_london",
    name: "McDonalds London - Premium Pricing",
    targetGroups: 2,
    description: "Premium pricing for McDonalds in central London",
  },
  {
    id: "aa_kfc_germany",
    name: "KFC Germany - National Pricing",
    targetGroups: 5,
    description: "National pricing scheme for KFC across Germany",
  },
  {
    id: "aa_burger_king_uk",
    name: "Burger King UK - Regional Pricing",
    targetGroups: 4,
    description: "Regional pricing variations for Burger King UK",
  },
];

// Sample target group for experiment form
export const sampleTargetGroup: TargetGroup = {
  id: "tg_1",
  priority: 1,
  vendorFilters: [
    {
      id: "vf_1",
      field: "Chain Name",
      clause: "is",
      values: ["McDonalds"],
    },
  ],
  conditions: [],
  components: [
    {
      type: "Delivery Fee",
      control: "McDonalds - London - 2,5,8",
      variations: [
        { id: "v1", name: "Variation 1", value: "Same as Control", isSameAsControl: true },
        { id: "v2", name: "Variation 2", value: "Same as Control", isSameAsControl: true },
      ],
    },
    {
      type: "Minimum Order Value",
      control: "McDonalds - London - 12",
      variations: [
        { id: "v1", name: "Variation 1", value: "McDonalds - London - 11", isSameAsControl: false },
        { id: "v2", name: "Variation 2", value: "McDonalds - London - 10", isSameAsControl: false },
      ],
    },
    {
      type: "Service Fee",
      control: "central-london-sf",
      variations: [
        { id: "v1", name: "Variation 1", value: "Same as Control", isSameAsControl: true },
        { id: "v2", name: "Variation 2", value: "Same as Control", isSameAsControl: true },
      ],
    },
  ],
};

// Vendor filter field options
export const vendorFilterFields = [
  { value: "chain_name", label: "Chain Name" },
  { value: "vendor_id", label: "Vendor ID" },
  { value: "zone", label: "Zone" },
  { value: "city", label: "City" },
  { value: "vertical", label: "Vertical" },
  { value: "cuisine", label: "Cuisine" },
];

// Clause options for vendor filters
export const clauseOptions = [
  { value: "is", label: "is" },
  { value: "is_not", label: "is not" },
  { value: "contains", label: "contains" },
  { value: "starts_with", label: "starts with" },
];
