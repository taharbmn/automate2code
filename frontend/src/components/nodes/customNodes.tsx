import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Globe, Settings, GitBranch, Upload } from "lucide-react";

interface CustomNodeProps {
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
  http: {
    icon: Globe,
    description: "API Request",
  },
  transform: {
    icon: Settings,
    description: "Data Processing",
  },
  conditional: {
    icon: GitBranch,
    description: "Logic Branch",
  },
  output: {
    icon: Upload,
    description: "Result Export",
  },
};

export const CustomNode = ({
  data,
  isConnectable,
  selected,
}: CustomNodeProps) => {
  const config = nodeConfig[data.nodeType as keyof typeof nodeConfig];
  const Icon = config?.icon || Settings;

  // Default handles if not provided
  const defaultTargetHandles = [{ id: `${data.nodeType}-target-main`, label: "Input" }];
  const defaultSourceHandles = [{ id: `${data.nodeType}-source-main`, label: "Output" }];
  
  const targetHandles = data.targetHandles || defaultTargetHandles;
  const sourceHandles = data.sourceHandles || defaultSourceHandles;

  return (
    <div className="group relative">
      <div className="absolute -left-3 top-0 h-full flex flex-col justify-center">
        {targetHandles.map((handle, index) => (
          <Handle
            key={handle.id}
            id={handle.id}
            type="target"
            position={Position.Left}
            isConnectable={isConnectable}
            style={{
              background: "transparent",
              width: "14px",
              height: "14px",
              left: "-12px",
              top: `${(index + 1) * (100 / (targetHandles.length + 1))}%`,
              transform: "translateY(-50%)",
            }}
          />
        ))}
      </div>

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
            <div className="w-7 h-7 text-muted-foreground flex items-center justify-center rounded-md bg-background/50">
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
              {data.nodeType}
            </span>
          </div>
        </div>

        {selected && (
          <div className="absolute inset-0 bg-primary/5 rounded-lg pointer-events-none" />
        )}
      </div>

      <div className="absolute -right-3 top-0 h-full flex flex-col justify-center">
        {sourceHandles.map((handle, index) => (
          <Handle
            key={handle.id}
            id={handle.id}
            type="source"
            position={Position.Right}
            isConnectable={isConnectable}
            style={{
              background: "transparent",
              width: "14px",
              height: "14px",
              right: "-12px",
              top: `${(index + 1) * (100 / (sourceHandles.length + 1))}%`,
              transform: "translateY(-50%)",
            }}
          />
        ))}
      </div>
    </div>
  );
};
