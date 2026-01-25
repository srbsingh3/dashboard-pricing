"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SLIDE_DOWN } from "@/lib/constants";

interface ParticipantSplitChartProps {
  participantShare: number;
  numberOfVariations: number;
}

interface Segment {
  percentage: number;
  color: string;
  textColor: string;
}

export function ParticipantSplitChart({
  participantShare,
  numberOfVariations,
}: ParticipantSplitChartProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredSegmentIndex, setHoveredSegmentIndex] = useState<number | null>(null);
  const experimentRef = useRef<HTMLDivElement>(null);

  const { experimentSegments, excludedPercentage, sharePerGroup } = useMemo(() => {
    const validShare = Math.min(100, Math.max(0, participantShare || 0));
    const excluded = 100 - validShare;
    const totalGroups = 1 + numberOfVariations;
    const perGroup = validShare / totalGroups;

    const segments: Segment[] = [];

    // Control segment
    if (perGroup > 0) {
      segments.push({
        percentage: perGroup,
        color: "bg-brand-600",
        textColor: "text-white",
      });
    }

    // Variation segments
    const variationColors = [
      { bg: "bg-brand-400", text: "text-white" },
      { bg: "bg-brand-300", text: "text-brand-900" },
      { bg: "bg-brand-200", text: "text-brand-800" },
      { bg: "bg-brand-100", text: "text-brand-700" },
    ];

    for (let i = 0; i < numberOfVariations; i++) {
      if (perGroup > 0) {
        const colorIndex = i % variationColors.length;
        segments.push({
          percentage: perGroup,
          color: variationColors[colorIndex].bg,
          textColor: variationColors[colorIndex].text,
        });
      }
    }

    return {
      experimentSegments: segments,
      excludedPercentage: excluded,
      sharePerGroup: perGroup,
    };
  }, [participantShare, numberOfVariations]);

  const formatPercent = (value: number): string => {
    if (value >= 10) return `${Math.round(value)}%`;
    if (value >= 1) return `${value.toFixed(1)}%`;
    return `${value.toFixed(2)}%`;
  };

  // Calculate the center position for each segment as a percentage
  const getSegmentCenterPercent = useCallback((segmentIndex: number): number => {
    if (segmentIndex < 0 || segmentIndex >= experimentSegments.length) return 50;

    // Each segment has equal width
    const segmentWidthPercent = 100 / experimentSegments.length;
    // Center is at: (index * width) + (width / 2)
    return (segmentIndex * segmentWidthPercent) + (segmentWidthPercent / 2);
  }, [experimentSegments.length]);

  const handleSegmentHover = (index: number) => {
    setHoveredSegmentIndex(index);
  };

  const totalExperimentWidth = experimentSegments.reduce(
    (acc, seg) => acc + seg.percentage,
    0
  );

  const widthTransition = { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <div className="relative w-full overflow-visible rounded-md">
      <AnimatePresence mode="wait">
        {participantShare > 0 && (
          <motion.div
            key="chart"
            {...SLIDE_DOWN}
            className="relative h-8 w-full overflow-hidden rounded-md"
            style={{ transformOrigin: "top" }}
          >
            {/* Gray background - always full width as base layer */}
            <div
              className={cn(
                "absolute inset-0 flex cursor-default items-center justify-end",
                "transition-[filter] duration-200 ease-out",
                "hover:brightness-[0.95]",
                "bg-neutral-100",
                "rounded-md"
              )}
            >
              {excludedPercentage >= 12 && (
                <span
                  className="pr-3 text-caption text-neutral-500"
                  style={{ fontSize: "var(--text-caption)" }}
                >
                  {formatPercent(excludedPercentage)}
                </span>
              )}
            </div>

            {/* In-experiment section - overlays on top, animates from left */}
            {experimentSegments.length > 0 && (
              <motion.div
                ref={experimentRef}
                className="absolute top-0 left-0 z-10 flex h-full cursor-default"
                animate={{ width: `${totalExperimentWidth}%` }}
                transition={widthTransition}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                  setIsHovering(false);
                  setHoveredSegmentIndex(null);
                }}
              >
                {experimentSegments.map((segment, index) => (
                  <div
                    key={`segment-${index}`}
                    className={cn(
                      "relative flex h-full items-center justify-center",
                      "transition-[filter] duration-200 ease-out",
                      "hover:brightness-[0.92]",
                      segment.color,
                      index === 0 && "rounded-l-md"
                    )}
                    style={{
                      width: `${(segment.percentage / totalExperimentWidth) * 100}%`,
                    }}
                    onMouseEnter={() => handleSegmentHover(index)}
                  >
                    {segment.percentage >= 12 && (
                      <span
                        className={cn("text-caption", segment.textColor)}
                        style={{ fontSize: "var(--text-caption)" }}
                      >
                        {formatPercent(segment.percentage)}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom tooltip above the bar */}
      {participantShare > 0 && experimentSegments.length > 0 && (
        <motion.div
          className={cn(
            "pointer-events-none absolute bottom-full left-0 z-50 mb-1",
            "transition-opacity duration-150 ease-out",
            isHovering ? "opacity-100" : "opacity-0"
          )}
          animate={{ width: `${totalExperimentWidth}%` }}
          transition={widthTransition}
        >
          {/* Tooltip body */}
          <div
            className="relative w-full rounded-md bg-neutral-900 px-3 py-1.5 text-center text-caption text-white"
            style={{ fontSize: "var(--text-caption)" }}
          >
            {formatPercent(sharePerGroup)}
          </div>
          {/* Downward-pointing triangle chevron using border trick */}
          <div
            className="absolute -bottom-[5px] transition-[left] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              left: `${hoveredSegmentIndex !== null ? getSegmentCenterPercent(hoveredSegmentIndex) : 50}%`,
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgb(23 23 23)", // neutral-900
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
