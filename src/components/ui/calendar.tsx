"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center items-center h-7",
        caption_label: "text-body-bold text-default-font",
        nav: "absolute top-0 right-0 left-0 flex items-center justify-between z-10 h-7",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-default-background p-0 opacity-60 hover:opacity-100"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-default-background p-0 opacity-60 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "text-subtext-color w-9 font-normal text-caption",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-body focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal hover:bg-brand-50 hover:text-brand-700 aria-selected:opacity-100"
        ),
        range_start:
          "day-range-start aria-selected:bg-brand-600 aria-selected:text-white rounded-l-md",
        range_end:
          "day-range-end aria-selected:bg-brand-600 aria-selected:text-white rounded-r-md",
        selected:
          "bg-brand-600 text-white hover:bg-brand-600 hover:text-white focus:bg-brand-600 focus:text-white",
        today: "bg-neutral-100 text-default-font",
        outside:
          "day-outside text-subtext-color opacity-50 aria-selected:bg-accent/50 aria-selected:text-subtext-color aria-selected:opacity-30",
        disabled: "text-subtext-color opacity-50",
        range_middle:
          "aria-selected:bg-brand-50 aria-selected:text-brand-700",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="size-4" />
        },
      }}
      {...props}
    />
  )
}

export { Calendar }
