"use client";

import { useState, useMemo } from "react";
import {
  BarChart3,
  Pencil,
  Copy,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  SlidersHorizontal,
  Play,
  CheckCircle2,
  FileText,
  RefreshCw,
  FlaskConical,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Trophy,
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

// Status configuration for badges and cards
const STATUS_CONFIG: Record<
  ExperimentStatus,
  {
    variant: "success" | "neutral" | "warning" | "brand";
    icon: React.ReactNode;
    cardIcon: React.ReactNode;
    label: string;
    cardBg: string;
  }
> = {
  running: {
    variant: "brand",
    icon: <Play className="size-3" />,
    cardIcon: <Play className="size-4" />,
    label: "Running",
    cardBg: "bg-brand-100",
  },
  completed: {
    variant: "success",
    icon: <CheckCircle2 className="size-3" />,
    cardIcon: <CheckCircle2 className="size-4" />,
    label: "Completed",
    cardBg: "bg-success-100",
  },
  draft: {
    variant: "neutral",
    icon: <FileText className="size-3" />,
    cardIcon: <FileText className="size-4" />,
    label: "Draft",
    cardBg: "bg-neutral-100",
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
            <span className="text-caption-bold text-warning-700">SB</span>
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
          <span className="text-caption-bold text-brand-700">A/B</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>A/B Test</TooltipContent>
    </Tooltip>
  );
}

function SignificanceBar({ value }: { value?: number }) {
  if (value === undefined) return <span className="text-neutral-400">—</span>;

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
            {value}%{isSignificant && " ✓"}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {isSignificant
          ? "Statistically significant (≥95%)"
          : `${SIGNIFICANCE_THRESHOLD - value}% more needed for significance`}
      </TooltipContent>
    </Tooltip>
  );
}

function LiftValue({ value }: { value?: number }) {
  if (value === undefined) return <span className="text-neutral-400">—</span>;

  const isPositive = value >= 0;

  return (
    <div className={cn(
      "flex items-center gap-1 text-body-bold tabular-nums",
      isPositive ? "text-success-600" : "text-error-600"
    )}>
      {isPositive ? (
        <TrendingUp className="size-3.5" />
      ) : (
        <TrendingDown className="size-3.5" />
      )}
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

// Summary stat card component
function SummaryStatCard({
  label,
  value,
  icon,
  variant = "default",
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning";
}) {
  return (
    <div className={cn(
      "flex flex-col gap-1 rounded-md border px-4 py-3",
      variant === "success" && "border-success-200 bg-success-50",
      variant === "warning" && "border-warning-200 bg-warning-50",
      variant === "default" && "border-neutral-200 bg-white"
    )}>
      <div className="flex items-center gap-2 text-neutral-500">
        {icon}
        <span className="text-caption">{label}</span>
      </div>
      <span className="text-heading-3 text-default-font">{value}</span>
    </div>
  );
}

// Status summary card component
function StatusCard({
  status,
  count,
  isActive,
  onClick,
}: {
  status: ExperimentStatus;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const config = STATUS_CONFIG[status];
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center gap-6 rounded-md px-6 py-8 text-left transition-all",
        config.cardBg,
        isActive && "ring-2 ring-brand-500 ring-offset-2"
      )}
    >
      <span className="text-heading-2 text-default-font">{count}</span>
      <div className="flex items-center justify-center gap-1 text-default-font">
        {config.cardIcon}
        <span className="text-body">{config.label}</span>
      </div>
    </button>
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
  const [statusFilter, setStatusFilter] = useState<ExperimentStatus | null>(null);
  const [typeFilter, setTypeFilter] = useState<ExperimentType | "all">("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const running = experiments.filter((e) => e.status === "running");
    const completed = experiments.filter((e) => e.status === "completed");
    const nearSignificant = running.filter((e) => e.significance && e.significance >= 90 && e.significance < 95);
    const wins = completed.filter((e) => e.lift && e.lift > 0);
    const avgDaysToSignificance = completed
      .filter((e) => e.daysRunning || (e.startedOn && e.endedOn))
      .reduce((acc, e) => {
        // Calculate days from startedOn to endedOn if available
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

  // Filter and sort experiments
  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch =
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? exp.status === statusFilter : true;
    const matchesType = typeFilter === "all" || exp.type === typeFilter;
    const matchesRegion = regionFilter === "all" || exp.city === regionFilter;
    return matchesSearch && matchesStatus && matchesType && matchesRegion;
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

  const handleStatusClick = (status: ExperimentStatus) => {
    setStatusFilter(statusFilter === status ? null : status);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats Bar */}
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
          />
          <SummaryStatCard
            label="Near Significance"
            value={summaryStats.nearSignificant}
            icon={<Target className="size-4" />}
            variant={summaryStats.nearSignificant > 0 ? "warning" : "default"}
          />
          <SummaryStatCard
            label="Win Rate"
            value={`${summaryStats.winRate}%`}
            icon={<Trophy className="size-4" />}
            variant={summaryStats.winRate > 50 ? "success" : "default"}
          />
          <SummaryStatCard
            label="Avg. Days to Significance"
            value={summaryStats.avgDays}
            icon={<Clock className="size-4" />}
          />
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="flex flex-col gap-4">
        <p className="text-caption-bold text-subtext-color uppercase">
          Quick Filters
        </p>
        <div className="flex gap-4">
          <StatusCard
            status="running"
            count={summaryStats.running}
            isActive={statusFilter === "running"}
            onClick={() => handleStatusClick("running")}
          />
          <StatusCard
            status="completed"
            count={summaryStats.completed}
            isActive={statusFilter === "completed"}
            onClick={() => handleStatusClick("completed")}
          />
          <StatusCard
            status="draft"
            count={summaryStats.draft}
            isActive={statusFilter === "draft"}
            onClick={() => handleStatusClick("draft")}
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4">
        <p className="text-caption-bold text-subtext-color uppercase">
          Filters
        </p>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <TextField
              className="w-full"
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

          <Button
            variant="neutral-secondary"
            icon={<SlidersHorizontal className="size-4" />}
          >
            More filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="-mx-6">
        <table className="w-full">
          <thead>
            <tr className="border-y border-neutral-border bg-neutral-50">
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
              <th className="text-left">
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Owner
                  </span>
                </div>
              </th>
              <th className="w-[120px]">
                <div className="h-10 pr-6 pl-3" />
              </th>
            </tr>
          </thead>
          <tbody className="border-b border-neutral-border">
            {paginatedExperiments.map((experiment) => (
              <tr
                key={experiment.id}
                className="group border-t border-neutral-border transition-colors hover:bg-neutral-50"
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
                        {experiment.variations} variations • {experiment.targetGroups} groups
                      </span>
                    </div>
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
                      <span className="text-neutral-400">—</span>
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
                              : "—"}
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
                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <IconButton
                            size="medium"
                            icon={<BarChart3 className="size-4 text-subtext-color" />}
                          />
                        </TooltipTrigger>
                        <TooltipContent>View Results</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <IconButton
                            size="medium"
                            icon={<Pencil className="size-4 text-subtext-color" />}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <IconButton
                            size="medium"
                            icon={<Copy className="size-4 text-subtext-color" />}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Duplicate</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <IconButton
                            size="medium"
                            icon={<Trash2 className="size-4 text-subtext-color hover:text-error-600" />}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
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
            onClick={() => {
              setSearchQuery("");
              setStatusFilter(null);
              setTypeFilter("all");
              setRegionFilter("all");
              setCurrentPage(1);
            }}
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
