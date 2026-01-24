"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activeExperiments, activeCampaigns } from "@/lib/mock-data";

export function ActiveExperimentsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Active Experiments</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-[1fr_100px_80px] gap-4 border-b px-3 py-2 text-xs font-medium text-muted-foreground">
              <span>Name</span>
              <span>Active Duration</span>
              <span>Significance</span>
            </div>

            {/* Rows */}
            {activeExperiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + index * 0.05 }}
                className="group grid grid-cols-[1fr_100px_80px] gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-accent/50"
              >
                <Link
                  href={`/experiments/${experiment.id}`}
                  className="flex items-center gap-1 truncate text-sm text-primary underline-offset-2 hover:underline"
                >
                  <span className="truncate">{experiment.name}</span>
                  <ExternalLink className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
                <span className="text-sm text-muted-foreground">
                  {experiment.activeDuration}
                </span>
                <span className="text-sm text-muted-foreground">
                  {experiment.significance}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ActiveCampaignsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-[1fr_80px_80px] gap-4 border-b px-3 py-2 text-xs font-medium text-muted-foreground">
              <span>Name</span>
              <span>Time Left</span>
              <span>Budget Left</span>
            </div>

            {/* Rows */}
            {activeCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="group grid grid-cols-[1fr_80px_80px] gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-accent/50"
              >
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="flex items-center gap-1 truncate text-sm text-primary underline-offset-2 hover:underline"
                >
                  <span className="truncate">{campaign.name}</span>
                  <ExternalLink className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
                <span className="text-sm text-muted-foreground">
                  {campaign.timeLeft}
                </span>
                <span className="text-sm text-muted-foreground">
                  {campaign.budgetLeft || "—"}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
