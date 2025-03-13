
import { Form } from "./types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FormSettingsProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}

export function FormSettings({ form, setForm }: FormSettingsProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };
  
  const handleStatusChange = (status: string) => {
    setForm((prev) => ({
      ...prev,
      status: status as Form['status'],
    }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Settings</CardTitle>
        <CardDescription>Configure your assessment form details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-title">Form Title</Label>
          <Input
            id="form-title"
            value={form.title}
            onChange={handleTitleChange}
            placeholder="Enter form title"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="form-description">Description</Label>
          <Textarea
            id="form-description"
            value={form.description || ''}
            onChange={handleDescriptionChange}
            placeholder="Describe the purpose of this form"
            className="min-h-[80px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="form-status">Status</Label>
          <Select 
            value={form.status} 
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="form-status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Collapsible 
          open={isAdvancedOpen} 
          onOpenChange={setIsAdvancedOpen}
          className="pt-2"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex w-full justify-between p-0 h-auto">
              <span className="font-medium">Advanced Settings</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? 'transform rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="form-department">Department</Label>
              <Select defaultValue="all">
                <SelectTrigger id="form-department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="surgical">Surgical</SelectItem>
                  <SelectItem value="nursing">Nursing</SelectItem>
                  <SelectItem value="admin">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="form-access">Access Level</Label>
              <Select defaultValue="public">
                <SelectTrigger id="form-access">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
}
