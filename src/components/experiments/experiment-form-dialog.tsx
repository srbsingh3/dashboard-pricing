"use client";

import { useState, useCallback } from "react";
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
import { IconButton } from "@/subframe/components/IconButton";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import {
  Store,
  SlidersHorizontal,
  GitBranch,
  Plus,
  ListFilter,
  Calendar,
  Power,
  MapPin,
  Tag,
  Link,
  Layers,
  Map,
  Truck,
  Users,
  Crown,
  Building2,
  ChevronsDownUp,
  ChevronsUpDown,
} from "lucide-react";
import * as SubframeCore from "@subframe/core";
import { FeatherChevronDown, FeatherTrash2, FeatherCopy, FeatherGripVertical } from "@subframe/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { ScrollContainer } from "@/components/ui/scroll-container";
import {
  VendorFilterList,
  VendorFilter,
  generateFilterId,
} from "./vendor-filter-row";
import { Badge } from "@/subframe/components/Badge";

// Helper to generate random vendor count between 40 and 2000
// direction: 'increase' when filter removed, 'decrease' when filter added
const generateRandomVendorCount = (
  currentCount?: number,
  direction?: 'increase' | 'decrease'
): number => {
  const MIN_COUNT = 40;
  const MAX_COUNT = 2000;

  // If no current count or direction, return a random number in full range
  if (currentCount === undefined || direction === undefined) {
    return Math.floor(Math.random() * (MAX_COUNT - MIN_COUNT + 1)) + MIN_COUNT;
  }

  if (direction === 'decrease') {
    // Filter added: generate a random number LESS than current (but at least MIN_COUNT)
    const lowerBound = MIN_COUNT;
    const upperBound = Math.max(MIN_COUNT, currentCount - 1);
    if (lowerBound >= upperBound) return MIN_COUNT;
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
  } else {
    // Filter removed: generate a random number MORE than current (but at most MAX_COUNT)
    const lowerBound = Math.min(MAX_COUNT, currentCount + 1);
    const upperBound = MAX_COUNT;
    if (lowerBound >= upperBound) return MAX_COUNT;
    return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
  }
};

interface ExperimentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sortable Priority Card wrapper component
interface SortablePriorityCardProps {
  id: number;
  children: React.ReactNode;
  disabled?: boolean;
}

function SortablePriorityCard({ id, children, disabled }: SortablePriorityCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    // Use Translate instead of Transform to prevent scaling/crushing when items have different heights
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.9 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* Clone children and pass drag handle props */}
      {typeof children === 'function'
        ? (children as (props: { listeners: typeof listeners; isDragging: boolean }) => React.ReactNode)({ listeners, isDragging })
        : children}
    </div>
  );
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
  const [priorityGroups, setPriorityGroups] = useState<{ id: number; isExpanded: boolean; vendorFilters: VendorFilter[]; vendorCount: number }[]>(() => [
    { id: 1, isExpanded: true, vendorFilters: [], vendorCount: generateRandomVendorCount() }
  ]);

  // Add a new filter to a specific priority group
  const addVendorFilter = useCallback((groupId: number, fieldValue: string) => {
    const newFilter: VendorFilter = {
      id: generateFilterId(),
      field: fieldValue,
      condition: "contains",
      values: [],
    };
    setPriorityGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              vendorFilters: [...group.vendorFilters, newFilter],
              vendorCount: generateRandomVendorCount(group.vendorCount, 'decrease')
            }
          : group
      )
    );
  }, []);

  // Update vendor filters for a specific group
  const updateGroupFilters = useCallback((groupId: number, filters: VendorFilter[]) => {
    setPriorityGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;

        // Determine direction based on filter count change
        const oldCount = group.vendorFilters.length;
        const newCount = filters.length;
        let direction: 'increase' | 'decrease' | undefined;

        if (newCount > oldCount) {
          direction = 'decrease'; // Filter added
        } else if (newCount < oldCount) {
          direction = 'increase'; // Filter removed
        }
        // If count is same (filter value changed), keep existing vendor count

        return {
          ...group,
          vendorFilters: filters,
          vendorCount: direction ? generateRandomVendorCount(group.vendorCount, direction) : group.vendorCount
        };
      })
    );
  }, []);

  // Toggle expansion of a single priority group
  const toggleGroupExpanded = useCallback((groupId: number) => {
    setPriorityGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group
      )
    );
  }, []);

  // Add a new priority group
  const addPriorityGroup = useCallback(() => {
    setPriorityGroups((prev) => {
      const newId = Math.max(...prev.map((g) => g.id)) + 1;
      return [...prev, { id: newId, isExpanded: true, vendorFilters: [], vendorCount: generateRandomVendorCount() }];
    });
  }, []);

  // Collapse all priority groups
  const collapseAll = useCallback(() => {
    setPriorityGroups((prev) =>
      prev.map((group) => ({ ...group, isExpanded: false }))
    );
  }, []);

  // Expand all priority groups
  const expandAll = useCallback(() => {
    setPriorityGroups((prev) =>
      prev.map((group) => ({ ...group, isExpanded: true }))
    );
  }, []);

  // Delete a priority group (only if more than one exists)
  const deletePriorityGroup = useCallback((groupId: number) => {
    setPriorityGroups((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((group) => group.id !== groupId);
    });
  }, []);

  // Duplicate a priority group
  const duplicatePriorityGroup = useCallback((groupId: number) => {
    setPriorityGroups((prev) => {
      const groupToDuplicate = prev.find((g) => g.id === groupId);
      if (!groupToDuplicate) return prev;
      const newId = Math.max(...prev.map((g) => g.id)) + 1;
      const groupIndex = prev.findIndex((g) => g.id === groupId);
      const duplicatedGroup = {
        ...groupToDuplicate,
        id: newId,
        vendorFilters: groupToDuplicate.vendorFilters.map((f) => ({ ...f, id: generateFilterId() })),
        vendorCount: groupToDuplicate.vendorCount,
      };
      const newGroups = [...prev];
      newGroups.splice(groupIndex + 1, 0, duplicatedGroup);
      return newGroups;
    });
  }, []);

  // Reorder priority groups after drag and drop
  const reorderPriorityGroups = useCallback((activeId: number, overId: number) => {
    setPriorityGroups((prev) => {
      const oldIndex = prev.findIndex((g) => g.id === activeId);
      const newIndex = prev.findIndex((g) => g.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderPriorityGroups(active.id as number, over.id as number);
    }
  }, [reorderPriorityGroups]);

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
      setPriorityGroups([{ id: 1, isExpanded: true, vendorFilters: [], vendorCount: generateRandomVendorCount() }]);
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
          <div className="hidden w-96 border-r border-neutral-200 bg-white p-6 lg:block">
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
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-caption-bold text-neutral-700">Hypothesis</span>
                  <span className="text-caption text-neutral-400">Optional</span>
                </div>
                <TextField className="w-full">
                  <TextField.Input
                    placeholder="Enter hypothesis"
                    value={experimentHypothesis}
                    onChange={(e) => setExperimentHypothesis(e.target.value)}
                  />
                </TextField>
              </div>

              {/* Objective */}
              <div className="flex w-full flex-col gap-2">
                <span className="text-caption-bold text-neutral-700">Objective</span>
                <Select
                  value={experimentObjective}
                  onValueChange={setExperimentObjective}
                >
                  <SelectTrigger size="sm" className="w-full border-neutral-border bg-default-background text-body shadow-none focus-visible:border-brand-primary focus-visible:ring-0 data-placeholder:text-neutral-400 [&>svg]:text-subtext-color">
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
                    <SelectTrigger size="sm" className="w-full border-neutral-border bg-default-background text-body shadow-none focus-visible:border-brand-primary focus-visible:ring-0 [&>svg]:text-subtext-color">
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
                    placeholder="1-100"
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
          <div className="flex-1 bg-neutral-50">
            <ScrollContainer className="p-6">
              <div className="mx-auto max-w-[860px] space-y-4">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-body-bold text-neutral-900">Target Groups</h3>
                  <Badge variant="neutral">{priorityGroups.length}</Badge>
                </div>
                <div className="flex items-center gap-1">
                  <IconButton
                    size="medium"
                    icon={<ChevronsDownUp className="size-4" />}
                    onClick={collapseAll}
                  />
                  <IconButton
                    size="medium"
                    icon={<ChevronsUpDown className="size-4" />}
                    onClick={expandAll}
                  />
                  <IconButton
                    size="medium"
                    icon={<Plus className="size-4" />}
                    onClick={addPriorityGroup}
                  />
                </div>
              </div>

              {/* Priority Cards - rendered from state with drag and drop */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={priorityGroups.map((g) => g.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {priorityGroups.map((group, index) => (
                    <SortablePriorityCard
                      key={group.id}
                      id={group.id}
                    >
                      {({ listeners, isDragging }: { listeners: Record<string, unknown>; isDragging: boolean }) => (
                        <div className={cn(
                          "flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background shadow-sm",
                          isDragging && "shadow-lg"
                        )}>
                          {/* Header */}
                          <div className="group/header flex w-full items-center gap-2 px-6 py-4">
                            {/* Drag Handle */}
                            <div
                              {...listeners}
                              className="-ml-2 flex size-8 cursor-grab items-center justify-center rounded-md transition-all hover:bg-neutral-100 active:cursor-grabbing"
                              aria-label="Drag to reorder"
                            >
                              <FeatherGripVertical className="text-body text-subtext-color" />
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleGroupExpanded(group.id)}
                              className="flex shrink-0 grow basis-0 items-center gap-2"
                            >
                              <span className="shrink-0 grow basis-0 text-left text-body-bold text-default-font">
                                Priority {index + 1}
                              </span>
                            </button>
                            {priorityGroups.length > 1 && (
                              <button
                                type="button"
                                onClick={() => deletePriorityGroup(group.id)}
                                className="group/delete -my-1 flex size-8 items-center justify-center rounded-md opacity-0 transition-all group-hover/header:opacity-100 hover:bg-error-50"
                                aria-label="Remove priority group"
                              >
                                <FeatherTrash2 className="text-body text-subtext-color group-hover/delete:text-error-600" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => duplicatePriorityGroup(group.id)}
                              className="-my-1 flex size-8 items-center justify-center rounded-md opacity-0 transition-all group-hover/header:opacity-100 hover:bg-neutral-100"
                              aria-label="Duplicate priority group"
                            >
                              <FeatherCopy className="text-body text-subtext-color" />
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleGroupExpanded(group.id)}
                              className="-my-1 flex size-8 items-center justify-center rounded-md transition-colors hover:bg-neutral-100"
                            >
                              <FeatherChevronDown
                                className={cn(
                                  "text-body text-subtext-color transition-transform duration-200",
                                  group.isExpanded && "rotate-180"
                                )}
                              />
                            </button>
                          </div>
                  {/* Divider */}
                  <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
                  {/* List of sections - collapsible */}
                  {group.isExpanded && (
                    <div className="flex w-full flex-col items-start p-2">
                      {/* Target Vendors */}
                      <div className="flex w-full items-center gap-4 p-4">
                        <IconWithBackground
                          size="medium"
                          variant="brand"
                          icon={<Store className="size-4" />}
                        />
                        <div className="flex shrink-0 grow basis-0 items-center gap-2">
                          <span className="text-body-bold text-default-font">
                            Target Vendors
                          </span>
                          {group.vendorFilters.length > 0 && (
                            <Badge variant="brand">{group.vendorCount.toLocaleString()}</Badge>
                          )}
                        </div>
                        <SubframeCore.DropdownMenu.Root>
                          <SubframeCore.DropdownMenu.Trigger asChild>
                            <IconButton
                              size="small"
                              icon={<ListFilter className="size-4" />}
                            />
                          </SubframeCore.DropdownMenu.Trigger>
                          <SubframeCore.DropdownMenu.Portal>
                            <SubframeCore.DropdownMenu.Content
                              side="left"
                              align="start"
                              sideOffset={4}
                              asChild
                            >
                              <DropdownMenu>
                                <DropdownMenu.DropdownItem
                                  icon={<Calendar className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "activation_date")}
                                >
                                  Activation Date
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Power className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "active")}
                                >
                                  Active
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Link className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "chain_name")}
                                >
                                  Chain Name
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<MapPin className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "city_names")}
                                >
                                  City Names
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Users className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "customer_types")}
                                >
                                  Customer Types
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Truck className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "delivery_types")}
                                >
                                  Delivery Types
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Crown className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "key_account")}
                                >
                                  Key Account
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Tag className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "marketing_tags")}
                                >
                                  Marketing Tags
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Building2 className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "vendor_name")}
                                >
                                  Vendor Name
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Layers className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "vertical_type")}
                                >
                                  Vertical Type
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<Map className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "zone_names")}
                                >
                                  Zone Names
                                </DropdownMenu.DropdownItem>
                              </DropdownMenu>
                            </SubframeCore.DropdownMenu.Content>
                          </SubframeCore.DropdownMenu.Portal>
                        </SubframeCore.DropdownMenu.Root>
                      </div>

                      {/* Vendor Filter Rows */}
                      {group.vendorFilters.length > 0 && (
                        <div className="w-full px-4 pb-2">
                          <VendorFilterList
                            filters={group.vendorFilters}
                            onFiltersChange={(filters) => updateGroupFilters(group.id, filters)}
                          />
                        </div>
                      )}

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
                        <IconButton
                          size="small"
                          icon={<Plus className="size-4" />}
                        />
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
                        <IconButton
                          size="small"
                          icon={<Plus className="size-4" />}
                        />
                      </div>
                    </div>
                  )}
                        </div>
                      )}
                    </SortablePriorityCard>
                  ))}
                </SortableContext>
              </DndContext>
              </div>
            </ScrollContainer>
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
