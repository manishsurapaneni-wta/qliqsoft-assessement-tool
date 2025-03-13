
import { Question } from "../types";
import { Switch } from "@/components/ui/switch";

interface ConditionalLogicSettingsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

export function ConditionalLogicSettings({ question, updateQuestion }: ConditionalLogicSettingsProps) {
  const handleConditionalLogicToggle = (enabled: boolean) => {
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic || { conditions: [] },
        enabled,
      },
    });
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
        <div className="bg-muted/50 rounded-md p-4">
          <p className="text-sm text-center text-muted-foreground">
            Conditional logic configuration will be available in a future update
          </p>
        </div>
      )}
    </div>
  );
}
