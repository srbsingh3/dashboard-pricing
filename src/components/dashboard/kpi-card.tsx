"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KPIMetric } from "@/lib/types";

interface KPICardProps {
  metric: KPIMetric;
  index?: number;
}

export function KPICard({ metric }: KPICardProps) {
  const formatValue = (value: number, format: string) => {
    switch (format) {
      case "currency":
        return value.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      case "percentage":
        return value.toFixed(2);
      case "number":
        return value.toLocaleString("en-US");
      default:
        return value.toString();
    }
  };

  const TrendIcon = metric.changeType === "positive"
    ? TrendingUp
    : metric.changeType === "negative"
    ? TrendingDown
    : Minus;

  return (
    <div className="group relative rounded-lg border border-neutral-border bg-default-background p-5 transition-all duration-200 hover:border-neutral-300 hover:shadow-sm">
      <div className="relative">
        {/* Prefix and Value */}
        <div className="mb-1 flex items-baseline gap-2">
          {metric.prefix && (
            <span className="text-caption-bold tracking-wide text-neutral-500 uppercase">
              {metric.prefix}
            </span>
          )}
          <span className="text-heading-1 text-neutral-900">
            {formatValue(metric.value, metric.format)}
          </span>
          {metric.suffix && (
            <span className="text-heading-3 text-neutral-500">
              {metric.suffix}
            </span>
          )}
        </div>

        {/* Change indicator */}
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-caption-bold",
            metric.changeType === "positive" && "bg-success-50 text-success-700",
            metric.changeType === "negative" && "bg-error-50 text-error-700",
            metric.changeType === "neutral" && "bg-neutral-100 text-neutral-600"
          )}
        >
          <TrendIcon className="size-3" />
          <span>{Math.abs(metric.change).toFixed(2)}%</span>
        </div>

        {/* Label */}
        <p className="mt-2 text-body text-neutral-500">
          {metric.label}
        </p>
      </div>
    </div>
  );
}
