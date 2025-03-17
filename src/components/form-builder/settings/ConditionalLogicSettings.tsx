import { useState } from "react";
import { Question, Condition } from "../types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Link, Eye, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ConditionalLogicSettingsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
  allQuestions: Question[];
}

export function ConditionalLogicSettings({ question, updateQuestion, allQuestions }: ConditionalLogicSettingsProps) {
  const [showPreview, setShowPreview] = useState(false);

  // Filter out the current question and any heading type questions as potential parent questions
  const availableParentQuestions = allQuestions.filter(q => 
    q.id !== question.id && 
    q.type !== "heading" && 
    !q.parentQuestionIds?.includes(question.id)
  );

  const handleConditionalLogicToggle = (enabled: boolean) => {
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic || { conditions: [], showWhen: "all" },
        enabled,
      },
    });
  };

  const handleShowWhenChange = (showWhen: "all" | "any") => {
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic || { conditions: [], enabled: true },
        showWhen,
      },
    });
  };

  const addCondition = () => {
    if (availableParentQuestions.length === 0) return;
    
    const parentQuestion = availableParentQuestions[0];
    let defaultValue: string | number = "";
    
    // Set a default value based on the parent question type
    if (parentQuestion.type === "multiple_choice" || parentQuestion.type === "boolean") {
      defaultValue = parentQuestion.options?.[0]?.value || "";
    } else if (parentQuestion.type === "scale") {
      defaultValue = parentQuestion.minValue || 0;
    }
    
    const newCondition: Condition = {
      questionId: parentQuestion.id,
      operator: "equals",
      value: defaultValue,
      questionText: parentQuestion.text,
    };
    
    // Add the condition and update parent relationship
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic || { showWhen: "all", enabled: true },
        enabled: true,
        conditions: [...(question.conditionalLogic?.conditions || []), newCondition],
      },
      parentQuestionIds: [...(question.parentQuestionIds || []), parentQuestion.id],
    });
  };

  const removeCondition = (index: number) => {
    const updatedConditions = [...(question.conditionalLogic?.conditions || [])];
    const removedCondition = updatedConditions[index];
    updatedConditions.splice(index, 1);
    
    // Also update the parentQuestionIds array
    const updatedParentIds = question.parentQuestionIds?.filter(id => id !== removedCondition.questionId) || [];
    
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic!,
        conditions: updatedConditions,
      },
      parentQuestionIds: updatedParentIds,
    });
  };

  const updateCondition = (index: number, updatedCondition: Condition) => {
    const updatedConditions = [...(question.conditionalLogic?.conditions || [])];
    
    // If the question ID has changed, update the parentQuestionIds array
    if (updatedCondition.questionId !== updatedConditions[index].questionId) {
      const oldParentId = updatedConditions[index].questionId;
      const updatedParentIds = question.parentQuestionIds?.filter(id => id !== oldParentId) || [];
      updatedParentIds.push(updatedCondition.questionId);
      
      // Update parent question text
      const parentQuestion = allQuestions.find(q => q.id === updatedCondition.questionId);
      if (parentQuestion) {
        updatedCondition.questionText = parentQuestion.text;
      }
      
      updateQuestion({
        ...question,
        parentQuestionIds: updatedParentIds,
      });
    }
    
    updatedConditions[index] = updatedCondition;
    
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic!,
        conditions: updatedConditions,
      },
    });
  };

  const getOperatorOptions = (questionType: string) => {
    switch (questionType) {
      case "multiple_choice":
      case "boolean":
      case "text":
      case "date":
        return [
          { value: "equals", label: "Equals" },
          { value: "not_equals", label: "Does not equal" },
        ];
      case "scale":
        return [
          { value: "equals", label: "Equals" },
          { value: "not_equals", label: "Does not equal" },
          { value: "greater_than", label: "Greater than" },
          { value: "less_than", label: "Less than" },
        ];
      default:
        return [{ value: "equals", label: "Equals" }];
    }
  };

  const renderValueSelector = (condition: Condition, index: number) => {
    const parentQuestion = allQuestions.find(q => q.id === condition.questionId);
    
    if (!parentQuestion) return null;
    
    switch (parentQuestion.type) {
      case "multiple_choice":
      case "boolean":
        return (
          <Select
            value={condition.value.toString()}
            onValueChange={(value) => {
              updateCondition(index, { ...condition, value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
              {parentQuestion.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case "scale":
        return (
          <Input
            type="number"
            min={parentQuestion.minValue}
            max={parentQuestion.maxValue}
            value={condition.value.toString()}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              updateCondition(index, { ...condition, value });
            }}
          />
        );
        
      case "text":
        return (
          <Input
            type="text"
            value={condition.value.toString()}
            onChange={(e) => {
              updateCondition(index, { ...condition, value: e.target.value });
            }}
          />
        );
        
      case "date":
        return (
          <Input
            type="date"
            value={condition.value.toString()}
            onChange={(e) => {
              updateCondition(index, { ...condition, value: e.target.value });
            }}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Conditional Logic</h3>
          <p className="text-sm text-muted-foreground">Show this question based on other answers</p>
        </div>
        <Switch 
          checked={question.conditionalLogic?.enabled || false}
          onCheckedChange={handleConditionalLogicToggle}
        />
      </div>
      
      {question.conditionalLogic?.enabled && (
        <div className="space-y-4">
          {/* Show When Option */}
          <div className="pt-2">
            <Label className="text-sm font-medium">Show this question when:</Label>
            <RadioGroup 
              className="flex items-center space-x-4 pt-2"
              value={question.conditionalLogic?.showWhen || "all"}
              onValueChange={(value) => handleShowWhenChange(value as "all" | "any")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All conditions are met</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="any" />
                <Label htmlFor="any">Any condition is met</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Conditions List */}
          <div className="space-y-3 border rounded-md p-3 bg-background">
            {(question.conditionalLogic?.conditions || []).length === 0 ? (
              <div className="text-center py-2 text-muted-foreground text-sm">
                No conditions added yet. Add a condition to make this question conditional.
              </div>
            ) : (
              question.conditionalLogic?.conditions.map((condition, index) => {
                const parentQuestion = allQuestions.find(q => q.id === condition.questionId);
                if (!parentQuestion) return null;
                
                return (
                  <div key={index} className="grid grid-cols-12 gap-2 items-center">
                    {/* Question */}
                    <div className="col-span-4">
                      <Select
                        value={condition.questionId}
                        onValueChange={(value) => {
                          updateCondition(index, { ...condition, questionId: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select question" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableParentQuestions.map((q) => (
                            <SelectItem key={q.id} value={q.id}>
                              {q.text.length > 25 ? q.text.substring(0, 25) + "..." : q.text}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Operator */}
                    <div className="col-span-3">
                      <Select
                        value={condition.operator}
                        onValueChange={(value) => {
                          updateCondition(index, { 
                            ...condition, 
                            operator: value as Condition["operator"] 
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Operator" />
                        </SelectTrigger>
                        <SelectContent>
                          {getOperatorOptions(parentQuestion.type).map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Value */}
                    <div className="col-span-4">
                      {renderValueSelector(condition, index)}
                    </div>
                    
                    {/* Delete */}
                    <div className="col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCondition(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
            
            {/* Add Condition Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={addCondition}
              disabled={availableParentQuestions.length === 0}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Condition
            </Button>
          </div>
          
          {/* Conditional Preview */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview Conditional Logic
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Conditional Logic Preview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="border rounded-md p-4 relative bg-muted/20">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">This question will be shown when:</div>
                    
                    {question.conditionalLogic?.conditions.map((condition, index) => {
                      const parentQuestion = allQuestions.find(q => q.id === condition.questionId);
                      if (!parentQuestion) return null;
                      
                      let valueDisplay = condition.value.toString();
                      if (parentQuestion.type === "multiple_choice" || parentQuestion.type === "boolean") {
                        const option = parentQuestion.options?.find(o => o.value === condition.value);
                        valueDisplay = option?.label || valueDisplay;
                      }
                      
                      const operatorText = {
                        "equals": "equals",
                        "not_equals": "does not equal",
                        "greater_than": "is greater than",
                        "less_than": "is less than",
                        "contains": "contains"
                      }[condition.operator];
                      
                      return (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Badge variant="outline" className="font-normal">
                            {parentQuestion.text.length > 30 
                              ? parentQuestion.text.substring(0, 30) + "..." 
                              : parentQuestion.text}
                          </Badge>
                          <span>{operatorText}</span>
                          <Badge className="bg-primary/10 text-primary border-primary/30 font-normal">
                            {valueDisplay}
                          </Badge>
                          
                          {index < question.conditionalLogic.conditions.length - 1 && (
                            <span className="font-medium">
                              {question.conditionalLogic.showWhen === "all" ? "AND" : "OR"}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="pt-4 flex items-center space-x-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Then show:</span>
                    <Badge className="bg-primary/10 text-primary border-primary/30">
                      {question.text.length > 30 
                        ? question.text.substring(0, 30) + "..." 
                        : question.text}
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  During the assessment, this question will only appear when the conditions above are met.
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Connected Questions Indicator */}
          {question.conditionalLogic?.conditions.length > 0 && (
            <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2">
              <Link className="h-3 w-3" />
              <span>
                Connected to {question.conditionalLogic.conditions.length} question{question.conditionalLogic.conditions.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
