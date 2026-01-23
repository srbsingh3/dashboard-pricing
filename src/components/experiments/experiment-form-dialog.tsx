"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  ChevronUp,
  ChevronDown,
  Plus,
  Copy,
  Trash2,
  GripVertical,
  Eye,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type Step = 1 | 2;

export function ExperimentFormDialog({
  open,
  onOpenChange,
}: ExperimentFormDialogProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [experimentName, setExperimentName] = useState("");
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
      setCurrentStep(1);
      setExperimentName("");
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              New Experiment
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <StepIndicator
              step={1}
              label="Experiment Details"
              isActive={currentStep === 1}
              isCompleted={currentStep > 1}
            />
            <div className="w-24 h-0.5 bg-border" />
            <StepIndicator
              step={2}
              label="Target Groups"
              isActive={currentStep === 2}
              isCompleted={false}
            />
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              <Step1Content
                key="step1"
                experimentName={experimentName}
                setExperimentName={setExperimentName}
                onNext={() => setCurrentStep(2)}
              />
            ) : (
              <Step2Content
                key="step2"
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
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t bg-muted/30">
          <Button
            variant="outline"
            onClick={() => (currentStep === 1 ? handleClose() : setCurrentStep(1))}
          >
            {currentStep === 1 ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Back
              </>
            ) : (
              <>
                <ChevronUp className="h-4 w-4 mr-2 -rotate-90" />
                Back
              </>
            )}
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            {currentStep === 1 ? (
              <Button onClick={() => setCurrentStep(2)}>
                Continue
                <ChevronUp className="h-4 w-4 ml-2 rotate-90" />
              </Button>
            ) : (
              <Button>
                Save Experiment
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Step Indicator Component
function StepIndicator({
  step,
  label,
  isActive,
  isCompleted,
}: {
  step: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "h-7 w-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
          isCompleted
            ? "bg-primary text-primary-foreground"
            : isActive
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : step}
      </div>
      <span
        className={cn(
          "text-sm font-medium",
          isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}

// Step 1 Content
function Step1Content({
  experimentName,
  setExperimentName,
  onNext,
}: {
  experimentName: string;
  setExperimentName: (name: string) => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Experiment Name</Label>
        <Input
          id="name"
          placeholder="Enter experiment name..."
          value={experimentName}
          onChange={(e) => setExperimentName(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input type="date" defaultValue="2024-01-15" />
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <Input type="date" defaultValue="2024-02-15" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <Label>Description (optional)</Label>
        <textarea
          className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Add a description for this experiment..."
        />
      </div>
    </motion.div>
  );
}

// Step 2 Content - Target Groups Configuration
function Step2Content({
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
  targetGroups: typeof sampleTargetGroup[];
  expandedGroups: Set<string>;
  toggleGroupExpansion: (id: string) => void;
  handleCollapseAll: () => void;
  handleExpandAll: () => void;
  handleDuplicateGroup: (id: string) => void;
  handleDeleteGroup: (id: string) => void;
  handleAddTargetGroup: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Import Section */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
        <Label className="text-sm font-medium">
          Import target groups from Automatic Assignments (optional)
        </Label>
        <div className="flex items-center gap-3 mt-2">
          <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select Automatic Assignments to Import" />
            </SelectTrigger>
            <SelectContent>
              {automaticAssignments.map((assignment) => (
                <SelectItem key={assignment.id} value={assignment.id}>
                  <div className="flex flex-col items-start">
                    <span>{assignment.name}</span>
                    <span className="text-xs text-muted-foreground">
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
        <h3 className="text-base font-semibold">Target Groups</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="link"
            size="sm"
            className="text-primary"
            onClick={handleCollapseAll}
          >
            Collapse All
          </Button>
          <Button
            variant="link"
            size="sm"
            className="text-primary gap-1"
            onClick={handleAddTargetGroup}
          >
            <Plus className="h-4 w-4" />
            Add Target Group
          </Button>
        </div>
      </div>

      {/* Target Groups List */}
      <div className="space-y-4">
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
    </motion.div>
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
      className="border rounded-lg overflow-hidden bg-card"
    >
      {/* Card Header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
          <span className="font-medium">Priority {index + 1}</span>
          {!isExpanded && group.vendorFilters.length > 0 && (
            <div className="flex items-center gap-2 ml-4">
              {group.vendorFilters.map((filter) => (
                <Badge key={filter.id} variant="secondary" className="text-xs">
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
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate();
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                disabled={!canDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
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
            <div className="p-4 space-y-6">
              {/* Target Vendors Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Target Vendors</h4>
                  <Button variant="link" size="sm" className="text-primary gap-1 h-auto p-0">
                    <Plus className="h-3 w-3" />
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

                    <Button variant="link" size="sm" className="text-destructive px-2">
                      Remove
                    </Button>
                  </div>
                ))}

                <Button variant="link" size="sm" className="text-primary gap-1 h-auto p-0">
                  Show Number Of Vendors
                </Button>
              </div>

              <Separator />

              {/* Conditions Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Conditions</h4>
                  <Button variant="link" size="sm" className="text-primary gap-1 h-auto p-0">
                    <Plus className="h-3 w-3" />
                    Add Condition
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  No conditions added yet.
                </p>
              </div>

              <Separator />

              {/* Control and Variation Components - THE KEY TABLE */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Control and Variation Components</h4>
                  <Button variant="link" size="sm" className="text-primary gap-1 h-auto p-0">
                    <Plus className="h-3 w-3" />
                    Add Component Type
                  </Button>
                </div>

                {/* Table View - This is the key innovation */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 w-[100px]"></th>
                        {group.components.map((comp) => (
                          <th
                            key={comp.type}
                            className="text-left text-xs font-medium px-3 py-2"
                          >
                            <div className="flex items-center gap-1">
                              {comp.type}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Control Row */}
                      <tr className="border-t">
                        <td className="px-3 py-2 text-sm font-medium bg-muted/30">
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
                        <tr key={variation.id} className="border-t">
                          <td className="px-3 py-2 text-sm font-medium bg-muted/30">
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
            "h-8 text-sm",
            isSameAsControl && "text-muted-foreground italic"
          )}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="same_as_control" className="italic text-muted-foreground">
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
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">{component.name}</p>
              <p className="text-xs text-muted-foreground">{component.value}</p>
              <p className="text-xs">{component.description}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
