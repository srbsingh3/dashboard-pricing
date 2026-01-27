// Design tokens and constants for DPS Dashboard

// Navigation items
export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", id: "dashboard", disabled: false },
  { label: "Experiments", href: "/experiments", id: "experiments", disabled: false },
  { label: "Components", href: "/components", id: "components", disabled: true },
  { label: "Price Rules", href: "/price-rules", id: "price-rules", disabled: true },
  { label: "Campaigns", href: "/campaigns", id: "campaigns", disabled: true },
  { label: "Subscriptions", href: "/subscriptions", id: "subscriptions", disabled: true },
  { label: "Vendors", href: "/vendors", id: "vendors", disabled: true },
] as const;

// Tooltip message for disabled navigation items
export const DISABLED_NAV_TOOLTIP = "Only Dashboard and Experiments are available in this preview";

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
  RUNNING: "running",
  COMPLETED: "completed",
  DRAFT: "draft",
} as const;

// Experiment types
export const EXPERIMENT_TYPES = [
  { value: "ab", label: "A/B Test" },
  { value: "switchback", label: "Switchback" },
] as const;

// Primary metrics for experiments
export const PRIMARY_METRICS = [
  { value: "conversion_rate", label: "Conversion Rate" },
  { value: "order_volume", label: "Order Volume" },
  { value: "revenue_per_order", label: "Revenue per Order" },
  { value: "avg_delivery_fee", label: "Avg Delivery Fee" },
  { value: "gross_profit", label: "Gross Profit" },
] as const;

// Significance threshold (industry standard)
export const SIGNIFICANCE_THRESHOLD = 95;

// Status colors (for badges) - Using Subframe semantic colors
// Running = blue (brand), Completed = green (success), Draft = gray (neutral)
export const STATUS_COLORS = {
  running: "bg-brand-50 text-brand-700 border-brand-200",
  completed: "bg-success-50 text-success-700 border-success-200",
  draft: "bg-neutral-100 text-neutral-600 border-neutral-200",
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

// Breakpoints for responsive table styling
// When screen is wider than this, table gets a bordered container appearance
export const TABLE_CONTAINER_BREAKPOINT = 1700; // px - slightly above max-w-[1600px]

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
  { value: "mcdonalds", label: "McDonald's", id: "958" },
  { value: "burger_king", label: "Burger King", id: "912" },
  { value: "kfc", label: "KFC", id: "867" },
  { value: "subway", label: "Subway", id: "823" },
  { value: "dominos", label: "Domino's", id: "781" },
  { value: "starbucks", label: "Starbucks", id: "736" },
  { value: "pizza_hut", label: "Pizza Hut", id: "692" },
  { value: "taco_bell", label: "Taco Bell", id: "648" },
  { value: "wendys", label: "Wendy's", id: "603" },
  { value: "chipotle", label: "Chipotle", id: "559" },
  { value: "chick_fil_a", label: "Chick-fil-A", id: "514" },
  { value: "dunkin", label: "Dunkin'", id: "471" },
  { value: "papa_johns", label: "Papa John's", id: "427" },
  { value: "five_guys", label: "Five Guys", id: "382" },
  { value: "panda_express", label: "Panda Express", id: "338" },
  { value: "tim_hortons", label: "Tim Hortons", id: "294" },
  { value: "nandos", label: "Nando's", id: "251" },
  { value: "jollibee", label: "Jollibee", id: "207" },
  { value: "wingstop", label: "Wingstop", id: "163" },
  { value: "shake_shack", label: "Shake Shack", id: "118" },
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
  { value: "berlin", label: "Berlin", id: "994" },
  { value: "munich", label: "Munich", id: "982" },
  { value: "hamburg", label: "Hamburg", id: "971" },
  { value: "frankfurt", label: "Frankfurt", id: "959" },
  { value: "cologne", label: "Cologne", id: "948" },
  { value: "stockholm", label: "Stockholm", id: "936" },
  { value: "gothenburg", label: "Gothenburg", id: "925" },
  { value: "malmö", label: "Malmö", id: "913" },
  { value: "london", label: "London", id: "902" },
  { value: "manchester", label: "Manchester", id: "890" },
  { value: "birmingham", label: "Birmingham", id: "879" },
  { value: "buenos_aires", label: "Buenos Aires", id: "867" },
  { value: "cordoba", label: "Córdoba", id: "856" },
  { value: "singapore", label: "Singapore", id: "844" },
  { value: "new_york", label: "New York", id: "833" },
  { value: "los_angeles", label: "Los Angeles", id: "821" },
  { value: "chicago", label: "Chicago", id: "810" },
  { value: "san_francisco", label: "San Francisco", id: "798" },
  { value: "miami", label: "Miami", id: "787" },
  { value: "boston", label: "Boston", id: "775" },
  { value: "seattle", label: "Seattle", id: "764" },
  { value: "toronto", label: "Toronto", id: "752" },
  { value: "vancouver", label: "Vancouver", id: "741" },
  { value: "montreal", label: "Montreal", id: "729" },
  { value: "paris", label: "Paris", id: "718" },
  { value: "lyon", label: "Lyon", id: "706" },
  { value: "marseille", label: "Marseille", id: "695" },
  { value: "amsterdam", label: "Amsterdam", id: "683" },
  { value: "rotterdam", label: "Rotterdam", id: "672" },
  { value: "madrid", label: "Madrid", id: "660" },
  { value: "barcelona", label: "Barcelona", id: "649" },
  { value: "rome", label: "Rome", id: "637" },
  { value: "milan", label: "Milan", id: "626" },
  { value: "vienna", label: "Vienna", id: "614" },
  { value: "zurich", label: "Zurich", id: "603" },
  { value: "geneva", label: "Geneva", id: "591" },
  { value: "brussels", label: "Brussels", id: "580" },
  { value: "dublin", label: "Dublin", id: "568" },
  { value: "oslo", label: "Oslo", id: "557" },
  { value: "copenhagen", label: "Copenhagen", id: "545" },
  { value: "helsinki", label: "Helsinki", id: "534" },
  { value: "warsaw", label: "Warsaw", id: "522" },
  { value: "prague", label: "Prague", id: "511" },
  { value: "budapest", label: "Budapest", id: "499" },
  { value: "lisbon", label: "Lisbon", id: "488" },
  { value: "athens", label: "Athens", id: "476" },
  { value: "tokyo", label: "Tokyo", id: "465" },
  { value: "osaka", label: "Osaka", id: "453" },
  { value: "kyoto", label: "Kyoto", id: "442" },
  { value: "seoul", label: "Seoul", id: "430" },
  { value: "beijing", label: "Beijing", id: "419" },
  { value: "shanghai", label: "Shanghai", id: "407" },
  { value: "hong_kong", label: "Hong Kong", id: "396" },
  { value: "taipei", label: "Taipei", id: "384" },
  { value: "bangkok", label: "Bangkok", id: "373" },
  { value: "kuala_lumpur", label: "Kuala Lumpur", id: "361" },
  { value: "jakarta", label: "Jakarta", id: "350" },
  { value: "manila", label: "Manila", id: "338" },
  { value: "mumbai", label: "Mumbai", id: "327" },
  { value: "delhi", label: "Delhi", id: "315" },
  { value: "bangalore", label: "Bangalore", id: "304" },
  { value: "dubai", label: "Dubai", id: "292" },
  { value: "abu_dhabi", label: "Abu Dhabi", id: "281" },
  { value: "tel_aviv", label: "Tel Aviv", id: "269" },
  { value: "sydney", label: "Sydney", id: "258" },
  { value: "melbourne", label: "Melbourne", id: "246" },
  { value: "brisbane", label: "Brisbane", id: "235" },
  { value: "perth", label: "Perth", id: "223" },
  { value: "auckland", label: "Auckland", id: "212" },
  { value: "wellington", label: "Wellington", id: "200" },
  { value: "sao_paulo", label: "São Paulo", id: "189" },
  { value: "rio_de_janeiro", label: "Rio de Janeiro", id: "177" },
  { value: "mexico_city", label: "Mexico City", id: "166" },
  { value: "bogota", label: "Bogotá", id: "154" },
  { value: "santiago", label: "Santiago", id: "143" },
  { value: "lima", label: "Lima", id: "131" },
  { value: "cape_town", label: "Cape Town", id: "120" },
  { value: "johannesburg", label: "Johannesburg", id: "108" },
  { value: "cairo", label: "Cairo", id: "97" },
  { value: "lagos", label: "Lagos", id: "85" },
  { value: "nairobi", label: "Nairobi", id: "74" },
  { value: "casablanca", label: "Casablanca", id: "62" },
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
  { value: "mcdonalds", label: "McDonald's", id: "876" },
  { value: "burger_king", label: "Burger King", id: "821" },
  { value: "kfc", label: "KFC", id: "764" },
  { value: "subway", label: "Subway", id: "708" },
  { value: "dominos", label: "Domino's", id: "653" },
  { value: "starbucks", label: "Starbucks", id: "597" },
  { value: "pizza_hut", label: "Pizza Hut", id: "542" },
  { value: "wendys", label: "Wendy's", id: "486" },
  { value: "taco_bell", label: "Taco Bell", id: "431" },
  { value: "chipotle", label: "Chipotle", id: "375" },
  { value: "five_guys", label: "Five Guys", id: "318" },
  { value: "shake_shack", label: "Shake Shack", id: "263" },
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
  { value: "mitte_kreuzberg_restaurant", label: "Mitte / Kreuzberg Restaurant", id: "958" },
  { value: "prenzlauer_berg_restaurant", label: "Prenzlauer Berg Restaurant", id: "912" },
  { value: "friedrichshain_restaurant", label: "Friedrichshain Restaurant", id: "876" },
  { value: "charlottenburg_restaurant", label: "Charlottenburg Restaurant", id: "831" },
  { value: "neukoelln_early_surge", label: "Neukölln Early Surge Restaurants", id: "789" },
  { value: "schoeneberg_high_df_zones", label: "Schöneberg High DF Zones", id: "742" },
  // Shops assignments
  { value: "shops_citywide_vendors", label: "Shops Citywide Vendors", id: "697" },
  { value: "shops_others_high_ps", label: "Shops Others, High PS Zones", id: "654" },
  { value: "shops_premium_partners", label: "Shops Premium Partners", id: "608" },
  { value: "shops_new_onboarding", label: "Shops New Onboarding", id: "563" },
  // Grocery assignments
  { value: "grocery_mitte_express", label: "Grocery Mitte Express", id: "517" },
  { value: "grocery_west_berlin", label: "Grocery West Berlin", id: "472" },
  { value: "grocery_late_night", label: "Grocery Late Night Vendors", id: "428" },
  // Zone-based assignments
  { value: "wedding_moabit_all", label: "Wedding / Moabit All Verticals", id: "381" },
  { value: "tempelhof_steglitz", label: "Tempelhof / Steglitz", id: "336" },
  { value: "east_berlin_surge", label: "East Berlin Peak Surge", id: "294" },
  { value: "central_zones_premium", label: "Central Zones Premium", id: "247" },
  // Special assignments
  { value: "key_accounts_berlin", label: "Key Accounts Berlin", id: "198" },
  { value: "new_vendor_pilot", label: "New Vendor Pilot Program", id: "153" },
  { value: "high_value_partners", label: "High Value Partners", id: "107" },
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

