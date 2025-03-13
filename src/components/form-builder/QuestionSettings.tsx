
import { useState } from "react";
import { Question, Option } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Plus, Minus, GripVertical } from "lucide-react";

interface QuestionSettingsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

export function QuestionSettings({ question, updateQuestion }: QuestionSettingsProps) {
  const [activeTab, setActiveTab] = useState("options");
  
  // Handle scoring toggle
  const handleScoringToggle = (enabled: boolean) => {
    updateQuestion({
      ...question,
      scoring: {
        ...question.scoring || { weight: 1 },
        enabled,
      },
    });
  };
  
  // Handle scoring weight change
  const handleWeightChange = (value: number[]) => {
    updateQuestion({
      ...question,
      scoring: {
        ...question.scoring || { enabled: true },
        weight: value[0],
      },
    });
  };
  
  // Handle option change
  const handleOptionChange = (index: number, field: keyof Option, value: string | number) => {
    if (!question.options) return;
    
    const newOptions = [...question.options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value,
    };
    
    updateQuestion({
      ...question,
      options: newOptions,
    });
  };
  
  // Add new option
  const addOption = () => {
    if (!question.options) return;
    
    updateQuestion({
      ...question,
      options: [
        ...question.options,
        {
          id: crypto.randomUUID(),
          value: `option${question.options.length + 1}`,
          label: `Option ${question.options.length + 1}`,
          score: question.scoring?.enabled ? 0 : undefined,
        },
      ],
    });
  };
  
  // Remove option
  const removeOption = (index: number) => {
    if (!question.options || question.options.length <= 1) return;
    
    updateQuestion({
      ...question,
      options: question.options.filter((_, i) => i !== index),
    });
  };
  
  // Update min/max values for scale questions
  const handleScaleChange = (field: 'minValue' | 'maxValue', value: number) => {
    updateQuestion({
      ...question,
      [field]: value,
    });
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="options">Options</TabsTrigger>
        <TabsTrigger value="scoring">Scoring & Logic</TabsTrigger>
      </TabsList>
      
      <TabsContent value="options" className="space-y-4">
        {question.type === "multiple_choice" && question.options && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Answer Options</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addOption}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Option
              </Button>
            </div>
            
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <div key={option.id} className="flex gap-2 items-center">
                  <div className="text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  <Input
                    value={option.label}
                    onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  {question.scoring?.enabled && (
                    <Input
                      type="number"
                      value={option.score || 0}
                      onChange={(e) => handleOptionChange(index, 'score', parseInt(e.target.value) || 0)}
                      className="w-20"
                      min={0}
                    />
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeOption(index)}
                    disabled={question.options!.length <= 1}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {question.type === "scale" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-value">Minimum Value</Label>
                <Input
                  id="min-value"
                  type="number"
                  value={question.minValue || 0}
                  onChange={(e) => handleScaleChange('minValue', parseInt(e.target.value) || 0)}
                  min={0}
                  max={question.maxValue ? question.maxValue - 1 : 9}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-value">Maximum Value</Label>
                <Input
                  id="max-value"
                  type="number"
                  value={question.maxValue || 10}
                  onChange={(e) => handleScaleChange('maxValue', parseInt(e.target.value) || 10)}
                  min={(question.minValue || 0) + 1}
                  max={100}
                />
              </div>
            </div>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="scoring" className="space-y-6">
        {/* Scoring Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Enable Scoring</h3>
              <p className="text-sm text-muted-foreground">Assign points to this question</p>
            </div>
            <Switch 
              checked={question.scoring?.enabled || false}
              onCheckedChange={handleScoringToggle}
            />
          </div>
          
          {question.scoring?.enabled && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Question Weight</Label>
                  <span className="text-sm font-medium">{question.scoring.weight}</span>
                </div>
                <Slider
                  value={[question.scoring.weight]}
                  onValueChange={handleWeightChange}
                  min={0}
                  max={10}
                  step={1}
                />
                <p className="text-xs text-muted-foreground">
                  Determines the importance of this question in the overall assessment
                </p>
              </div>
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Conditional Logic Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Conditional Logic</h3>
              <p className="text-sm text-muted-foreground">Show this question based on other answers</p>
            </div>
            <Switch 
              checked={question.conditionalLogic?.enabled || false}
              onCheckedChange={(enabled) => {
                updateQuestion({
                  ...question,
                  conditionalLogic: {
                    ...question.conditionalLogic || { conditions: [] },
                    enabled,
                  },
                });
              }}
            />
          </div>
          
          {question.conditionalLogic?.enabled && (
            <div className="bg-muted/50 rounded-md p-4">
              <p className="text-sm text-center text-muted-foreground">
                Conditional logic configuration will be available in a future update
              </p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
