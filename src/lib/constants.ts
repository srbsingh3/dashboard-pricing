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

export const SLIDE_DOWN = {
  initial: { opacity: 0, y: -8, scaleY: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: { opacity: 0, y: -8, scaleY: 0.95 },
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
  { value: "new_york", label: "New York" },
  { value: "los_angeles", label: "Los Angeles" },
  { value: "toronto", label: "Toronto" },
  { value: "paris", label: "Paris" },
  { value: "amsterdam", label: "Amsterdam" },
  { value: "madrid", label: "Madrid" },
  { value: "rome", label: "Rome" },
  { value: "vienna", label: "Vienna" },
  { value: "copenhagen", label: "Copenhagen" },
  { value: "tokyo", label: "Tokyo" },
  { value: "seoul", label: "Seoul" },
  { value: "shanghai", label: "Shanghai" },
  { value: "singapore", label: "Singapore" },
  { value: "mumbai", label: "Mumbai" },
  { value: "dubai", label: "Dubai" },
  { value: "sydney", label: "Sydney" },
  { value: "sao_paulo", label: "São Paulo" },
  { value: "mexico_city", label: "Mexico City" },
  { value: "cape_town", label: "Cape Town" },
  { value: "cairo", label: "Cairo" },
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
  { value: "pizza_hut", label: "Pizza Hut" },
  { value: "taco_bell", label: "Taco Bell" },
  { value: "wendys", label: "Wendy's" },
  { value: "chipotle", label: "Chipotle" },
  { value: "chick_fil_a", label: "Chick-fil-A" },
  { value: "dunkin", label: "Dunkin'" },
  { value: "papa_johns", label: "Papa John's" },
  { value: "five_guys", label: "Five Guys" },
  { value: "panda_express", label: "Panda Express" },
  { value: "tim_hortons", label: "Tim Hortons" },
  { value: "nandos", label: "Nando's" },
  { value: "jollibee", label: "Jollibee" },
  { value: "wingstop", label: "Wingstop" },
  { value: "shake_shack", label: "Shake Shack" },
] as const;

// Vertical types
export const VERTICAL_TYPES = [
  { value: "all", label: "All" },
  { value: "restaurants", label: "Restaurants" },
  { value: "grocery", label: "Grocery" },
  { value: "convenience", label: "Convenience" },
  { value: "pharmacy", label: "Pharmacy" },
] as const;

// Zones for experiments (Berlin neighborhoods)
export const ZONES = [
  { value: "mitte", label: "Mitte", id: "967" },
  { value: "kreuzberg", label: "Kreuzberg", id: "934" },
  { value: "friedrichshain", label: "Friedrichshain", id: "891" },
  { value: "prenzlauer_berg", label: "Prenzlauer Berg", id: "847" },
  { value: "neukoelln", label: "Neukölln", id: "812" },
  { value: "charlottenburg", label: "Charlottenburg", id: "768" },
  { value: "schoeneberg", label: "Schöneberg", id: "725" },
  { value: "wilmersdorf", label: "Wilmersdorf", id: "683" },
  { value: "tempelhof", label: "Tempelhof", id: "641" },
  { value: "wedding", label: "Wedding", id: "597" },
  { value: "moabit", label: "Moabit", id: "554" },
  { value: "tiergarten", label: "Tiergarten", id: "512" },
  { value: "steglitz", label: "Steglitz", id: "468" },
  { value: "zehlendorf", label: "Zehlendorf", id: "423" },
  { value: "spandau", label: "Spandau", id: "381" },
  { value: "reinickendorf", label: "Reinickendorf", id: "339" },
  { value: "pankow", label: "Pankow", id: "294" },
  { value: "lichtenberg", label: "Lichtenberg", id: "251" },
  { value: "treptow", label: "Treptow", id: "208" },
  { value: "koepenick", label: "Köpenick", id: "167" },
  { value: "marzahn", label: "Marzahn", id: "124" },
  { value: "hellersdorf", label: "Hellersdorf", id: "89" },
  { value: "weissensee", label: "Weißensee", id: "56" },
  { value: "hohenschoenhausen", label: "Hohenschönhausen", id: "34" },
  { value: "grunewald", label: "Grunewald", id: "12" },
] as const;

// Number of variations for experiments (1-10)
export const VARIATION_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
] as const;

// Experiment objectives
export const OBJECTIVE_OPTIONS = [
  { value: "increase_conversion", label: "Increase Conversion" },
  { value: "reduce_costs", label: "Reduce Costs" },
  { value: "improve_experience", label: "Improve Experience" },
  { value: "optimize_pricing", label: "Optimize Pricing" },
] as const;

// Parent verticals for experiments
export const PARENT_VERTICALS = [
  { value: "shops", label: "Shops" },
  { value: "flowers", label: "Flowers" },
  { value: "medicine", label: "Medicine" },
  { value: "restaurants", label: "Restaurants" },
  { value: "grocery", label: "Grocery" },
  { value: "convenience", label: "Convenience" },
  { value: "electronics", label: "Electronics" },
] as const;

// Vendor filter constants
export const VENDOR_FILTER_CONDITIONS = [
  { value: "is", label: "is" },
  { value: "is_not", label: "is not" },
] as const;

export const VENDOR_FILTER_FIELDS = [
  { value: "activation_date", label: "Activation Date", icon: "Calendar" },
  { value: "active", label: "Active", icon: "Power" },
  { value: "assignment", label: "Assignment", icon: "Equal" },
  { value: "chain_name", label: "Chain Name", icon: "Link" },
  { value: "city_names", label: "City Names", icon: "MapPin" },
  { value: "customer_types", label: "Customer Types", icon: "Users" },
  { value: "delivery_types", label: "Delivery Types", icon: "Truck" },
  { value: "key_account", label: "Key Account", icon: "Crown" },
  { value: "marketing_tags", label: "Marketing Tags", icon: "Tag" },
  { value: "vendor_name", label: "Vendor Name", icon: "Building2" },
  { value: "vertical_type", label: "Vertical Type", icon: "Layers" },
  { value: "zone_names", label: "Zone Names", icon: "Map" },
] as const;

// Extended city list for vendor filters
export const VENDOR_CITIES = [
  { value: "berlin", label: "Berlin" },
  { value: "munich", label: "Munich" },
  { value: "hamburg", label: "Hamburg" },
  { value: "frankfurt", label: "Frankfurt" },
  { value: "cologne", label: "Cologne" },
  { value: "stockholm", label: "Stockholm" },
  { value: "gothenburg", label: "Gothenburg" },
  { value: "malmö", label: "Malmö" },
  { value: "london", label: "London" },
  { value: "manchester", label: "Manchester" },
  { value: "birmingham", label: "Birmingham" },
  { value: "buenos_aires", label: "Buenos Aires" },
  { value: "cordoba", label: "Córdoba" },
  { value: "singapore", label: "Singapore" },
  { value: "new_york", label: "New York" },
  { value: "los_angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "san_francisco", label: "San Francisco" },
  { value: "miami", label: "Miami" },
  { value: "boston", label: "Boston" },
  { value: "seattle", label: "Seattle" },
  { value: "toronto", label: "Toronto" },
  { value: "vancouver", label: "Vancouver" },
  { value: "montreal", label: "Montreal" },
  { value: "paris", label: "Paris" },
  { value: "lyon", label: "Lyon" },
  { value: "marseille", label: "Marseille" },
  { value: "amsterdam", label: "Amsterdam" },
  { value: "rotterdam", label: "Rotterdam" },
  { value: "madrid", label: "Madrid" },
  { value: "barcelona", label: "Barcelona" },
  { value: "rome", label: "Rome" },
  { value: "milan", label: "Milan" },
  { value: "vienna", label: "Vienna" },
  { value: "zurich", label: "Zurich" },
  { value: "geneva", label: "Geneva" },
  { value: "brussels", label: "Brussels" },
  { value: "dublin", label: "Dublin" },
  { value: "oslo", label: "Oslo" },
  { value: "copenhagen", label: "Copenhagen" },
  { value: "helsinki", label: "Helsinki" },
  { value: "warsaw", label: "Warsaw" },
  { value: "prague", label: "Prague" },
  { value: "budapest", label: "Budapest" },
  { value: "lisbon", label: "Lisbon" },
  { value: "athens", label: "Athens" },
  { value: "tokyo", label: "Tokyo" },
  { value: "osaka", label: "Osaka" },
  { value: "kyoto", label: "Kyoto" },
  { value: "seoul", label: "Seoul" },
  { value: "beijing", label: "Beijing" },
  { value: "shanghai", label: "Shanghai" },
  { value: "hong_kong", label: "Hong Kong" },
  { value: "taipei", label: "Taipei" },
  { value: "bangkok", label: "Bangkok" },
  { value: "kuala_lumpur", label: "Kuala Lumpur" },
  { value: "jakarta", label: "Jakarta" },
  { value: "manila", label: "Manila" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore" },
  { value: "dubai", label: "Dubai" },
  { value: "abu_dhabi", label: "Abu Dhabi" },
  { value: "tel_aviv", label: "Tel Aviv" },
  { value: "sydney", label: "Sydney" },
  { value: "melbourne", label: "Melbourne" },
  { value: "brisbane", label: "Brisbane" },
  { value: "perth", label: "Perth" },
  { value: "auckland", label: "Auckland" },
  { value: "wellington", label: "Wellington" },
  { value: "sao_paulo", label: "São Paulo" },
  { value: "rio_de_janeiro", label: "Rio de Janeiro" },
  { value: "mexico_city", label: "Mexico City" },
  { value: "bogota", label: "Bogotá" },
  { value: "santiago", label: "Santiago" },
  { value: "lima", label: "Lima" },
  { value: "cape_town", label: "Cape Town" },
  { value: "johannesburg", label: "Johannesburg" },
  { value: "cairo", label: "Cairo" },
  { value: "lagos", label: "Lagos" },
  { value: "nairobi", label: "Nairobi" },
  { value: "casablanca", label: "Casablanca" },
] as const;

// Customer types for vendor filters
export const CUSTOMER_TYPES = [
  { value: "new", label: "New Customers" },
  { value: "returning", label: "Returning Customers" },
  { value: "premium", label: "Premium Members" },
  { value: "corporate", label: "Corporate Accounts" },
  { value: "casual", label: "Casual Users" },
] as const;

// Delivery types for vendor filters
export const DELIVERY_TYPES = [
  { value: "express", label: "Express Delivery" },
  { value: "standard", label: "Standard Delivery" },
  { value: "scheduled", label: "Scheduled Delivery" },
  { value: "pickup", label: "Store Pickup" },
  { value: "dine_in", label: "Dine-in" },
] as const;

// Marketing tags for vendor filters
export const MARKETING_TAGS = [
  { value: "featured", label: "Featured" },
  { value: "new_partner", label: "New Partner" },
  { value: "top_rated", label: "Top Rated" },
  { value: "fast_delivery", label: "Fast Delivery" },
  { value: "eco_friendly", label: "Eco-Friendly" },
  { value: "local_favorite", label: "Local Favorite" },
  { value: "budget_friendly", label: "Budget Friendly" },
  { value: "trending", label: "Trending" },
  { value: "staff_pick", label: "Staff Pick" },
  { value: "exclusive_deal", label: "Exclusive Deal" },
  { value: "family_friendly", label: "Family Friendly" },
  { value: "late_night", label: "Late Night" },
  { value: "healthy_choice", label: "Healthy Choice" },
  { value: "vegan_options", label: "Vegan Options" },
  { value: "gluten_free", label: "Gluten Free" },
  { value: "halal_certified", label: "Halal Certified" },
  { value: "kosher", label: "Kosher" },
  { value: "organic", label: "Organic" },
  { value: "award_winning", label: "Award Winning" },
  { value: "student_discount", label: "Student Discount" },
  { value: "loyalty_program", label: "Loyalty Program" },
  { value: "free_delivery", label: "Free Delivery" },
  { value: "flash_sale", label: "Flash Sale" },
  { value: "limited_time", label: "Limited Time" },
  { value: "best_seller", label: "Best Seller" },
] as const;

// Vendor names for filters
export const VENDOR_NAMES = [
  { value: "mcdonalds", label: "McDonald's" },
  { value: "burger_king", label: "Burger King" },
  { value: "kfc", label: "KFC" },
  { value: "subway", label: "Subway" },
  { value: "dominos", label: "Domino's" },
  { value: "starbucks", label: "Starbucks" },
  { value: "pizza_hut", label: "Pizza Hut" },
  { value: "wendys", label: "Wendy's" },
  { value: "taco_bell", label: "Taco Bell" },
  { value: "chipotle", label: "Chipotle" },
  { value: "five_guys", label: "Five Guys" },
  { value: "shake_shack", label: "Shake Shack" },
] as const;

// Active status options
export const ACTIVE_STATUS = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
] as const;

// Key account options
export const KEY_ACCOUNT_STATUS = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
] as const;

// Assignment names for vendor filters
export const ASSIGNMENT_NAMES = [
  // Restaurant assignments
  { value: "mitte_kreuzberg_restaurant", label: "Mitte / Kreuzberg Restaurant" },
  { value: "prenzlauer_berg_restaurant", label: "Prenzlauer Berg Restaurant" },
  { value: "friedrichshain_restaurant", label: "Friedrichshain Restaurant" },
  { value: "charlottenburg_restaurant", label: "Charlottenburg Restaurant" },
  { value: "neukoelln_early_surge", label: "Neukölln Early Surge Restaurants" },
  { value: "schoeneberg_high_df_zones", label: "Schöneberg High DF Zones" },
  // Shops assignments
  { value: "shops_citywide_vendors", label: "Shops Citywide Vendors" },
  { value: "shops_others_high_ps", label: "Shops Others, High PS Zones" },
  { value: "shops_premium_partners", label: "Shops Premium Partners" },
  { value: "shops_new_onboarding", label: "Shops New Onboarding" },
  // Grocery assignments
  { value: "grocery_mitte_express", label: "Grocery Mitte Express" },
  { value: "grocery_west_berlin", label: "Grocery West Berlin" },
  { value: "grocery_late_night", label: "Grocery Late Night Vendors" },
  // Zone-based assignments
  { value: "wedding_moabit_all", label: "Wedding / Moabit All Verticals" },
  { value: "tempelhof_steglitz", label: "Tempelhof / Steglitz" },
  { value: "east_berlin_surge", label: "East Berlin Peak Surge" },
  { value: "central_zones_premium", label: "Central Zones Premium" },
  // Special assignments
  { value: "key_accounts_berlin", label: "Key Accounts Berlin" },
  { value: "new_vendor_pilot", label: "New Vendor Pilot Program" },
  { value: "high_value_partners", label: "High Value Partners" },
] as const;

// Delivery fee component options for experiments
export const DELIVERY_FEE_COMPONENTS = [
  { value: "df_standard", label: "Standard Delivery Fee", id: "847" },
  { value: "df_express", label: "Express Delivery Fee", id: "731" },
  { value: "df_scheduled", label: "Scheduled Delivery Fee", id: "592" },
  { value: "df_peak", label: "Peak Hour Fee", id: "486" },
  { value: "df_distance_based", label: "Distance-Based Fee", id: "253" },
  { value: "df_flat_rate", label: "Flat Rate Fee", id: "118" },
] as const;

// MOV (Minimum Order Value) component options for experiments
export const MOV_COMPONENTS = [
  { value: "mov_standard", label: "Standard MOV", id: "924" },
  { value: "mov_express", label: "Express MOV", id: "756" },
  { value: "mov_free_delivery", label: "Free Delivery MOV", id: "612" },
  { value: "mov_premium", label: "Premium MOV", id: "483" },
  { value: "mov_promotional", label: "Promotional MOV", id: "291" },
] as const;

// Additional experiment variable columns (for Control and Variation table)
export const EXPERIMENT_VARIABLE_COLUMNS = [
  { value: "fleet_delay", label: "Fleet Delay", icon: "Clock" },
  { value: "basket_value", label: "Basket Value", icon: "ShoppingBasket" },
  { value: "service_fee", label: "Service Fee", icon: "Receipt" },
  { value: "priority_fee", label: "Priority Fee", icon: "Zap" },
] as const;

// Fleet Delay component options
export const FLEET_DELAY_COMPONENTS = [
  { value: "fd_standard", label: "Standard Delay", id: "738" },
  { value: "fd_express", label: "Express Delay", id: "594" },
  { value: "fd_peak", label: "Peak Hour Delay", id: "427" },
  { value: "fd_scheduled", label: "Scheduled Delay", id: "263" },
] as const;

// Basket Value component options
export const BASKET_VALUE_COMPONENTS = [
  { value: "bv_minimum", label: "Minimum Basket", id: "856" },
  { value: "bv_standard", label: "Standard Basket", id: "642" },
  { value: "bv_premium", label: "Premium Basket", id: "471" },
  { value: "bv_promotional", label: "Promotional Basket", id: "318" },
] as const;

// Service Fee component options
export const SERVICE_FEE_COMPONENTS = [
  { value: "sf_standard", label: "Standard Service Fee", id: "793" },
  { value: "sf_premium", label: "Premium Service Fee", id: "651" },
  { value: "sf_promotional", label: "Promotional Service Fee", id: "429" },
  { value: "sf_waived", label: "Waived Service Fee", id: "287" },
] as const;

// Priority Fee component options
export const PRIORITY_FEE_COMPONENTS = [
  { value: "pf_standard", label: "Standard Priority", id: "682" },
  { value: "pf_express", label: "Express Priority", id: "514" },
  { value: "pf_vip", label: "VIP Priority", id: "376" },
  { value: "pf_none", label: "No Priority", id: "198" },
] as const;

// Weekdays for time condition
export const WEEKDAYS = [
  { value: "mon", label: "M" },
  { value: "tue", label: "T" },
  { value: "wed", label: "W" },
  { value: "thu", label: "Th" },
  { value: "fri", label: "F" },
  { value: "sat", label: "Sa" },
  { value: "sun", label: "S" },
] as const;

// Customer condition types for new customer condition
export const CUSTOMER_CONDITION_TYPES = [
  { value: "new_qcommerce", label: "New to Q-Commerce" },
  { value: "new_platform", label: "New to Platform" },
  { value: "returning_customer", label: "Returning Customer" },
  { value: "lapsed_customer", label: "Lapsed Customer" },
  { value: "high_value", label: "High Value Customer" },
] as const;

// Customer locations for location condition
export const CUSTOMER_LOCATIONS = [
  { value: "downtown", label: "Downtown" },
  { value: "midtown", label: "Midtown" },
  { value: "uptown", label: "Uptown" },
  { value: "suburbs_north", label: "Suburbs North" },
  { value: "suburbs_south", label: "Suburbs South" },
  { value: "industrial", label: "Industrial Area" },
  { value: "commercial", label: "Commercial District" },
  { value: "residential_east", label: "Residential East" },
  { value: "residential_west", label: "Residential West" },
  { value: "airport", label: "Airport Area" },
  { value: "waterfront", label: "Waterfront" },
  { value: "university", label: "University District" },
] as const;

