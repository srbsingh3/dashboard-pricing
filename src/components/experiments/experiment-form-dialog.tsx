"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Split, RefreshCw, ChevronDown } from "lucide-react";
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
import { ChipMultiSelect } from "@/components/ui/chip-multi-select";
import { SearchSelect } from "@/components/ui/search-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ZONES, PARENT_VERTICALS, ASSIGNMENT_NAMES, VARIATION_OPTIONS, OBJECTIVE_OPTIONS, DELIVERY_FEE_COMPONENTS, MOV_COMPONENTS, EXPERIMENT_VARIABLE_COLUMNS, FLEET_DELAY_COMPONENTS, BASKET_VALUE_COMPONENTS, SERVICE_FEE_COMPONENTS, PRIORITY_FEE_COMPONENTS, CUSTOMER_CONDITION_TYPES, CUSTOMER_LOCATIONS } from "@/lib/constants";
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
  Clock,
  ShoppingBasket,
  Receipt,
  Zap,
  Banknote,
  ShoppingCart,
  Equal,
  UserPlus,
  MapPinned,
  Import,
  CheckCircle2,
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
import { Toast } from "@/subframe/components/Toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ParticipantSplitChart } from "./participant-split-chart";
import {
  ConditionsGrid,
  Condition,
  TimeCondition,
  NewCustomerCondition,
  CustomerLocationCondition,
  createTimeCondition,
  createNewCustomerCondition,
  createCustomerLocationCondition,
  generateConditionId,
} from "./condition-cards";

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

// Helper to create a random time condition for imported target groups
const createRandomTimeCondition = (): TimeCondition => {
  const allDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const shuffled = [...allDays].sort(() => Math.random() - 0.5);
  const numDays = Math.floor(Math.random() * 4) + 2; // 2-5 days
  const selectedDays = shuffled.slice(0, numDays);

  const startHour = Math.floor(Math.random() * 10) + 8; // 8-17
  const endHour = Math.min(startHour + Math.floor(Math.random() * 6) + 2, 23); // +2 to +8 hours

  return {
    id: generateConditionId(),
    repeatMode: "weekly",
    allDay: Math.random() > 0.8,
    startTime: `${String(startHour).padStart(2, "0")}:00`,
    endTime: `${String(endHour).padStart(2, "0")}:00`,
    selectedDays,
  };
};

// Helper to create a random new customer condition for imported target groups
const createRandomNewCustomerCondition = (): NewCustomerCondition => {
  const randomType = CUSTOMER_CONDITION_TYPES[Math.floor(Math.random() * CUSTOMER_CONDITION_TYPES.length)].value;

  return {
    id: generateConditionId(),
    customerType: randomType,
    orderCountEnabled: Math.random() > 0.3,
    orderCountValue: String(Math.floor(Math.random() * 8) + 1),
    daysSinceFirstOrderEnabled: Math.random() > 0.5,
    daysSinceFirstOrderValue: String(Math.floor(Math.random() * 50) + 10),
  };
};

// Helper to create a random customer location condition for imported target groups
const createRandomCustomerLocationCondition = (): CustomerLocationCondition => {
  const shuffled = [...CUSTOMER_LOCATIONS].sort(() => Math.random() - 0.5);
  const numLocations = Math.floor(Math.random() * 4) + 1; // 1-4 locations
  const locations = shuffled.slice(0, numLocations).map(l => l.value);

  return {
    id: generateConditionId(),
    locations,
  };
};

// Helper to create a random condition (picks from all 3 types)
const createRandomCondition = (): Condition => {
  const conditionTypes: Array<"time" | "new_customer" | "customer_location"> = [
    "time",
    "new_customer",
    "customer_location",
  ];
  const randomType = conditionTypes[Math.floor(Math.random() * conditionTypes.length)];

  switch (randomType) {
    case "time":
      return { type: "time", data: createRandomTimeCondition() };
    case "new_customer":
      return { type: "new_customer", data: createRandomNewCustomerCondition() };
    case "customer_location":
      return { type: "customer_location", data: createRandomCustomerLocationCondition() };
  }
};

// Helper to pick a random component from an array
const getRandomComponent = <T extends { value: string }>(components: readonly T[]): string => {
  return components[Math.floor(Math.random() * components.length)].value;
};

// Helper to randomly select 1-4 extra columns to enable
const getRandomEnabledColumns = (): string[] => {
  const allColumns = ["fleet_delay", "basket_value", "service_fee", "priority_fee"];
  const shuffled = [...allColumns].sort(() => Math.random() - 0.5);
  const numColumns = Math.floor(Math.random() * 4) + 1; // 1-4 columns
  return shuffled.slice(0, numColumns);
};

interface ExperimentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sortable Priority Card wrapper component
interface SortablePriorityCardProps {
  id: number;
  children: React.ReactNode | ((props: { listeners: Record<string, unknown>; isDragging: boolean }) => React.ReactNode);
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
  const [selectedTargetGroups, setSelectedTargetGroups] = useState<string[]>([]);
  const [numberOfVariations, setNumberOfVariations] = useState("1");
  const [participantShare, setParticipantShare] = useState("");
  const [allExpanded, setAllExpanded] = useState(true);
  const [importPopoverOpen, setImportPopoverOpen] = useState(false);
  const [priorityGroups, setPriorityGroups] = useState<{
    id: number;
    isExpanded: boolean;
    vendorFilters: VendorFilter[];
    vendorCount: number;
    conditions: Condition[];
    controlDeliveryFee: string | null;
    controlMov: string | null;
    controlFleetDelay: string | null;
    controlBasketValue: string | null;
    controlServiceFee: string | null;
    controlPriorityFee: string | null;
    enabledColumns: string[];
    variations: Array<{
      deliveryFee: string | null;
      mov: string | null;
      fleetDelay: string | null;
      basketValue: string | null;
      serviceFee: string | null;
      priorityFee: string | null;
    }>;
  }[]>(() => []);

  // Add a new filter to a specific priority group
  const addVendorFilter = useCallback((groupId: number, fieldValue: string) => {
    const newFilter: VendorFilter = {
      id: generateFilterId(),
      field: fieldValue,
      condition: "is",
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
    setPriorityGroups((prev) => {
      const newGroups = prev.map((group) =>
        group.id === groupId ? { ...group, isExpanded: !group.isExpanded } : group
      );
      // Update allExpanded based on whether all groups are now expanded
      const allAreExpanded = newGroups.every((g) => g.isExpanded);
      const noneAreExpanded = newGroups.every((g) => !g.isExpanded);
      if (allAreExpanded) setAllExpanded(true);
      if (noneAreExpanded) setAllExpanded(false);
      return newGroups;
    });
  }, []);

  // Add a new priority group at the top
  const addPriorityGroup = useCallback(() => {
    setPriorityGroups((prev) => {
      const newId = prev.length === 0 ? 1 : Math.max(...prev.map((g) => g.id)) + 1;
      return [{
        id: newId,
        isExpanded: true,
        vendorFilters: [],
        vendorCount: generateRandomVendorCount(),
        conditions: [],
        controlDeliveryFee: null,
        controlMov: null,
        controlFleetDelay: null,
        controlBasketValue: null,
        controlServiceFee: null,
        controlPriorityFee: null,
        enabledColumns: [],
        variations: Array.from({ length: parseInt(numberOfVariations, 10) }, () => ({
          deliveryFee: "same_as_control",
          mov: "same_as_control",
          fleetDelay: "same_as_control",
          basketValue: "same_as_control",
          serviceFee: "same_as_control",
          priorityFee: "same_as_control",
        })),
      }, ...prev];
    });
  }, [numberOfVariations]);

  // Toggle all priority groups expanded/collapsed with animation
  const toggleAllExpanded = useCallback(() => {
    setAllExpanded((prev) => !prev);
    setPriorityGroups((prevGroups) =>
      prevGroups.map((group) => ({ ...group, isExpanded: !allExpanded }))
    );
  }, [allExpanded]);

  // Delete a priority group
  const deletePriorityGroup = useCallback((groupId: number) => {
    setPriorityGroups((prev) => prev.filter((group) => group.id !== groupId));
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
        conditions: groupToDuplicate.conditions.map((c) => ({ ...c, data: { ...c.data } })),
        controlDeliveryFee: groupToDuplicate.controlDeliveryFee,
        controlMov: groupToDuplicate.controlMov,
        controlFleetDelay: groupToDuplicate.controlFleetDelay,
        controlBasketValue: groupToDuplicate.controlBasketValue,
        controlServiceFee: groupToDuplicate.controlServiceFee,
        controlPriorityFee: groupToDuplicate.controlPriorityFee,
        enabledColumns: [...groupToDuplicate.enabledColumns],
        variations: groupToDuplicate.variations.map((v) => ({ ...v })),
      };
      const newGroups = [...prev];
      newGroups.splice(groupIndex + 1, 0, duplicatedGroup);
      return newGroups;
    });
  }, []);

  // Update control selection for a priority group
  const updateControlSelection = useCallback((groupId: number, field: 'deliveryFee' | 'mov' | 'fleetDelay' | 'basketValue' | 'serviceFee' | 'priorityFee', value: string | null) => {
    setPriorityGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        const fieldMapping: Record<string, string> = {
          deliveryFee: 'controlDeliveryFee',
          mov: 'controlMov',
          fleetDelay: 'controlFleetDelay',
          basketValue: 'controlBasketValue',
          serviceFee: 'controlServiceFee',
          priorityFee: 'controlPriorityFee',
        };
        return { ...group, [fieldMapping[field]]: value };
      })
    );
  }, []);

  // Update variation selection for a priority group
  const updateVariationSelection = useCallback((groupId: number, variationIndex: number, field: 'deliveryFee' | 'mov' | 'fleetDelay' | 'basketValue' | 'serviceFee' | 'priorityFee', value: string | null) => {
    setPriorityGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        const newVariations = [...group.variations];
        if (newVariations[variationIndex]) {
          newVariations[variationIndex] = {
            ...newVariations[variationIndex],
            [field]: value,
          };
        }
        return { ...group, variations: newVariations };
      })
    );
  }, []);

  // Add a column to a priority group's Control and Variation table
  const addVariableColumn = useCallback((groupId: number, columnValue: string) => {
    setPriorityGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        if (group.enabledColumns.includes(columnValue)) return group;
        return { ...group, enabledColumns: [...group.enabledColumns, columnValue] };
      })
    );
  }, []);

  // Remove a column from a priority group's Control and Variation table
  const removeVariableColumn = useCallback((groupId: number, columnValue: string) => {
    setPriorityGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          enabledColumns: group.enabledColumns.filter((col) => col !== columnValue),
        };
      })
    );
  }, []);

  // Reorder priority groups after drag and drop
  const reorderPriorityGroups = useCallback((activeId: number, overId: number) => {
    setPriorityGroups((prev) => {
      const oldIndex = prev.findIndex((g) => g.id === activeId);
      const newIndex = prev.findIndex((g) => g.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  // Add a condition to a specific priority group
  const addCondition = useCallback((groupId: number, conditionType: "time" | "new_customer" | "customer_location") => {
    setPriorityGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        let newCondition: Condition;
        switch (conditionType) {
          case "time":
            newCondition = { type: "time", data: createTimeCondition() };
            break;
          case "new_customer":
            newCondition = { type: "new_customer", data: createNewCustomerCondition() };
            break;
          case "customer_location":
            newCondition = { type: "customer_location", data: createCustomerLocationCondition() };
            break;
        }
        return { ...group, conditions: [...group.conditions, newCondition] };
      })
    );
  }, []);

  // Update a condition in a specific priority group
  const updateCondition = useCallback((groupId: number, conditionIndex: number, data: Condition["data"]) => {
    setPriorityGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        const newConditions = [...group.conditions];
        newConditions[conditionIndex] = { ...newConditions[conditionIndex], data };
        return { ...group, conditions: newConditions };
      })
    );
  }, []);

  // Delete a condition from a specific priority group
  const deleteCondition = useCallback((groupId: number, conditionIndex: number) => {
    setPriorityGroups((prev) =>
      prev.map((group) => {
        if (group.id !== groupId) return group;
        return { ...group, conditions: group.conditions.filter((_, i) => i !== conditionIndex) };
      })
    );
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

  // Handle number of variations change - also update priority groups
  const handleNumberOfVariationsChange = useCallback((newValue: string) => {
    setNumberOfVariations(newValue);
    const numVariations = parseInt(newValue, 10);
    setPriorityGroups((prev) =>
      prev.map((group) => {
        const currentLength = group.variations.length;
        if (currentLength === numVariations) return group;

        if (currentLength < numVariations) {
          // Add new variations with default "same_as_control"
          const newVariations = [
            ...group.variations,
            ...Array.from(
              { length: numVariations - currentLength },
              () => ({
                deliveryFee: "same_as_control",
                mov: "same_as_control",
                fleetDelay: "same_as_control",
                basketValue: "same_as_control",
                serviceFee: "same_as_control",
                priorityFee: "same_as_control",
              })
            ),
          ];
          return { ...group, variations: newVariations };
        } else {
          // Remove extra variations
          return { ...group, variations: group.variations.slice(0, numVariations) };
        }
      })
    );
  }, []);

  // Handle importing target groups from selected assignments
  const handleImportTargetGroups = useCallback(() => {
    if (selectedTargetGroups.length === 0) return;

    const newGroups: typeof priorityGroups = [];
    let maxId = Math.max(...priorityGroups.map((g) => g.id), 0);
    const numVariations = parseInt(numberOfVariations, 10);

    const defaultVariation = {
      deliveryFee: "same_as_control",
      mov: "same_as_control",
      fleetDelay: "same_as_control",
      basketValue: "same_as_control",
      serviceFee: "same_as_control",
      priorityFee: "same_as_control",
    };

    for (const assignmentValue of selectedTargetGroups) {
      // Create 2 groups per assignment with randomized conditions and columns
      for (let i = 0; i < 2; i++) {
        maxId++;
        const enabledColumns = getRandomEnabledColumns();

        newGroups.push({
          id: maxId,
          isExpanded: false,
          vendorFilters: [{
            id: generateFilterId(),
            field: "assignment",
            condition: "is",
            values: [assignmentValue],
          }],
          vendorCount: generateRandomVendorCount(),
          conditions: [createRandomCondition()],
          controlDeliveryFee: getRandomComponent(DELIVERY_FEE_COMPONENTS),
          controlMov: getRandomComponent(MOV_COMPONENTS),
          controlFleetDelay: enabledColumns.includes("fleet_delay") ? getRandomComponent(FLEET_DELAY_COMPONENTS) : null,
          controlBasketValue: enabledColumns.includes("basket_value") ? getRandomComponent(BASKET_VALUE_COMPONENTS) : null,
          controlServiceFee: enabledColumns.includes("service_fee") ? getRandomComponent(SERVICE_FEE_COMPONENTS) : null,
          controlPriorityFee: enabledColumns.includes("priority_fee") ? getRandomComponent(PRIORITY_FEE_COMPONENTS) : null,
          enabledColumns,
          variations: Array.from({ length: numVariations }, () => ({ ...defaultVariation })),
        });
      }
    }

    // Prepend new groups to existing ones
    setPriorityGroups((prev) => [...newGroups, ...prev]);

    // Clear selection
    setSelectedTargetGroups([]);

    // Close popover
    setImportPopoverOpen(false);

    // Show toast
    SubframeCore.toast.custom(() => (
      <Toast
        variant="success"
        icon={<CheckCircle2 className="size-4" />}
        title={`${newGroups.length} target groups imported`}
      />
    ));
  }, [selectedTargetGroups, numberOfVariations, priorityGroups]);

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
      setSelectedTargetGroups([]);
      setNumberOfVariations("1");
      setParticipantShare("");
      setAllExpanded(true);
      setImportPopoverOpen(false);
      setPriorityGroups([]);
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
                <SearchSelect
                  options={OBJECTIVE_OPTIONS}
                  value={experimentObjective || null}
                  onValueChange={(value) => setExperimentObjective(value || "")}
                  placeholder="Select objective"
                  showSearch={false}
                />
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
              <ChipMultiSelect
                label="Target Zones"
                options={ZONES}
                value={selectedZones}
                onValueChange={setSelectedZones}
                placeholder="Select zones"
              />

              {/* Parent Verticals Multi-Select */}
              <ChipMultiSelect
                label="Parent Verticals"
                options={PARENT_VERTICALS}
                value={selectedVerticals}
                onValueChange={setSelectedVerticals}
                placeholder="Select verticals"
                optional
              />

              {/* Two side-by-side fields */}
              <div className="flex gap-3">
                {/* Number of Variations */}
                <div className="flex flex-1 flex-col gap-2">
                  <span className="text-caption-bold text-neutral-700">Number of Variations</span>
                  <Select
                    value={numberOfVariations}
                    onValueChange={handleNumberOfVariationsChange}
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

              {/* Traffic Split Visualization */}
              <ParticipantSplitChart
                participantShare={Number(participantShare) || 0}
                numberOfVariations={parseInt(numberOfVariations, 10)}
              />

            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 bg-neutral-50">
            <ScrollContainer>
              {/* Sticky Section Header */}
              <div className="sticky top-0 z-10 bg-neutral-50 px-6 pt-6 pb-4">
                <div className="mx-auto transition-[max-width] duration-200 ease-out" style={{ maxWidth: `${Math.max(946, 946 + Math.max(0, ...priorityGroups.map(g => g.enabledColumns.length - 1)) * 140)}px` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-body-bold text-neutral-900">Target Groups</h3>
                      {priorityGroups.length > 0 && (
                        <Badge variant="neutral">{priorityGroups.length}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={toggleAllExpanded}
                        className="relative flex size-8 items-center justify-center rounded-md transition-transform duration-150 ease-out hover:bg-neutral-100 active:scale-95"
                        aria-label={allExpanded ? "Collapse all groups" : "Expand all groups"}
                      >
                        {/* Collapse icon - visible when expanded */}
                        <ChevronsDownUp
                          className={cn(
                            "absolute size-4 text-subtext-color transition-all duration-150 ease-out",
                            allExpanded ? "scale-100 opacity-100" : "scale-75 opacity-0"
                          )}
                        />
                        {/* Expand icon - visible when collapsed */}
                        <ChevronsUpDown
                          className={cn(
                            "absolute size-4 text-subtext-color transition-all duration-150 ease-out",
                            !allExpanded ? "scale-100 opacity-100" : "scale-75 opacity-0"
                          )}
                        />
                      </button>
                      {/* Import Target Groups Popover */}
                      <Popover open={importPopoverOpen} onOpenChange={setImportPopoverOpen}>
                        <Tooltip open={importPopoverOpen ? false : undefined}>
                          <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                              <IconButton
                                size="medium"
                                icon={<Import className="size-4 text-subtext-color" />}
                              />
                            </PopoverTrigger>
                          </TooltipTrigger>
                          <TooltipContent side="top" sideOffset={4}>
                            Import Target Groups
                          </TooltipContent>
                        </Tooltip>
                        <PopoverContent
                          align="end"
                          sideOffset={4}
                          className="w-80 rounded-md border border-neutral-border bg-white p-4 shadow-lg"
                          onOpenAutoFocus={(e) => e.preventDefault()}
                          onCloseAutoFocus={(e) => e.preventDefault()}
                        >
                          <div className="flex flex-col gap-2">
                            <span className="text-caption-bold text-neutral-700">Import Target Groups</span>
                            <div className="flex items-center gap-2">
                              <div className="flex-1">
                                <ChipMultiSelect
                                  options={ASSIGNMENT_NAMES}
                                  value={selectedTargetGroups}
                                  onValueChange={setSelectedTargetGroups}
                                  placeholder="Select assignments"
                                  showCountOnly
                                  preventAutoFocus
                                />
                              </div>
                              <button
                                type="button"
                                disabled={selectedTargetGroups.length === 0}
                                onClick={handleImportTargetGroups}
                                className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-600 text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
                              >
                                <Import className="size-4" />
                              </button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <IconButton
                        size="medium"
                        icon={<Plus className="size-4 text-subtext-color" />}
                        onClick={addPriorityGroup}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Cards Content */}
              <div className="px-6 pb-6">
              <div className="mx-auto space-y-4 transition-[max-width] duration-200 ease-out" style={{ maxWidth: `${Math.max(946, 946 + Math.max(0, ...priorityGroups.map(g => g.enabledColumns.length - 1)) * 140)}px` }}>

              {/* Empty State */}
              {priorityGroups.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white px-8 py-16"
                >
                  <Image
                    src="/piggy-bank.png"
                    alt=""
                    width={200}
                    height={200}
                    className="mb-8 object-contain"
                  />
                  <h4 className="text-body-bold text-neutral-900">No target groups yet</h4>
                  <p className="mt-1 text-center text-body text-neutral-500">
                    Add or import target groups to define vendor segments for your experiment
                  </p>
                  <div className="mt-6 flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <SubframeButton
                          variant="neutral-tertiary"
                          icon={<Import className="size-4" />}
                        >
                          Import
                        </SubframeButton>
                      </PopoverTrigger>
                      <PopoverContent
                        align="center"
                        sideOffset={4}
                        className="w-80 rounded-md border border-neutral-border bg-white p-4 shadow-lg"
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onCloseAutoFocus={(e) => e.preventDefault()}
                      >
                        <div className="flex flex-col gap-2">
                          <span className="text-caption-bold text-neutral-700">Import Target Groups</span>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <ChipMultiSelect
                                options={ASSIGNMENT_NAMES}
                                value={selectedTargetGroups}
                                onValueChange={setSelectedTargetGroups}
                                placeholder="Select assignments"
                                showCountOnly
                                preventAutoFocus
                              />
                            </div>
                            <button
                              type="button"
                              disabled={selectedTargetGroups.length === 0}
                              onClick={handleImportTargetGroups}
                              className="flex size-9 shrink-0 items-center justify-center rounded-md bg-brand-600 text-white transition-colors hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
                            >
                              <Import className="size-4" />
                            </button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <SubframeButton
                      icon={<Plus className="size-4" />}
                      onClick={addPriorityGroup}
                    >
                      Add
                    </SubframeButton>
                  </div>
                </motion.div>
              )}

              {/* Priority Cards - rendered from state with drag and drop */}
              {priorityGroups.length > 0 && (
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
                            <button
                              type="button"
                              onClick={() => deletePriorityGroup(group.id)}
                              className="group/delete -my-1 flex size-8 items-center justify-center rounded-md opacity-0 transition-all group-hover/header:opacity-100 hover:bg-error-50"
                              aria-label="Remove priority group"
                            >
                              <FeatherTrash2 className="text-body text-subtext-color group-hover/delete:text-error-600" />
                            </button>
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
                  {/* List of sections - collapsible with animation */}
                  <AnimatePresence initial={false}>
                  {group.isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                      className="w-full overflow-hidden"
                    >
                    <div className="flex w-full flex-col items-start p-2">
                      {/* Target Vendors */}
                      <div className="flex w-full items-center gap-4 p-4">
                        <div className="flex size-8 items-center justify-center rounded-full bg-brand-50">
                          <Store className="size-4 text-brand-600" />
                        </div>
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
                              size="medium"
                              icon={<ListFilter className="size-4 text-subtext-color" />}
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
                                  icon={<Equal className="size-3.5" />}
                                  onClick={() => addVendorFilter(group.id, "assignment")}
                                >
                                  Assignment
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
                        <div className="flex size-8 items-center justify-center rounded-full bg-warning-50">
                          <SlidersHorizontal className="size-4 text-warning-600" />
                        </div>
                        <div className="flex shrink-0 grow basis-0 items-center gap-2">
                          <span className="text-body-bold text-default-font">
                            Conditions
                          </span>
                        </div>
                        <SubframeCore.DropdownMenu.Root>
                          <SubframeCore.DropdownMenu.Trigger asChild>
                            <IconButton
                              size="medium"
                              icon={<Plus className="size-4 text-subtext-color" />}
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
                                  icon={<Clock className="size-3.5" />}
                                  onClick={() => addCondition(group.id, "time")}
                                >
                                  Time recurrence
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<UserPlus className="size-3.5" />}
                                  onClick={() => addCondition(group.id, "new_customer")}
                                >
                                  New customer
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem
                                  icon={<MapPinned className="size-3.5" />}
                                  onClick={() => addCondition(group.id, "customer_location")}
                                >
                                  Customer location
                                </DropdownMenu.DropdownItem>
                              </DropdownMenu>
                            </SubframeCore.DropdownMenu.Content>
                          </SubframeCore.DropdownMenu.Portal>
                        </SubframeCore.DropdownMenu.Root>
                      </div>

                      {/* Condition Cards Grid */}
                      {group.conditions.length > 0 && (
                        <div className="w-full px-4 pb-4">
                          <ConditionsGrid
                            conditions={group.conditions}
                            onUpdateCondition={(index, data) => updateCondition(group.id, index, data)}
                            onDeleteCondition={(index) => deleteCondition(group.id, index)}
                          />
                        </div>
                      )}

                      {/* Control and Variation */}
                      <div className="flex w-full items-center gap-4 p-4">
                        <div className="flex size-8 items-center justify-center rounded-full bg-success-50">
                          <GitBranch className="size-4 text-success-600" />
                        </div>
                        <div className="flex shrink-0 grow basis-0 flex-col items-start gap-1">
                          <span className="w-full text-body-bold text-default-font">
                            Control and Variation
                          </span>
                        </div>
                        <SubframeCore.DropdownMenu.Root>
                          <SubframeCore.DropdownMenu.Trigger asChild>
                            <IconButton
                              size="medium"
                              icon={<Plus className="size-4 text-subtext-color" />}
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
                                {EXPERIMENT_VARIABLE_COLUMNS.filter(
                                  (col) => !group.enabledColumns.includes(col.value)
                                ).map((column) => (
                                  <DropdownMenu.DropdownItem
                                    key={column.value}
                                    icon={
                                      column.value === "fleet_delay" ? <Clock className="size-3.5" /> :
                                      column.value === "basket_value" ? <ShoppingBasket className="size-3.5" /> :
                                      column.value === "service_fee" ? <Receipt className="size-3.5" /> :
                                      <Zap className="size-3.5" />
                                    }
                                    onClick={() => addVariableColumn(group.id, column.value)}
                                  >
                                    {column.label}
                                  </DropdownMenu.DropdownItem>
                                ))}
                                {group.enabledColumns.length === EXPERIMENT_VARIABLE_COLUMNS.length && (
                                  <div className="px-3 py-2 text-caption text-neutral-400">
                                    All components added
                                  </div>
                                )}
                              </DropdownMenu>
                            </SubframeCore.DropdownMenu.Content>
                          </SubframeCore.DropdownMenu.Portal>
                        </SubframeCore.DropdownMenu.Root>
                      </div>

                      {/* Control and Variation Table */}
                      <div className="w-full overflow-x-auto px-4 pb-4">
                        <Table className="w-full table-fixed border-separate border-spacing-0" style={{ minWidth: `${100 + (2 + group.enabledColumns.length) * 140}px` }}>
                          <colgroup>
                            <col className="w-[100px]" />
                            <col className="w-[140px]" />
                            <col className="w-[140px]" />
                            {group.enabledColumns.map((col) => (
                              <col key={col} className="w-[140px]" />
                            ))}
                          </colgroup>
                          <TableHeader>
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="h-10 rounded-l-md border-y border-l border-neutral-border bg-neutral-50 text-caption-bold text-neutral-500" />
                              <TableHead className="h-10 border-y border-neutral-border bg-neutral-50 px-3 text-caption-bold text-neutral-500">
                                <div className="flex items-center gap-1.5">
                                  <Banknote className="size-3.5" />
                                  Delivery Fee
                                </div>
                              </TableHead>
                              <TableHead className={cn(
                                "h-10 border-y border-neutral-border bg-neutral-50 px-3 text-caption-bold text-neutral-500",
                                group.enabledColumns.length === 0 && "rounded-r-md border-r"
                              )}>
                                <div className="flex items-center gap-1.5">
                                  <ShoppingCart className="size-3.5" />
                                  MOV
                                </div>
                              </TableHead>
                              {group.enabledColumns.includes("fleet_delay") && (
                                <TableHead className={cn(
                                  "group/header h-10 border-y border-neutral-border bg-neutral-50 px-3 text-caption-bold text-neutral-500",
                                  !group.enabledColumns.includes("basket_value") && !group.enabledColumns.includes("service_fee") && !group.enabledColumns.includes("priority_fee") && "rounded-r-md border-r"
                                )}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <Clock className="size-3.5" />
                                      Fleet Delay
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeVariableColumn(group.id, "fleet_delay")}
                                      className="mr-2 rounded-sm p-0.5 opacity-0 transition-opacity group-hover/header:opacity-100 hover:bg-neutral-200"
                                    >
                                      <X className="size-3 text-neutral-400 hover:text-neutral-600" />
                                    </button>
                                  </div>
                                </TableHead>
                              )}
                              {group.enabledColumns.includes("basket_value") && (
                                <TableHead className={cn(
                                  "group/header h-10 border-y border-neutral-border bg-neutral-50 px-3 text-caption-bold text-neutral-500",
                                  !group.enabledColumns.includes("service_fee") && !group.enabledColumns.includes("priority_fee") && "rounded-r-md border-r"
                                )}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <ShoppingBasket className="size-3.5" />
                                      Basket Value
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeVariableColumn(group.id, "basket_value")}
                                      className="mr-2 rounded-sm p-0.5 opacity-0 transition-opacity group-hover/header:opacity-100 hover:bg-neutral-200"
                                    >
                                      <X className="size-3 text-neutral-400 hover:text-neutral-600" />
                                    </button>
                                  </div>
                                </TableHead>
                              )}
                              {group.enabledColumns.includes("service_fee") && (
                                <TableHead className={cn(
                                  "group/header h-10 border-y border-neutral-border bg-neutral-50 px-3 text-caption-bold text-neutral-500",
                                  !group.enabledColumns.includes("priority_fee") && "rounded-r-md border-r"
                                )}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <Receipt className="size-3.5" />
                                      Service Fee
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeVariableColumn(group.id, "service_fee")}
                                      className="mr-2 rounded-sm p-0.5 opacity-0 transition-opacity group-hover/header:opacity-100 hover:bg-neutral-200"
                                    >
                                      <X className="size-3 text-neutral-400 hover:text-neutral-600" />
                                    </button>
                                  </div>
                                </TableHead>
                              )}
                              {group.enabledColumns.includes("priority_fee") && (
                                <TableHead className="group/header h-10 rounded-r-md border-y border-r border-neutral-border bg-neutral-50 px-3 text-caption-bold text-neutral-500">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                      <Zap className="size-3.5" />
                                      Priority Fee
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeVariableColumn(group.id, "priority_fee")}
                                      className="mr-2 rounded-sm p-0.5 opacity-0 transition-opacity group-hover/header:opacity-100 hover:bg-neutral-200"
                                    >
                                      <X className="size-3 text-neutral-400 hover:text-neutral-600" />
                                    </button>
                                  </div>
                                </TableHead>
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/* Control Row */}
                            <TableRow className="group/row border-0 hover:bg-neutral-50">
                              <TableCell className="py-2 pl-3 text-body text-neutral-500">Control</TableCell>
                              <TableCell className="px-3 py-2">
                                <SearchSelect
                                  options={DELIVERY_FEE_COMPONENTS}
                                  value={group.controlDeliveryFee}
                                  onValueChange={(value) => updateControlSelection(group.id, 'deliveryFee', value)}
                                  placeholder="Select component"
                                  variant="ghost"
                                  showDetailsIcon={Boolean(group.controlDeliveryFee)}
                                />
                              </TableCell>
                              <TableCell className="px-3 py-2">
                                <SearchSelect
                                  options={MOV_COMPONENTS}
                                  value={group.controlMov}
                                  onValueChange={(value) => updateControlSelection(group.id, 'mov', value)}
                                  placeholder="Select component"
                                  variant="ghost"
                                  showDetailsIcon={Boolean(group.controlMov)}
                                />
                              </TableCell>
                              {group.enabledColumns.includes("fleet_delay") && (
                                <TableCell className="px-3 py-2">
                                  <SearchSelect
                                    options={FLEET_DELAY_COMPONENTS}
                                    value={group.controlFleetDelay}
                                    onValueChange={(value) => updateControlSelection(group.id, 'fleetDelay', value)}
                                    placeholder="Select component"
                                    variant="ghost"
                                    showDetailsIcon={Boolean(group.controlFleetDelay)}
                                  />
                                </TableCell>
                              )}
                              {group.enabledColumns.includes("basket_value") && (
                                <TableCell className="px-3 py-2">
                                  <SearchSelect
                                    options={BASKET_VALUE_COMPONENTS}
                                    value={group.controlBasketValue}
                                    onValueChange={(value) => updateControlSelection(group.id, 'basketValue', value)}
                                    placeholder="Select component"
                                    variant="ghost"
                                    showDetailsIcon={Boolean(group.controlBasketValue)}
                                  />
                                </TableCell>
                              )}
                              {group.enabledColumns.includes("service_fee") && (
                                <TableCell className="px-3 py-2">
                                  <SearchSelect
                                    options={SERVICE_FEE_COMPONENTS}
                                    value={group.controlServiceFee}
                                    onValueChange={(value) => updateControlSelection(group.id, 'serviceFee', value)}
                                    placeholder="Select component"
                                    variant="ghost"
                                    showDetailsIcon={Boolean(group.controlServiceFee)}
                                  />
                                </TableCell>
                              )}
                              {group.enabledColumns.includes("priority_fee") && (
                                <TableCell className="px-3 py-2">
                                  <SearchSelect
                                    options={PRIORITY_FEE_COMPONENTS}
                                    value={group.controlPriorityFee}
                                    onValueChange={(value) => updateControlSelection(group.id, 'priorityFee', value)}
                                    placeholder="Select component"
                                    variant="ghost"
                                    showDetailsIcon={Boolean(group.controlPriorityFee)}
                                  />
                                </TableCell>
                              )}
                            </TableRow>
                            {/* Variation Rows */}
                            {Array.from({ length: parseInt(numberOfVariations, 10) }, (_, i) => (
                              <TableRow key={i} className="group/row border-0 hover:bg-neutral-50">
                                <TableCell className="py-2 pl-3 text-body text-neutral-500">Variation {i + 1}</TableCell>
                                <TableCell className="px-3 py-2">
                                  <SearchSelect
                                    options={[
                                      { value: "same_as_control", label: "Same as control" },
                                      ...DELIVERY_FEE_COMPONENTS,
                                    ]}
                                    value={group.variations[i]?.deliveryFee ?? null}
                                    onValueChange={(value) => updateVariationSelection(group.id, i, 'deliveryFee', value)}
                                    placeholder="Same as control"
                                    variant="ghost"
                                    showDetailsIcon={Boolean(group.variations[i]?.deliveryFee) && group.variations[i]?.deliveryFee !== "same_as_control"}
                                  />
                                </TableCell>
                                <TableCell className="px-3 py-2">
                                  <SearchSelect
                                    options={[
                                      { value: "same_as_control", label: "Same as control" },
                                      ...MOV_COMPONENTS,
                                    ]}
                                    value={group.variations[i]?.mov ?? null}
                                    onValueChange={(value) => updateVariationSelection(group.id, i, 'mov', value)}
                                    placeholder="Same as control"
                                    variant="ghost"
                                    showDetailsIcon={Boolean(group.variations[i]?.mov) && group.variations[i]?.mov !== "same_as_control"}
                                  />
                                </TableCell>
                                {group.enabledColumns.includes("fleet_delay") && (
                                  <TableCell className="px-3 py-2">
                                    <SearchSelect
                                      options={[
                                        { value: "same_as_control", label: "Same as control" },
                                        ...FLEET_DELAY_COMPONENTS,
                                      ]}
                                      value={group.variations[i]?.fleetDelay ?? null}
                                      onValueChange={(value) => updateVariationSelection(group.id, i, 'fleetDelay', value)}
                                      placeholder="Same as control"
                                      variant="ghost"
                                      showDetailsIcon={Boolean(group.variations[i]?.fleetDelay) && group.variations[i]?.fleetDelay !== "same_as_control"}
                                    />
                                  </TableCell>
                                )}
                                {group.enabledColumns.includes("basket_value") && (
                                  <TableCell className="px-3 py-2">
                                    <SearchSelect
                                      options={[
                                        { value: "same_as_control", label: "Same as control" },
                                        ...BASKET_VALUE_COMPONENTS,
                                      ]}
                                      value={group.variations[i]?.basketValue ?? null}
                                      onValueChange={(value) => updateVariationSelection(group.id, i, 'basketValue', value)}
                                      placeholder="Same as control"
                                      variant="ghost"
                                      showDetailsIcon={Boolean(group.variations[i]?.basketValue) && group.variations[i]?.basketValue !== "same_as_control"}
                                    />
                                  </TableCell>
                                )}
                                {group.enabledColumns.includes("service_fee") && (
                                  <TableCell className="px-3 py-2">
                                    <SearchSelect
                                      options={[
                                        { value: "same_as_control", label: "Same as control" },
                                        ...SERVICE_FEE_COMPONENTS,
                                      ]}
                                      value={group.variations[i]?.serviceFee ?? null}
                                      onValueChange={(value) => updateVariationSelection(group.id, i, 'serviceFee', value)}
                                      placeholder="Same as control"
                                      variant="ghost"
                                      showDetailsIcon={Boolean(group.variations[i]?.serviceFee) && group.variations[i]?.serviceFee !== "same_as_control"}
                                    />
                                  </TableCell>
                                )}
                                {group.enabledColumns.includes("priority_fee") && (
                                  <TableCell className="px-3 py-2">
                                    <SearchSelect
                                      options={[
                                        { value: "same_as_control", label: "Same as control" },
                                        ...PRIORITY_FEE_COMPONENTS,
                                      ]}
                                      value={group.variations[i]?.priorityFee ?? null}
                                      onValueChange={(value) => updateVariationSelection(group.id, i, 'priorityFee', value)}
                                      placeholder="Same as control"
                                      variant="ghost"
                                      showDetailsIcon={Boolean(group.variations[i]?.priorityFee) && group.variations[i]?.priorityFee !== "same_as_control"}
                                    />
                                  </TableCell>
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                        </div>
                      )}
                    </SortablePriorityCard>
                  ))}
                </SortableContext>
              </DndContext>
              )}
              </div>
              </div>
            </ScrollContainer>
          </div>
        </div>
      </div>

      {/* Footer - Figma: Modal Footer */}
      <div className="w-full bg-white">
        {/* Divider line like Figma */}
        <div className="h-px bg-neutral-200" />
        <div className="px-6 py-3 lg:pl-[calc(384px+24px)]">
          {/* Align with the cards container - offset by left panel width (w-96 = 384px) on lg screens */}
          <div className="mx-auto flex w-full items-center justify-end gap-3 transition-[max-width] duration-200 ease-out" style={{ maxWidth: `${Math.max(946, 946 + Math.max(0, ...priorityGroups.map(g => g.enabledColumns.length - 1)) * 140)}px` }}>
            <SubframeButton
              variant="neutral-secondary"
              onClick={handleClose}
            >
              Cancel
            </SubframeButton>

            {/* Split Button: Save Experiment with dropdown for Save & Activate */}
            <SubframeCore.DropdownMenu.Root>
              <div className="flex h-8 items-center rounded-md bg-brand-600">
                <button
                  type="button"
                  className="flex h-full cursor-pointer items-center justify-center rounded-l-md border-none bg-transparent px-3 hover:bg-brand-500 active:bg-brand-600"
                >
                  <span className="text-body-bold whitespace-nowrap text-white">
                    Save Experiment
                  </span>
                </button>
                {/* Vertical divider */}
                <div className="my-2 h-[calc(100%-16px)] w-px bg-brand-400" />
                <SubframeCore.DropdownMenu.Trigger asChild>
                  <button
                    type="button"
                    className="flex h-full cursor-pointer items-center justify-center rounded-r-md border-none bg-transparent px-2 hover:bg-brand-500 active:bg-brand-600"
                  >
                    <ChevronDown className="size-4 text-white" />
                  </button>
                </SubframeCore.DropdownMenu.Trigger>
              </div>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="end"
                  sideOffset={4}
                  asChild
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem icon={null}>
                      Save and Activate Experiment
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </div>
        </div>
      </div>
    </FullscreenDialog>
  );
}
