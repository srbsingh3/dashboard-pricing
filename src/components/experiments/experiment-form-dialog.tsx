"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Split, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Button as SubframeButton } from "@/subframe/components/Button";
import { FullscreenDialog } from "@/subframe/components/FullscreenDialog";
import { TextField } from "@/subframe/components/TextField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioCardGroup } from "@/subframe/components/RadioCardGroup";
import { MultiSelect } from "@/components/ui/multi-select";
import { ZONES, PARENT_VERTICALS, VARIATION_OPTIONS } from "@/lib/constants";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Store, SlidersHorizontal, GitBranch, Plus } from "lucide-react";
import { FeatherChevronDown } from "@subframe/core";
import { cn } from "@/lib/utils";

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
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>([]);
  const [numberOfVariations, setNumberOfVariations] = useState("1");
  const [participantShare, setParticipantShare] = useState("");
  const [isPriorityExpanded, setIsPriorityExpanded] = useState(true);

  const handleClose = () => {
    onOpenChange(false);
    // Reset form state
    setTimeout(() => {
      setExperimentName("");
      setExperimentHypothesis("");
      setExperimentObjective("");
      setExperimentType("ab_test");
      setSelectedZones([]);
      setSelectedVerticals([]);
      setNumberOfVariations("1");
      setParticipantShare("");
      setIsPriorityExpanded(true);
    }, 200);
  };

  // Prevent dialog from closing when interacting with Chrome extensions
  const preventOutsideClose = (e: Event) => e.preventDefault();

  
  return (
    <FullscreenDialog
      open={open}
      onOpenChange={onOpenChange}
      className="bg-background"
      {...{
        onPointerDownOutside: preventOutsideClose,
        onInteractOutside: preventOutsideClose,
      }}
    >
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
              <div className="flex w-full flex-col gap-2">
                <span className="text-caption-bold text-neutral-700">Objective</span>
                <Select
                  value={experimentObjective}
                  onValueChange={setExperimentObjective}
                >
                  <SelectTrigger size="sm" className="w-full border-neutral-border bg-default-background text-body shadow-none focus:border-brand-primary focus:ring-0 focus-visible:border-brand-primary focus-visible:ring-0 data-placeholder:text-neutral-400 [&>svg]:text-subtext-color">
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={4} className="border-neutral-border bg-white shadow-lg">
                    <SelectItem value="increase_conversion" className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600">Increase Conversion</SelectItem>
                    <SelectItem value="reduce_costs" className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600">Reduce Costs</SelectItem>
                    <SelectItem value="improve_experience" className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600">Improve Experience</SelectItem>
                    <SelectItem value="optimize_pricing" className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600">Optimize Pricing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experiment Type */}
              <div className="flex flex-col gap-2">
                <span className="text-caption-bold text-neutral-700">
                  Experiment Type
                </span>
                <RadioCardGroup
                  value={experimentType}
                  onValueChange={setExperimentType}
                >
                  <div className="flex w-full items-stretch gap-2">
                    <RadioCardGroup.RadioCard
                      value="ab_test"
                      checked={experimentType === "ab_test"}
                      hideRadio={true}
                      className="flex-1"
                    >
                      <div className="flex flex-col items-start gap-4 py-2">
                        <Split className="size-4 text-brand-500" />
                        <span className="text-body-bold text-neutral-900">
                          A/B Test
                        </span>
                      </div>
                    </RadioCardGroup.RadioCard>
                    <RadioCardGroup.RadioCard
                      value="switchback_test"
                      checked={experimentType === "switchback_test"}
                      hideRadio={true}
                      className="flex-1"
                    >
                      <div className="flex flex-col items-start gap-4 py-2">
                        <RefreshCw className="size-4 text-success-500" />
                        <span className="text-body-bold text-neutral-900">
                          Switchback Test
                        </span>
                      </div>
                    </RadioCardGroup.RadioCard>
                  </div>
                </RadioCardGroup>
              </div>

              {/* Divider */}
              <div className="my-6 w-full border-t border-neutral-border" />

              {/* Target Zones Multi-Select */}
              <MultiSelect
                label="Target Zones"
                options={ZONES}
                value={selectedZones}
                onValueChange={setSelectedZones}
                placeholder="Select zones..."
              />

              {/* Parent Verticals Multi-Select */}
              <MultiSelect
                label="Parent Verticals"
                options={PARENT_VERTICALS}
                value={selectedVerticals}
                onValueChange={setSelectedVerticals}
                placeholder="Select verticals..."
                itemLabel="vertical"
                optional
              />

              {/* Two side-by-side fields */}
              <div className="flex gap-3">
                {/* Number of Variations */}
                <div className="flex flex-1 flex-col gap-2">
                  <span className="text-caption-bold text-neutral-700">Number of Variations</span>
                  <Select
                    value={numberOfVariations}
                    onValueChange={setNumberOfVariations}
                  >
                    <SelectTrigger size="sm" className="w-full border-neutral-border bg-default-background text-body shadow-none focus:border-brand-primary focus:ring-0 focus-visible:border-brand-primary focus-visible:ring-0 [&>svg]:text-subtext-color">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4} className="border-neutral-border bg-white shadow-lg">
                      {VARIATION_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Total Participant Share */}
                <TextField
                  label="Total Participant Share"
                  className="flex-1 gap-2"
                  iconRight={<span className="text-body text-neutral-400">%</span>}
                >
                  <TextField.Input
                    type="number"
                    placeholder="Enter value"
                    value={participantShare}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || (Number(val) >= 1 && Number(val) <= 100)) {
                        setParticipantShare(val);
                      }
                    }}
                  />
                </TextField>
              </div>

            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {/* Section Header */}
              <h3 className="text-body-bold text-neutral-900">Target Groups</h3>

              {/* Priority Card - styled like Subframe To-do box */}
              <div className="flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
                {/* Header */}
                <button
                  type="button"
                  onClick={() => setIsPriorityExpanded(!isPriorityExpanded)}
                  className="flex w-full flex-col items-start gap-2 px-6 py-4"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="shrink-0 grow basis-0 text-left text-body-bold text-default-font">
                      Priority 1
                    </span>
                    <FeatherChevronDown
                      className={cn(
                        "text-body text-subtext-color transition-transform duration-200",
                        isPriorityExpanded && "rotate-180"
                      )}
                    />
                  </div>
                </button>
                {/* Divider */}
                <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
                {/* List of sections - collapsible */}
                {isPriorityExpanded && (
                  <div className="flex w-full flex-col items-start p-2">
                    {/* Target Vendors */}
                    <div className="flex w-full items-center gap-4 p-4">
                      <IconWithBackground
                        size="medium"
                        variant="brand"
                        icon={<Store className="size-4" />}
                      />
                      <div className="flex shrink-0 grow basis-0 flex-col items-start gap-1">
                        <span className="w-full text-body-bold text-default-font">
                          Target Vendors
                        </span>
                      </div>
                      <Plus className="size-4 text-default-font" />
                    </div>

                    {/* Conditions */}
                    <div className="flex w-full items-center gap-4 p-4">
                      <IconWithBackground
                        size="medium"
                        variant="warning"
                        icon={<SlidersHorizontal className="size-4" />}
                      />
                      <div className="flex shrink-0 grow basis-0 flex-col items-start gap-1">
                        <span className="w-full text-body-bold text-default-font">
                          Conditions
                        </span>
                      </div>
                      <Plus className="size-4 text-default-font" />
                    </div>

                    {/* Control and Variation */}
                    <div className="flex w-full items-center gap-4 p-4">
                      <IconWithBackground
                        size="medium"
                        variant="success"
                        icon={<GitBranch className="size-4" />}
                      />
                      <div className="flex shrink-0 grow basis-0 flex-col items-start gap-1">
                        <span className="w-full text-body-bold text-default-font">
                          Control and Variation
                        </span>
                      </div>
                      <Plus className="size-4 text-default-font" />
                    </div>
                  </div>
                )}
              </div>
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
