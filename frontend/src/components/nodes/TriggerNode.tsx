import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Webhook, Clock, Mail, Play } from "lucide-react";

interface TriggerNodeProps {
  data: {
    nodeType: string;
    label: string;
    sourceHandles?: { id: string; label: string }[];
    targetHandles?: { id: string; label: string }[];
  };
  isConnectable: boolean;
  selected?: boolean;
}

const nodeConfig = {
  webhook: {
    icon: Webhook,
    description: "HTTP Request Trigger",
  },
  schedule: {
    icon: Clock,
    description: "Time-based Trigger",
  },
  "email-trigger": {
    icon: Mail,
    description: "Email Trigger",
  },
  trigger: {
    icon: Play,
    description: "Manual Trigger",
  },
};

export const TriggerNode = ({ data, isConnectable, selected }: TriggerNodeProps) => {
  const config = nodeConfig[data.nodeType as keyof typeof nodeConfig];
  const Icon = config?.icon || Play;

  const sourceHandle = { id: `${data.nodeType}-source-main`, label: "Output" };

  return (
    <div className="group relative">
      <div
        className={`
        relative min-w-[180px] bg-surface/80 backdrop-blur-sm border rounded-2xl bg-zinc-900
        transition-all duration-200
        ${
          selected
            ? "border-primary bg-surface shadow-lg"
            : "border-border hover:border-muted-foreground hover:bg-surface"
        }
      `}
      >
        <div className="p-3 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 text-primary flex items-center justify-center rounded-md bg-primary/10">
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">
                {data.label}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {config?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium capitalize text-foreground">
              Trigger
            </span>
          </div>
        </div>

        {selected && (
          <div className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none" />
        )}
      </div>

      <div className="absolute -right-3 top-0 h-full flex flex-col justify-center ">
        <Handle
          key={sourceHandle.id}
          id={sourceHandle.id}
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          style={{
            background: "transparent",
            width: "14px",
            height: "14px",
            right: "-12px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </div>
  );
};
