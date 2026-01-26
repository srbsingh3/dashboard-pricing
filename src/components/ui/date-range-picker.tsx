"use client"

import * as React from "react"
import { CalendarDays, ChevronDown, Check } from "lucide-react"
import { format, subDays, subMonths, startOfMonth, endOfMonth } from "date-fns"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Preset date range options
const DATE_PRESETS = [
  {
    id: "today",
    label: "Today",
    getValue: () => {
      const today = new Date()
      return { from: today, to: today }
    },
  },
  {
    id: "yesterday",
    label: "Yesterday",
    getValue: () => {
      const yesterday = subDays(new Date(), 1)
      return { from: yesterday, to: yesterday }
    },
  },
  {
    id: "7d",
    label: "Last 7 days",
    getValue: () => ({
      from: subDays(new Date(), 6),
      to: new Date(),
    }),
  },
  {
    id: "30d",
    label: "Last 30 days",
    getValue: () => ({
      from: subDays(new Date(), 29),
      to: new Date(),
    }),
  },
  {
    id: "this_month",
    label: "This month",
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: new Date(),
    }),
  },
  {
    id: "last_month",
    label: "Last month",
    getValue: () => {
      const lastMonth = subMonths(new Date(), 1)
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
      }
    },
  },
  {
    id: "90d",
    label: "Last 90 days",
    getValue: () => ({
      from: subDays(new Date(), 89),
      to: new Date(),
    }),
  },
] as const

type PresetId = (typeof DATE_PRESETS)[number]["id"] | "custom"

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  defaultPreset?: PresetId
  className?: string
  align?: "start" | "center" | "end"
}

export function DateRangePicker({
  value,
  onChange,
  defaultPreset = "30d",
  className,
  align = "end",
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<PresetId>(defaultPreset)
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(() => {
    if (value) return value
    const preset = DATE_PRESETS.find((p) => p.id === defaultPreset)
    return preset?.getValue()
  })
  const [tempDateRange, setTempDateRange] = React.useState<DateRange | undefined>(dateRange)

  // Sync external value
  React.useEffect(() => {
    if (value) {
      setDateRange(value)
      setTempDateRange(value)
    }
  }, [value])

  const handlePresetClick = (presetId: PresetId) => {
    if (presetId === "custom") {
      setSelectedPreset("custom")
      return
    }

    const preset = DATE_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      const range = preset.getValue()
      setSelectedPreset(presetId)
      setTempDateRange(range)
    }
  }

  const handleApply = () => {
    setDateRange(tempDateRange)
    onChange?.(tempDateRange)
    setOpen(false)
  }

  const handleCancel = () => {
    setTempDateRange(dateRange)
    setSelectedPreset(
      DATE_PRESETS.find((p) => {
        const presetRange = p.getValue()
        return (
          dateRange?.from?.toDateString() === presetRange.from.toDateString() &&
          dateRange?.to?.toDateString() === presetRange.to.toDateString()
        )
      })?.id ?? "custom"
    )
    setOpen(false)
  }

  const handleCalendarSelect = (range: DateRange | undefined) => {
    setTempDateRange(range)
    setSelectedPreset("custom")
  }

  // Format the display text
  const displayText = React.useMemo(() => {
    if (!dateRange?.from) return "Select date range"

    if (dateRange.to) {
      // Check if it matches a preset
      if (selectedPreset !== "custom") {
        const preset = DATE_PRESETS.find((p) => p.id === selectedPreset)
        if (preset) return preset.label
      }

      // Show date range
      return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")}`
    }

    return format(dateRange.from, "MMM d, yyyy")
  }, [dateRange, selectedPreset])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 gap-2 border-neutral-border bg-default-background px-3 text-body hover:bg-neutral-50",
            className
          )}
        >
          <CalendarDays className="size-4 text-subtext-color" />
          <span className="text-default-font">{displayText}</span>
          <ChevronDown className="size-3 text-subtext-color" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-auto p-0 shadow-lg"
        sideOffset={8}
      >
        <div className="flex">
          {/* Presets sidebar */}
          <div className="flex w-40 flex-col border-r border-neutral-border bg-neutral-50/50 p-2">
            <div className="mb-2 px-2 py-1.5">
              <span className="text-caption-bold tracking-wide text-subtext-color uppercase">
                Presets
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              {DATE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetClick(preset.id)}
                  className={cn(
                    "flex items-center justify-between rounded-md px-2 py-1.5 text-left text-body transition-colors",
                    selectedPreset === preset.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-default-font hover:bg-neutral-100"
                  )}
                >
                  <span>{preset.label}</span>
                  {selectedPreset === preset.id && (
                    <Check className="size-3.5 text-brand-600" />
                  )}
                </button>
              ))}
              <div className="my-1.5 h-px bg-neutral-border" />
              <button
                onClick={() => handlePresetClick("custom")}
                className={cn(
                  "flex items-center justify-between rounded-md px-2 py-1.5 text-left text-body transition-colors",
                  selectedPreset === "custom"
                    ? "bg-brand-50 text-brand-700"
                    : "text-default-font hover:bg-neutral-100"
                )}
              >
                <span>Custom range</span>
                {selectedPreset === "custom" && (
                  <Check className="size-3.5 text-brand-600" />
                )}
              </button>
            </div>
          </div>

          {/* Calendar area */}
          <div className="flex flex-col">
            <Calendar
              mode="range"
              defaultMonth={tempDateRange?.from}
              selected={tempDateRange}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              disabled={{ after: new Date() }}
            />

            {/* Selected range display & actions */}
            <div className="flex items-center justify-between border-t border-neutral-border px-4 py-3">
              <div className="text-body text-subtext-color">
                {tempDateRange?.from ? (
                  <>
                    <span className="text-default-font">
                      {format(tempDateRange.from, "MMM d, yyyy")}
                    </span>
                    {tempDateRange.to && (
                      <>
                        <span className="mx-2">→</span>
                        <span className="text-default-font">
                          {format(tempDateRange.to, "MMM d, yyyy")}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  "Pick a date range"
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="h-8 px-3"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={!tempDateRange?.from || !tempDateRange?.to}
                  className="h-8 px-4"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
