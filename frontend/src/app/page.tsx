'use client';
import React, { useState } from 'react';
import Header from '@/components/workflow/Header';
import { NodePalette } from '@/components/workflow/NodePalette';
import { CodePanel } from '@/components/workflow/CodePanle';
import { FlowCanvas } from '@/components/workflow/FlowCanvas';
import { Node } from '@xyflow/react';

export default function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState<'javascript' | 'python'>('javascript');
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isCodePanelVisible, setIsCodePanelVisible] = useState(true);

  return (
    <div className=" h-screen flex flex-col">
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        isCodePanelVisible={isCodePanelVisible}
        onToggleCodePanel={() => setIsCodePanelVisible(!isCodePanelVisible)}
      />

      <div className="flex-1 flex overflow-hidden">
        <NodePalette />

        <div className="flex-1 relative">
          <FlowCanvas nodes={nodes} setNodes={setNodes} />
        </div>

        {isCodePanelVisible && (
          <div className=" w-[25vw] border-l border-border bg-surface">
            <CodePanel
              language={selectedLanguage}
              nodes={nodes}
            />
          </div>
        )}
      </div>
    </div>
  );
};