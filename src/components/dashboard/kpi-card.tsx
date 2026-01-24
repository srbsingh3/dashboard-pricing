"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KPIMetric } from "@/lib/types";

interface KPICardProps {
  metric: KPIMetric;
  index?: number;
}

export function KPICard({ metric, index = 0 }: KPICardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group relative rounded-xl border border-border/50 bg-card p-5 transition-all duration-200 hover:border-border hover:shadow-sm"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/2 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        {/* Prefix and Value */}
        <div className="mb-1 flex items-baseline gap-2">
          {metric.prefix && (
            <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {metric.prefix}
            </span>
          )}
          <motion.span
            className="text-3xl font-semibold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 + 0.1 }}
          >
            {formatValue(metric.value, metric.format)}
          </motion.span>
          {metric.suffix && (
            <span className="text-lg font-medium text-muted-foreground">
              {metric.suffix}
            </span>
          )}
        </div>

        {/* Change indicator */}
        <motion.div
          className={cn(
            "inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 text-xs font-medium",
            metric.changeType === "positive" && "bg-success-50 text-success-600",
            metric.changeType === "negative" && "bg-error-50 text-error-600",
            metric.changeType === "neutral" && "bg-neutral-100 text-neutral-600"
          )}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 + 0.15 }}
        >
          <TrendIcon className="size-3" />
          <span>{Math.abs(metric.change).toFixed(2)}%</span>
        </motion.div>

        {/* Label */}
        <p className="mt-2 text-sm text-muted-foreground">
          {metric.label}
        </p>
      </div>
    </motion.div>
  );
}
