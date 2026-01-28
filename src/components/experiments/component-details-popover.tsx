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
import { Pencil } from "lucide-react";

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

  return (
    <div className="w-[280px]">
      {/* Header: label + edit icon */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h4 className="text-body-bold text-default-font">{detail.label}</h4>
        <button
          type="button"
          className="shrink-0 rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        >
          <Pencil className="size-3.5" />
        </button>
      </div>

      {/* Tier rows in a simple card */}
      <div className="px-4 pb-4">
        <div className="rounded-md border border-neutral-border px-4 py-3">
          {detail.tiers.map((tier, i) => (
            <div
              key={i}
              className={i > 0 ? "mt-3" : undefined}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-body text-neutral-500">
                  {tier.range}
                </span>
                <span className="text-body-bold text-default-font">
                  {tier.value}
                </span>
              </div>
            </div>
          ))}
        </div>
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
        <div data-state={detailsOpen ? "open" : "closed"}>
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
          className="w-auto overflow-hidden rounded-md border border-solid border-neutral-border bg-white p-0 shadow-lg"
        >
          <ComponentDetailsContent componentValue={value} />
        </PopoverContent>
      )}
    </Popover>
  );
}
