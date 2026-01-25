"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { activeExperiments, activeCampaigns } from "@/lib/mock-data";

export function ActiveExperimentsCard() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-neutral-border bg-default-background">
      <div className="px-4 py-3">
        <h3 className="text-body-bold text-neutral-900">Active Experiments</h3>
      </div>
      <div className="flex-1 px-4 pb-4">
        <div className="space-y-1">
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_80px] gap-4 border-b border-neutral-border px-3 py-2 text-caption-bold text-neutral-500">
            <span>Name</span>
            <span>Active Duration</span>
            <span>Significance</span>
          </div>

          {/* Rows */}
          {activeExperiments.map((experiment) => (
            <div
              key={experiment.id}
              className="group grid grid-cols-[1fr_100px_80px] gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-neutral-50"
            >
              <Link
                href={`/experiments/${experiment.id}`}
                className="flex items-center gap-1 truncate text-body text-brand-600 underline-offset-2 hover:underline"
              >
                <span className="truncate">{experiment.name}</span>
                <ExternalLink className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <span className="text-body text-neutral-500">
                {experiment.activeDuration}
              </span>
              <span className="text-body text-neutral-500">
                {experiment.significance}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ActiveCampaignsCard() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-neutral-border bg-default-background">
      <div className="px-4 py-3">
        <h3 className="text-body-bold text-neutral-900">Active Campaigns</h3>
      </div>
      <div className="flex-1 px-4 pb-4">
        <div className="space-y-1">
          {/* Header */}
          <div className="grid grid-cols-[1fr_80px_80px] gap-4 border-b border-neutral-border px-3 py-2 text-caption-bold text-neutral-500">
            <span>Name</span>
            <span>Time Left</span>
            <span>Budget Left</span>
          </div>

          {/* Rows */}
          {activeCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="group grid grid-cols-[1fr_80px_80px] gap-4 rounded-md px-3 py-2.5 transition-colors hover:bg-neutral-50"
            >
              <Link
                href={`/campaigns/${campaign.id}`}
                className="flex items-center gap-1 truncate text-body text-brand-600 underline-offset-2 hover:underline"
              >
                <span className="truncate">{campaign.name}</span>
                <ExternalLink className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <span className="text-body text-neutral-500">
                {campaign.timeLeft}
              </span>
              <span className="text-body text-neutral-500">
                {campaign.budgetLeft || "—"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
