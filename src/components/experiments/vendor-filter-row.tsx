"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Power, Link, MapPin, Users, Truck, Crown, Tag, Building2, Layers, Map, Equal } from "lucide-react";
import { FeatherTrash2 } from "@subframe/core";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChipMultiSelect } from "@/components/ui/chip-multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/subframe/components/Calendar";
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
  ASSIGNMENT_NAMES,
} from "@/lib/constants";

// Icon mapping for filter fields
const FIELD_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Calendar: CalendarIcon,
  Equal,
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

// Binary fields that should use simple select instead of multi-select
const BINARY_FIELDS = ["active", "key_account"];

function isBinaryField(field: string): boolean {
  return BINARY_FIELDS.includes(field);
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
    case "assignment":
      return ASSIGNMENT_NAMES;
    default:
      return [];
  }
}

// Format date for display (e.g., "Jan 15, 2025")
function formatDateForDisplay(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Parse date string to Date object
function parseDateString(dateString: string): Date | undefined {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? undefined : date;
}

// Format Date object to ISO date string (YYYY-MM-DD)
function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Date picker field component using Calendar with Popover
interface DatePickerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false);
  const selectedDate = parseDateString(value);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(formatDateToISO(date));
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-neutral-border bg-default-background px-2 text-body",
            "transition-colors hover:border-neutral-300",
            "focus:border-brand-primary focus:outline-none",
            !value && "text-neutral-400"
          )}
        >
          <span>{value ? formatDateForDisplay(value) : "Select date"}</span>
          <CalendarIcon className="size-4 text-subtext-color" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto border-neutral-border bg-white p-4 shadow-lg"
        align="start"
        sideOffset={4}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          defaultMonth={selectedDate}
        />
      </PopoverContent>
    </Popover>
  );
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
      <div className="w-44 shrink-0">
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
      <div className="w-22 shrink-0">
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

      {/* Value selector - Date input, binary select, or multi-select */}
      <div className="min-w-48 flex-1">
        {isDateField ? (
          <DatePickerField
            value={filter.values[0] || ""}
            onChange={(value) => onUpdate({ ...filter, values: [value] })}
          />
        ) : isBinaryField(filter.field) ? (
          <Select
            value={filter.values[0] || ""}
            onValueChange={(value) => onUpdate({ ...filter, values: [value] })}
          >
            <SelectTrigger
              size="sm"
              className="h-9 w-full border-neutral-border bg-default-background px-2 text-body shadow-none focus:border-brand-primary focus:ring-0 focus-visible:border-brand-primary focus-visible:ring-0 data-placeholder:text-neutral-400 [&>svg]:text-subtext-color"
            >
              <SelectValue placeholder="Select values" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              sideOffset={4}
              className="border-neutral-border bg-white shadow-lg"
            >
              {fieldOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <ChipMultiSelect
            options={[...fieldOptions]}
            value={filter.values}
            onValueChange={(values) => onUpdate({ ...filter, values })}
            placeholder="Select values"
          />
        )}
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={onDelete}
        className="group/delete flex size-8 shrink-0 items-center justify-center rounded-md transition-all hover:bg-error-50"
        aria-label="Remove filter"
      >
        <FeatherTrash2 className="text-body text-subtext-color group-hover/delete:text-error-600" />
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
