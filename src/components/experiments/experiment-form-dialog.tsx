"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X,
  ChevronUp,
  ChevronDown,
  Plus,
  Copy,
  Trash2,
  GripVertical,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Button as SubframeButton } from "@/subframe/components/Button";
import { Label } from "@/components/ui/label";
import { FullscreenDialog } from "@/subframe/components/FullscreenDialog";
import { TextField } from "@/subframe/components/TextField";
import { Select as SubframeSelect } from "@/subframe/components/Select";
import { RadioCardGroup } from "@/subframe/components/RadioCardGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  automaticAssignments,
  pricingComponents,
  vendorFilterFields,
  clauseOptions,
  sampleTargetGroup,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

interface ExperimentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExperimentFormDialog({
  open,
  onOpenChange,
}: ExperimentFormDialogProps) {
  const [experimentName, setExperimentName] = useState("");
  const [experimentHypothesis, setExperimentHypothesis] = useState("");
  const [experimentObjective, setExperimentObjective] = useState("");
  const [experimentType, setExperimentType] = useState("ab_test");
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  const [targetGroups, setTargetGroups] = useState([
    { ...sampleTargetGroup, id: "tg_1" },
  ]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["tg_1"])
  );

  const handleClose = () => {
    onOpenChange(false);
    // Reset form state
    setTimeout(() => {
      setExperimentName("");
      setExperimentHypothesis("");
      setExperimentObjective("");
      setExperimentType("ab_test");
      setSelectedAssignment("");
      setTargetGroups([{ ...sampleTargetGroup, id: "tg_1" }]);
      setExpandedGroups(new Set(["tg_1"]));
    }, 200);
  };

  const toggleGroupExpansion = (id: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedGroups(newExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedGroups(new Set());
  };

  const handleExpandAll = () => {
    setExpandedGroups(new Set(targetGroups.map((g) => g.id)));
  };

  const handleDuplicateGroup = (groupId: string) => {
    const group = targetGroups.find((g) => g.id === groupId);
    if (group) {
      const newId = `tg_${Date.now()}`;
      const newGroup = {
        ...group,
        id: newId,
        priority: targetGroups.length + 1,
      };
      setTargetGroups([...targetGroups, newGroup]);
      setExpandedGroups(new Set([...expandedGroups, newId]));
    }
  };

  const handleDeleteGroup = (groupId: string) => {
    if (targetGroups.length > 1) {
      setTargetGroups(targetGroups.filter((g) => g.id !== groupId));
      const newExpanded = new Set(expandedGroups);
      newExpanded.delete(groupId);
      setExpandedGroups(newExpanded);
    }
  };

  const handleAddTargetGroup = () => {
    const newId = `tg_${Date.now()}`;
    const newGroup = {
      ...sampleTargetGroup,
      id: newId,
      priority: targetGroups.length + 1,
      vendorFilters: [
        {
          id: `vf_${Date.now()}`,
          field: "Chain Name",
          clause: "is" as const,
          values: [],
        },
      ],
    };
    setTargetGroups([...targetGroups, newGroup]);
    setExpandedGroups(new Set([...expandedGroups, newId]));
  };

  return (
    <FullscreenDialog open={open} onOpenChange={onOpenChange} className="bg-background">
      {/* Visually hidden title for accessibility */}
      <DialogPrimitive.Title className="sr-only">
        New Experiment
      </DialogPrimitive.Title>

      {/* Header - Figma: Modal Header */}
      <div className="w-full bg-white">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <h2 className="text-body-bold text-neutral-900">
              New Experiment
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-neutral-500 hover:text-neutral-700"
            onClick={handleClose}
          >
            <X className="size-4" />
          </Button>
        </div>
        {/* Divider line like Figma */}
        <div className="h-px bg-neutral-200" />
      </div>

      {/* Content - Figma: Modal Contents with left/right layout */}
      <div className="w-full flex-1 overflow-hidden bg-white">
        <div className="flex h-full">
          {/* Left Panel - Experiment Details Form */}
          <div className="hidden w-96 border-r border-neutral-200 bg-neutral-50 p-6 lg:block">
            <div className="space-y-5">
              {/* Experiment Name */}
              <TextField label="Experiment Name" className="w-full gap-2">
                <TextField.Input
                  placeholder="Enter experiment name"
                  value={experimentName}
                  onChange={(e) => setExperimentName(e.target.value)}
                />
              </TextField>

              {/* Hypothesis */}
              <TextField label="Hypothesis" className="w-full gap-2">
                <TextField.Input
                  placeholder="Enter hypothesis"
                  value={experimentHypothesis}
                  onChange={(e) => setExperimentHypothesis(e.target.value)}
                />
              </TextField>

              {/* Objective */}
              <SubframeSelect
                label="Objective"
                placeholder="Select objective"
                value={experimentObjective}
                onValueChange={setExperimentObjective}
                className="w-full gap-2"
              >
                <SubframeSelect.Item value="increase_conversion">Increase Conversion</SubframeSelect.Item>
                <SubframeSelect.Item value="reduce_costs">Reduce Costs</SubframeSelect.Item>
                <SubframeSelect.Item value="improve_experience">Improve Experience</SubframeSelect.Item>
                <SubframeSelect.Item value="optimize_pricing">Optimize Pricing</SubframeSelect.Item>
              </SubframeSelect>

              {/* Experiment Type */}
              <div className="flex flex-col gap-2">
                <span className="font-caption-bold text-caption-bold text-default-font">
                  Experiment Type
                </span>
                <RadioCardGroup
                  value={experimentType}
                  onValueChange={setExperimentType}
                >
                  <div className="flex w-full items-start gap-2">
                    <RadioCardGroup.RadioCard
                      value="ab_test"
                      checked={experimentType === "ab_test"}
                      hideRadio={true}
                    >
                      <div className="flex flex-col items-start pr-2">
                        <span className="font-body-bold w-full text-body-bold text-default-font">
                          A/B Test
                        </span>
                      </div>
                    </RadioCardGroup.RadioCard>
                    <RadioCardGroup.RadioCard
                      value="switchback_test"
                      checked={experimentType === "switchback_test"}
                      hideRadio={true}
                    >
                      <div className="flex flex-col items-start pr-2">
                        <span className="font-body-bold w-full text-body-bold text-default-font">
                          Switchback Test
                        </span>
                      </div>
                    </RadioCardGroup.RadioCard>
                  </div>
                </RadioCardGroup>
              </div>

            </div>
          </div>

          {/* Right Panel - Target Groups */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl space-y-6">
              {/* Target Groups Section */}
              <TargetGroupsSection
                selectedAssignment={selectedAssignment}
                setSelectedAssignment={setSelectedAssignment}
                targetGroups={targetGroups}
                expandedGroups={expandedGroups}
                toggleGroupExpansion={toggleGroupExpansion}
                handleCollapseAll={handleCollapseAll}
                handleExpandAll={handleExpandAll}
                handleDuplicateGroup={handleDuplicateGroup}
                handleDeleteGroup={handleDeleteGroup}
                handleAddTargetGroup={handleAddTargetGroup}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Figma: Modal Footer */}
      <div className="w-full bg-white">
        {/* Divider line like Figma */}
        <div className="h-px bg-neutral-200" />
        <div className="flex items-center justify-between px-6 py-3">
          <SubframeButton
            variant="neutral-secondary"
            onClick={handleClose}
          >
            Cancel
          </SubframeButton>

          <SubframeButton variant="brand-primary">
            Save Experiment
          </SubframeButton>
        </div>
      </div>
    </FullscreenDialog>
  );
}

// Target Groups Section
function TargetGroupsSection({
  selectedAssignment,
  setSelectedAssignment,
  targetGroups,
  expandedGroups,
  toggleGroupExpansion,
  handleCollapseAll,
  handleExpandAll,
  handleDuplicateGroup,
  handleDeleteGroup,
  handleAddTargetGroup,
}: {
  selectedAssignment: string;
  setSelectedAssignment: (value: string) => void;
  targetGroups: (typeof sampleTargetGroup)[];
  expandedGroups: Set<string>;
  toggleGroupExpansion: (id: string) => void;
  handleCollapseAll: () => void;
  handleExpandAll: () => void;
  handleDuplicateGroup: (id: string) => void;
  handleDeleteGroup: (id: string) => void;
  handleAddTargetGroup: () => void;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-body-bold text-neutral-900">Target Groups</h3>

      {/* Import Section */}
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <Label className="text-caption text-neutral-700">
          Import from Automatic Assignments (optional)
        </Label>
        <div className="mt-2 flex items-center gap-3">
          <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select Automatic Assignments to Import" />
            </SelectTrigger>
            <SelectContent>
              {automaticAssignments.map((assignment) => (
                <SelectItem key={assignment.id} value={assignment.id}>
                  <div className="flex flex-col items-start">
                    <span>{assignment.name}</span>
                    <span className="text-caption text-neutral-500">
                      {assignment.targetGroups} target groups
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" disabled={!selectedAssignment}>
            Import
          </Button>
        </div>
      </div>

      {/* Target Groups Header */}
      <div className="flex items-center justify-between">
        <span className="text-caption text-neutral-500">
          {targetGroups.length} target group{targetGroups.length > 1 ? 's' : ''}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="link"
            size="sm"
            className="text-caption text-brand-600"
            onClick={handleExpandAll}
          >
            Expand All
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-caption text-brand-600"
            onClick={handleCollapseAll}
          >
            Collapse All
          </Button>
          <Button
            variant="link"
            size="sm"
            className="gap-1 text-caption text-brand-600"
            onClick={handleAddTargetGroup}
          >
            <Plus className="size-3.5" />
            Add Target Group
          </Button>
        </div>
      </div>

      {/* Target Groups List */}
      <div className="space-y-3">
        <AnimatePresence>
          {targetGroups.map((group, index) => (
            <TargetGroupCard
              key={group.id}
              group={group}
              index={index}
              isExpanded={expandedGroups.has(group.id)}
              onToggle={() => toggleGroupExpansion(group.id)}
              onDuplicate={() => handleDuplicateGroup(group.id)}
              onDelete={() => handleDeleteGroup(group.id)}
              canDelete={targetGroups.length > 1}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Target Group Card Component
function TargetGroupCard({
  group,
  index,
  isExpanded,
  onToggle,
  onDuplicate,
  onDelete,
  canDelete,
}: {
  group: typeof sampleTargetGroup;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  canDelete: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      className="overflow-hidden rounded-lg border border-neutral-200 bg-white"
    >
      {/* Card Header */}
      <div
        className="flex cursor-pointer items-center justify-between bg-neutral-50 px-4 py-3 transition-colors hover:bg-neutral-100"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <GripVertical className="size-4 cursor-grab text-neutral-400" />
          <span className="text-body-bold text-neutral-900">Priority {index + 1}</span>
          {!isExpanded && group.vendorFilters.length > 0 && (
            <div className="ml-4 flex items-center gap-2">
              {group.vendorFilters.map((filter) => (
                <Badge key={filter.id} variant="secondary" className="text-caption">
                  {filter.field}: {filter.values.join(", ") || "..."}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-neutral-500 hover:text-neutral-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate();
                }}
              >
                <Copy className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-error-500 hover:text-error-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                disabled={!canDelete}
              >
                <Trash2 className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
          <Button variant="ghost" size="icon" className="size-8 text-neutral-500">
            {isExpanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Card Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 p-4">
              {/* Target Vendors Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-body-bold text-neutral-700">Target Vendors</h4>
                  <Button variant="link" size="sm" className="h-auto gap-1 p-0 text-caption text-brand-600">
                    <Plus className="size-3" />
                    Add Filter
                  </Button>
                </div>

                {group.vendorFilters.map((filter) => (
                  <div key={filter.id} className="flex items-center gap-3">
                    <Select defaultValue={filter.field.toLowerCase().replace(" ", "_")}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {vendorFilterFields.map((field) => (
                          <SelectItem key={field.value} value={field.value}>
                            {field.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select defaultValue={filter.clause}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {clauseOptions.map((clause) => (
                          <SelectItem key={clause.value} value={clause.value}>
                            {clause.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select defaultValue="mcdonalds">
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select values..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcdonalds">
                          <Badge variant="secondary" className="mr-2">McDonalds</Badge>
                        </SelectItem>
                        <SelectItem value="burger_king">Burger King</SelectItem>
                        <SelectItem value="kfc">KFC</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="link" size="sm" className="px-2 text-caption text-error-500">
                      Remove
                    </Button>
                  </div>
                ))}

                <Button variant="link" size="sm" className="h-auto gap-1 p-0 text-caption text-brand-600">
                  Show Number Of Vendors
                </Button>
              </div>

              <Separator />

              {/* Conditions Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-body-bold text-neutral-700">Conditions</h4>
                  <Button variant="link" size="sm" className="h-auto gap-1 p-0 text-caption text-brand-600">
                    <Plus className="size-3" />
                    Add Condition
                  </Button>
                </div>
                <p className="text-caption text-neutral-500">
                  No conditions added yet.
                </p>
              </div>

              <Separator />

              {/* Control and Variation Components - THE KEY TABLE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-body-bold text-neutral-700">Control and Variation Components</h4>
                  <Button variant="link" size="sm" className="h-auto gap-1 p-0 text-caption text-brand-600">
                    <Plus className="size-3" />
                    Add Component Type
                  </Button>
                </div>

                {/* Table View */}
                <div className="overflow-hidden rounded-lg border border-neutral-200">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-50">
                        <th className="w-[100px] px-3 py-2 text-left text-caption text-neutral-500"></th>
                        {group.components.map((comp) => (
                          <th
                            key={comp.type}
                            className="px-3 py-2 text-left text-caption text-neutral-700"
                          >
                            <div className="flex items-center gap-1">
                              {comp.type}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-5 text-neutral-400 hover:text-neutral-600"
                              >
                                <X className="size-3" />
                              </Button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Control Row */}
                      <tr className="border-t border-neutral-200">
                        <td className="bg-neutral-50 px-3 py-2 text-body-bold text-neutral-700">
                          Control
                        </td>
                        {group.components.map((comp) => (
                          <td key={comp.type} className="px-3 py-2">
                            <ComponentSelect
                              value={comp.control}
                              type={comp.type}
                            />
                          </td>
                        ))}
                      </tr>

                      {/* Variation Rows */}
                      {group.components[0]?.variations.map((variation, vIndex) => (
                        <tr key={variation.id} className="border-t border-neutral-200">
                          <td className="bg-neutral-50 px-3 py-2 text-body-bold text-neutral-700">
                            Variation {vIndex + 1}
                          </td>
                          {group.components.map((comp) => {
                            const varValue = comp.variations[vIndex];
                            return (
                              <td key={comp.type} className="px-3 py-2">
                                <ComponentSelect
                                  value={varValue?.value || "Same as Control"}
                                  type={comp.type}
                                  isSameAsControl={varValue?.isSameAsControl}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Component Select with Preview
function ComponentSelect({
  value,
  type,
  isSameAsControl = false,
}: {
  value: string;
  type: string;
  isSameAsControl?: boolean;
}) {
  const component = pricingComponents.find((c) => c.name === value);

  return (
    <div className="flex items-center gap-1">
      <Select defaultValue={isSameAsControl ? "same_as_control" : value}>
        <SelectTrigger
          className={cn(
            "h-8 text-body",
            isSameAsControl && "text-neutral-500 italic"
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="same_as_control" className="text-neutral-500 italic">
            Same as Control
          </SelectItem>
          <Separator className="my-1" />
          {pricingComponents
            .filter((c) => c.type === type.toLowerCase().replace(" ", "_"))
            .map((comp) => (
              <SelectItem key={comp.id} value={comp.name}>
                {comp.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {component && !isSameAsControl && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <Eye className="size-4 text-neutral-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <div className="space-y-1">
              <p className="text-body-bold">{component.name}</p>
              <p className="text-caption text-neutral-500">{component.value}</p>
              <p className="text-caption">{component.description}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
