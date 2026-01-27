"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Pencil,
  Copy,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  Play,
  CheckCircle2,
  FileText,
  RefreshCw,
  FlaskConical,
  Clock,
  Target,
  Trophy,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { experiments } from "@/lib/mock-data";
import type { Experiment, ExperimentStatus, ExperimentType } from "@/lib/types";
import { SIGNIFICANCE_THRESHOLD } from "@/lib/constants";
import { Button } from "@/subframe/components/Button";
import { IconButton } from "@/subframe/components/IconButton";
import { Badge } from "@/subframe/components/Badge";
import { TextField } from "@/subframe/components/TextField";
import { Avatar } from "@/subframe/components/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortKey = keyof Experiment | null;
type SortDirection = "asc" | "desc";
type QuickFilter = "nearSignificance" | "winners" | null;

// Status configuration for badges
const STATUS_CONFIG: Record<
  ExperimentStatus,
  {
    variant: "success" | "neutral" | "warning" | "brand";
    icon: React.ReactNode;
    label: string;
  }
> = {
  running: {
    variant: "brand",
    icon: <Play className="size-3" />,
    label: "Running",
  },
  completed: {
    variant: "success",
    icon: <CheckCircle2 className="size-3" />,
    label: "Completed",
  },
  draft: {
    variant: "neutral",
    icon: <FileText className="size-3" />,
    label: "Draft",
  },
};

function StatusBadge({ status }: { status: ExperimentStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge variant={config.variant} icon={config.icon}>
      {config.label}
    </Badge>
  );
}

function TypeBadge({ type }: { type: ExperimentType }) {
  if (type === "switchback") {
    return (
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center gap-1 rounded-md bg-warning-100 px-2 py-1">
            <RefreshCw className="size-3 text-warning-700" />
            <span className="text-caption text-warning-700">SB</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>Switchback Test</TooltipContent>
      </Tooltip>
    );
  }
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="flex items-center gap-1 rounded-md bg-brand-100 px-2 py-1">
          <FlaskConical className="size-3 text-brand-700" />
          <span className="text-caption text-brand-700">A/B</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>A/B Test</TooltipContent>
    </Tooltip>
  );
}

function SignificanceBar({ value }: { value?: number }) {
  if (value === undefined) return <span className="text-neutral-400">&mdash;</span>;

  const isSignificant = value >= SIGNIFICANCE_THRESHOLD;
  const percentage = Math.min(value, 100);

  return (
    <Tooltip>
      <TooltipTrigger className="w-full">
        <div className="flex items-center gap-2">
          <div className="h-2 min-w-[60px] flex-1 overflow-hidden rounded-full bg-neutral-200">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isSignificant ? "bg-success-500" : "bg-brand-500"
              )}
              style={{ width: `${(percentage / 100) * 100}%` }}
            />
          </div>
          <span className={cn(
            "text-caption whitespace-nowrap tabular-nums",
            isSignificant ? "font-medium text-success-600" : "text-neutral-600"
          )}>
            {value}%
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {isSignificant
          ? "Statistically significant (\u226595%)"
          : `${SIGNIFICANCE_THRESHOLD - value}% more needed for significance`}
      </TooltipContent>
    </Tooltip>
  );
}

function LiftValue({ value }: { value?: number }) {
  if (value === undefined) return <span className="text-neutral-400">&mdash;</span>;

  const isPositive = value >= 0;

  return (
    <div className={cn(
      "text-body-bold tabular-nums",
      isPositive ? "text-success-600" : "text-error-600"
    )}>
      <span>{isPositive ? "+" : ""}{value.toFixed(1)}%</span>
    </div>
  );
}

function getAvatarUrl(email: string): string {
  return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(email)}`;
}

function formatName(email: string): string {
  const username = email.split("@")[0];
  return username
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// Summary stat card component — now supports onClick + isActive
function SummaryStatCard({
  label,
  value,
  icon,
  variant = "default",
  onClick,
  isActive = false,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning";
  onClick?: () => void;
  isActive?: boolean;
}) {
  const isClickable = !!onClick;
  return (
    <div
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isClickable ? (e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); } : undefined}
      className={cn(
        "flex flex-col gap-1 rounded-md border px-4 py-3",
        variant === "success" && "border-success-200 bg-success-50",
        variant === "warning" && "border-warning-200 bg-warning-50",
        variant === "default" && "border-neutral-200 bg-white",
        isClickable && "cursor-pointer transition-all hover:ring-2 hover:ring-brand-300",
        isActive && "ring-2 ring-brand-500",
      )}
    >
      <div className="flex items-center gap-2 text-neutral-500">
        {icon}
        <span className="text-caption">{label}</span>
      </div>
      <span className="text-heading-3 text-default-font">{value}</span>
    </div>
  );
}

// Sort indicator component
function SortIndicator({
  columnKey,
  sortKey,
  sortDirection,
}: {
  columnKey: SortKey;
  sortKey: SortKey;
  sortDirection: SortDirection;
}) {
  if (sortKey !== columnKey) return null;
  return sortDirection === "asc" ? (
    <ChevronUp className="size-3.5" />
  ) : (
    <ChevronDown className="size-3.5" />
  );
}

export function ExperimentsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ExperimentStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<ExperimentType | "all">("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [objectiveFilter, setObjectiveFilter] = useState<string>("all");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const running = experiments.filter((e) => e.status === "running");
    const completed = experiments.filter((e) => e.status === "completed");
    const nearSignificant = running.filter((e) => e.significance && e.significance >= 90 && e.significance < 95);
    const wins = completed.filter((e) => e.lift && e.lift > 0);
    const avgDaysToSignificance = completed
      .filter((e) => e.daysRunning || (e.startedOn && e.endedOn))
      .reduce((acc, e) => {
        if (e.startedOn && e.endedOn) {
          const start = new Date(e.startedOn.split('.').reverse().join('-'));
          const end = new Date(e.endedOn.split('.').reverse().join('-'));
          const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
          return acc + days;
        }
        return acc + (e.daysRunning || 0);
      }, 0) / Math.max(completed.length, 1);

    return {
      total: experiments.length,
      running: running.length,
      completed: completed.length,
      draft: experiments.filter((e) => e.status === "draft").length,
      nearSignificant: nearSignificant.length,
      winRate: completed.length > 0 ? Math.round((wins.length / completed.length) * 100) : 0,
      avgDays: Math.round(avgDaysToSignificance),
    };
  }, []);

  // Get unique regions
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(experiments.map((e) => e.city))];
    return ["all", ...uniqueRegions.sort()];
  }, []);

  // Get unique objectives
  const objectives = useMemo(() => {
    const uniqueObjectives = [...new Set(experiments.map((e) => e.objective))];
    return ["all", ...uniqueObjectives.sort()];
  }, []);

  // Filter and sort experiments
  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch =
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || exp.status === statusFilter;
    const matchesType = typeFilter === "all" || exp.type === typeFilter;
    const matchesRegion = regionFilter === "all" || exp.city === regionFilter;
    const matchesObjective = objectiveFilter === "all" || exp.objective === objectiveFilter;

    // Quick filters from stat cards
    let matchesQuickFilter = true;
    if (quickFilter === "nearSignificance") {
      matchesQuickFilter = exp.status === "running" && !!exp.significance && exp.significance >= 90 && exp.significance < 95;
    } else if (quickFilter === "winners") {
      matchesQuickFilter = exp.status === "completed" && !!exp.lift && exp.lift > 0;
    }

    return matchesSearch && matchesStatus && matchesType && matchesRegion && matchesObjective && matchesQuickFilter;
  });

  const sortedExperiments = [...filteredExperiments].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal === undefined) return 1;
    if (bVal === undefined) return -1;
    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedExperiments.length / rowsPerPage);
  const paginatedExperiments = sortedExperiments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  // Clickable stat card handlers
  const handleRunningClick = () => {
    if (statusFilter === "running" && quickFilter === null) {
      setStatusFilter("all");
    } else {
      setStatusFilter("running");
      setQuickFilter(null);
    }
    setCurrentPage(1);
  };

  const handleNearSignificanceClick = () => {
    if (quickFilter === "nearSignificance") {
      setQuickFilter(null);
      setStatusFilter("all");
    } else {
      setQuickFilter("nearSignificance");
      setStatusFilter("all");
    }
    setCurrentPage(1);
  };

  const handleWinRateClick = () => {
    if (quickFilter === "winners") {
      setQuickFilter(null);
      setStatusFilter("all");
    } else {
      setQuickFilter("winners");
      setStatusFilter("all");
    }
    setCurrentPage(1);
  };

  // Active filter helpers
  const hasActiveFilters =
    searchQuery !== "" ||
    statusFilter !== "all" ||
    typeFilter !== "all" ||
    regionFilter !== "all" ||
    objectiveFilter !== "all" ||
    quickFilter !== null;

  const activeFilterChips: { label: string; onClear: () => void }[] = [];

  if (searchQuery) {
    activeFilterChips.push({
      label: `Search: "${searchQuery}"`,
      onClear: () => { setSearchQuery(""); setCurrentPage(1); },
    });
  }
  if (statusFilter !== "all") {
    activeFilterChips.push({
      label: `Status: ${STATUS_CONFIG[statusFilter as ExperimentStatus].label}`,
      onClear: () => { setStatusFilter("all"); setCurrentPage(1); },
    });
  }
  if (objectiveFilter !== "all") {
    activeFilterChips.push({
      label: `Objective: ${objectiveFilter}`,
      onClear: () => { setObjectiveFilter("all"); setCurrentPage(1); },
    });
  }
  if (typeFilter !== "all") {
    activeFilterChips.push({
      label: `Type: ${typeFilter === "ab" ? "A/B Test" : "Switchback"}`,
      onClear: () => { setTypeFilter("all"); setCurrentPage(1); },
    });
  }
  if (regionFilter !== "all") {
    activeFilterChips.push({
      label: `Region: ${regionFilter}`,
      onClear: () => { setRegionFilter("all"); setCurrentPage(1); },
    });
  }
  if (quickFilter === "nearSignificance") {
    activeFilterChips.push({
      label: "Near Significance",
      onClear: () => { setQuickFilter(null); setCurrentPage(1); },
    });
  }
  if (quickFilter === "winners") {
    activeFilterChips.push({
      label: "Winners",
      onClear: () => { setQuickFilter(null); setCurrentPage(1); },
    });
  }

  const clearAllFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setRegionFilter("all");
    setObjectiveFilter("all");
    setQuickFilter(null);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="flex flex-col gap-4">
        <p className="text-caption-bold text-subtext-color uppercase">
          Overview
        </p>
        <div className="grid grid-cols-5 gap-4">
          <SummaryStatCard
            label="Total Experiments"
            value={summaryStats.total}
            icon={<FlaskConical className="size-4" />}
          />
          <SummaryStatCard
            label="Running"
            value={summaryStats.running}
            icon={<Play className="size-4" />}
            onClick={handleRunningClick}
            isActive={statusFilter === "running" && quickFilter === null}
          />
          <SummaryStatCard
            label="Near Significance"
            value={summaryStats.nearSignificant}
            icon={<Target className="size-4" />}
            variant={summaryStats.nearSignificant > 0 ? "warning" : "default"}
            onClick={handleNearSignificanceClick}
            isActive={quickFilter === "nearSignificance"}
          />
          <SummaryStatCard
            label="Win Rate"
            value={`${summaryStats.winRate}%`}
            icon={<Trophy className="size-4" />}
            variant={summaryStats.winRate > 50 ? "success" : "default"}
            onClick={handleWinRateClick}
            isActive={quickFilter === "winners"}
          />
          <SummaryStatCard
            label="Avg. Days to Significance"
            value={summaryStats.avgDays}
            icon={<Clock className="size-4" />}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3">
        <div className="w-[280px]">
          <TextField
            className="w-full [&>div]:h-9"
            icon={<Search className="size-4" />}
          >
            <TextField.Input
              placeholder="Search experiments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </TextField>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value as ExperimentStatus | "all");
              setQuickFilter(null);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[140px] border-neutral-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          {/* Objective Filter */}
          <Select
            value={objectiveFilter}
            onValueChange={(value) => {
              setObjectiveFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[170px] border-neutral-border">
              <SelectValue placeholder="Objective" />
            </SelectTrigger>
            <SelectContent>
              {objectives.map((obj) => (
                <SelectItem key={obj} value={obj}>
                  {obj === "all" ? "All Objectives" : obj}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value as ExperimentType | "all");
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[140px] border-neutral-border">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="ab">A/B Test</SelectItem>
              <SelectItem value="switchback">Switchback</SelectItem>
            </SelectContent>
          </Select>

          {/* Region Filter */}
          <Select
            value={regionFilter}
            onValueChange={(value) => {
              setRegionFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[150px] border-neutral-border">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region === "all" ? "All Regions" : region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Chips + Result Count */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-caption-bold text-neutral-500">
            Showing {filteredExperiments.length} of {experiments.length}
          </span>
          <span className="text-neutral-300">|</span>
          {activeFilterChips.map((chip) => (
            <button
              key={chip.label}
              onClick={chip.onClear}
              className="group/chip flex items-center gap-1 rounded-md border border-brand-100 bg-brand-100 px-2 py-1 transition-colors hover:border-brand-200 hover:bg-brand-200"
            >
              <span className="text-caption text-brand-800">{chip.label}</span>
              <X className="size-3 text-brand-500 group-hover/chip:text-brand-700" />
            </button>
          ))}
          {activeFilterChips.length >= 2 && (
            <button
              onClick={clearAllFilters}
              className="text-caption text-brand-600 hover:text-brand-800 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="-mx-6 2xl:mx-0 2xl:overflow-hidden 2xl:rounded-md 2xl:border 2xl:border-neutral-border">
        <table className="w-full">
          <thead>
            <tr className="border-y border-neutral-border bg-neutral-50 2xl:border-t-0">
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("id")}
              >
                <div className="flex h-10 items-center gap-1 pr-3 pl-6">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    ID
                  </span>
                  <SortIndicator columnKey="id" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Experiment
                  </span>
                  <SortIndicator columnKey="name" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("objective")}
              >
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Objective
                  </span>
                  <SortIndicator columnKey="objective" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th className="text-left">
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Type
                  </span>
                </div>
              </th>
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("status")}
              >
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Status
                  </span>
                  <SortIndicator columnKey="status" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th className="text-left">
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Region
                  </span>
                </div>
              </th>
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("daysRunning")}
              >
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Duration
                  </span>
                  <SortIndicator columnKey="daysRunning" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("significance")}
              >
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Significance
                  </span>
                  <SortIndicator columnKey="significance" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("lift")}
              >
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Lift
                  </span>
                  <SortIndicator columnKey="lift" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("createdBy")}
              >
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Owner
                  </span>
                  <SortIndicator columnKey="createdBy" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th className="w-[60px]">
                <div className="h-10 pr-6 pl-3" />
              </th>
            </tr>
          </thead>
          <tbody className="border-b border-neutral-border 2xl:border-b-0">
            {paginatedExperiments.map((experiment) => (
              <tr
                key={experiment.id}
                className={cn(
                  "group border-t border-neutral-border transition-colors hover:bg-neutral-50",
                  openMenuId === experiment.id && "bg-neutral-50"
                )}
              >
                <td>
                  <div className="flex h-14 items-center pr-3 pl-6">
                    <span className="text-body whitespace-nowrap text-neutral-500 tabular-nums">
                      {experiment.id}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-14 flex-col justify-center px-3">
                    <span className="text-body-bold whitespace-nowrap text-neutral-700">
                      {experiment.name}
                    </span>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-caption text-neutral-500">
                        {experiment.variations} variations &bull; {experiment.targetGroups} groups
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex h-14 items-center px-3">
                    <span className="text-body whitespace-nowrap text-neutral-600">
                      {experiment.objective}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-14 items-center px-3">
                    <TypeBadge type={experiment.type} />
                  </div>
                </td>
                <td>
                  <div className="flex h-14 items-center px-3">
                    <StatusBadge status={experiment.status} />
                  </div>
                </td>
                <td>
                  <div className="flex h-14 items-center px-3">
                    <span className="text-body text-neutral-600">
                      {experiment.city}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-14 items-center px-3">
                    {experiment.status === "draft" ? (
                      <span className="text-neutral-400">&mdash;</span>
                    ) : experiment.status === "running" ? (
                      <span className="text-body text-neutral-600">
                        {experiment.daysRunning} days
                      </span>
                    ) : (
                      <Tooltip>
                        <TooltipTrigger>
                          <span className="text-body text-neutral-600">
                            {experiment.startedOn && experiment.endedOn
                              ? `${experiment.startedOn.slice(0, 5)} - ${experiment.endedOn.slice(0, 5)}`
                              : "\u2014"}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          {experiment.startedOn} to {experiment.endedOn}
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex h-14 min-w-[140px] items-center px-3">
                    <SignificanceBar value={experiment.significance} />
                  </div>
                </td>
                <td>
                  <div className="flex h-14 items-center px-3">
                    <LiftValue value={experiment.lift} />
                  </div>
                </td>
                <td>
                  <div className="flex h-14 items-center gap-2 px-3">
                    <Avatar
                      size="small"
                      image={getAvatarUrl(experiment.email)}
                    />
                    <span className="text-body whitespace-nowrap text-neutral-600">
                      {formatName(experiment.email)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-14 items-center justify-end pr-6 pl-3">
                    <div className={cn(
                      "transition-opacity",
                      openMenuId === experiment.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      <DropdownMenu
                        onOpenChange={(open) => setOpenMenuId(open ? experiment.id : null)}
                      >
                        <DropdownMenuTrigger asChild>
                          <IconButton
                            size="medium"
                            icon={<MoreVertical className="size-4 text-subtext-color" />}
                            className={cn(
                              openMenuId === experiment.id && "bg-neutral-100"
                            )}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="end">
                          <DropdownMenuItem>
                            <AreaChart className="size-3.5" />
                            View Results
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="size-3.5" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="size-3.5" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            <Trash2 className="size-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {paginatedExperiments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FlaskConical className="mb-4 size-12 text-neutral-300" />
          <h3 className="mb-2 text-heading-3 text-neutral-700">No experiments found</h3>
          <p className="mb-4 text-body text-neutral-500">
            Try adjusting your filters or search query
          </p>
          <Button
            variant="neutral-secondary"
            onClick={clearAllFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {paginatedExperiments.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-body text-neutral-500">
            <span>Rows per page:</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px] border-neutral-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 text-body text-neutral-500">
            <span>
              {(currentPage - 1) * rowsPerPage + 1}-
              {Math.min(currentPage * rowsPerPage, sortedExperiments.length)} of{" "}
              {sortedExperiments.length}
            </span>
            <div className="flex items-center gap-1">
              <IconButton
                size="medium"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                icon={<ChevronDown className="size-4 rotate-90 text-subtext-color" />}
              />
              <IconButton
                size="medium"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                icon={<ChevronDown className="size-4 -rotate-90 text-subtext-color" />}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
