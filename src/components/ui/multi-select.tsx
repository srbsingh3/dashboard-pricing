"use client";

import * as React from "react";
import { X, Check, Minus } from "lucide-react";
import { FeatherChevronDown } from "@subframe/core";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: readonly MultiSelectOption[] | MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  label?: string;
  /** Label for selected items (e.g., "zone" becomes "3 zones selected") */
  itemLabel?: string;
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
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

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
  const isSomeSelected = value.length > 0 && value.length < options.length;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <span className="text-caption-bold text-neutral-700">{label}</span>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "group flex min-h-8 w-full items-center gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-1 text-body transition-colors",
              "focus:border-brand-primary focus:outline-none",
              "data-[state=open]:border-brand-primary",
              disabled && "cursor-not-allowed bg-neutral-200",
              value.length === 0 && "text-neutral-400"
            )}
          >
            {/* Selected count chip or placeholder */}
            <div className="flex min-w-0 flex-1 items-center">
              {value.length === 0 ? (
                <span className="truncate text-neutral-400">{placeholder}</span>
              ) : (
                <span
                  className={cn(
                    "inline-flex items-center rounded-sm border border-brand-200 bg-brand-50 px-1.5 text-(length:--text-caption) text-brand-700",
                    "animate-in duration-150 fade-in-0 zoom-in-95",
                  )}
                >
                  {value.length} {value.length === 1 ? itemLabel : `${itemLabel}s`} selected
                </span>
              )}
            </div>

            {/* Right side controls */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Clear button in trigger - only show when there are selections */}
              {value.length > 0 && !disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    clearAll();
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                  className="flex size-5 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus:outline-none"
                  aria-label="Clear all selections"
                >
                  <X className="size-3.5" strokeWidth={2} />
                </button>
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
          <Command className="bg-white">
            {/* Search input */}
            <div className="px-1 py-1.5">
              <CommandInput
                placeholder="Search..."
                className="h-8 text-body"
              />
            </div>

            <CommandList className="max-h-56 overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-thumb]:bg-clip-padding [&::-webkit-scrollbar-track]:bg-transparent">
              <CommandEmpty className="py-6 text-center text-caption text-neutral-400">
                No results found
              </CommandEmpty>

              {/* Select All option */}
              <CommandGroup>
                <CommandItem
                  onSelect={toggleSelectAll}
                  className="ml-1 mt-1 flex cursor-pointer items-center gap-2 rounded-md p-2 text-body transition-colors aria-selected:bg-neutral-50"
                >
                  {/* Subframe-style checkbox with indeterminate state */}
                  <div
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-sm border-2 border-solid transition-all duration-150",
                      isAllSelected || isSomeSelected
                        ? "border-brand-600 bg-brand-600"
                        : "border-neutral-300 bg-default-background"
                    )}
                  >
                    {isAllSelected ? (
                      <Check className="size-3.5 text-white" strokeWidth={3} />
                    ) : isSomeSelected ? (
                      <Minus className="size-3.5 text-white" strokeWidth={3} />
                    ) : null}
                  </div>
                  <span className="text-neutral-500">Select All</span>
                </CommandItem>
              </CommandGroup>

              {/* Options list */}
              <CommandGroup className="pt-1">
                {options.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggleOption(option.value)}
                      className={cn(
                        "ml-1 flex cursor-pointer items-center gap-2 rounded-md p-2 text-body transition-colors",
                        "aria-selected:bg-neutral-50",
                        isSelected && "bg-brand-50/50"
                      )}
                    >
                      {/* Subframe-style checkbox */}
                      <div
                        className={cn(
                          "flex size-4 shrink-0 items-center justify-center rounded-sm border-2 border-solid transition-all duration-150",
                          isSelected
                            ? "border-brand-600 bg-brand-600"
                            : "border-neutral-300 bg-default-background"
                        )}
                      >
                        <Check
                          className={cn(
                            "size-3.5 text-white transition-all duration-150",
                            isSelected ? "scale-100 opacity-100" : "scale-75 opacity-0"
                          )}
                          strokeWidth={3}
                        />
                      </div>

                      {/* Option label */}
                      <span className={cn(
                        "flex-1 truncate",
                        isSelected && "font-medium text-brand-700"
                      )}>
                        {option.label}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
