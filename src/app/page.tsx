"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterBar } from "@/components/dashboard/filter-bar";
import {
  OrdersTrendChart,
  DeliveryFeeTrendChart,
  CityPerformanceChart,
  DeliveryFeeByCityChart,
  VerticalBreakdownChart,
  DeliveryFeeDistributionChart,
} from "@/components/dashboard/charts";
import { kpiMetrics } from "@/lib/mock-data";
import type { KPIMetric } from "@/lib/types";

// Compact KPI Card for the top row
function CompactKPICard({ metric }: { metric: KPIMetric }) {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case "currency":
        return value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      case "percentage":
        return value.toFixed(1);
      case "number":
        return value.toLocaleString("en-US");
      default:
        return value.toString();
    }
  };

  const TrendIcon =
    metric.changeType === "positive"
      ? TrendingUp
      : metric.changeType === "negative"
        ? TrendingDown
        : Minus;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-1.5">
        {metric.prefix && (
          <span className="text-caption text-neutral-500">{metric.prefix}</span>
        )}
        <span className="text-heading-2 text-neutral-900">
          {formatValue(metric.value, metric.format)}
        </span>
        {metric.suffix && (
          <span className="text-heading-3 text-neutral-500">{metric.suffix}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-body text-neutral-500">{metric.label}</span>
        <div
          className={cn(
            "inline-flex items-center gap-0.5 text-caption-bold",
            metric.changeType === "positive" && "text-success-600",
            metric.changeType === "negative" && "text-error-600",
            metric.changeType === "neutral" && "text-neutral-500"
          )}
        >
          <TrendIcon className="size-3" />
          <span>{Math.abs(metric.change).toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    duration: "1m",
    comparison: "percentage",
    city: "all",
    zone: "all",
    verticalType: "all",
    vendorChain: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-full rounded-md border border-neutral-border-subtle bg-default-background shadow-sm">
      <div className="mx-auto max-w-[1600px] space-y-6 p-6">
        {/* Page Header with Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-heading-2 text-neutral-900">Dashboard</h1>
          </div>
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* KPI Summary Row */}
        <div className="flex items-start justify-between gap-6 rounded-lg border border-neutral-200 bg-white p-5">
          {kpiMetrics.map((metric) => (
            <CompactKPICard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <OrdersTrendChart />
          <DeliveryFeeTrendChart />
        </div>

        {/* City Analysis Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <CityPerformanceChart />
          <DeliveryFeeByCityChart />
          <VerticalBreakdownChart />
        </div>

        {/* Delivery Fee Distribution */}
        <div className="grid grid-cols-1 gap-6">
          <DeliveryFeeDistributionChart />
        </div>
      </div>
    </div>
  );
}
