"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperimentsTable } from "@/components/experiments/experiments-table";
import { ExperimentFormDialog } from "@/components/experiments/experiment-form-dialog";

export default function ExperimentsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Experiments</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage pricing experiments
          </p>
        </div>

        <Button
          onClick={() => setIsFormOpen(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Experiment
        </Button>
      </motion.div>

      {/* Experiments Table */}
      <ExperimentsTable />

      {/* Experiment Form Dialog */}
      <ExperimentFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
    </div>
  );
}
