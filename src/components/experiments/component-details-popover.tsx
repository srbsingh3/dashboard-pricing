"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import {
  SearchSelect,
  type SearchSelectOption,
} from "@/components/ui/search-select";
import { COMPONENT_DETAILS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Route,
  CircleDot,
  Clock,
  BarChart3,
  Pencil,
  ArrowUpRight,
} from "lucide-react";

// Type badge styles mapped to component detail types
const TYPE_CONFIG: Record<
  string,
  { label: string; className: string; icon: React.ComponentType<{ className?: string }> }
> = {
  distance_based: {
    label: "Distance-based",
    className: "bg-brand-50 text-brand-700",
    icon: Route,
  },
  fixed: {
    label: "Fixed",
    className: "bg-neutral-100 text-neutral-600",
    icon: CircleDot,
  },
  time_based: {
    label: "Time-based",
    className: "bg-warning-50 text-warning-700",
    icon: Clock,
  },
  percentage_based: {
    label: "Value-based",
    className: "bg-success-50 text-success-700",
    icon: BarChart3,
  },
};

/** Popover content that renders component tier details */
function ComponentDetailsContent({
  componentValue,
}: {
  componentValue: string;
}) {
  const detail = COMPONENT_DETAILS[componentValue];

  if (!detail) {
    return (
      <div className="px-4 py-6 text-center text-body text-neutral-400">
        No details available
      </div>
    );
  }

  const typeConfig = TYPE_CONFIG[detail.type] ?? TYPE_CONFIG.fixed;
  const TypeIcon = typeConfig.icon;

  return (
    <div className="w-[304px]">
      {/* Header */}
      <div className="border-b border-neutral-border px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-body-bold text-default-font">{detail.label}</h4>
          <span className="shrink-0 rounded-md bg-neutral-100 px-1.5 py-0.5 text-caption text-neutral-400">
            #{detail.id}
          </span>
        </div>
        <div className="mt-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-caption-bold",
              typeConfig.className
            )}
          >
            <TypeIcon className="size-3" />
            {typeConfig.label}
          </span>
        </div>
      </div>

      {/* Tiers */}
      <div className="px-4 py-3">
        <div className="overflow-hidden rounded-lg border border-neutral-border">
          {/* Table header */}
          <div className="flex items-center bg-neutral-50 px-3 py-2">
            <span className="flex-1 text-caption-bold text-neutral-500">
              {detail.tierLabel}
            </span>
            <span className="w-24 text-right text-caption-bold text-neutral-500">
              {detail.valueLabel}
            </span>
          </div>
          {/* Table rows */}
          {detail.tiers.map((tier, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center px-3 py-2",
                i > 0 && "border-t border-neutral-100"
              )}
            >
              <span className="flex-1 text-body text-default-font">
                {tier.range}
              </span>
              <span className="w-24 text-right text-body-bold text-default-font">
                {tier.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit button */}
      <div className="border-t border-neutral-border px-4 py-3">
        <button
          type="button"
          className="flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-neutral-border text-body-bold text-default-font transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 active:bg-neutral-100"
        >
          <Pencil className="size-3.5" />
          Edit component
          <ArrowUpRight className="size-3 text-neutral-400" />
        </button>
      </div>
    </div>
  );
}

/**
 * Wraps a SearchSelect with a details popover.
 * When the eye icon is clicked, a popover shows the component tier breakdown.
 * Uses PopoverAnchor (not PopoverTrigger) to avoid nesting conflicts
 * with SearchSelect's internal popover.
 */
export function ComponentDetailCell({
  options,
  value,
  onValueChange,
  placeholder,
  showDetailsIcon,
}: {
  options: readonly SearchSelectOption[] | SearchSelectOption[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder: string;
  showDetailsIcon: boolean;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Popover open={detailsOpen} onOpenChange={setDetailsOpen}>
      <PopoverAnchor asChild>
        <div>
          <SearchSelect
            options={options}
            value={value}
            onValueChange={onValueChange}
            placeholder={placeholder}
            variant="ghost"
            showDetailsIcon={showDetailsIcon}
            onDetailsClick={() => setDetailsOpen(true)}
          />
        </div>
      </PopoverAnchor>
      {value && value !== "same_as_control" && (
        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={4}
          className="w-auto overflow-hidden rounded-lg border border-solid border-neutral-border bg-white p-0 shadow-lg"
        >
          <ComponentDetailsContent componentValue={value} />
        </PopoverContent>
      )}
    </Popover>
  );
}
