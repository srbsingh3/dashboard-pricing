"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParticipantSplitChartProps {
  participantShare: number;
  numberOfVariations: number;
}

interface Segment {
  label: string;
  percentage: number;
  color: string;
  textColor: string;
}

export function ParticipantSplitChart({
  participantShare,
  numberOfVariations,
}: ParticipantSplitChartProps) {
  const segments = useMemo<Segment[]>(() => {
    const validShare = Math.min(100, Math.max(0, participantShare || 0));
    const excluded = 100 - validShare;
    const totalGroups = 1 + numberOfVariations;
    const sharePerGroup = validShare / totalGroups;

    const result: Segment[] = [];

    if (sharePerGroup > 0) {
      result.push({
        label: "Control",
        percentage: sharePerGroup,
        color: "bg-brand-600",
        textColor: "text-white",
      });
    }

    const variationColors = [
      { bg: "bg-brand-400", text: "text-white" },
      { bg: "bg-brand-300", text: "text-brand-900" },
      { bg: "bg-brand-200", text: "text-brand-800" },
      { bg: "bg-brand-100", text: "text-brand-700" },
    ];

    for (let i = 0; i < numberOfVariations; i++) {
      if (sharePerGroup > 0) {
        const colorIndex = i % variationColors.length;
        result.push({
          label: `Variation ${i + 1}`,
          percentage: sharePerGroup,
          color: variationColors[colorIndex].bg,
          textColor: variationColors[colorIndex].text,
        });
      }
    }

    if (excluded > 0) {
      result.push({
        label: "Not in experiment",
        percentage: excluded,
        color: "bg-neutral-100",
        textColor: "text-neutral-500",
      });
    }

    return result;
  }, [participantShare, numberOfVariations]);

  const formatPercent = (value: number): string => {
    if (value >= 10) return `${Math.round(value)}%`;
    if (value >= 1) return `${value.toFixed(1)}%`;
    return `${value.toFixed(2)}%`;
  };

  if (participantShare <= 0) {
    return (
      <div className="flex h-8 w-full items-center justify-center rounded-md bg-neutral-100">
        <span className="text-caption text-neutral-400">
          Enter participant share
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-8 w-full overflow-hidden rounded-md">
      <div className="flex size-full">
        {segments.map((segment, index) => (
          <Tooltip key={`segment-${segment.label}-${index}`}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "relative flex h-full cursor-default items-center justify-center",
                  "transition-[filter] duration-200 ease-out",
                  "hover:brightness-[0.92]",
                  segment.color,
                  index === 0 && "rounded-l-md",
                  index === segments.length - 1 && "rounded-r-md"
                )}
                style={{ width: `${segment.percentage}%` }}
              >
                {segment.percentage >= 12 && (
                  <span className={cn("text-caption-bold", segment.textColor)}>
                    {formatPercent(segment.percentage)}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              {segment.label}: {formatPercent(segment.percentage)}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
