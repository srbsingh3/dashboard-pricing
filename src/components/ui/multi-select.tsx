"use client";

import * as React from "react";
import { X, Search } from "lucide-react";
import { FeatherChevronDown } from "@subframe/core";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface MultiSelectOption {
  value: string;
  label: string;
  /** Optional ID to display on the right side of dropdown items */
  id?: string;
}

interface MultiSelectProps {
  options: readonly MultiSelectOption[] | MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  /** Label for selected items (e.g., "zone" becomes "3 zones selected") */
  itemLabel?: string;
  /** Whether the field is optional (shows "(optional)" after label) */
  optional?: boolean;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  label,
  itemLabel = "zone",
  optional = false,
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

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

  const toggleOption = (optionValue: string) => {
    onValueChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
    );
  };

  const clearAll = () => {
    onValueChange([]);
  };

  const selectAll = () => {
    onValueChange(options.map((opt) => opt.value));
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      clearAll();
    } else {
      selectAll();
    }
  };

  const isAllSelected = options.length > 0 && value.length === options.length;

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
              "group flex h-8 w-full items-center gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-3 text-body",
              "hover:border-neutral-300",
              "focus:border-brand-primary focus:outline-none",
              "data-[state=open]:border-brand-primary",
              disabled && "cursor-not-allowed bg-neutral-200 hover:border-neutral-border",
              value.length === 0 && "text-neutral-400"
            )}
          >
            {/* Selected count or placeholder */}
            <div className="flex min-w-0 flex-1 items-center">
              {value.length === 0 ? (
                <span className="truncate text-neutral-400">{placeholder}</span>
              ) : (
                <span className="truncate text-default-font">
                  {value.length} {value.length === 1 ? itemLabel : `${itemLabel}s`} selected
                </span>
              )}
            </div>

            {/* Right side controls */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Clear button in trigger - only show when there are selections */}
              {value.length > 0 && !disabled && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    clearAll();
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      clearAll();
                    }
                  }}
                  className="flex size-5 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none"
                  aria-label="Clear all selections"
                >
                  <X className="size-3.5" strokeWidth={2} />
                </div>
              )}

              {/* Separator */}
              {value.length > 0 && !disabled && (
                <div className="h-4 w-px bg-neutral-200" />
              )}

              {/* Chevron */}
              <FeatherChevronDown className="text-body text-subtext-color transition duration-300 group-data-[state=open]:rotate-180" />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) overflow-hidden rounded-md border border-solid border-neutral-border bg-white p-0 shadow-lg"
          align="start"
          sideOffset={4}
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
