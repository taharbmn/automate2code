import React, { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Background,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { motion } from 'framer-motion';
import { CustomNode } from '../nodes/customNodes';
import Image from 'next/image';

const nodeTypes = {
  custom: CustomNode,
};

interface FlowCanvasProps {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
}

export const FlowCanvas = ({ nodes: externalNodes, setNodes: setExternalNodes }: FlowCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = {
        x: event.clientX - 200,
        y: event.clientY - 100,
      };

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: 'custom',
        position,
        data: { 
          nodeType: type,
          label: getNodeLabel(type)
        },
      };

      setNodes((nds: Node[]) => {
        const updatedNodes = nds.concat(newNode);
        setExternalNodes(updatedNodes);
        return updatedNodes;
      });
    },
    [setNodes, setExternalNodes]
  );

  const getNodeLabel = (type: string) => {
    const labels = {
      http: 'HTTP Request',
      transform: 'Transform Data',
      conditional: 'Conditional',
      output: 'Output'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <motion.div 
      className="w-full h-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div ref={reactFlowWrapper} className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          className="bg-canvas"
        >
          {/* <Controls 
            className="bg-surface border border-border rounded-lg shadow-lg"
            showInteractive={false}
          /> */}
          
          {/* <MiniMap 
            className="bg-surface border border-border rounded-lg"
            nodeColor={(node) => {
              const colors = {
                http: '#6366f1',
                transform: '#f59e0b',
                conditional: '#10b981',
                output: '#ec4899'
              };
              return colors[node.data?.nodeType as keyof typeof colors] || '#64748b';
            }}
            pannable
            zoomable
          />
           */}
          <Background 
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            className="opacity-30"
          />
        </ReactFlow>
      </div>

      {nodes.length === 0 && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center max-w-md">
            <motion.div>
                <Image
                  src="/logo.png"
                  alt="Empty Canvas"
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Start Building Your Workflow
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Drag nodes from the library to create beautiful automation workflows. 
              Watch as your visual design transforms into clean, production-ready code.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};