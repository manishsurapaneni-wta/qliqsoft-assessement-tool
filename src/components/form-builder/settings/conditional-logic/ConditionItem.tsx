
import { Question, Condition } from "../../types";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { ValueSelector } from "./ValueSelector";
import { getOperatorOptions } from "./utils";

interface ConditionItemProps {
  condition: Condition;
  index: number;
  availableParentQuestions: Question[];
  updateCondition: (index: number, updatedCondition: Condition) => void;
  removeCondition: (index: number) => void;
  allQuestions: Question[];
}

export function ConditionItem({ 
  condition, 
  index, 
  availableParentQuestions, 
  updateCondition, 
  removeCondition,
  allQuestions
}: ConditionItemProps) {
  const parentQuestion = allQuestions.find(q => q.id === condition.questionId);
  
  if (!parentQuestion) return null;
  
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
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
        <ValueSelector 
          condition={condition} 
          index={index} 
          updateCondition={updateCondition} 
          parentQuestion={parentQuestion} 
        />
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
}
