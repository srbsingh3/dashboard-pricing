"use client";

import { useState } from "react";
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
  Columns3,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { experiments } from "@/lib/mock-data";
import { STATUS_COLORS } from "@/lib/constants";
import type { Experiment, ExperimentStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Helper components defined outside render to avoid recreation
function SortIcon({
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
    <ChevronUp className="size-4" />
  ) : (
    <ChevronDown className="size-4" />
  );
}

function StatusBadge({ status }: { status: ExperimentStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize", STATUS_COLORS[status])}
    >
      {status}
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

export function ExperimentsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdOn");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort experiments
  const filteredExperiments = experiments.filter((exp) =>
    exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Columns3 className="size-4" />
            Columns
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="size-4" />
            Filters
          </Button>
        </div>

        <div className="relative w-64">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9"
          />
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-lg border border-border bg-card"
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead
                className="w-[80px] cursor-pointer select-none"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center gap-1">
                  ID
                  <SortIcon columnKey="id" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Name
                  <SortIcon columnKey="name" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </TableHead>
              <TableHead
                className="w-[100px] cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  <SortIcon columnKey="status" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </TableHead>
              <TableHead className="w-[120px] text-center">Already Started</TableHead>
              <TableHead className="w-[110px] text-center">Target Groups</TableHead>
              <TableHead className="w-[120px] text-center">No. of Variations</TableHead>
              <TableHead
                className="w-[110px] cursor-pointer select-none"
                onClick={() => handleSort("createdOn")}
              >
                <div className="flex items-center gap-1">
                  Created On
                  <SortIcon columnKey="createdOn" sortKey={sortKey} sortDirection={sortDirection} />
                </div>
              </TableHead>
              <TableHead className="w-[200px]">Created By</TableHead>
              <TableHead className="w-[140px] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence mode="popLayout">
              {paginatedExperiments.map((experiment, index) => (
                <motion.tr
                  key={experiment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.03 }}
                  className="group transition-colors hover:bg-muted/30"
                >
                  <TableCell className="font-medium text-muted-foreground">
                    {experiment.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {experiment.name}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={experiment.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <AlreadyStartedIcon started={experiment.alreadyStarted} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center tabular-nums">
                    {experiment.targetGroups}
                  </TableCell>
                  <TableCell className="text-center tabular-nums">
                    {experiment.variations}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {experiment.createdOn}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {experiment.email}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <BarChart3 className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Results</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <Pencil className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8">
                            <Copy className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Duplicate</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-8 text-destructive hover:text-destructive">
                            <Trash2 className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page:</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {(currentPage - 1) * rowsPerPage + 1}-
            {Math.min(currentPage * rowsPerPage, sortedExperiments.length)} of{" "}
            {sortedExperiments.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronDown className="size-4 rotate-90" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={currentPage === totalPages}
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
