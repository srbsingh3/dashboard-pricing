"use client";

import { useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  OrdersTrendChart,
  DeliveryFeeTrendChart,
  CityPerformanceChart,
  DeliveryFeeByCityChart,
  VerticalBreakdownChart,
  DeliveryFeeDistributionChart,
} from "@/components/dashboard/charts";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { ScrollContainer } from "@/components/ui/scroll-container";
import { kpiMetrics } from "@/lib/mock-data";
import type { KPIMetric } from "@/lib/types";

// Format KPI values based on their type
function formatKPIValue(value: number, format: string): string {
  switch (format) {
    case "currency":
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    case "currency_whole":
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    case "percentage":
      return value.toFixed(1);
    case "number":
      return value.toLocaleString("en-US");
    default:
      return value.toString();
  }
}

// KPI Cell component matching Subframe Reporting Dashboard pattern
function KPICell({ metric, isLast }: { metric: KPIMetric; isLast: boolean }) {
  const TrendIcon =
    metric.changeType === "positive"
      ? TrendingUp
      : metric.changeType === "negative"
        ? TrendingDown
        : Minus;

  return (
    <>
      <div className="flex shrink-0 grow basis-0 flex-col items-center justify-center gap-2 p-4">
        {/* Label */}
        <span className="text-center text-body-bold text-default-font">
          {metric.label}
        </span>

        {/* Value with prefix/suffix */}
        <div className="flex items-baseline justify-center gap-1">
          {metric.prefix && (
            <span className="text-body text-subtext-color">{metric.prefix}</span>
          )}
          <span className="text-center text-heading-1 whitespace-nowrap text-default-font">
            {formatKPIValue(metric.value, metric.format)}
          </span>
          {metric.suffix && (
            <span className="text-heading-3 text-subtext-color">{metric.suffix}</span>
          )}
        </div>

        {/* Trend indicator */}
        <div
          className={cn(
            "flex items-center gap-1",
            metric.changeType === "positive" && "text-success-600",
            metric.changeType === "negative" && "text-error-600",
            metric.changeType === "neutral" && "text-subtext-color"
          )}
        >
          <TrendIcon className="size-3" />
          <span className="text-caption whitespace-nowrap">
            {metric.changeType === "positive" ? "+" : metric.changeType === "negative" ? "" : ""}
            {metric.change.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Vertical divider between cells */}
      {!isLast && (
        <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch bg-neutral-border" />
      )}
    </>
  );
}

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard • DPS";
  }, []);

  return (
    <div className="flex h-full flex-col rounded-md border border-neutral-border-subtle bg-default-background shadow-sm">
      <ScrollContainer className="flex-1">
        <div className="mx-auto max-w-[1600px] space-y-6 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-heading-2 text-default-font">Dashboard</h1>
            <DateRangePicker defaultPreset="30d" />
          </div>

          {/* KPI Summary Strip - Subframe Reporting Dashboard Style */}
          <div className="flex w-full flex-wrap items-start rounded-md border border-solid border-neutral-border bg-default-background">
            {kpiMetrics.map((metric, index) => (
              <KPICell
                key={metric.id}
                metric={metric}
                isLast={index === kpiMetrics.length - 1}
              />
            ))}
          </div>

          {/* Row 1: Trend Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <OrdersTrendChart />
            <DeliveryFeeTrendChart />
          </div>

          {/* Row 2: City Analysis */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CityPerformanceChart />
            <DeliveryFeeByCityChart />
          </div>

          {/* Row 3: Vertical & Fee Distribution */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <VerticalBreakdownChart />
            <DeliveryFeeDistributionChart />
          </div>
        </div>
      </ScrollContainer>
    </div>
  );
}
