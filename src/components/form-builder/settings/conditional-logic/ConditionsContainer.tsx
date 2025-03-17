
import { Question, Condition } from "../../types";
import { Button } from "@/components/ui/button";
import { Plus, Link } from "lucide-react";
import { ConditionItem } from "./ConditionItem";

interface ConditionsContainerProps {
  question: Question;
  allQuestions: Question[];
  availableParentQuestions: Question[];
  conditions: Condition[];
  updateCondition: (index: number, updatedCondition: Condition) => void;
  removeCondition: (index: number) => void;
  addCondition: () => void;
}

export function ConditionsContainer({ 
  question, 
  allQuestions,
  availableParentQuestions,
  conditions,
  updateCondition,
  removeCondition,
  addCondition
}: ConditionsContainerProps) {
  return (
    <div>
      <div className="space-y-3 border rounded-md p-3 bg-background">
        {conditions.length === 0 ? (
          <div className="text-center py-2 text-muted-foreground text-sm">
            No conditions added yet. Add a condition to make this question conditional.
          </div>
        ) : (
          conditions.map((condition, index) => (
            <ConditionItem
              key={index}
              condition={condition}
              index={index}
              availableParentQuestions={availableParentQuestions}
              updateCondition={updateCondition}
              removeCondition={removeCondition}
              allQuestions={allQuestions}
            />
          ))
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
      
      {/* Connected Questions Indicator */}
      {conditions.length > 0 && (
        <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2">
          <Link className="h-3 w-3" />
          <span>
            Connected to {conditions.length} question{conditions.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}
