"use client";

import { useState, useMemo } from "react";
import {
  Check,
  X,
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { experiments } from "@/lib/mock-data";
import type { Experiment, ExperimentStatus } from "@/lib/types";
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
// Running = blue (brand), Completed = green (success), Draft = gray (neutral)
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

function AlreadyStartedIcon({ started }: { started: boolean }) {
  return (
    <div
      className={cn(
        "flex size-5 items-center justify-center rounded-full",
        started ? "text-success-600" : "text-neutral-400"
      )}
    >
      {started ? (
        <Check className="size-4" strokeWidth={2.5} />
      ) : (
        <X className="size-4" strokeWidth={2.5} />
      )}
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

// Status summary card component - matches Subframe design
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

  // Calculate status counts
  const statusCounts = useMemo(() => {
    return {
      running: experiments.filter((e) => e.status === "running").length,
      completed: experiments.filter((e) => e.status === "completed").length,
      draft: experiments.filter((e) => e.status === "draft").length,
    };
  }, []);

  // Filter and sort experiments
  const filteredExperiments = experiments.filter((exp) => {
    const matchesSearch =
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? exp.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const sortedExperiments = [...filteredExperiments].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
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
      {/* Status Summary Cards */}
      <div className="flex flex-col gap-4">
        <p className="text-caption-bold text-subtext-color uppercase">
          Quick Filters
        </p>
        <div className="flex gap-4">
          <StatusCard
            status="running"
            count={statusCounts.running}
            isActive={statusFilter === "running"}
            onClick={() => handleStatusClick("running")}
          />
          <StatusCard
            status="completed"
            count={statusCounts.completed}
            isActive={statusFilter === "completed"}
            onClick={() => handleStatusClick("completed")}
          />
          <StatusCard
            status="draft"
            count={statusCounts.draft}
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
          <span className="text-body text-subtext-color">or</span>
          <Button
            variant="neutral-secondary"
            icon={<SlidersHorizontal className="size-4" />}
          >
            Add filters
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
                    Owner
                  </span>
                </div>
              </th>
              <th className="text-center">
                <div className="flex h-10 items-center justify-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Target Groups
                  </span>
                </div>
              </th>
              <th className="text-center">
                <div className="flex h-10 items-center justify-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Started
                  </span>
                </div>
              </th>
              <th
                className="cursor-pointer text-left select-none"
                onClick={() => handleSort("createdOn")}
              >
                <div className="flex h-10 items-center gap-1 px-3">
                  <span className="text-caption-bold whitespace-nowrap text-subtext-color">
                    Created
                  </span>
                  <SortIndicator columnKey="createdOn" sortKey={sortKey} sortDirection={sortDirection} />
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
                  <div className="flex h-12 items-center pr-3 pl-6">
                    <span className="text-body whitespace-nowrap text-neutral-500 tabular-nums">
                      {experiment.id}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-12 items-center px-3">
                    <span className="text-body-bold whitespace-nowrap text-neutral-700">
                      {experiment.name}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-12 items-center px-3">
                    <StatusBadge status={experiment.status} />
                  </div>
                </td>
                <td>
                  <div className="flex h-12 items-center gap-2 px-3">
                    <Avatar
                      size="small"
                      image={getAvatarUrl(experiment.email)}
                    />
                    <span className="text-body-bold whitespace-nowrap text-default-font">
                      {formatName(experiment.email)}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-12 items-center justify-center px-3">
                    <span className="text-body whitespace-nowrap text-neutral-500 tabular-nums">
                      {experiment.targetGroups}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-12 items-center justify-center px-3">
                    <AlreadyStartedIcon started={experiment.alreadyStarted} />
                  </div>
                </td>
                <td>
                  <div className="flex h-12 items-center px-3">
                    <span className="text-body whitespace-nowrap text-neutral-500">
                      {experiment.createdOn}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex h-12 items-center justify-end pr-6 pl-3">
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

      {/* Pagination */}
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
    </div>
  );
}
