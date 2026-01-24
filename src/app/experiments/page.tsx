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
    <div className="mx-auto max-w-[1600px] space-y-6 p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Experiments</h1>
        </div>

        <Button
          onClick={() => setIsFormOpen(true)}
          className="gap-2"
        >
          <Plus className="size-4" />
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
