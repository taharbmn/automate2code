import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Globe, Settings, GitBranch, Upload, BotIcon } from "lucide-react";

interface AiNodeProps {
  data: {
    nodeType: string;
    label: string;
    aiModel?: string;
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

export const AiNode = ({ data, isConnectable, selected }: AiNodeProps) => {
  const aiModel = data.aiModel || data.nodeType;
  const config = nodeConfig[aiModel as keyof typeof nodeConfig];

  const isAiAgent = Boolean(data.aiModel);

  const targetHandle = { id: `${data.nodeType}-target-main`, label: "Input" };
  const sourceHandle = { id: `${data.nodeType}-source-main`, label: "Output" };

  const aiAgentHandles = isAiAgent ? [
    { id: `${data.nodeType}-tools`, label: "Tools" },
    { id: `${data.nodeType}-memory`, label: "Memory" },
    { id: `${data.nodeType}-model`, label: "Model" }
  ] : [];

  return (
    <div className="group relative">
      <div className="absolute -left-3 top-0 h-full flex flex-col justify-center">
        <Handle
          key={targetHandle.id}
          id={targetHandle.id}
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          style={{
            background: "transparent",
            width: "14px",
            height: "14px",
            left: "-12px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>

      <div
        className={`
        relative min-w-[180px] bg-surface/80 backdrop-blur-sm border rounded-2xl
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
              <BotIcon className="w-4 h-4" />
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

      {isAiAgent && (
        <div className="absolute min-w-[180px] -bottom-10 left-1/2 -translate-x-1/2 flex justify-between items-center px-4 pointer-events-none z-10">
          {aiAgentHandles.map((handle, index) => (
            <div key={handle.id} className="flex flex-col items-center justify-center relative">
              <span className=" text-xs text-muted-foreground mb-4 mt-1">{handle.label}</span>
              <Handle
                type="source"
                position={Position.Bottom}
                id={handle.id}
                isConnectable={isConnectable}
                style={{
                  background: "transparent",
                  width: "14px",
                  height: "14px",
                  pointerEvents: "all",
                  zIndex: 20,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
