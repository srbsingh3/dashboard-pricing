"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { KPICard } from "@/components/dashboard/kpi-card";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { ActiveExperimentsCard, ActiveCampaignsCard } from "@/components/dashboard/active-lists";
import { kpiMetrics } from "@/lib/mock-data";

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
    <div className="mx-auto max-w-[1600px] space-y-6 p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {/* KPI Cards - Top Row (3 cards) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {kpiMetrics.slice(0, 3).map((metric, index) => (
          <KPICard key={metric.id} metric={metric} index={index} />
        ))}
      </div>

      {/* KPI Cards - Bottom Row (2 cards) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {kpiMetrics.slice(3, 5).map((metric, index) => (
          <KPICard key={metric.id} metric={metric} index={index + 3} />
        ))}
      </div>

      {/* Active Experiments & Campaigns */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActiveExperimentsCard />
        <ActiveCampaignsCard />
      </div>
    </div>
  );
}
