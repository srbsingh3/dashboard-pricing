"use client";

import * as React from "react";
import { Clock, UserPlus, MapPinned, X, ChevronLeft } from "lucide-react";
import { FeatherTrash2 } from "@subframe/core";
import { cn } from "@/lib/utils";
import { TextField } from "@/subframe/components/TextField";
import { Checkbox } from "@/subframe/components/Checkbox";
import { Badge } from "@/subframe/components/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  CUSTOMER_CONDITION_TYPES,
  CUSTOMER_LOCATIONS,
  WEEKDAYS,
} from "@/lib/constants";

// ============================================
// SHARED TYPES
// ============================================

export interface TimeCondition {
  id: string;
  repeatMode: "weekly" | "daily";
  allDay: boolean;
  startTime: string;
  endTime: string;
  selectedDays: string[];
}

export interface NewCustomerCondition {
  id: string;
  customerType: string;
  orderCountEnabled: boolean;
  orderCountValue: string;
  daysSinceFirstOrderEnabled: boolean;
  daysSinceFirstOrderValue: string;
}

export interface CustomerLocationCondition {
  id: string;
  locations: string[];
}

export type ConditionType = "time" | "new_customer" | "customer_location";

export interface Condition {
  type: ConditionType;
  data: TimeCondition | NewCustomerCondition | CustomerLocationCondition;
}

// ============================================
// SWITCH COMPONENT (inline for simplicity)
// ============================================

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({ checked, onCheckedChange, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-4 w-7 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        checked ? "bg-brand-600" : "bg-neutral-200",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block size-3 transform rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-[14px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

// ============================================
// CARD HEADER COMPONENT
// ============================================

interface ConditionCardHeaderProps {
  icon: React.ReactNode;
  title: string;
  iconBgClass: string;
  onDelete: () => void;
}

function ConditionCardHeader({
  icon,
  title,
  iconBgClass,
  onDelete,
}: ConditionCardHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-lg",
            iconBgClass
          )}
        >
          {icon}
        </div>
        <span className="text-body-bold text-default-font">{title}</span>
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="group/delete flex size-8 items-center justify-center rounded-md transition-all hover:bg-error-50"
        aria-label={`Remove ${title}`}
      >
        <FeatherTrash2 className="text-body text-subtext-color group-hover/delete:text-error-600" />
      </button>
    </div>
  );
}

// ============================================
// TIME RECURRENCE CARD
// ============================================

interface TimeConditionCardProps {
  condition: TimeCondition;
  onUpdate: (condition: TimeCondition) => void;
  onDelete: () => void;
}

export function TimeConditionCard({
  condition,
  onUpdate,
  onDelete,
}: TimeConditionCardProps) {
  const toggleDay = (day: string) => {
    const newDays = condition.selectedDays.includes(day)
      ? condition.selectedDays.filter((d) => d !== day)
      : [...condition.selectedDays, day];
    onUpdate({ ...condition, selectedDays: newDays });
  };

  return (
    <div className="flex flex-col rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
      <ConditionCardHeader
        icon={<Clock className="size-4 text-brand-600" />}
        title="Time Recurrence"
        iconBgClass="bg-brand-50"
        onDelete={onDelete}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Day Selection - Soft Neumorphic Tray */}
        <div className="flex flex-col gap-2">
          <span className="text-caption-bold text-neutral-700">Repeat on</span>
          <div className="flex gap-1 rounded-md bg-neutral-100 p-1">
            {WEEKDAYS.map((day) => {
              const isSelected = condition.selectedDays.includes(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDay(day.value)}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md text-caption font-medium transition-all duration-200",
                    isSelected
                      ? "bg-default-background text-neutral-600 shadow-sm"
                      : "text-neutral-400 hover:text-neutral-500"
                  )}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* All Day Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-body text-default-font">All Day</span>
          <Switch
            checked={condition.allDay}
            onCheckedChange={(checked) =>
              onUpdate({ ...condition, allDay: checked })
            }
          />
        </div>

        {/* Time Range - only show if not all day */}
        {!condition.allDay && (
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Start Time" className="gap-1.5">
              <TextField.Input
                type="time"
                value={condition.startTime}
                onChange={(e) =>
                  onUpdate({ ...condition, startTime: e.target.value })
                }
              />
            </TextField>
            <TextField label="End Time" className="gap-1.5">
              <TextField.Input
                type="time"
                value={condition.endTime}
                onChange={(e) =>
                  onUpdate({ ...condition, endTime: e.target.value })
                }
              />
            </TextField>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// NEW CUSTOMER CONDITION CARD
// ============================================

interface NewCustomerConditionCardProps {
  condition: NewCustomerCondition;
  onUpdate: (condition: NewCustomerCondition) => void;
  onDelete: () => void;
}

export function NewCustomerConditionCard({
  condition,
  onUpdate,
  onDelete,
}: NewCustomerConditionCardProps) {
  return (
    <div className="flex flex-col rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
      <ConditionCardHeader
        icon={<UserPlus className="size-4 text-success-600" />}
        title="New Customer Condition"
        iconBgClass="bg-success-50"
        onDelete={onDelete}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Customer Type Dropdown */}
        <div className="flex flex-col gap-1.5">
          <span className="text-caption-bold text-neutral-700">
            Customer Type
          </span>
          <Select
            value={condition.customerType}
            onValueChange={(value) =>
              onUpdate({ ...condition, customerType: value })
            }
          >
            <SelectTrigger
              size="sm"
              className="h-9 w-full border-neutral-border bg-default-background text-body shadow-none focus:border-brand-primary focus:ring-0 focus-visible:border-brand-primary focus-visible:ring-0 data-placeholder:text-neutral-400 [&>svg]:text-subtext-color"
            >
              <SelectValue placeholder="Select customer type" />
            </SelectTrigger>
            <SelectContent
              position="popper"
              sideOffset={4}
              className="border-neutral-border bg-white shadow-lg"
            >
              {CUSTOMER_CONDITION_TYPES.map((type) => (
                <SelectItem
                  key={type.value}
                  value={type.value}
                  className="h-8 cursor-pointer text-body hover:bg-neutral-100 focus:bg-brand-50 data-[state=checked]:text-brand-600"
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Order Count Condition */}
        <div className="flex items-center gap-3">
          <Checkbox
            checked={condition.orderCountEnabled}
            onCheckedChange={(checked) =>
              onUpdate({ ...condition, orderCountEnabled: checked })
            }
          />
          <span className="flex-1 text-body text-default-font">
            Number of orders
          </span>
          <ChevronLeft className="size-4 text-neutral-400" />
          <TextField className="w-20">
            <TextField.Input
              type="number"
              min="0"
              value={condition.orderCountValue}
              onChange={(e) =>
                onUpdate({ ...condition, orderCountValue: e.target.value })
              }
              disabled={!condition.orderCountEnabled}
              placeholder="0"
            />
          </TextField>
        </div>

        {/* Days Since First Order Condition */}
        <div className="flex items-center gap-3">
          <Checkbox
            checked={condition.daysSinceFirstOrderEnabled}
            onCheckedChange={(checked) =>
              onUpdate({ ...condition, daysSinceFirstOrderEnabled: checked })
            }
          />
          <span className="flex-1 text-body text-default-font">
            Days since first order
          </span>
          <ChevronLeft className="size-4 text-neutral-400" />
          <TextField className="w-20">
            <TextField.Input
              type="number"
              min="0"
              value={condition.daysSinceFirstOrderValue}
              onChange={(e) =>
                onUpdate({
                  ...condition,
                  daysSinceFirstOrderValue: e.target.value,
                })
              }
              disabled={!condition.daysSinceFirstOrderEnabled}
              placeholder="0"
            />
          </TextField>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CUSTOMER LOCATION CARD
// ============================================

interface CustomerLocationCardProps {
  condition: CustomerLocationCondition;
  onUpdate: (condition: CustomerLocationCondition) => void;
  onDelete: () => void;
}

export function CustomerLocationCard({
  condition,
  onUpdate,
  onDelete,
}: CustomerLocationCardProps) {
  const removeLocation = (locationToRemove: string) => {
    onUpdate({
      ...condition,
      locations: condition.locations.filter((loc) => loc !== locationToRemove),
    });
  };

  return (
    <div className="flex flex-col rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
      <ConditionCardHeader
        icon={<MapPinned className="size-4 text-warning-600" />}
        title="Customer Location"
        iconBgClass="bg-warning-50"
        onDelete={onDelete}
      />

      <div className="flex flex-col gap-4 p-4">
        {/* Location Multi-Select */}
        <MultiSelect
          options={CUSTOMER_LOCATIONS}
          value={condition.locations}
          onValueChange={(locations) => onUpdate({ ...condition, locations })}
          placeholder="Select locations..."
          itemLabel="location"
        />

        {/* Selected Locations as Tags */}
        {condition.locations.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {condition.locations.map((locationValue) => {
              const location = CUSTOMER_LOCATIONS.find(
                (l) => l.value === locationValue
              );
              return (
                <Badge
                  key={locationValue}
                  variant="neutral"
                  iconRight={
                    <button
                      type="button"
                      onClick={() => removeLocation(locationValue)}
                      className="ml-0.5 rounded-sm transition-colors hover:bg-neutral-200"
                    >
                      <X className="size-3" />
                    </button>
                  }
                >
                  {location?.label || locationValue}
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// CONDITIONS GRID CONTAINER
// ============================================

interface ConditionsGridProps {
  conditions: Condition[];
  onUpdateCondition: (index: number, data: Condition["data"]) => void;
  onDeleteCondition: (index: number) => void;
}

export function ConditionsGrid({
  conditions,
  onUpdateCondition,
  onDeleteCondition,
}: ConditionsGridProps) {
  if (conditions.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {conditions.map((condition, index) => {
        switch (condition.type) {
          case "time":
            return (
              <TimeConditionCard
                key={condition.data.id}
                condition={condition.data as TimeCondition}
                onUpdate={(data) => onUpdateCondition(index, data)}
                onDelete={() => onDeleteCondition(index)}
              />
            );
          case "new_customer":
            return (
              <NewCustomerConditionCard
                key={condition.data.id}
                condition={condition.data as NewCustomerCondition}
                onUpdate={(data) => onUpdateCondition(index, data)}
                onDelete={() => onDeleteCondition(index)}
              />
            );
          case "customer_location":
            return (
              <CustomerLocationCard
                key={condition.data.id}
                condition={condition.data as CustomerLocationCondition}
                onUpdate={(data) => onUpdateCondition(index, data)}
                onDelete={() => onDeleteCondition(index)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function generateConditionId(): string {
  return `condition_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createTimeCondition(): TimeCondition {
  return {
    id: generateConditionId(),
    repeatMode: "weekly",
    allDay: false,
    startTime: "11:00",
    endTime: "13:00",
    selectedDays: ["mon", "tue", "wed"],
  };
}

export function createNewCustomerCondition(): NewCustomerCondition {
  return {
    id: generateConditionId(),
    customerType: "new_qcommerce",
    orderCountEnabled: true,
    orderCountValue: "3",
    daysSinceFirstOrderEnabled: true,
    daysSinceFirstOrderValue: "30",
  };
}

export function createCustomerLocationCondition(): CustomerLocationCondition {
  return {
    id: generateConditionId(),
    locations: [],
  };
}
