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
import ChatInput from './ChatInput';
import { AiNode } from '../nodes/AiNode';
import { TriggerNode } from '../nodes/TriggerNode';

const nodeTypes = {
  custom: CustomNode,
  'ai-agent': AiNode,
  'gemini': AiNode,
  'chatgpt': AiNode,
  'webhook': TriggerNode,
  'schedule': TriggerNode,
  'email-trigger': TriggerNode,
  'trigger': TriggerNode,
};

interface FlowCanvasProps {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  selectedNode?: Node | null;
  onNodeSelect?: (node: Node | null) => void;
}

export const FlowCanvas = ({ nodes: externalNodes, setNodes: setExternalNodes, selectedNode, onNodeSelect }: FlowCanvasProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds: Edge[]) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      onNodeSelect?.(node);
    },
    [onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect?.(null);
  }, [onNodeSelect]);

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

      // Determine node type based on the dragged item
      const nodeType = ['ai-agent', 'gemini', 'chatgpt'].includes(type) 
        ? type 
        : ['webhook', 'schedule', 'email-trigger', 'trigger'].includes(type)
        ? type
        : 'custom';

      // Create handles based on node type
      const getHandles = (nodeType: string) => {
        if (['ai-agent', 'gemini', 'chatgpt'].includes(nodeType)) {
          return {
            sourceHandles: [
              { id: `${nodeType}-${Date.now()}-source-main`, label: "Output" },
              { id: `${nodeType}-${Date.now()}-source-response`, label: "Response" }
            ],
            targetHandles: [
              { id: `${nodeType}-${Date.now()}-target-input`, label: "Input" },
              { id: `${nodeType}-${Date.now()}-target-prompt`, label: "Prompt" }
            ]
          };
        } else if (['webhook', 'schedule', 'email-trigger', 'trigger'].includes(nodeType)) {
          // Trigger nodes only have source handles (output), no target handles (input)
          return {
            sourceHandles: [{ id: `${nodeType}-${Date.now()}-source-main`, label: "Output" }],
            targetHandles: [] // No input for triggers
          };
        } else {
          return {
            sourceHandles: [{ id: `${nodeType}-${Date.now()}-source-main`, label: "Output" }],
            targetHandles: [{ id: `${nodeType}-${Date.now()}-target-main`, label: "Input" }]
          };
        }
      };

      const handles = getHandles(type);

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: nodeType,
        position,
        data: { 
          nodeType: type,
          label: getNodeLabel(type),
          aiModel: ['ai-agent', 'gemini', 'chatgpt'].includes(type) ? type : undefined,
          ...handles
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
      output: 'Output',
      'ai-agent': 'AI Agent',
      'gemini': 'Google Gemini',
      'chatgpt': 'ChatGPT',
      'webhook': 'Webhook Trigger',
      'schedule': 'Schedule Trigger',
      'email-trigger': 'Email Trigger',
      'trigger': 'Manual Trigger'
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
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          className="bg-canvas"
        >
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
      <ChatInput />
    </motion.div>
  );
};