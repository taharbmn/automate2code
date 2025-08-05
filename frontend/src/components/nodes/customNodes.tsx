import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Globe, Settings, GitBranch, Upload, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CustomNodeProps {
  data: {
    nodeType: string;
    label: string;
  };
  isConnectable: boolean;
}

const nodeConfig = {
  http: {
    icon: Globe,
    gradient: 'gradient-http',
    description: 'API Request'
  },
  transform: {
    icon: Settings,
    gradient: 'gradient-transform',
    description: 'Data Processing'
  },
  conditional: {
    icon: GitBranch,
    gradient: 'gradient-conditional',
    description: 'Logic Branch'
  },
  output: {
    icon: Upload,
    gradient: 'gradient-output',
    description: 'Result Export'
  }
};

export const CustomNode = ({ data, isConnectable }: CustomNodeProps) => {
  const config = nodeConfig[data.nodeType as keyof typeof nodeConfig];
  const Icon = config?.icon || Settings;

  return (
    <motion.div
      className="group relative"

    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary border-2 border-background !left-[-6px]"
      />

      <div className="relative min-w-[200px] bg-card border border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden glow-node group-hover:glow-hover">
        <div className={`absolute inset-0 ${config?.gradient} opacity-10`} />
        
        <div className="relative p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${config?.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{data.label}</h3>
                <p className="text-xs text-muted-foreground">{config?.description}</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success font-medium">Ready</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Type</span>
              <span className="text-foreground capitalize">{data.nodeType}</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0"
          >
            Configure
          </Button>
        </div>

        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-primary border-2 border-background !right-[-6px]"
      />

      <motion.div
        className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full opacity-0 group-hover:opacity-100"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
};