import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Settings,
  Code,
  Play,
  User,
  EyeOff,
  Clock,
  MessageSquare,
  Mail,
  Database,
  Link,
  Sheet,
  FolderOpen,
  GitBranch,
  Shuffle,
  RotateCcw,
  Pause,
  GitMerge,
  List,
  Send,
  Zap,
  Webhook,
} from "lucide-react";
import { Node } from "@xyflow/react";


interface PropertiesTabProps {
  selectedNode?: Node | null;
}



const tabs = [
  { id: "properties", label: "Properties", icon: Settings },
  { id: "execution", label: "Execution", icon: Play },
  { id: "code", label: "Code", icon: Code },
  { id: "settings", label: "Settings", icon: User },
];

export const Sidebar = ({selectedNode }: {selectedNode?: Node | null}) => {
  const [activeTab, setActiveTab] = useState("properties");

  return (
    <div className="w-full h-full flex flex-col bg-surface border-l border-border">
      {/* Tab Navigation */}
      <div className="p-4">
        <div className="relative bg-surface border border-border rounded-full p-1">
          <div className="grid grid-cols-4 relative">
            {/* Moving background */}
            <motion.div
              className="absolute inset-y-1 bg-primary rounded-full"
              initial={false}
              animate={{
                x: `${tabs.findIndex(tab => tab.id === activeTab) * 100}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{ width: "calc(25% - 4px)", margin: "0 2px" }}
            />
            
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex gap-3 items-center justify-center cursor-pointer px-3 py-3 text-xs font-medium transition-all relative z-10 rounded-full ${
                    activeTab === tab.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4 text-white stroke-2 " />
                  <span className="hidden sm:inline text-white">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full overflow-y-auto"
          >
            {activeTab === "properties" && <PropertiesTab selectedNode={selectedNode} />}
            {activeTab === "execution" && <ExecutionTab selectedNode={selectedNode} />}
            {activeTab === "code" && <CodeTab selectedNode={selectedNode} />}
            {activeTab === "settings" && <SettingsTab selectedNode={selectedNode} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};


const PropertiesTab = ({ selectedNode }: PropertiesTabProps) => {
  const [promptSource, setPromptSource] = useState("manual");
  const [webhookAuth, setWebhookAuth] = useState("none");
  const [scheduleType, setScheduleType] = useState("minutes");
  const [httpAuth, setHttpAuth] = useState("none");
  const [httpMethod, setHttpMethod] = useState("GET");
  const [mysqlOperation, setMysqlOperation] = useState("select");
  const [sheetsOperation, setSheetsOperation] = useState("read");
  const [airtableOperation, setAirtableOperation] = useState("list");
  const [driveOperation, setDriveOperation] = useState("list");
  const [conditionType, setConditionType] = useState("expression");
  const [waitType, setWaitType] = useState("time");
  const [codeMode, setCodeMode] = useState("runOnceForAllItems");
  const [gmailOperation, setGmailOperation] = useState("send");
  const [slackOperation, setSlackOperation] = useState("post-message");
  const [telegramOperation, setTelegramOperation] = useState("send-message");
  const [model, setModel] = useState("gpt-4");
  if (!selectedNode) {
    return (
      <div className="p-6 text-center">
        <div className="rounded-full bg-surface/50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-foreground mb-2">No Node Selected</h3>
        <p className="text-sm text-muted-foreground">
          Select a node on the canvas to configure its properties
        </p>
      </div>
    );
  }

  const nodeType = selectedNode.data?.nodeType as string;
  
  return (
    <div className="p-6 space-y-6">
      {nodeType === "webhook" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Webhook className="w-5 h-5" />
            <h3 className="font-semibold">Webhook Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              type="text"
              placeholder="https://your-workflow.com/webhook/abc123"
              className="font-mono text-sm"
              readOnly
            />
            <p className="text-xs text-muted-foreground">This URL will be generated automatically</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-method">HTTP Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-auth">Authentication</Label>
            <Select value={webhookAuth} onValueChange={setWebhookAuth}>
              <SelectTrigger>
                <SelectValue placeholder="Select authentication type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
                <SelectItem value="bearer">Bearer Token</SelectItem>
                <SelectItem value="header">Header Auth</SelectItem>
                <SelectItem value="api-key">API Key</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Basic Auth Fields */}
          {webhookAuth === "basic" && (
            <div className="space-y-4 pl-4 border-l-2 border-blue-200">
              <div className="space-y-2">
                <Label htmlFor="basic-username">Username</Label>
                <Input
                  id="basic-username"
                  type="text"
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="basic-password">Password</Label>
                <div className="relative">
                  <Input
                    id="basic-password"
                    type="password"
                    placeholder="Enter password"
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Bearer Token Field */}
          {webhookAuth === "bearer" && (
            <div className="space-y-2 pl-4 border-l-2 border-green-200">
              <Label htmlFor="bearer-token">Bearer Token</Label>
              <div className="relative">
                <Input
                  id="bearer-token"
                  type="password"
                  placeholder="Enter bearer token"
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                >
                  <EyeOff className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Header Auth Fields */}
          {webhookAuth === "header" && (
            <div className="space-y-4 pl-4 border-l-2 border-purple-200">
              <div className="space-y-2">
                <Label htmlFor="header-name">Header Name</Label>
                <Input
                  id="header-name"
                  type="text"
                  placeholder="X-API-Key, Authorization, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="header-value">Header Value</Label>
                <div className="relative">
                  <Input
                    id="header-value"
                    type="password"
                    placeholder="Enter header value"
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                  />
                </div>
              </div>
            </div>
          )}

          {/* API Key Field */}
          {webhookAuth === "api-key" && (
            <div className="space-y-4 pl-4 border-l-2 border-orange-200">
              <div className="space-y-2">
                <Label htmlFor="api-key-name">API Key Parameter Name</Label>
                <Input
                  id="api-key-name"
                  type="text"
                  placeholder="api_key, key, token, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key-value">API Key Value</Label>
                <div className="relative">
                  <Input
                    id="api-key-value"
                    type="password"
                    placeholder="Enter API key"
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-key-location">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="query">Query Parameter</SelectItem>
                    <SelectItem value="body">Request Body</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      )}

      {nodeType === "schedule" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">Schedule Trigger</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schedule-type">Run Every</Label>
            <Select value={scheduleType} onValueChange={setScheduleType}>
              <SelectTrigger>
                <SelectValue placeholder="How often should this run?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Every X Minutes</SelectItem>
                <SelectItem value="hours">Every X Hours</SelectItem>
                <SelectItem value="daily">Daily at specific time</SelectItem>
                <SelectItem value="weekly">Weekly on specific day</SelectItem>
                <SelectItem value="monthly">Monthly on specific date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minutes/Hours Interval */}
          {(scheduleType === "minutes" || scheduleType === "hours") && (
            <div className="space-y-2">
              <Label htmlFor="interval-value">
                {scheduleType === "minutes" ? "Every X Minutes" : "Every X Hours"}
              </Label>
              <div className="flex gap-2 items-center">
                <span className="text-sm text-muted-foreground">Every</span>
                <Input
                  id="interval-value"
                  type="number"
                  placeholder={scheduleType === "minutes" ? "5" : "2"}
                  min="1"
                  max={scheduleType === "minutes" ? "1440" : "24"}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">
                  {scheduleType === "minutes" ? "minutes" : "hours"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {scheduleType === "minutes" 
                  ? "Example: Every 5 minutes, every 30 minutes" 
                  : "Example: Every 2 hours, every 6 hours"}
              </p>
            </div>
          )}

          {/* Daily Schedule */}
          {scheduleType === "daily" && (
            <div className="space-y-2">
              <Label htmlFor="daily-time">Time of Day</Label>
              <Input
                id="daily-time"
                type="time"
                placeholder="14:30"
              />
              <p className="text-xs text-muted-foreground">
                The workflow will run every day at this time
              </p>
            </div>
          )}

          {/* Weekly Schedule */}
          {scheduleType === "weekly" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weekly-day">Day of Week</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="tuesday">Tuesday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekly-time">Time</Label>
                <Input
                  id="weekly-time"
                  type="time"
                  placeholder="09:00"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                The workflow will run every week on the selected day at the specified time
              </p>
            </div>
          )}

          {/* Monthly Schedule */}
          {scheduleType === "monthly" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-date">Day of Month</Label>
                <Input
                  id="monthly-date"
                  type="number"
                  placeholder="1"
                  min="1"
                  max="31"
                />
                <p className="text-xs text-muted-foreground">
                  Day 1-31 (if day doesn&apos;t exist in month, it will run on the last day)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly-time">Time</Label>
                <Input
                  id="monthly-time"
                  type="time"
                  placeholder="12:00"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                The workflow will run every month on the specified day and time
              </p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox id="enable-schedule" defaultChecked />
            <Label htmlFor="enable-schedule" className="text-sm">
              Enable this schedule
            </Label>
          </div>
        </div>
      )}

      {nodeType === "email-trigger" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5" />
            <h3 className="font-semibold">Email Trigger Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label>Email Provider</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select email provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmail">Gmail</SelectItem>
                <SelectItem value="outlook">Outlook</SelectItem>
                <SelectItem value="imap">IMAP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" variant="outline">
            <Link className="w-4 h-4 mr-2" />
            Connect Email Account
          </Button>

          <div className="space-y-2">
            <Label htmlFor="email-filter">Email Filter</Label>
            <Input
              id="email-filter"
              type="text"
              placeholder="from:sender@example.com subject:urgent"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="poll-interval">Poll Interval (minutes)</Label>
            <Input
              id="poll-interval"
              type="number"
              placeholder="5"
              min="1"
            />
          </div>
        </div>
      )}

      {/* DATA SOURCES */}
      {nodeType === "http" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Link className="w-5 h-5" />
            <h3 className="font-semibold">HTTP Request Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-endpoint">API Endpoint</Label>
            <Input
              id="api-endpoint"
              type="text"
              placeholder="https://api.example.com/data"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="http-method">HTTP Method</Label>
            <Select value={httpMethod} onValueChange={setHttpMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
                <SelectItem value="HEAD">HEAD</SelectItem>
                <SelectItem value="OPTIONS">OPTIONS</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {httpMethod === "GET" && "Retrieve data from the server"}
              {httpMethod === "POST" && "Send data to create a new resource"}
              {httpMethod === "PUT" && "Send data to update/replace a resource"}
              {httpMethod === "PATCH" && "Send data to partially update a resource"}
              {httpMethod === "DELETE" && "Remove a resource from the server"}
              {httpMethod === "HEAD" && "Like GET but only returns headers"}
              {httpMethod === "OPTIONS" && "Get allowed methods for a resource"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="http-auth">Authentication</Label>
            <Select value={httpAuth} onValueChange={setHttpAuth}>
              <SelectTrigger>
                <SelectValue placeholder="Select authentication type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
                <SelectItem value="bearer">Bearer Token</SelectItem>
                <SelectItem value="oauth2">OAuth2</SelectItem>
                <SelectItem value="api-key">API Key</SelectItem>
                <SelectItem value="header">Custom Header</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Basic Auth Fields */}
          {httpAuth === "basic" && (
            <div className="space-y-4 pl-4 border-l-2 border-blue-200">
              <div className="space-y-2">
                <Label htmlFor="http-basic-username">Username</Label>
                <Input
                  id="http-basic-username"
                  type="text"
                  placeholder="Enter username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="http-basic-password">Password</Label>
                <div className="relative">
                  <Input
                    id="http-basic-password"
                    type="password"
                    placeholder="Enter password"
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Bearer Token Field */}
          {httpAuth === "bearer" && (
            <div className="space-y-2 pl-4 border-l-2 border-green-200">
              <Label htmlFor="http-bearer-token">Bearer Token</Label>
              <div className="relative">
                <Input
                  id="http-bearer-token"
                  type="password"
                  placeholder="Enter bearer token"
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                >
                  <EyeOff className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Will be sent as: Authorization: Bearer {"{token}"}
              </p>
            </div>
          )}

          {/* OAuth2 Fields */}
          {httpAuth === "oauth2" && (
            <div className="space-y-4 pl-4 border-l-2 border-purple-200">
              <div className="space-y-2">
                <Label htmlFor="oauth2-grant-type">Grant Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grant type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="authorization_code">Authorization Code</SelectItem>
                    <SelectItem value="client_credentials">Client Credentials</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="refresh_token">Refresh Token</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oauth2-client-id">Client ID</Label>
                <Input
                  id="oauth2-client-id"
                  type="text"
                  placeholder="Enter client ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="oauth2-client-secret">Client Secret</Label>
                <div className="relative">
                  <Input
                    id="oauth2-client-secret"
                    type="password"
                    placeholder="Enter client secret"
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="oauth2-token-url">Token URL</Label>
                <Input
                  id="oauth2-token-url"
                  type="text"
                  placeholder="https://api.example.com/oauth/token"
                />
              </div>
            </div>
          )}

          {/* API Key Fields */}
          {httpAuth === "api-key" && (
            <div className="space-y-4 pl-4 border-l-2 border-orange-200">
              <div className="space-y-2">
                <Label htmlFor="http-api-key-name">API Key Parameter Name</Label>
                <Input
                  id="http-api-key-name"
                  type="text"
                  placeholder="api_key, key, token, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="http-api-key-value">API Key Value</Label>
                <div className="relative">
                  <Input
                    id="http-api-key-value"
                    type="password"
                    placeholder="Enter API key"
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="http-api-key-location">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="query">Query Parameter</SelectItem>
                    <SelectItem value="body">Request Body</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Custom Header Fields */}
          {httpAuth === "header" && (
            <div className="space-y-4 pl-4 border-l-2 border-indigo-200">
              <div className="space-y-2">
                <Label htmlFor="http-header-name">Header Name</Label>
                <Input
                  id="http-header-name"
                  type="text"
                  placeholder="X-API-Key, X-Auth-Token, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="http-header-value">Header Value</Label>
                <div className="relative">
                  <Input
                    id="http-header-value"
                    type="password"
                    placeholder="Enter header value"
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
                  >
                    <EyeOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="headers">Additional Headers</Label>
            <Textarea
              id="headers"
              placeholder="Content-Type: application/json&#10;Accept: application/json"
              className="h-24 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              One header per line in format: Header-Name: value
            </p>
          </div>

          {/* Request Body - Only show for methods that typically have a body */}
          {(httpMethod === "POST" || httpMethod === "PUT" || httpMethod === "PATCH") && (
            <div className="space-y-2">
              <Label htmlFor="body">Request Body</Label>
              <Textarea
                id="body"
                placeholder='{"key": "value"}'
                className="h-32 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                JSON, XML, or raw text data to send with the {httpMethod} request
              </p>
            </div>
          )}

          {/* Query Parameters - Show for all methods but especially useful for GET */}
          <div className="space-y-2">
            <Label htmlFor="query-params">Query Parameters</Label>
            <Textarea
              id="query-params"
              placeholder="page=1&#10;limit=10&#10;filter=active"
              className="h-20 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              One parameter per line in format: key=value (will be URL encoded automatically)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeout">Request Timeout (seconds)</Label>
            <Input
              id="timeout"
              type="number"
              placeholder="30"
              min="1"
              max="300"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="follow-redirects" defaultChecked />
            <Label htmlFor="follow-redirects" className="text-sm">
              Follow redirects
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="ignore-ssl" />
            <Label htmlFor="ignore-ssl" className="text-sm">
              Ignore SSL certificate errors
            </Label>
          </div>
        </div>
      )}

      {nodeType === "mysql" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5" />
            <h3 className="font-semibold">MySQL Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mysql-host">Host</Label>
            <Input
              id="mysql-host"
              type="text"
              placeholder="localhost"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mysql-port">Port</Label>
            <Input
              id="mysql-port"
              type="number"
              placeholder="3306"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mysql-database">Database</Label>
            <Input
              id="mysql-database"
              type="text"
              placeholder="my_database"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mysql-username">Username</Label>
            <Input
              id="mysql-username"
              type="text"
              placeholder="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mysql-password">Password</Label>
            <div className="relative">
              <Input
                id="mysql-password"
                type="password"
                placeholder="password"
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mysql-operation">Operation</Label>
            <Select value={mysqlOperation} onValueChange={setMysqlOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="insert">Insert</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="custom">Custom Query</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mysql-query">SQL Query</Label>
            <Textarea
              id="mysql-query"
              placeholder={
                mysqlOperation === "select" ? "SELECT * FROM users WHERE active = 1" :
                mysqlOperation === "insert" ? "INSERT INTO users (name, email) VALUES ('John', 'john@example.com')" :
                mysqlOperation === "update" ? "UPDATE users SET active = 1 WHERE id = 123" :
                mysqlOperation === "delete" ? "DELETE FROM users WHERE id = 123" :
                "SELECT * FROM users WHERE active = 1"
              }
              className="h-32 font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {mysqlOperation === "select" && "Retrieve data from the database"}
              {mysqlOperation === "insert" && "Add new records to the database"}
              {mysqlOperation === "update" && "Modify existing records in the database"}
              {mysqlOperation === "delete" && "Remove records from the database"}
              {mysqlOperation === "custom" && "Write your own SQL query"}
            </p>
          </div>

          <Button variant="outline" className="w-full">
            Test Connection
          </Button>
        </div>
      )}

      {nodeType === "google-sheets" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Sheet className="w-5 h-5" />
            <h3 className="font-semibold">Google Sheets Configuration</h3>
          </div>
          
          <Button className="w-full" variant="outline">
            <Link className="w-4 h-4 mr-2" />
            Connect Google Account
          </Button>

          <div className="space-y-2">
            <Label htmlFor="spreadsheet-id">Spreadsheet ID</Label>
            <Input
              id="spreadsheet-id"
              type="text"
              placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sheet-name">Sheet Name</Label>
            <Input
              id="sheet-name"
              type="text"
              placeholder="Sheet1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sheets-operation">Operation</Label>
            <Select value={sheetsOperation} onValueChange={setSheetsOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="append">Append</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="clear">Clear</SelectItem>
                <SelectItem value="create">Create Sheet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Show range for read/update/clear operations */}
          {(sheetsOperation === "read" || sheetsOperation === "update" || sheetsOperation === "clear") && (
            <div className="space-y-2">
              <Label htmlFor="range">Range</Label>
              <Input
                id="range"
                type="text"
                placeholder={
                  sheetsOperation === "read" ? "A1:Z1000" :
                  sheetsOperation === "update" ? "A2:C10" :
                  "A1:Z"
                }
              />
              <p className="text-xs text-muted-foreground">
                {sheetsOperation === "read" && "Specify the range of cells to read (e.g., A1:Z1000)"}
                {sheetsOperation === "update" && "Specify the range of cells to update (e.g., A2:C10)"}
                {sheetsOperation === "clear" && "Specify the range of cells to clear (e.g., A1:Z)"}
              </p>
            </div>
          )}

          {/* Show data input for append/update operations */}
          {(sheetsOperation === "append" || sheetsOperation === "update") && (
            <div className="space-y-2">
              <Label htmlFor="sheet-data">Data to {sheetsOperation === "append" ? "Append" : "Update"}</Label>
              <Textarea
                id="sheet-data"
                placeholder={
                  sheetsOperation === "append" 
                    ? '[["John", "Doe", "john@example.com"], ["Jane", "Smith", "jane@example.com"]]'
                    : '[["Updated Name", "Updated Email"]]'
                }
                className="h-24 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                2D array format: each inner array represents a row of data
              </p>
            </div>
          )}

          {/* Show sheet name input for create operation */}
          {sheetsOperation === "create" && (
            <div className="space-y-2">
              <Label htmlFor="new-sheet-name">New Sheet Name</Label>
              <Input
                id="new-sheet-name"
                type="text"
                placeholder="New Sheet Name"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="value-input-option">Value Input Option</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select input option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RAW">Raw</SelectItem>
                <SelectItem value="USER_ENTERED">User Entered</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              RAW: Values are not parsed (faster), USER_ENTERED: Values are parsed as if typed by user
            </p>
          </div>
        </div>
      )}

      {nodeType === "google-drive" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <FolderOpen className="w-5 h-5" />
            <h3 className="font-semibold">Google Drive Configuration</h3>
          </div>
          
          <Button className="w-full" variant="outline">
            <Link className="w-4 h-4 mr-2" />
            Connect Google Account
          </Button>

          <div className="space-y-2">
            <Label htmlFor="drive-operation">Operation</Label>
            <Select value={driveOperation} onValueChange={setDriveOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">List Files</SelectItem>
                <SelectItem value="download">Download File</SelectItem>
                <SelectItem value="upload">Upload File</SelectItem>
                <SelectItem value="create-folder">Create Folder</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="share">Share File</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Show file ID for download/delete/share operations */}
          {(driveOperation === "download" || driveOperation === "delete" || driveOperation === "share") && (
            <div className="space-y-2">
              <Label htmlFor="file-id">File ID</Label>
              <Input
                id="file-id"
                type="text"
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Google Drive file ID from the file URL
              </p>
            </div>
          )}

          {/* Show file upload for upload operation */}
          {driveOperation === "upload" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-name">File Name</Label>
                <Input
                  id="file-name"
                  type="text"
                  placeholder="document.pdf"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file-content">File Content</Label>
                <Textarea
                  id="file-content"
                  placeholder="File content or base64 encoded data"
                  className="h-24 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  File content as text or base64 encoded binary data
                </p>
              </div>
            </div>
          )}

          {/* Show folder name for create-folder operation */}
          {driveOperation === "create-folder" && (
            <div className="space-y-2">
              <Label htmlFor="folder-name">Folder Name</Label>
              <Input
                id="folder-name"
                type="text"
                placeholder="New Folder"
              />
            </div>
          )}

          {/* Show sharing options for share operation */}
          {driveOperation === "share" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="share-email">Email Address</Label>
                <Input
                  id="share-email"
                  type="email"
                  placeholder="user@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="share-role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reader">Reader</SelectItem>
                    <SelectItem value="writer">Writer</SelectItem>
                    <SelectItem value="commenter">Commenter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="folder-id">Parent Folder ID (optional)</Label>
            <Input
              id="folder-id"
              type="text"
              placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              {driveOperation === "list" && "List files in this specific folder"}
              {driveOperation === "upload" && "Upload file to this folder"}
              {driveOperation === "create-folder" && "Create folder inside this parent folder"}
              {!driveOperation && "Specify folder for operation context"}
            </p>
          </div>

          {/* Show file filter only for list operation */}
          {driveOperation === "list" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="file-filter">File Filter</Label>
                <Input
                  id="file-filter"
                  type="text"
                  placeholder="name contains 'report'"
                />
                <p className="text-xs text-muted-foreground">
                  Google Drive search query syntax (e.g., &quot;name contains &apos;report&apos;&quot; or &quot;mimeType=&apos;application/pdf&apos;&quot;)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-files">Max Files</Label>
                <Input
                  id="max-files"
                  type="number"
                  placeholder="50"
                  min="1"
                  max="1000"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum number of files to retrieve (1-1000)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {nodeType === "airtable" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5" />
            <h3 className="font-semibold">Airtable Configuration</h3>
          </div>
          
          <Button className="w-full" variant="outline">
            <Link className="w-4 h-4 mr-2" />
            Connect Airtable Account
          </Button>

          <div className="space-y-2">
            <Label htmlFor="airtable-base-id">Base ID</Label>
            <Input
              id="airtable-base-id"
              type="text"
              placeholder="appXXXXXXXXXXXXXX"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="airtable-table-name">Table Name</Label>
            <Input
              id="airtable-table-name"
              type="text"
              placeholder="Table 1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="airtable-operation">Operation</Label>
            <Select value={airtableOperation} onValueChange={setAirtableOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">List Records</SelectItem>
                <SelectItem value="get">Get Record</SelectItem>
                <SelectItem value="create">Create Record</SelectItem>
                <SelectItem value="update">Update Record</SelectItem>
                <SelectItem value="delete">Delete Record</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Show record ID for get/update/delete operations */}
          {(airtableOperation === "get" || airtableOperation === "update" || airtableOperation === "delete") && (
            <div className="space-y-2">
              <Label htmlFor="record-id">Record ID</Label>
              <Input
                id="record-id"
                type="text"
                placeholder="recXXXXXXXXXXXXXX"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Airtable record ID (starts with &quot;rec&quot;)
              </p>
            </div>
          )}

          {/* Show fields data for create/update operations */}
          {(airtableOperation === "create" || airtableOperation === "update") && (
            <div className="space-y-2">
              <Label htmlFor="record-fields">Record Fields</Label>
              <Textarea
                id="record-fields"
                placeholder='{"Name": "John Doe", "Email": "john@example.com", "Status": "Active"}'
                className="h-24 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                JSON object with field names and values to {airtableOperation === "create" ? "create" : "update"}
              </p>
            </div>
          )}

          {/* Show max records for list operation */}
          {airtableOperation === "list" && (
            <div className="space-y-2">
              <Label htmlFor="max-records">Max Records</Label>
              <Input
                id="max-records"
                type="number"
                placeholder="100"
                min="1"
                max="100"
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of records to retrieve (1-100)
              </p>
            </div>
          )}

          {/* Show filter for list operation */}
          {airtableOperation === "list" && (
            <div className="space-y-2">
              <Label htmlFor="filter-formula">Filter Formula (optional)</Label>
              <Input
                id="filter-formula"
                type="text"
                placeholder="AND({Status} = 'Active', {Created} > '2024-01-01')"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Airtable formula to filter records
              </p>
            </div>
          )}

          <Button variant="outline" className="w-full">
            Test Connection
          </Button>
        </div>
      )}

      {/* LOGIC & FLOW */}
      {nodeType === "if" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-5 h-5" />
            <h3 className="font-semibold">If Condition Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition-type">Condition Type</Label>
            <Select value={conditionType} onValueChange={setConditionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expression">Expression</SelectItem>
                <SelectItem value="simple">Simple Comparison</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expression mode */}
          {conditionType === "expression" && (
            <div className="space-y-2">
              <Label htmlFor="condition-expression">Condition Expression</Label>
              <Textarea
                id="condition-expression"
                placeholder="{{$json.status}} === 'active' && {{$json.count}} > 10"
                className="h-24 font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Write a JavaScript expression using data from previous nodes
              </p>
            </div>
          )}

          {/* Simple comparison mode */}
          {conditionType === "simple" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="left-value">Left Value</Label>
                <Input
                  id="left-value"
                  type="text"
                  placeholder="{{$json.status}}"
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operator">Operator</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">Equal (=)</SelectItem>
                    <SelectItem value="notEqual">Not Equal (≠)</SelectItem>
                    <SelectItem value="greater">Greater Than (&gt;)</SelectItem>
                    <SelectItem value="less">Less Than (&lt;)</SelectItem>
                    <SelectItem value="greaterEqual">Greater or Equal (≥)</SelectItem>
                    <SelectItem value="lessEqual">Less or Equal (≤)</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="notContains">Not Contains</SelectItem>
                    <SelectItem value="isEmpty">Is Empty</SelectItem>
                    <SelectItem value="isNotEmpty">Is Not Empty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="right-value">Right Value</Label>
                <Input
                  id="right-value"
                  type="text"
                  placeholder="active"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fallback-output">Fallback Output</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select fallback" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="empty">Empty</SelectItem>
                <SelectItem value="input">Pass Input</SelectItem>
                <SelectItem value="custom">Custom Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {nodeType === "switch" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Shuffle className="w-5 h-5" />
            <h3 className="font-semibold">Switch Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="switch-mode">Mode</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expression">Expression</SelectItem>
                <SelectItem value="rules">Rules</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="switch-expression">Switch Expression</Label>
            <Input
              id="switch-expression"
              type="text"
              placeholder="{{$json.type}}"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-4">
            <Label>Routes</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input placeholder="Route 0: user" className="flex-1" />
                <Button variant="outline" size="sm">Add</Button>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Route 1: admin" className="flex-1" />
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fallback-output">Fallback Output</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select fallback" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="empty">Empty</SelectItem>
                <SelectItem value="input">Pass Input</SelectItem>
                <SelectItem value="custom">Custom Value</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {nodeType === "loop" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="w-5 h-5" />
            <h3 className="font-semibold">Loop Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="loop-input">Input Data</Label>
            <Input
              id="loop-input"
              type="text"
              placeholder="{{$json.items}}"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch-size">Batch Size</Label>
            <Input
              id="batch-size"
              type="number"
              placeholder="1"
              min="1"
            />
          </div>
        </div>
      )}

      {nodeType === "wait" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Pause className="w-5 h-5" />
            <h3 className="font-semibold">Wait Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wait-type">Wait Type</Label>
            <Select value={waitType} onValueChange={setWaitType}>
              <SelectTrigger>
                <SelectValue placeholder="Select wait type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="time">Fixed Time</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="condition">Until Condition</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fixed time wait */}
          {waitType === "time" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="wait-amount">Wait Amount</Label>
                <Input
                  id="wait-amount"
                  type="number"
                  placeholder="5"
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wait-unit">Time Unit</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seconds">Seconds</SelectItem>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Webhook wait */}
          {waitType === "webhook" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-path">Webhook Path</Label>
                <Input
                  id="webhook-path"
                  type="text"
                  placeholder="/webhook/continue"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  The workflow will wait until this webhook is called
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-wait-time">Max Wait Time (optional)</Label>
                <Input
                  id="max-wait-time"
                  type="number"
                  placeholder="3600"
                  min="1"
                />
                <p className="text-xs text-muted-foreground">
                  Maximum time to wait in seconds before timing out
                </p>
              </div>
            </div>
          )}

          {/* Condition wait */}
          {waitType === "condition" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="condition-check">Condition to Check</Label>
                <Textarea
                  id="condition-check"
                  placeholder="{{$json.status}} === 'completed'"
                  className="h-24 font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Condition that must be true to continue
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-interval">Check Interval (seconds)</Label>
                <Input
                  id="check-interval"
                  type="number"
                  placeholder="30"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition-timeout">Timeout (seconds)</Label>
                <Input
                  id="condition-timeout"
                  type="number"
                  placeholder="3600"
                  min="1"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {nodeType === "merge" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <GitMerge className="w-5 h-5" />
            <h3 className="font-semibold">Merge Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="merge-mode">Merge Mode</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select merge mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="append">Append</SelectItem>
                <SelectItem value="merge">Merge</SelectItem>
                <SelectItem value="choose-branch">Choose Branch</SelectItem>
                <SelectItem value="multiplex">Multiplex</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="output-format">Output Format</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select output format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="array">Array</SelectItem>
                <SelectItem value="object">Object</SelectItem>
                <SelectItem value="flatten">Flatten</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {nodeType === "split-batches" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <List className="w-5 h-5" />
            <h3 className="font-semibold">Split In Batches Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="batch-size">Batch Size</Label>
            <Input
              id="batch-size"
              type="number"
              placeholder="10"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reset">Reset</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select reset option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="once">Once</SelectItem>
                <SelectItem value="each">Each Item</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* AI AGENTS */}
      {nodeType === "ai-agent" && (
        <div className="space-y-5">
          <div className=" space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="claude">Claude</SelectItem>
                <SelectItem value="gpt-3.5">Gemini2.5 pro</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prompt-source">Source for Prompt (User Message)</Label>
            <Select value={promptSource} onValueChange={setPromptSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual Input</SelectItem>
                <SelectItem value="chatInput">From Previous Node ({'{{ $json.chatInput }}'})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="user-prompt">Prompt (User Message)</Label>
            <Textarea
              id="user-prompt"
              placeholder={
                promptSource === "chatInput" 
                  ? "{{ $json.chatInput }} - Input will come from previous node"
                  : "Type your message manually here..."
              }
              className="h-24 font-mono text-sm"
              disabled={promptSource === "chatInput"}
              value={promptSource === "chatInput" ? "{{ $json.chatInput }}" : ""}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="require-format" />
              <Label htmlFor="require-format">Require Specific Output Format</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="enable-fallback-model" />
              <Label htmlFor="enable-fallback-model">Enable Fallback Model</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="system-message">System Message</Label>
            <Textarea placeholder="Type your system message here..." id="system-message" className="h-24" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-iterations">Max Iterations</Label>
            <Input id="max-iterations" type="number" placeholder="10" min="1" max="50" />
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="return-intermediate-steps" />
              <Label htmlFor="return-intermediate-steps">Return Intermediate Steps</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="passthrough-binary-images" />
              <Label htmlFor="passthrough-binary-images">Automatically Passthrough Binary Images</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="always-output-data" />
              <Label htmlFor="always-output-data">Always Output Data</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="execute-once" />
              <Label htmlFor="execute-once">Execute Once</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="retry-on-fail" />
              <Label htmlFor="retry-on-fail">Retry On Fail</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="on-error">On Error</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select error handling" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="continue">Continue</SelectItem>
                <SelectItem value="stop">Stop</SelectItem>
                <SelectItem value="retry">Retry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea placeholder="Type your notes here..." id="notes" className="h-24" />
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox id="display-note-in-flow" />
              <Label htmlFor="display-note-in-flow">Display Note in Flow?</Label>
            </div>
          </div>
        </div>
      )}

      {/* ACTIONS */}
      {nodeType === "gmail" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5" />
            <h3 className="font-semibold">Gmail Configuration</h3>
          </div>
          
          <Button className="w-full" variant="outline">
            <Link className="w-4 h-4 mr-2" />
            Connect Gmail Account (OAuth2)
          </Button>

          <div className="space-y-2">
            <Label htmlFor="gmail-operation">Operation</Label>
            <Select value={gmailOperation} onValueChange={setGmailOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="send">Send Email</SelectItem>
                <SelectItem value="get-all">Get All Messages</SelectItem>
                <SelectItem value="get-message">Get Message</SelectItem>
                <SelectItem value="search">Search Messages</SelectItem>
                <SelectItem value="add-label">Add Label</SelectItem>
                <SelectItem value="remove-label">Remove Label</SelectItem>
                <SelectItem value="mark-read">Mark as Read</SelectItem>
                <SelectItem value="mark-unread">Mark as Unread</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Send email fields */}
          {gmailOperation === "send" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="to-email">To</Label>
                <Input
                  id="to-email"
                  type="email"
                  placeholder="recipient@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cc-email">CC (optional)</Label>
                <Input
                  id="cc-email"
                  type="email"
                  placeholder="cc@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bcc-email">BCC (optional)</Label>
                <Input
                  id="bcc-email"
                  type="email"
                  placeholder="bcc@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Email subject"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-body">Message Body</Label>
                <Textarea
                  id="email-body"
                  placeholder="Email content..."
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-format">Format</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Plain Text</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Get message fields */}
          {gmailOperation === "get-message" && (
            <div className="space-y-2">
              <Label htmlFor="message-id">Message ID</Label>
              <Input
                id="message-id"
                type="text"
                placeholder="17b2d4a5c8b9f123"
                className="font-mono text-sm"
              />
            </div>
          )}

          {/* Search and listing fields */}
          {(gmailOperation === "search" || gmailOperation === "get-all") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="query-filter">
                  {gmailOperation === "search" ? "Search Query" : "Query Filter (optional)"}
                </Label>
                <Input
                  id="query-filter"
                  type="text"
                  placeholder="is:unread from:sender@example.com"
                />
                <p className="text-xs text-muted-foreground">
                  Gmail search syntax (e.g., &quot;is:unread&quot;, &quot;from:user@domain.com&quot;, &quot;subject:important&quot;)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-results">Max Results</Label>
                <Input
                  id="max-results"
                  type="number"
                  placeholder="50"
                  min="1"
                  max="500"
                />
              </div>
            </>
          )}

          {/* Label operations */}
          {(gmailOperation === "add-label" || gmailOperation === "remove-label") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="message-id">Message ID</Label>
                <Input
                  id="message-id"
                  type="text"
                  placeholder="17b2d4a5c8b9f123"
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="label-name">Label Name</Label>
                <Input
                  id="label-name"
                  type="text"
                  placeholder="IMPORTANT"
                />
              </div>
            </>
          )}

          {/* Mark read/unread operations */}
          {(gmailOperation === "mark-read" || gmailOperation === "mark-unread") && (
            <div className="space-y-2">
              <Label htmlFor="message-id">Message ID</Label>
              <Input
                id="message-id"
                type="text"
                placeholder="17b2d4a5c8b9f123"
                className="font-mono text-sm"
              />
            </div>
          )}
        </div>
      )}

      {nodeType === "slack" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5" />
            <h3 className="font-semibold">Slack Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slack-token">Bot Token</Label>
            <div className="relative">
              <Input
                id="slack-token"
                type="password"
                placeholder="xoxb-..."
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slack-operation">Operation</Label>
            <Select value={slackOperation} onValueChange={setSlackOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="post-message">Post Message</SelectItem>
                <SelectItem value="get-messages">Get Messages</SelectItem>
                <SelectItem value="update-message">Update Message</SelectItem>
                <SelectItem value="delete-message">Delete Message</SelectItem>
                <SelectItem value="get-channels">Get Channels</SelectItem>
                <SelectItem value="create-channel">Create Channel</SelectItem>
                <SelectItem value="invite-user">Invite User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(slackOperation === "post-message" || slackOperation === "get-messages" || slackOperation === "invite-user") && (
            <div className="space-y-2">
              <Label htmlFor="channel">Channel</Label>
              <Input
                id="channel"
                type="text"
                placeholder="#general or @username"
              />
              <p className="text-xs text-muted-foreground">
                Channel name (#general) or user (@username) or channel ID (C1234567890)
              </p>
            </div>
          )}

          {/* Message content for post/update operations */}
          {(slackOperation === "post-message" || slackOperation === "update-message") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="slack-message">Message</Label>
                <Textarea
                  id="slack-message"
                  placeholder="Hello from your automation!"
                  className="h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username (Bot Name)</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="AutomationBot"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emoji">Emoji</Label>
                <Input
                  id="emoji"
                  type="text"
                  placeholder=":robot_face:"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (JSON, optional)</Label>
                <Textarea
                  id="attachments"
                  placeholder='[{"color": "good", "text": "Success!", "title": "Status Update"}]'
                  className="h-24 font-mono text-sm"
                />
              </div>
            </>
          )}

          {/* Message timestamp for update/delete operations */}
          {(slackOperation === "update-message" || slackOperation === "delete-message") && (
            <div className="space-y-2">
              <Label htmlFor="message-ts">Message Timestamp</Label>
              <Input
                id="message-ts"
                type="text"
                placeholder="1234567890.123456"
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Timestamp of the message to update/delete
              </p>
            </div>
          )}

          {/* New channel name for create operation */}
          {slackOperation === "create-channel" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="new-channel-name">Channel Name</Label>
                <Input
                  id="new-channel-name"
                  type="text"
                  placeholder="new-channel"
                />
                <p className="text-xs text-muted-foreground">
                  Channel name (without #, lowercase, no spaces)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel-private">Private Channel</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Public</SelectItem>
                    <SelectItem value="true">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* User to invite */}
          {slackOperation === "invite-user" && (
            <div className="space-y-2">
              <Label htmlFor="user-to-invite">User to Invite</Label>
              <Input
                id="user-to-invite"
                type="text"
                placeholder="@username or U1234567890"
              />
              <p className="text-xs text-muted-foreground">
                Username (@username) or user ID (U1234567890)
              </p>
            </div>
          )}

          {slackOperation === "get-messages" && (
            <div className="space-y-2">
              <Label htmlFor="message-limit">Message Limit</Label>
              <Input
                id="message-limit"
                type="number"
                placeholder="100"
                min="1"
                max="1000"
              />
            </div>
          )}
        </div>
      )}

      {nodeType === "telegram" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Send className="w-5 h-5" />
            <h3 className="font-semibold">Telegram Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telegram-token">Bot Token</Label>
            <div className="relative">
              <Input
                id="telegram-token"
                type="password"
                placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-surface"
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegram-operation">Operation</Label>
            <Select value={telegramOperation} onValueChange={setTelegramOperation}>
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="send-message">Send Message</SelectItem>
                <SelectItem value="send-photo">Send Photo</SelectItem>
                <SelectItem value="send-document">Send Document</SelectItem>
                <SelectItem value="get-updates">Get Updates</SelectItem>
                <SelectItem value="get-chat">Get Chat</SelectItem>
                <SelectItem value="send-location">Send Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Chat ID for most operations */}
          {(telegramOperation === "send-message" || telegramOperation === "send-photo" || telegramOperation === "send-document" || telegramOperation === "send-location" || telegramOperation === "get-chat") && (
            <div className="space-y-2">
              <Label htmlFor="chat-id">Chat ID</Label>
              <Input
                id="chat-id"
                type="text"
                placeholder="@channel_name or 123456789"
              />
              <p className="text-xs text-muted-foreground">
                Channel username (@channel_name) or numeric chat ID (123456789)
              </p>
            </div>
          )}

          {(telegramOperation === "send-message" || telegramOperation === "send-photo" || telegramOperation === "send-document") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="telegram-message">
                  {telegramOperation === "send-message" ? "Message" : "Caption (optional)"}
                </Label>
                <Textarea
                  id="telegram-message"
                  placeholder={
                    telegramOperation === "send-message" 
                      ? "Your message here..." 
                      : "Caption for the media..."
                  }
                  className="h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parse-mode">Parse Mode</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parse mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="markdown">Markdown</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="disable-notification">Disable Notification</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">No</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {telegramOperation === "send-photo" && (
            <div className="space-y-2">
              <Label htmlFor="photo-url">Photo URL or File Path</Label>
              <Input
                id="photo-url"
                type="text"
                placeholder="https://example.com/image.jpg or /path/to/image.jpg"
              />
            </div>
          )}

          {/* Document-specific fields */}
          {telegramOperation === "send-document" && (
            <div className="space-y-2">
              <Label htmlFor="document-url">Document URL or File Path</Label>
              <Input
                id="document-url"
                type="text"
                placeholder="https://example.com/file.pdf or /path/to/document.pdf"
              />
            </div>
          )}

          {/* Location-specific fields */}
          {telegramOperation === "send-location" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  placeholder="40.7128"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  placeholder="-74.0060"
                />
              </div>
            </>
          )}

          {/* Updates-specific fields */}
          {telegramOperation === "get-updates" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="offset">Offset (optional)</Label>
                <Input
                  id="offset"
                  type="number"
                  placeholder="0"
                />
                <p className="text-xs text-muted-foreground">
                  Identifier of the first update to be returned
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit">Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  placeholder="100"
                  min="1"
                  max="100"
                />
                <p className="text-xs text-muted-foreground">
                  Number of updates to retrieve (1-100)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {nodeType === "code" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-5 h-5" />
            <h3 className="font-semibold">Code Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="code-mode">Mode</Label>
            <Select value={codeMode} onValueChange={setCodeMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="runOnceForAllItems">Run Once for All Items</SelectItem>
                <SelectItem value="runOnceForEachItem">Run Once for Each Item</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {codeMode === "runOnceForAllItems" && "Code runs once with all items available as array"}
              {codeMode === "runOnceForEachItem" && "Code runs separately for each input item"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="javascript-code">JavaScript Code</Label>
            <Textarea
              id="javascript-code"
              placeholder={
                codeMode === "runOnceForAllItems" 
                  ? `// Process all items at once
const processedData = items.map(item => ({
  ...item,
  processed: true,
  timestamp: new Date().toISOString()
}));

return processedData;`
                  : `// Process each item individually
const item = $json;

// Transform the current item
const processedItem = {
  ...item,
  processed: true,
  timestamp: new Date().toISOString(),
  id: item.id || Math.random().toString(36)
};

return processedItem;`
              }
              className="h-64 font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label>Available Variables</Label>
            <div className="text-sm text-muted-foreground space-y-1">
              {codeMode === "runOnceForAllItems" ? (
                <>
                  <div><code className="bg-surface px-1 rounded">items</code> - Array of all input items</div>
                  <div><code className="bg-surface px-1 rounded">$input</code> - Input data object</div>
                  <div><code className="bg-surface px-1 rounded">$json</code> - First item JSON</div>
                </>
              ) : (
                <>
                  <div><code className="bg-surface px-1 rounded">$json</code> - Current item JSON</div>
                  <div><code className="bg-surface px-1 rounded">$input</code> - Input data object</div>
                  <div><code className="bg-surface px-1 rounded">$itemIndex</code> - Current item index</div>
                </>
              )}
              <div><code className="bg-surface px-1 rounded">$workflow</code> - Workflow data</div>
              <div><code className="bg-surface px-1 rounded">$execution</code> - Execution data</div>
              <div><code className="bg-surface px-1 rounded">$node</code> - Current node data</div>
            </div>
          </div>
        </div>
      )}

      {nodeType === "set" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5" />
            <h3 className="font-semibold">Set Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="keep-only-set">Keep Only Set Fields</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">No</SelectItem>
                <SelectItem value="true">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Values to Set</Label>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Field name" />
                <Input placeholder="Field value" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="status" />
                <Input placeholder="active" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="timestamp" />
                <Input placeholder="{{new Date().toISOString()}}" />
              </div>
            </div>
            <Button variant="outline" size="sm">Add Field</Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="include-other-fields">Include Other Fields</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Yes</SelectItem>
                <SelectItem value="false">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {nodeType === "function" && (
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">Function Configuration</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="function-name">Function Name</Label>
            <Input
              id="function-name"
              type="text"
              placeholder="processData"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="function-code">Function Code</Label>
            <Textarea
              id="function-code"
              placeholder={`function processData(input) {
  // Your transformation logic here
  return input.map(item => ({
    ...item,
    processed: true,
    processedAt: new Date().toISOString()
  }));
}`}
              className="h-48 font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="function-parameters">Parameters (JSON)</Label>
            <Textarea
              id="function-parameters"
              placeholder='{"param1": "value1", "param2": "{{$json.field}}"}'
              className="h-24 font-mono text-sm"
            />
          </div>
        </div>
      )}

      {/* FALLBACK */}
      {nodeType && !["webhook", "schedule", "email-trigger", "http", "mysql", "google-sheets", "google-drive", "if", "switch", "loop", "wait", "merge", "split-batches", "ai-agent", "gemini", "chatgpt", "gmail", "slack", "telegram", "code", "set", "function"].includes(nodeType) && (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="generic-config">Configuration</Label>
            <Textarea
              id="generic-config"
              placeholder="Enter configuration for this node type..."
              className="h-32"
            />
          </div>
        </div>
      )}

      <Button className="w-full py-3 font-medium">Save Configuration</Button>
    </div>
  );
};

// Execution Tab Component
const ExecutionTab = ({ selectedNode }: PropertiesTabProps) => {
  if (!selectedNode) {
    return (
      <div className="p-6 text-center">
        <div className="rounded-full bg-surface/50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Play className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-foreground mb-2">No Node Selected</h3>
        <p className="text-sm text-muted-foreground">
          Select a node to view its execution status
        </p>
      </div>
    );
  }

  const executionStatus = selectedNode.data?.executionStatus || 'idle';
  const lastExecuted = selectedNode.data?.lastExecuted || null;
  const executionTime = selectedNode.data?.executionTime || null;
  const error = selectedNode.data?.error || null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Play className="w-5 h-5" />
        <h3 className="font-semibold">Execution Status</h3>
      </div>

      {/* Current Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Status</Label>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            executionStatus === 'running' ? 'bg-yellow-100 text-yellow-800' :
            executionStatus === 'completed' ? 'bg-green-100 text-green-800' :
            executionStatus === 'failed' ? 'bg-red-100 text-red-800' :
            ' bg-neutral-600 text-neutral-100'
          }`}>
            {executionStatus === 'running' && '⏳ Running'}
            {executionStatus === 'completed' && '✅ Completed'}
            {executionStatus === 'failed' && '❌ Failed'}
            {executionStatus === 'idle' && '⏸️ Idle'}
          </div>
        </div>

        {lastExecuted && (
          <div className="flex items-center justify-between">
            <Label>Last Executed</Label>
            <span className="text-sm text-muted-foreground">
              {new Date(lastExecuted as string).toLocaleString()}
            </span>
          </div>
        )}

        {executionTime && (
          <div className="flex items-center justify-between">
            <Label>Execution Time</Label>
            <span className="text-sm text-muted-foreground">
              {String(executionTime)}ms
            </span>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="space-y-2">
          <Label className="text-red-600">Error</Label>
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800 font-mono">{String(error)}</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-2">
        <Label>Quick Actions</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Run Node
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            <Pause className="w-4 h-4 mr-2" />
            Stop
          </Button>
        </div>
      </div>

      {/* Execution History */}
      <div className="space-y-2">
        <Label>Recent Executions</Label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <div className="text-xs text-muted-foreground p-2 border rounded">
            No execution history available
          </div>
        </div>
      </div>
    </div>
  );
};

// Code Tab Component
const CodeTab = ({ selectedNode }: PropertiesTabProps) => {
  // Simple hardcoded workflow code - doesn't change based on nodes
  const workflowCode = `// Automate2Code - Generated Workflow
const express = require('express');
const axios = require('axios');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Webhook trigger endpoint
app.post('/webhook/start', async (req, res) => {
  try {
    console.log('Workflow triggered:', req.body);
    
    // Step 1: Process incoming webhook data
    const webhookData = req.body;
    
    // Step 2: Make HTTP request to external API
    const apiResponse = await axios.get('https://api.example.com/data', {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    // Step 3: Process with AI
    const aiPrompt = \`Process this data: \${JSON.stringify(apiResponse.data)}\`;
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system", 
          content: "You are a data processing assistant."
        },
        {
          role: "user", 
          content: aiPrompt
        }
      ]
    });
    
    // Step 4: Send result via email/webhook
    const result = {
      originalData: webhookData,
      apiData: apiResponse.data,
      aiProcessed: aiResponse.choices[0].message.content,
      timestamp: new Date().toISOString()
    };
    
    console.log('Workflow completed:', result);
    res.json({ success: true, result });
    
  } catch (error) {
    console.error('Workflow error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Workflow server running on port \${PORT}\`);
});

module.exports = app;`;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          <h3 className="font-semibold">Workflow Code</h3>
        </div>
        <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(workflowCode)}>
          Copy Code
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Editor
          className="h-[80vh]"
          defaultLanguage="javascript"
          value={workflowCode}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
          }}
        />
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = ({ selectedNode }: PropertiesTabProps) => {
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [executionTimeout, setExecutionTimeout] = useState(300);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h3 className="font-semibold">Workflow Settings</h3>
      </div>

      {/* General Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workflow-name">Workflow Name</Label>
          <Input
            id="workflow-name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="Enter workflow name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workflow-description">Description</Label>
          <Textarea
            id="workflow-description"
            placeholder="Describe what this workflow does..."
            className="h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="execution-timeout">Execution Timeout (seconds)</Label>
          <Input
            id="execution-timeout"
            type="number"
            value={executionTimeout}
            onChange={(e) => setExecutionTimeout(Number(e.target.value))}
            min="1"
            max="3600"
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Preferences</Label>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="auto-save" 
            checked={autoSave}
            onCheckedChange={(checked) => setAutoSave(checked === true)}
          />
          <Label htmlFor="auto-save" className="text-sm">
            Auto-save workflow changes
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="dark-mode" 
            checked={darkMode}
            onCheckedChange={(checked) => setDarkMode(checked === true)}
          />
          <Label htmlFor="dark-mode" className="text-sm">
            Dark mode
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="show-grid" defaultChecked />
          <Label htmlFor="show-grid" className="text-sm">
            Show grid on canvas
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="snap-to-grid" defaultChecked />
          <Label htmlFor="snap-to-grid" className="text-sm">
            Snap nodes to grid
          </Label>
        </div>
      </div>

      {/* Export/Import */}
      <div className="space-y-4">
        <Label className="text-base font-medium">Export/Import</Label>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm">
            Export JSON
          </Button>
          <Button variant="outline" size="sm">
            Import JSON
          </Button>
        </div>
      </div>

      {/* Save Settings */}
      <Button className="w-full">
        Save Settings
      </Button>
    </div>
  );
};