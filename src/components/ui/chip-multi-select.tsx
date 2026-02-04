"use client";

import * as React from "react";
import { X, Search } from "lucide-react";
import { FeatherChevronDown } from "@subframe/core";
import { cn } from "@/lib/utils";
import { Badge } from "@/subframe/components/Badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ChipMultiSelectOption {
  value: string;
  label: string;
  /** Optional ID to display on the right side of dropdown items */
  id?: string;
}

interface ChipMultiSelectProps {
  options: readonly ChipMultiSelectOption[] | ChipMultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  /** Whether the field is optional (shows "Optional" after label) */
  optional?: boolean;
  disabled?: boolean;
  className?: string;
  /** When true, shows "X selected" badge instead of individual chips (useful for narrow containers) */
  showCountOnly?: boolean;
  /** Whether to prevent auto-focus on the search input when popover opens */
  preventAutoFocus?: boolean;
}

export function ChipMultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select",
  label,
  optional = false,
  disabled = false,
  className,
  showCountOnly = false,
  preventAutoFocus = false,
}: ChipMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [visibleCount, setVisibleCount] = React.useState(value.length);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query) ||
      (opt.id && opt.id.toLowerCase().includes(query))
    );
  }, [options, searchQuery]);

  // Reset search when closing
  React.useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  // Get labels for selected values
  const selectedLabels = React.useMemo(() => {
    return value.map((v) => {
      const option = options.find((opt) => opt.value === v);
      return option?.label || v;
    });
  }, [value, options]);

  // Calculate how many chips fit in one row
  React.useLayoutEffect(() => {
    if (value.length === 0) {
      setVisibleCount(0);
      return;
    }

    const calculateVisibleChips = () => {
      const container = containerRef.current;
      const measureContainer = measureRef.current;
      if (!container || !measureContainer) {
        setVisibleCount(value.length);
        return;
      }

      // Get available width (container width minus chevron ~28px and padding)
      const containerRect = container.getBoundingClientRect();
      const availableWidth = containerRect.width - 32;

      const chips = measureContainer.children;
      if (chips.length === 0) {
        setVisibleCount(value.length);
        return;
      }

      // Approximate width for "+X more" badge
      const overflowBadgeWidth = 75;
      const gap = 6; // gap-1.5 = 6px

      let totalWidth = 0;
      let count = 0;

      for (let i = 0; i < chips.length; i++) {
        const chip = chips[i] as HTMLElement;
        const chipWidth = chip.offsetWidth;
        const widthWithGap = i === 0 ? chipWidth : chipWidth + gap;

        // Check if we need space for overflow badge
        const hasMoreChips = i < chips.length - 1;
        const spaceNeeded = hasMoreChips
          ? totalWidth + widthWithGap + gap + overflowBadgeWidth
          : totalWidth + widthWithGap;

        if (spaceNeeded <= availableWidth) {
          totalWidth += widthWithGap;
          count++;
        } else {
          break;
        }
      }

      // At minimum show 0 chips (will show overflow badge only if needed)
      setVisibleCount(Math.max(0, count));
    };

    // Run calculation
    calculateVisibleChips();

    // Recalculate on window resize
    const resizeObserver = new ResizeObserver(calculateVisibleChips);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [value, selectedLabels]);

  const toggleOption = (optionValue: string) => {
    onValueChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
    );
  };

  const removeValue = (optionValue: string, e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onValueChange(value.filter((v) => v !== optionValue));
  };

  const selectAll = () => {
    onValueChange(options.map((opt) => opt.value));
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      onValueChange([]);
    } else {
      selectAll();
    }
  };

  const isAllSelected = options.length > 0 && value.length === options.length;

  const visibleLabels = selectedLabels.slice(0, visibleCount);
  const hiddenCount = selectedLabels.length - visibleCount;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-caption-bold text-neutral-700">{label}</span>
          {optional && (
            <span className="text-caption text-neutral-400">Optional</span>
          )}
        </div>
      )}
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "group flex h-9 w-full items-center gap-1.5 rounded-md border border-solid border-neutral-border bg-default-background px-2 text-body",
            "hover:border-neutral-300",
            "focus:border-brand-primary focus:outline-none",
            "data-[state=open]:border-brand-primary",
            disabled && "cursor-not-allowed bg-neutral-200 hover:border-neutral-border"
          )}
        >
          {/* Chips container */}
          <div ref={containerRef} className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
            {value.length === 0 ? (
              <span className="truncate text-neutral-400">{placeholder}</span>
            ) : showCountOnly ? (
              /* Count-only display mode: show "X assignments selected" badge with clear button */
              <Badge
                variant="brand"
                className="shrink-0"
                iconRight={
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      onValueChange([]);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        e.preventDefault();
                        onValueChange([]);
                      }
                    }}
                    className="ml-0.5 cursor-pointer rounded-sm hover:bg-brand-200"
                  >
                    <X className="size-3" />
                  </span>
                }
              >
                {value.length} assignments selected
              </Badge>
            ) : (
              <>
                {/* Hidden measurement container - render all chips for measurement */}
                <div
                  ref={measureRef}
                  aria-hidden="true"
                  className="pointer-events-none fixed -top-[9999px] -left-[9999px] flex items-center gap-1.5"
                >
                  {selectedLabels.map((label, index) => (
                    <Badge key={`measure-${value[index]}`} variant="brand" className="shrink-0 whitespace-nowrap">
                      <span>{label}</span>
                      <span className="ml-1 inline-flex size-3" /> {/* Placeholder for X icon width */}
                    </Badge>
                  ))}
                </div>

                {/* Visible chips */}
                {visibleLabels.map((label, index) => (
                  <Badge
                    key={value[index]}
                    variant="brand"
                    className="shrink-0"
                    iconRight={
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => removeValue(value[index], e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            removeValue(value[index], e);
                          }
                        }}
                        className="ml-0.5 cursor-pointer rounded-sm hover:bg-brand-200"
                      >
                        <X className="size-3" />
                      </span>
                    }
                  >
                    {label}
                  </Badge>
                ))}

                {/* Overflow indicator */}
                {hiddenCount > 0 && (
                  <Badge variant="neutral" className="shrink-0">
                    +{hiddenCount} more
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Chevron */}
          <FeatherChevronDown className="shrink-0 text-body text-subtext-color transition duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) overflow-hidden rounded-md border border-solid border-neutral-border bg-white p-0 shadow-lg"
        align="start"
        sideOffset={4}
        onOpenAutoFocus={preventAutoFocus ? (e) => e.preventDefault() : undefined}
      >
        {/* Search input */}
        <div className="p-2">
          <div className="flex h-8 items-center gap-2 rounded-md border border-neutral-border bg-default-background px-2">
            <Search className="size-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-body text-default-font placeholder:text-neutral-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Options list */}
        <div className="max-h-56 overflow-y-auto pb-1 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-track]:bg-transparent">
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-caption text-neutral-400">
              No results found
            </div>
          ) : (
            <>
              {/* Select All option - only show when not searching */}
              {!searchQuery && (
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className={cn(
                    "flex h-8 w-full cursor-pointer items-center gap-2 px-3 text-body transition-colors",
                    "hover:bg-neutral-100",
                    isAllSelected && "bg-brand-50 text-brand-600"
                  )}
                >
                  <span className="flex-1 text-left text-neutral-500">Select All</span>
                </button>
              )}

              {/* Options */}
              {filteredOptions.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleOption(option.value)}
                    className={cn(
                      "flex h-8 w-full cursor-pointer items-center gap-2 px-3 text-body transition-colors",
                      "hover:bg-neutral-100",
                      isSelected && "bg-brand-50 text-brand-600"
                    )}
                  >
                    <span className="flex-1 truncate text-left">
                      {option.label}
                    </span>
                    {/* ID on right - shows when option has an ID */}
                    {option.id && (
                      <span className="shrink-0 text-caption text-neutral-400">
                        {option.id}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
    </div>
  );
}
