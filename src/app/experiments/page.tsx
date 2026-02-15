"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/subframe/components/Button";
import { ScrollContainer } from "@/components/ui/scroll-container";
import { ExperimentsTable } from "@/components/experiments/experiments-table";
import { ExperimentFormDialog } from "@/components/experiments/experiment-form-dialog";
import type { Experiment } from "@/lib/types";

export default function ExperimentsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExperiment, setEditingExperiment] = useState<{
    name: string;
    objective: string;
    type: "ab" | "switchback";
    variations: number;
    targetGroups: number;
    status: string;
  } | null>(null);

  useEffect(() => {
    document.title = isFormOpen ? (editingExperiment ? "Edit Experiment • DPS" : "New Experiment • DPS") : "Experiments • DPS";
  }, [isFormOpen, editingExperiment]);

  const handleEditExperiment = useCallback((experiment: Experiment) => {
    setEditingExperiment({
      name: experiment.name,
      objective: experiment.objective,
      type: experiment.type,
      variations: experiment.variations,
      targetGroups: experiment.targetGroups,
      status: experiment.status,
    });
    setIsFormOpen(true);
  }, []);

  const handleFormOpenChange = useCallback((open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      setEditingExperiment(null);
    }
  }, []);

  return (
    <div className="flex h-full flex-col rounded-md border border-neutral-border-subtle bg-default-background shadow-sm">
      <ScrollContainer className="flex-1">
        <div className="mx-auto max-w-[1600px] space-y-6 p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-heading-2 text-default-font">Experiments</h1>

            <div data-tour="experiments-create">
              <Button
                onClick={() => setIsFormOpen(true)}
                icon={<Plus className="size-4" />}
              >
                Create New Experiment
              </Button>
            </div>
          </div>

          {/* Experiments Table */}
          <div data-tour="experiments-table">
            <ExperimentsTable onEditExperiment={handleEditExperiment} />
          </div>

          {/* Experiment Form Dialog */}
          <ExperimentFormDialog
            key={editingExperiment ? `edit-${editingExperiment.name}` : "create"}
            open={isFormOpen}
            onOpenChange={handleFormOpenChange}
            initialExperiment={editingExperiment}
          />
        </div>
      </ScrollContainer>
    </div>
  );
}
