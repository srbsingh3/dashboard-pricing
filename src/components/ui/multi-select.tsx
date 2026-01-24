"use client";

import * as React from "react";
import { X, Check, ChevronDown, Minus } from "lucide-react";
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
  CommandSeparator,
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
  disabled?: boolean;
  className?: string;
  maxDisplayedChips?: number;
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select...",
  label,
  disabled = false,
  className,
  maxDisplayedChips = 2,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (optionValue: string) => {
    onValueChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
    );
  };

  const removeChip = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onValueChange(value.filter((v) => v !== optionValue));
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

  const selectedOptions = options.filter((opt) => value.includes(opt.value));
  const displayedChips = selectedOptions.slice(0, maxDisplayedChips);
  const remainingCount = selectedOptions.length - maxDisplayedChips;

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
              "group flex min-h-9 w-full items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-body transition-all duration-150",
              "hover:border-neutral-300",
              "focus:border-brand-500 focus:ring-2 focus:ring-brand-100 focus:outline-none",
              "data-[state=open]:border-brand-500 data-[state=open]:ring-2 data-[state=open]:ring-brand-100",
              disabled && "cursor-not-allowed bg-neutral-50 opacity-60",
              value.length === 0 && "text-neutral-400"
            )}
          >
            {/* Selected chips or placeholder */}
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {value.length === 0 ? (
                <span className="truncate py-0.5 text-neutral-400">{placeholder}</span>
              ) : (
                <>
                  {displayedChips.map((option, index) => (
                    <span
                      key={option.value}
                      className={cn(
                        "inline-flex max-w-[140px] items-center gap-1 rounded-md border border-brand-200 bg-brand-50 py-0.5 pr-1 pl-2 text-caption text-brand-700",
                        "animate-in duration-150 fade-in-0 zoom-in-95",
                      )}
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <span className="truncate">{option.label}</span>
                      <button
                        type="button"
                        onClick={(e) => removeChip(option.value, e)}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="flex size-4 shrink-0 items-center justify-center rounded-sm transition-colors hover:bg-brand-200/60 focus:bg-brand-200/60 focus:outline-none"
                        disabled={disabled}
                        aria-label={`Remove ${option.label}`}
                      >
                        <X className="size-3" strokeWidth={2.5} />
                      </button>
                    </span>
                  ))}
                  {remainingCount > 0 && (
                    <span className="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-caption text-neutral-600">
                      +{remainingCount}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Right side controls */}
            <div className="flex shrink-0 items-center gap-1">
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
              <ChevronDown
                className={cn(
                  "size-4 text-neutral-400 transition-transform duration-200",
                  open && "rotate-180"
                )}
              />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) overflow-hidden rounded-lg border border-neutral-200 p-0 shadow-lg"
          align="start"
          sideOffset={4}
        >
          <Command className="bg-white">
            {/* Search input */}
            <div className="border-b border-neutral-100 px-1 py-1.5">
              <CommandInput
                placeholder="Search..."
                className="h-8 text-body"
              />
            </div>

            <CommandList className="max-h-56 overflow-y-auto">
              <CommandEmpty className="py-6 text-center text-caption text-neutral-400">
                No results found
              </CommandEmpty>

              {/* Select All option */}
              <CommandGroup>
                <CommandItem
                  onSelect={toggleSelectAll}
                  className="mx-1 mt-1 flex cursor-pointer items-center gap-2 rounded-md p-2 text-body transition-colors aria-selected:bg-neutral-50"
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
                  <span className="text-neutral-500">(Select All)</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator className="my-1" />

              {/* Options list */}
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggleOption(option.value)}
                      className={cn(
                        "mx-1 flex cursor-pointer items-center gap-2 rounded-md p-2 text-body transition-colors",
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

            {/* Footer with Clear button */}
            <div className="border-t border-neutral-100 px-1 py-1.5">
              <button
                type="button"
                onClick={clearAll}
                disabled={value.length === 0}
                className={cn(
                  "rounded-md px-3 py-1.5 text-body transition-colors",
                  value.length > 0
                    ? "text-neutral-700 hover:bg-neutral-100"
                    : "cursor-not-allowed text-neutral-300"
                )}
              >
                Clear
              </button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
