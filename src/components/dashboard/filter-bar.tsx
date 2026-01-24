"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DURATION_OPTIONS,
  COMPARISON_OPTIONS,
  CITIES,
  VERTICAL_TYPES,
  VENDOR_CHAINS,
} from "@/lib/constants";

interface FilterBarProps {
  filters: {
    duration: string;
    comparison: string;
    city: string;
    zone: string;
    verticalType: string;
    vendorChain: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-3 rounded-lg border border-border/50 bg-card p-4"
    >
      {/* Duration */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Duration</label>
        <Select
          value={filters.duration}
          onValueChange={(value) => onFilterChange("duration", value)}
        >
          <SelectTrigger className="h-9 w-[140px] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DURATION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Comparison Unit */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Comparison Unit</label>
        <Select
          value={filters.comparison}
          onValueChange={(value) => onFilterChange("comparison", value)}
        >
          <SelectTrigger className="h-9 w-[130px] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COMPARISON_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">City</label>
        <Select
          value={filters.city}
          onValueChange={(value) => onFilterChange("city", value)}
        >
          <SelectTrigger className="h-9 w-[120px] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Zone */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Zone</label>
        <Select
          value={filters.zone}
          onValueChange={(value) => onFilterChange("zone", value)}
        >
          <SelectTrigger className="h-9 w-[100px] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="central">Central</SelectItem>
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="south">South</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Vertical Type */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Vertical Type</label>
        <Select
          value={filters.verticalType}
          onValueChange={(value) => onFilterChange("verticalType", value)}
        >
          <SelectTrigger className="h-9 w-[120px] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VERTICAL_TYPES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vendor/Chain Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-muted-foreground">Vendor/Chain Name</label>
        <Select
          value={filters.vendorChain}
          onValueChange={(value) => onFilterChange("vendorChain", value)}
        >
          <SelectTrigger className="h-9 w-[140px] text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VENDOR_CHAINS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Advanced filters button */}
      <div className="ml-auto flex flex-col gap-1">
        <label className="text-xs text-transparent">Actions</label>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <SlidersHorizontal className="size-4" />
          <span className="hidden sm:inline">More Filters</span>
        </Button>
      </div>
    </motion.div>
  );
}
