import React, { useState } from "react";
import {
  Webhook,
  Clock,
  Globe,
  Database,
  Code,
  Mail,
  MessageSquare,
  ArrowLeft,
  GitBranch,
  RotateCcw,
  Pause,
  Users,
  Sheet,
  FolderOpen,
  Send,
  Settings,
  List,
  Shuffle,
  HardDrive,
  Play,
  Zap,
  Workflow,
  Brain,
  Share,
  Bot,
  Image,
  FileText,
  Languages,
  Mic,
  Eye,
  Sparkles,
  ArrowRight,
  Link,
  GitMerge,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";

const categories = [
  {
    id: "triggers",
    name: "Triggers",
    description: "Start your automation workflows",
    icon: Play,
    count: 3,
  },
  {
    id: "data",
    name: "Data Sources",
    description: "Connect to databases and APIs",
    icon: Database,
    count: 5,
  },
  {
    id: "logic",
    name: "Logic & Flow",
    description: "Add conditions and control execution",
    icon: Workflow,
    count: 6,
  },
  {
    id: "ai",
    name: "AI Agents",
    description: "Integrate AI models and intelligent processing",
    icon: Bot,
    count: 3,
  },
  {
    id: "actions",
    name: "Actions",
    description: "Send messages and perform operations",
    icon: Link,
    count: 6,
  },
];

const nodeTypes = {
  triggers: [
    {
      id: "webhook",
      name: "Webhook",
      description: "Receive HTTP requests to trigger workflows",
      icon: Webhook,
    },
    {
      id: "schedule",
      name: "Schedule Trigger",
      description: "Run workflows on a time schedule",
      icon: Clock,
    },
    {
      id: "email-trigger",
      name: "Email Trigger",
      description: "Trigger on incoming emails",
      icon: Mail,
    },
  ],
  data: [
    {
      id: "http",
      name: "HTTP Request",
      description: "Make API calls to external services",
      icon: Globe,
    },
    {
      id: "mysql",
      name: "MySQL",
      description: "Connect to MySQL databases",
      icon: Database,
    },
    {
      id: "google-sheets",
      name: "Google Sheets",
      description: "Read and write spreadsheet data",
      icon: Sheet,
    },
    {
      id: "airtable",
      name: "Airtable",
      description: "Manage Airtable records",
      icon: HardDrive,
    },
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Access files and folders",
      icon: FolderOpen,
    },
  ],
  logic: [
    {
      id: "if",
      name: "If",
      description: "Add conditional logic to workflows",
      icon: GitBranch,
    },
    {
      id: "switch",
      name: "Switch",
      description: "Route data to different paths",
      icon: Shuffle,
    },
    {
      id: "loop",
      name: "Loop Over Items",
      description: "Process each item individually",
      icon: RotateCcw,
    },
    {
      id: "wait",
      name: "Wait",
      description: "Add delays to workflow execution",
      icon: Pause,
    },
    {
      id: "merge",
      name: "Merge",
      description: "Combine data from multiple sources",
      icon: GitMerge,
    },
    {
      id: "split-batches",
      name: "Split In Batches",
      description: "Process large datasets in chunks",
      icon: List,
    },
  ],
  ai: [
    {
      id: "ai-agent",
      name: "AI Agent",
      description: "AI Agent with Chat Model, Memory, and Tools",
      icon: Bot,
    },
    {
      id: "gemini",
      name: "Google Gemini",
      description: "Google's Gemini AI model",
      icon: Brain,
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      description: "OpenAI's ChatGPT model",
      icon: MessageSquare,
    },
  ],
  actions: [
    {
      id: "gmail",
      name: "Gmail",
      description: "Send emails and manage inbox",
      icon: Mail,
    },
    {
      id: "slack",
      name: "Slack",
      description: "Send messages and manage channels",
      icon: MessageSquare,
    },
    {
      id: "telegram",
      name: "Telegram",
      description: "Send Telegram messages",
      icon: Send,
    },
    {
      id: "code",
      name: "Code",
      description: "Run custom JavaScript code",
      icon: Code,
    },
    {
      id: "set",
      name: "Set",
      description: "Modify and transform data",
      icon: Settings,
    },
    {
      id: "function",
      name: "Function",
      description: "Transform data with functions",
      icon: Zap,
    },
  ],
};

export const NodePalette = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBack = () => {
    setSelectedCategory(null);
  };

  const selectedCategoryData = selectedCategory
    ? categories.find((cat) => cat.id === selectedCategory)
    : null;
  const selectedNodes = selectedCategory
    ? nodeTypes[selectedCategory as keyof typeof nodeTypes]
    : [];

  return (
    <div className="w-80 bg-surface border-r border-border overflow-hidden flex flex-col">
      {selectedCategory ? (
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border bg-card">
            <button
              onClick={handleBack}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to categories
            </button>
            <h2 className="text-xl font-semibold mb-2">
              {selectedCategoryData?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedCategoryData?.description}
            </p>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-3">
              {selectedNodes.map((nodeType) => {
                return (
                  <div
                    key={nodeType.id}
                    className="group cursor-move"
                    draggable
                    onDragStart={(e) => onDragStart(e, nodeType.id)}
                  >
                    <div className="relative p-4 rounded-xl border border-border bg-card hover:bg-surface-elevated transition-all duration-200 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                        >
                          <nodeType.icon className={`w-5 h-5`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                            {nodeType.name}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {nodeType.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border bg-card">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-semibold">Node Library</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Build powerful automations with these workflow nodes
            </p>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {categories.map((category) => {
                return (
                  <div key={category.id}>
                    <Card
                      className="w-full max-w-sm cursor-pointer transition-colors"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <CardContent className="px-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                              <category.icon strokeWidth={1.5} className="min-h-6 min-w-6 text-white  " />
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-0.5">
                                {category.name}
                              </h3>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                {category.description}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
