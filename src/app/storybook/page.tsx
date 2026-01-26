"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Type,
  Box,
  Calendar as CalendarIcon,
  MousePointer,
  Menu,
  Table as TableIcon,
  MessageSquare,
  X,
  Plus,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/subframe/components/Button";
import { Badge } from "@/subframe/components/Badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { ChipMultiSelect } from "@/components/ui/chip-multi-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Section = "colors" | "typography" | "button" | "badge" | "calendar" | "popover" | "select" | "table" | "tooltip";

const navigation = [
  { id: "colors" as Section, label: "Colors", icon: Palette },
  { id: "typography" as Section, label: "Typography", icon: Type },
  { id: "button" as Section, label: "Button", icon: Box },
  { id: "badge" as Section, label: "Badge", icon: Check },
  { id: "calendar" as Section, label: "Calendar", icon: CalendarIcon },
  { id: "popover" as Section, label: "Popover", icon: MousePointer },
  { id: "select" as Section, label: "Select", icon: Menu },
  { id: "table" as Section, label: "Table", icon: TableIcon },
  { id: "tooltip" as Section, label: "Tooltip", icon: MessageSquare },
];

const colorGroups = [
  {
    name: "Brand",
    shades: [
      { name: "brand-50", value: "bg-brand-50", hex: "#EEF2FF" },
      { name: "brand-100", value: "bg-brand-100", hex: "#E0E7FF" },
      { name: "brand-200", value: "bg-brand-200", hex: "#C7D2FE" },
      { name: "brand-300", value: "bg-brand-300", hex: "#A5B4FC" },
      { name: "brand-400", value: "bg-brand-400", hex: "#818CF8" },
      { name: "brand-500", value: "bg-brand-500", hex: "#6366F1" },
      { name: "brand-600", value: "bg-brand-600", hex: "#4F46E5" },
      { name: "brand-700", value: "bg-brand-700", hex: "#4338CA" },
      { name: "brand-800", value: "bg-brand-800", hex: "#3730A3" },
      { name: "brand-900", value: "bg-brand-900", hex: "#312E81" },
    ],
  },
  {
    name: "Neutral",
    shades: [
      { name: "neutral-50", value: "bg-neutral-50", hex: "#FAFAFA" },
      { name: "neutral-100", value: "bg-neutral-100", hex: "#F5F5F5" },
      { name: "neutral-200", value: "bg-neutral-200", hex: "#E5E5E5" },
      { name: "neutral-300", value: "bg-neutral-300", hex: "#D4D4D4" },
      { name: "neutral-400", value: "bg-neutral-400", hex: "#A3A3A3" },
      { name: "neutral-500", value: "bg-neutral-500", hex: "#737373" },
      { name: "neutral-600", value: "bg-neutral-600", hex: "#525252" },
      { name: "neutral-700", value: "bg-neutral-700", hex: "#404040" },
      { name: "neutral-800", value: "bg-neutral-800", hex: "#262626" },
      { name: "neutral-900", value: "bg-neutral-900", hex: "#171717" },
    ],
  },
  {
    name: "Success",
    shades: [
      { name: "success-50", value: "bg-success-50", hex: "#F0FDF4" },
      { name: "success-100", value: "bg-success-100", hex: "#DCFCE7" },
      { name: "success-200", value: "bg-success-200", hex: "#BBF7D0" },
      { name: "success-300", value: "bg-success-300", hex: "#86EFAC" },
      { name: "success-400", value: "bg-success-400", hex: "#4ADE80" },
      { name: "success-500", value: "bg-success-500", hex: "#22C55E" },
      { name: "success-600", value: "bg-success-600", hex: "#16A34A" },
      { name: "success-700", value: "bg-success-700", hex: "#15803D" },
      { name: "success-800", value: "bg-success-800", hex: "#166534" },
      { name: "success-900", value: "bg-success-900", hex: "#14532D" },
    ],
  },
  {
    name: "Warning",
    shades: [
      { name: "warning-50", value: "bg-warning-50", hex: "#FFFBEB" },
      { name: "warning-100", value: "bg-warning-100", hex: "#FEF3C7" },
      { name: "warning-200", value: "bg-warning-200", hex: "#FDE68A" },
      { name: "warning-300", value: "bg-warning-300", hex: "#FCD34D" },
      { name: "warning-400", value: "bg-warning-400", hex: "#FBBF24" },
      { name: "warning-500", value: "bg-warning-500", hex: "#F59E0B" },
      { name: "warning-600", value: "bg-warning-600", hex: "#D97706" },
      { name: "warning-700", value: "bg-warning-700", hex: "#B45309" },
      { name: "warning-800", value: "bg-warning-800", hex: "#92400E" },
      { name: "warning-900", value: "bg-warning-900", hex: "#78350F" },
    ],
  },
  {
    name: "Error",
    shades: [
      { name: "error-50", value: "bg-error-50", hex: "#FEF2F2" },
      { name: "error-100", value: "bg-error-100", hex: "#FEE2E2" },
      { name: "error-200", value: "bg-error-200", hex: "#FECACA" },
      { name: "error-300", value: "bg-error-300", hex: "#FCA5A5" },
      { name: "error-400", value: "bg-error-400", hex: "#F87171" },
      { name: "error-500", value: "bg-error-500", hex: "#EF4444" },
      { name: "error-600", value: "bg-error-600", hex: "#DC2626" },
      { name: "error-700", value: "bg-error-700", hex: "#B91C1C" },
      { name: "error-800", value: "bg-error-800", hex: "#991B1B" },
      { name: "error-900", value: "bg-error-900", hex: "#7F1D1D" },
    ],
  },
];

export default function StorybookPage() {
  const [activeSection, setActiveSection] = useState<Section>("colors");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [chipMultiSelectValue, setChipMultiSelectValue] = useState<string[]>([]);

  const renderContent = () => {
    switch (activeSection) {
      case "colors":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Color System</h2>
              <p className="text-body text-subtext-color">
                A comprehensive palette designed for clarity, consistency, and accessibility.
              </p>
            </div>

            {colorGroups.map((group) => (
              <div key={group.name} className="space-y-4">
                <h3 className="text-body-bold text-default-font">{group.name}</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5 lg:grid-cols-10">
                  {group.shades.map((shade) => (
                    <div key={shade.name} className="space-y-2">
                      <div
                        className={cn(
                          "h-16 w-full rounded-md border border-neutral-200 shadow-sm",
                          shade.value
                        )}
                      />
                      <div className="space-y-0.5">
                        <p className="text-caption text-default-font">{shade.name.split("-")[1]}</p>
                        <p className="font-mono text-caption text-neutral-400">{shade.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "typography":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Typography</h2>
              <p className="text-body text-subtext-color">
                A carefully crafted type scale for consistent hierarchy and readability.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-3 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-heading-1 text-default-font">Heading 1</span>
                  <span className="font-mono text-caption text-neutral-400">30px / 1.875rem · 500</span>
                </div>
                <p className="text-caption text-neutral-500">
                  Used for primary page titles and major section headings
                </p>
              </div>

              <div className="space-y-3 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-heading-2 text-default-font">Heading 2</span>
                  <span className="font-mono text-caption text-neutral-400">20px / 1.25rem · 500</span>
                </div>
                <p className="text-caption text-neutral-500">
                  Used for section titles and card headers
                </p>
              </div>

              <div className="space-y-3 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-heading-3 text-default-font">Heading 3</span>
                  <span className="font-mono text-caption text-neutral-400">16px / 1rem · 500</span>
                </div>
                <p className="text-caption text-neutral-500">
                  Used for subsection titles and component headers
                </p>
              </div>

              <div className="space-y-3 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-body-bold text-default-font">Body Bold</span>
                  <span className="font-mono text-caption text-neutral-400">14px / 0.875rem · 500</span>
                </div>
                <p className="text-caption text-neutral-500">
                  Used for labels, table headers, and emphasized body text
                </p>
              </div>

              <div className="space-y-3 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-body text-default-font">Body</span>
                  <span className="font-mono text-caption text-neutral-400">14px / 0.875rem · 400</span>
                </div>
                <p className="text-caption text-neutral-500">
                  Default text style for paragraphs and general content
                </p>
              </div>

              <div className="space-y-3 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-caption text-default-font">Caption</span>
                  <span className="font-mono text-caption text-neutral-400">12px / 0.75rem · 400</span>
                </div>
                <p className="text-caption text-neutral-500">
                  Used for helper text, timestamps, and secondary information
                </p>
              </div>

              <div className="space-y-3 rounded-md border border-neutral-border bg-default-background p-6 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <span className="text-caption-bold text-default-font">Caption Bold</span>
                  <span className="font-mono text-caption text-neutral-400">12px / 0.75rem · 500</span>
                </div>
                <p className="text-caption text-neutral-500">
                  Used for small labels and emphasized captions
                </p>
              </div>
            </div>
          </div>
        );

      case "button":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Button</h2>
              <p className="text-body text-subtext-color">
                Versatile buttons with multiple variants, sizes, and states for different use cases.
              </p>
            </div>

            <div className="space-y-8">
              {/* Brand Variants */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Brand Variants</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="brand-primary">Primary</Button>
                    <Button variant="brand-secondary">Secondary</Button>
                    <Button variant="brand-tertiary">Tertiary</Button>
                  </div>
                </div>
              </div>

              {/* Neutral Variants */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Neutral Variants</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="neutral-primary">Primary</Button>
                    <Button variant="neutral-secondary">Secondary</Button>
                    <Button variant="neutral-tertiary">Tertiary</Button>
                  </div>
                </div>
              </div>

              {/* Destructive Variants */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Destructive Variants</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="destructive-primary">Primary</Button>
                    <Button variant="destructive-secondary">Secondary</Button>
                    <Button variant="destructive-tertiary">Tertiary</Button>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Sizes</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="small">Small</Button>
                    <Button size="medium">Medium</Button>
                    <Button size="large">Large</Button>
                  </div>
                </div>
              </div>

              {/* States */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">States</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button>Default</Button>
                    <Button disabled>Disabled</Button>
                    <Button loading>Loading</Button>
                  </div>
                </div>
              </div>

              {/* With Icons */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">With Icons</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button icon={<Plus className="size-4" />}>With Icon</Button>
                    <Button variant="neutral-secondary" icon={<Menu className="size-4" />}>
                      Secondary
                    </Button>
                    <Button variant="brand-tertiary" iconRight={<Check className="size-4" />}>
                      Icon Right
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "badge":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Badge</h2>
              <p className="text-body text-subtext-color">
                Status indicators and labels for highlighting important information.
              </p>
            </div>

            <div className="space-y-8">
              {/* Variants */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Variants</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="brand">Brand</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                  </div>
                </div>
              </div>

              {/* With Icons */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">With Icons</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="brand" icon={<Check className="size-3" />}>
                      Completed
                    </Badge>
                    <Badge variant="success" icon={<Check className="size-3" />}>
                      Active
                    </Badge>
                    <Badge variant="warning" icon={<CalendarIcon className="size-3" />}>
                      Pending
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Count Badges */}
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Count Badges</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="brand">24</Badge>
                    <Badge variant="neutral">156</Badge>
                    <Badge variant="error">3</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "calendar":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Calendar</h2>
              <p className="text-body text-subtext-color">
                A date picker component for selecting single dates or date ranges.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Single Date</h3>
                <div className="inline-block rounded-md border border-neutral-border bg-default-background p-4 shadow-sm">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "popover":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Popover</h2>
              <p className="text-body text-subtext-color">
                Floating containers for displaying additional content on demand.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Basic Popover</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="neutral-secondary">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 rounded-md border border-neutral-border bg-white shadow-lg">
                      <div className="space-y-3 p-4">
                        <h4 className="text-body-bold text-default-font">Popover Title</h4>
                        <p className="text-body text-subtext-color">
                          This is a popover with some example content. It can contain any elements you need.
                        </p>
                        <Button size="small">Action</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Alignment Options</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="neutral-secondary">Align Start</Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-60 rounded-md border border-neutral-border bg-white p-3 shadow-lg">
                        <p className="text-caption text-subtext-color">Aligned to start</p>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="neutral-secondary">Align Center</Button>
                      </PopoverTrigger>
                      <PopoverContent align="center" className="w-60 rounded-md border border-neutral-border bg-white p-3 shadow-lg">
                        <p className="text-caption text-subtext-color">Aligned to center</p>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="neutral-secondary">Align End</Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-60 rounded-md border border-neutral-border bg-white p-3 shadow-lg">
                        <p className="text-caption text-subtext-color">Aligned to end</p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "select":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Select</h2>
              <p className="text-body text-subtext-color">
                Dropdown selectors for choosing from a list of options.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Basic Select</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <Select defaultValue="option1">
                    <SelectTrigger className="w-64 border-neutral-border bg-default-background">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="border-neutral-border bg-white">
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                      <SelectItem value="option4">Option 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Sizes</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-4">
                    <Select defaultValue="small">
                      <SelectTrigger className="w-48 border-neutral-border bg-default-background" size="sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-neutral-border bg-white">
                        <SelectItem value="small">Small Size</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="default">
                      <SelectTrigger className="w-48 border-neutral-border bg-default-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-neutral-border bg-white">
                        <SelectItem value="default">Default Size</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Multi-Select (Count)</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <MultiSelect
                    options={[
                      { value: "zone1", label: "North Zone", id: "NZ-001" },
                      { value: "zone2", label: "South Zone", id: "SZ-002" },
                      { value: "zone3", label: "East Zone", id: "EZ-003" },
                      { value: "zone4", label: "West Zone", id: "WZ-004" },
                      { value: "zone5", label: "Central Zone", id: "CZ-005" },
                    ]}
                    value={multiSelectValue}
                    onValueChange={setMultiSelectValue}
                    placeholder="Select zones"
                    label="Select Zones"
                    itemLabel="zone"
                    className="w-80"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Multi-Select (Chips)</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <ChipMultiSelect
                    options={[
                      { value: "tag1", label: "Design", id: "T-001" },
                      { value: "tag2", label: "Development", id: "T-002" },
                      { value: "tag3", label: "Marketing", id: "T-003" },
                      { value: "tag4", label: "Sales", id: "T-004" },
                      { value: "tag5", label: "Support", id: "T-005" },
                    ]}
                    value={chipMultiSelectValue}
                    onValueChange={setChipMultiSelectValue}
                    placeholder="Select tags"
                    label="Select Tags"
                    className="w-80"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Disabled State</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <Select defaultValue="disabled" disabled>
                    <SelectTrigger className="w-64 border-neutral-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-neutral-border bg-white">
                      <SelectItem value="disabled">Disabled Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Table</h2>
              <p className="text-body text-subtext-color">
                Structured data tables for displaying information in rows and columns.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Basic Table</h3>
                <div className="overflow-hidden rounded-md border border-neutral-border bg-default-background shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-neutral-border bg-neutral-50">
                        <TableHead className="text-caption-bold text-subtext-color">Name</TableHead>
                        <TableHead className="text-caption-bold text-subtext-color">Status</TableHead>
                        <TableHead className="text-caption-bold text-subtext-color">Role</TableHead>
                        <TableHead className="text-right text-caption-bold text-subtext-color">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-b border-neutral-border hover:bg-neutral-50">
                        <TableCell className="text-body text-default-font">Alice Johnson</TableCell>
                        <TableCell>
                          <Badge variant="success">Active</Badge>
                        </TableCell>
                        <TableCell className="text-body text-neutral-600">Admin</TableCell>
                        <TableCell className="text-right">
                          <Button variant="neutral-tertiary" size="small">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="border-b border-neutral-border hover:bg-neutral-50">
                        <TableCell className="text-body text-default-font">Bob Smith</TableCell>
                        <TableCell>
                          <Badge variant="success">Active</Badge>
                        </TableCell>
                        <TableCell className="text-body text-neutral-600">Editor</TableCell>
                        <TableCell className="text-right">
                          <Button variant="neutral-tertiary" size="small">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow className="hover:bg-neutral-50">
                        <TableCell className="text-body text-default-font">Carol White</TableCell>
                        <TableCell>
                          <Badge variant="neutral">Inactive</Badge>
                        </TableCell>
                        <TableCell className="text-body text-neutral-600">Viewer</TableCell>
                        <TableCell className="text-right">
                          <Button variant="neutral-tertiary" size="small">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        );

      case "tooltip":
        return (
          <div className="space-y-12">
            <div>
              <h2 className="mb-2 text-heading-2 text-default-font">Tooltip</h2>
              <p className="text-body text-subtext-color">
                Contextual hints that appear on hover to provide additional information.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">Placement Options</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="neutral-secondary">Top</Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="rounded-md border border-neutral-border bg-neutral-900 text-caption text-white">
                        <p>Tooltip on top</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="neutral-secondary">Right</Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="rounded-md border border-neutral-border bg-neutral-900 text-caption text-white">
                        <p>Tooltip on right</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="neutral-secondary">Bottom</Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="rounded-md border border-neutral-border bg-neutral-900 text-caption text-white">
                        <p>Tooltip on bottom</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="neutral-secondary">Left</Button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="rounded-md border border-neutral-border bg-neutral-900 text-caption text-white">
                        <p>Tooltip on left</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-body-bold text-default-font">On Icon Buttons</h3>
                <div className="rounded-md border border-neutral-border bg-default-background p-8 shadow-sm">
                  <div className="flex flex-wrap items-center gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="flex size-8 items-center justify-center rounded-md border border-neutral-border bg-default-background hover:bg-neutral-50">
                          <CalendarIcon className="size-4 text-neutral-700" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-md border border-neutral-border bg-neutral-900 text-caption text-white">
                        <p>Calendar</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="flex size-8 items-center justify-center rounded-md border border-neutral-border bg-default-background hover:bg-neutral-50">
                          <Menu className="size-4 text-neutral-700" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-md border border-neutral-border bg-neutral-900 text-caption text-white">
                        <p>Menu</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="flex size-8 items-center justify-center rounded-md border border-neutral-border bg-default-background hover:bg-neutral-50">
                          <MessageSquare className="size-4 text-neutral-700" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="rounded-md border border-neutral-border bg-neutral-900 text-caption text-white">
                        <p>Messages</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-border bg-default-background shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-md bg-brand-600">
              <Box className="size-4 text-white" />
            </div>
            <h1 className="text-heading-3 text-default-font">Design System</h1>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-10 items-center justify-center rounded-md hover:bg-neutral-100 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="size-5 text-neutral-600" />
            ) : (
              <Menu className="size-5 text-neutral-600" />
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-64 border-r border-neutral-border bg-default-background lg:block">
          <nav className="space-y-1 p-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-body transition-colors",
                    activeSection === item.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-neutral-700 hover:bg-neutral-100"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/20 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-50 w-64 border-r border-neutral-border bg-default-background lg:hidden"
              >
                <div className="flex h-16 items-center justify-between border-b border-neutral-border px-6">
                  <h2 className="text-body-bold text-default-font">Navigation</h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex size-8 items-center justify-center rounded-md hover:bg-neutral-100"
                  >
                    <X className="size-4 text-neutral-600" />
                  </button>
                </div>
                <nav className="space-y-1 p-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-body transition-colors",
                          activeSection === item.id
                            ? "bg-brand-50 text-brand-700"
                            : "text-neutral-700 hover:bg-neutral-100"
                        )}
                      >
                        <Icon className="size-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-5xl p-6 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
