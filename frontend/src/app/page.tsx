'use client';
import React, { useState } from 'react';
import Header from '@/components/workflow/Header';
import { NodePalette } from '@/components/workflow/NodePalette';
import { Sidebar } from '@/components/workflow/Sidebar';
import { FlowCanvas } from '@/components/workflow/FlowCanvas';
import { Node } from '@xyflow/react';

export default function Page() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <div className=" h-screen flex flex-col">
      <Header

      />

      <div className="flex-1 flex overflow-hidden">
        <NodePalette />

        <div className="flex-1 relative">
          <FlowCanvas 
            nodes={nodes} 
            setNodes={setNodes}
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
          />
        </div>

          <div className=" w-[25vw] border-l border-border bg-surface">
            <Sidebar
              nodes={nodes}
              selectedNode={selectedNode}
            />
          </div>
      </div>
    </div>
  );
};