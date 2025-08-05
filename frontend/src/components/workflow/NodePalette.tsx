import React from 'react';
import { Globe, Settings, GitBranch, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const nodeTypes = [
  {
    id: 'http',
    name: 'HTTP Request',
    description: 'Make API calls and fetch data',
    icon: Globe,
    gradient: 'gradient-http',
    color: 'from-[#6366f1] to-[#3b82f6]'
  },
  {
    id: 'transform',
    name: 'Transform Data',
    description: 'Process and modify data',
    icon: Settings,
    gradient: 'gradient-transform',
    color: 'from-[#f59e0b] to-[#f97316]'
  },
  {
    id: 'conditional',
    name: 'Conditional',
    description: 'Add logic and conditions',
    icon: GitBranch,
    gradient: 'gradient-conditional',
    color: 'from-[#10b981] to-[#059669]'
  },
  {
    id: 'output',
    name: 'Output',
    description: 'Export or display results',
    icon: Upload,
    gradient: 'gradient-output',
    color: 'from-[#ec4899] to-[#be185d]'
  }
];

export const NodePalette = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <motion.div 
      className="w-72 bg-surface border-r border-border p-6 overflow-y-auto"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Node Library</h2>
        <p className="text-sm text-muted-foreground">
          Drag nodes onto the canvas to build your automation workflow
        </p>
      </div>

      <div className="space-y-3">
        {nodeTypes.map((nodeType, index) => {
          const Icon = nodeType.icon;
          
          return (
            <div
              key={nodeType.id}
              className="group cursor-move"
              draggable
              onDragStart={(e) => onDragStart(e, nodeType.id)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-4 rounded-xl border border-border bg-card hover:bg-surface-elevated transition-all duration-300 hover-lift glow-node group-hover:glow-hover"
              >
                <div className={`absolute inset-0 ${nodeType.gradient} opacity-10 rounded-xl`} />
                
                <div className="relative flex items-start gap-3">
                  <div className={`w-10 h-10 ${nodeType.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">
                      {nodeType.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {nodeType.description}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};