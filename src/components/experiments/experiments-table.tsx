"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle,
  XCircle,
  PencilLine,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { experiments } from "@/lib/mock-data";
import type { Experiment, ExperimentStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/subframe/components/Badge";
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
    label: string;
    cardBg: string;
    cardBorder: string;
  }
> = {
  enabled: {
    variant: "success",
    icon: <CheckCircle className="size-3.5" />,
    label: "Enabled",
    cardBg: "bg-success-50",
    cardBorder: "border-success-200",
  },
  disabled: {
    variant: "neutral",
    icon: <XCircle className="size-3.5" />,
    label: "Disabled",
    cardBg: "bg-neutral-50",
    cardBorder: "border-neutral-200",
  },
  draft: {
    variant: "warning",
    icon: <PencilLine className="size-3.5" />,
    label: "Draft",
    cardBg: "bg-warning-50",
    cardBorder: "border-warning-200",
  },
  completed: {
    variant: "brand",
    icon: <Clock className="size-3.5" />,
    label: "Completed",
    cardBg: "bg-brand-50",
    cardBorder: "border-brand-200",
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

function getInitials(email: string): string {
  const username = email.split("@")[0];
  const parts = username.split(".");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return username.slice(0, 2).toUpperCase();
}

function formatName(email: string): string {
  const username = email.split("@")[0];
  return username
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
        "flex flex-1 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all",
        config.cardBg,
        config.cardBorder,
        isActive && "ring-2 ring-brand-500 ring-offset-1"
      )}
    >
      <span className="text-heading-2 text-neutral-900">{count}</span>
      <div className="flex items-center gap-1.5 text-neutral-700">
        {config.icon}
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
  const [sortKey, setSortKey] = useState<SortKey>("createdOn");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<ExperimentStatus | null>(null);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    return {
      enabled: experiments.filter((e) => e.status === "enabled").length,
      disabled: experiments.filter((e) => e.status === "disabled").length,
      draft: experiments.filter((e) => e.status === "draft").length,
      completed: experiments.filter((e) => e.status === "completed").length,
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
      <div>
        <p className="mb-3 text-caption font-medium tracking-wide text-neutral-500 uppercase">
          Quick Filters
        </p>
        <div className="flex gap-3">
          <StatusCard
            status="enabled"
            count={statusCounts.enabled}
            isActive={statusFilter === "enabled"}
            onClick={() => handleStatusClick("enabled")}
          />
          <StatusCard
            status="disabled"
            count={statusCounts.disabled}
            isActive={statusFilter === "disabled"}
            onClick={() => handleStatusClick("disabled")}
          />
          <StatusCard
            status="draft"
            count={statusCounts.draft}
            isActive={statusFilter === "draft"}
            onClick={() => handleStatusClick("draft")}
          />
          <StatusCard
            status="completed"
            count={statusCounts.completed}
            isActive={statusFilter === "completed"}
            onClick={() => handleStatusClick("completed")}
          />
        </div>
      </div>

      {/* Filters Section */}
      <div>
        <p className="mb-3 text-caption font-medium tracking-wide text-neutral-500 uppercase">
          Filters
        </p>
        <div className="flex items-center gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search experiments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="h-10 border-neutral-200 bg-white pl-10"
            />
          </div>
          <span className="text-body text-neutral-400">or</span>
          <Button variant="outline" className="gap-2 border-neutral-200">
            <SlidersHorizontal className="size-4" />
            Add filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200">
              <th
                className="cursor-pointer px-4 py-3 text-left select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1 text-caption font-medium tracking-wide text-neutral-500 uppercase">
                  Experiment
                  <SortIndicator columnKey="name" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left select-none"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1 text-caption font-medium tracking-wide text-neutral-500 uppercase">
                  Status
                  <SortIndicator columnKey="status" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-caption font-medium tracking-wide text-neutral-500 uppercase">
                  Owner
                </span>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-caption font-medium tracking-wide text-neutral-500 uppercase">
                  Target Groups
                </span>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-caption font-medium tracking-wide text-neutral-500 uppercase">
                  Started
                </span>
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left select-none"
                onClick={() => handleSort("createdOn")}
              >
                <div className="flex items-center gap-1 text-caption font-medium tracking-wide text-neutral-500 uppercase">
                  Created
                  <SortIndicator columnKey="createdOn" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </th>
              <th className="w-[120px] px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {paginatedExperiments.map((experiment, index) => (
                <motion.tr
                  key={experiment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.02 }}
                  className="group border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                >
                  <td className="p-4">
                    <span className="text-body-bold text-neutral-900">
                      {experiment.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={experiment.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar size="small" variant="brand">
                        {getInitials(experiment.email)}
                      </Avatar>
                      <span className="text-body text-neutral-700">
                        {formatName(experiment.email)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-body text-neutral-600 tabular-nums">
                      {experiment.targetGroups}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <AlreadyStartedIcon started={experiment.alreadyStarted} />
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-body text-neutral-500">
                      {experiment.createdOn}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8 text-neutral-500 hover:text-neutral-900">
                            <BarChart3 className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Results</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8 text-neutral-500 hover:text-neutral-900">
                            <Pencil className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8 text-neutral-500 hover:text-neutral-900">
                            <Copy className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8 text-neutral-500 hover:text-error-600">
                            <Trash2 className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

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
            <SelectTrigger className="h-8 w-[70px] border-neutral-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
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
            <Button
              variant="outline"
              size="icon"
              className="size-8 border-neutral-200"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronDown className="size-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8 border-neutral-200"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronDown className="size-4 -rotate-90" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
