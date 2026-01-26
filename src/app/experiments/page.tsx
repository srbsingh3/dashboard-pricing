"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/subframe/components/Button";
import { ExperimentsTable } from "@/components/experiments/experiments-table";
import { ExperimentFormDialog } from "@/components/experiments/experiment-form-dialog";

export default function ExperimentsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-full rounded-md border border-neutral-border-subtle bg-default-background shadow-sm">
      <div className="mx-auto max-w-[1600px] space-y-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-2 text-neutral-900">Experiments</h1>
        </div>

        <Button
          onClick={() => setIsFormOpen(true)}
          icon={<Plus className="size-4" />}
        >
          Create New Experiment
        </Button>
      </div>

      {/* Experiments Table */}
      <ExperimentsTable />

      {/* Experiment Form Dialog */}
      <ExperimentFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      </div>
    </div>
  );
}
