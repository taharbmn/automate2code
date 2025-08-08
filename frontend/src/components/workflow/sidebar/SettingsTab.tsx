import React from "react";
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

export const SettingsTab = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="workflow-name">Workflow Name</Label>
          <Input
            id="workflow-name"
            type="text"
            placeholder="My Automation Workflow"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what this workflow does..."
            className="h-24"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="environment">Environment</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Error Handling</Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="stop-on-error" defaultChecked />
              <Label htmlFor="stop-on-error" className="text-sm font-normal">
                Stop on first error
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="retry-failed" />
              <Label htmlFor="retry-failed" className="text-sm font-normal">
                Retry failed nodes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="detailed-logging" defaultChecked />
              <Label
                htmlFor="detailed-logging"
                className="text-sm font-normal"
              >
                Enable detailed logging
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeout">Timeout (seconds)</Label>
          <Input id="timeout" type="number" placeholder="30" />
        </div>
      </div>

      <div className="space-y-3 pt-6 border-t border-border">
        <Button className="w-full py-3 font-medium">Save Settings</Button>
        <Button variant="outline" className="w-full py-3">
          Export Workflow
        </Button>
      </div>
    </div>
  );
};
