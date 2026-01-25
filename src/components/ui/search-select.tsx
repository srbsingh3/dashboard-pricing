"use client";

import * as React from "react";
import { Search, Eye } from "lucide-react";
import { FeatherChevronDown } from "@subframe/core";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface SearchSelectOption {
  value: string;
  label: string;
  /** Optional ID to display on the right side of dropdown items */
  id?: string;
}

interface SearchSelectProps {
  options: readonly SearchSelectOption[] | SearchSelectOption[];
  value: string | null;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Style variant - 'default' has border, 'ghost' is borderless for table cells */
  variant?: "default" | "ghost";
  /** Whether to show the search input - defaults to true */
  showSearch?: boolean;
  /** Show details icon when a value is selected (appears on hover next to chevron) */
  showDetailsIcon?: boolean;
  /** Callback when the details icon is clicked */
  onDetailsClick?: () => void;
}

export function SearchSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  disabled = false,
  className,
  variant = "default",
  showSearch = true,
  showDetailsIcon = false,
  onDetailsClick,
}: SearchSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query) ||
      (opt.id && opt.id.toLowerCase().includes(query))
    );
  }, [options, searchQuery]);

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue === value ? null : optionValue);
    setOpen(false);
    setSearchQuery("");
  };

  // Reset search when closing
  React.useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "group flex h-8 w-full items-center justify-between gap-2 text-body",
            "focus:outline-none",
            variant === "default" && [
              "rounded-md border border-solid border-neutral-border bg-default-background px-3",
              "hover:border-neutral-300",
              "focus:border-brand-primary",
              "data-[state=open]:border-brand-primary",
            ],
            variant === "ghost" && [
              "bg-transparent",
            ],
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          <span
            className={cn(
              "flex-1 truncate text-left text-body",
              !selectedOption && "text-neutral-400",
              selectedOption && "text-default-font"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          {/* Details icon - shows on hover when enabled and a value is selected */}
          {showDetailsIcon && selectedOption && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onDetailsClick?.();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onDetailsClick?.();
                }
              }}
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-sm transition-opacity hover:bg-neutral-200",
                variant === "ghost" && "opacity-0 group-hover:opacity-100 group-hover/row:opacity-100"
              )}
              aria-label="View details"
            >
              <Eye className="size-3.5 text-neutral-500" />
            </span>
          )}

          <FeatherChevronDown
            className={cn(
              "shrink-0 text-body text-subtext-color transition duration-200",
              variant === "ghost" && "mr-2 opacity-0 group-hover:opacity-100 group-hover/row:opacity-100",
              open && "rotate-180",
              open && variant === "ghost" && "opacity-100"
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-(--radix-popover-trigger-width) overflow-hidden rounded-md border border-solid border-neutral-border bg-white p-0 shadow-lg"
        align="start"
        sideOffset={4}
      >
        {/* Search input */}
        {showSearch && (
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
        )}

        {/* Options list */}
        <div className={cn("max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-track]:bg-transparent", showSearch ? "pb-1" : "py-1")}>
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-caption text-neutral-400">
              No results found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
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
            })
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
