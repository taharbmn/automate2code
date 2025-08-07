import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ExecutionStep {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "error";
  timestamp?: Date;
  duration?: number;
}

interface ExecutionTabProps {
  executionSteps: ExecutionStep[];
}

export const ExecutionTab = ({ executionSteps }: ExecutionTabProps) => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        {executionSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface/50 hover:bg-surface/80 transition-colors"
          >
            <div className="flex-shrink-0">
              {step.status === "completed" && (
                <div className="p-1 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              )}
              {step.status === "running" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="p-1 rounded-full"
                >
                  <Clock className="w-4 h-4 text-blue-500" />
                </motion.div>
              )}
              {step.status === "pending" && (
                <div className="p-1 rounded-full">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              {step.status === "error" && (
                <div className="p-1 rounded-full">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-foreground">
                {step.name}
              </p>
              {step.timestamp && (
                <p className="text-xs text-muted-foreground">
                  {step.timestamp.toLocaleTimeString()}
                  {step.duration && ` • ${step.duration}ms`}
                </p>
              )}
            </div>

            <Badge
              variant={
                step.status === "completed"
                  ? "default"
                  : step.status === "running"
                  ? "secondary"
                  : step.status === "error"
                  ? "destructive"
                  : "outline"
              }
              className="text-xs font-medium"
            >
              {step.status}
            </Badge>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-border pt-6">
        <h4 className="font-medium mb-3 text-foreground">Execution Log</h4>
        <div className="bg-background border border-border rounded-xl p-4 text-xs font-mono max-h-40 overflow-y-auto space-y-1">
          <div className="text-green-500">[12:34:56] Workflow started</div>
          <div className="text-blue-500">
            [12:34:57] HTTP request initiated
          </div>
          <div className="text-blue-500">
            [12:34:58] Response received (200 OK)
          </div>
          <div className="text-yellow-500">[12:34:59] Processing data...</div>
        </div>
      </div>
    </div>
  );
};
