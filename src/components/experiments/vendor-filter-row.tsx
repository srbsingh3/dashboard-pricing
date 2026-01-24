"use client";

import * as React from "react";
import { Trash2, Calendar, Power, Link, MapPin, Users, Truck, Crown, Tag, Building2, Layers, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  VENDOR_FILTER_CONDITIONS,
  VENDOR_FILTER_FIELDS,
  VENDOR_CITIES,
  CUSTOMER_TYPES,
  DELIVERY_TYPES,
  MARKETING_TAGS,
  VENDOR_NAMES,
  VENDOR_CHAINS,
  ZONES,
  VERTICAL_TYPES,
  ACTIVE_STATUS,
  KEY_ACCOUNT_STATUS,
} from "@/lib/constants";

// Icon mapping for filter fields
const FIELD_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar,
  Power,
  Link,
  MapPin,
  Users,
  Truck,
  Crown,
  Tag,
  Building2,
  Layers,
  Map,
};

export interface VendorFilter {
  id: string;
  field: string;
  condition: string;
  values: string[];
}

interface VendorFilterRowProps {
  filter: VendorFilter;
  onUpdate: (filter: VendorFilter) => void;
  onDelete: () => void;
  isAnimating?: boolean;
}

// Get options for a specific field
function getFieldOptions(field: string) {
  switch (field) {
    case "city_names":
      return VENDOR_CITIES;
    case "zone_names":
      return ZONES;
    case "customer_types":
      return CUSTOMER_TYPES;
    case "delivery_types":
      return DELIVERY_TYPES;
    case "marketing_tags":
      return MARKETING_TAGS;
    case "vendor_name":
      return VENDOR_NAMES;
    case "chain_name":
      return VENDOR_CHAINS.filter(c => c.value !== "all");
    case "vertical_type":
      return VERTICAL_TYPES.filter(v => v.value !== "all");
    case "active":
      return ACTIVE_STATUS;
    case "key_account":
      return KEY_ACCOUNT_STATUS;
    default:
      return [];
  }
}

// Get item label for multi-select display
function getItemLabel(field: string): string {
  switch (field) {
    case "city_names":
      return "city";
    case "zone_names":
      return "zone";
    case "customer_types":
      return "type";
    case "delivery_types":
      return "type";
    case "marketing_tags":
      return "tag";
    case "vendor_name":
      return "vendor";
    case "chain_name":
      return "chain";
    case "vertical_type":
      return "vertical";
    case "active":
    case "key_account":
      return "option";
    default:
      return "item";
  }
}

export function VendorFilterRow({
  filter,
  onUpdate,
  onDelete,
  isAnimating = false,
}: VendorFilterRowProps) {
  const fieldOptions = getFieldOptions(filter.field);
  const isDateField = filter.field === "activation_date";

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        isAnimating && "animate-in duration-200 fade-in-0 slide-in-from-top-2"
      )}
    >
      {/* Field selector */}
      <div className="w-40 shrink-0">
        <Select
          value={filter.field}
          onValueChange={(value) => onUpdate({ ...filter, field: value, values: [] })}
        >
          <SelectTrigger
            size="sm"
            className="h-9 w-full border-neutral-border bg-default-background text-body shadow-none focus:border-brand-primary focus:ring-0 focus-visible:border-brand-primary focus-visible:ring-0 [&>svg]:text-subtext-color"
          >
            <SelectValue placeholder="Select field" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            sideOffset={4}
            className="border-neutral-border bg-white shadow-lg"
          >
            {VENDOR_FILTER_FIELDS.map((field) => {
              const Icon = FIELD_ICONS[field.icon];
              return (
                <SelectItem
                  key={field.value}
                  value={field.value}
                  className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600"
                >
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="size-3.5 text-neutral-500" />}
                    <span>{field.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Condition selector */}
      <div className="w-36 shrink-0">
        <Select
          value={filter.condition}
          onValueChange={(value) => onUpdate({ ...filter, condition: value })}
        >
          <SelectTrigger
            size="sm"
            className="h-9 w-full border-neutral-border bg-default-background text-body shadow-none focus:border-brand-primary focus:ring-0 focus-visible:border-brand-primary focus-visible:ring-0 [&>svg]:text-subtext-color"
          >
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            sideOffset={4}
            className="border-neutral-border bg-white shadow-lg"
          >
            {VENDOR_FILTER_CONDITIONS.map((condition) => (
              <SelectItem
                key={condition.value}
                value={condition.value}
                className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600"
              >
                {condition.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Value selector - Multi-select or date input */}
      <div className="min-w-48 flex-1">
        {isDateField ? (
          <input
            type="date"
            value={filter.values[0] || ""}
            onChange={(e) => onUpdate({ ...filter, values: [e.target.value] })}
            className={cn(
              "flex h-9 w-full items-center rounded-md border border-neutral-border bg-default-background px-3 text-body",
              "hover:border-neutral-300",
              "focus:border-brand-primary focus:outline-none"
            )}
          />
        ) : (
          <MultiSelect
            options={[...fieldOptions]}
            value={filter.values}
            onValueChange={(values) => onUpdate({ ...filter, values })}
            placeholder="Select values..."
            itemLabel={getItemLabel(filter.field)}
            className="[&>div:first-child]:hidden"
          />
        )}
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={onDelete}
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md text-neutral-400",
          "transition-colors hover:bg-error-50 hover:text-error-600",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-error-500/30"
        )}
        aria-label="Remove filter"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

interface VendorFilterListProps {
  filters: VendorFilter[];
  onFiltersChange: (filters: VendorFilter[]) => void;
}

export function VendorFilterList({
  filters,
  onFiltersChange,
}: VendorFilterListProps) {
  const [animatingId, setAnimatingId] = React.useState<string | null>(null);

  const updateFilter = (index: number, updatedFilter: VendorFilter) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    onFiltersChange(newFilters);
  };

  const deleteFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    onFiltersChange(newFilters);
  };

  React.useEffect(() => {
    if (animatingId) {
      const timer = setTimeout(() => setAnimatingId(null), 200);
      return () => clearTimeout(timer);
    }
  }, [animatingId]);

  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 border-t border-neutral-100 pt-3">
      {filters.map((filter) => (
        <VendorFilterRow
          key={filter.id}
          filter={filter}
          onUpdate={(updated) => updateFilter(filters.indexOf(filter), updated)}
          onDelete={() => deleteFilter(filters.indexOf(filter))}
          isAnimating={animatingId === filter.id}
        />
      ))}
    </div>
  );
}

// Helper to generate unique IDs
export function generateFilterId(): string {
  return `filter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
