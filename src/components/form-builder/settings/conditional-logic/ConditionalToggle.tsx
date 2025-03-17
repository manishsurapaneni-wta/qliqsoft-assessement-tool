
import { Switch } from "@/components/ui/switch";
import { Question } from "../../types";

interface ConditionalToggleProps {
  question: Question;
  onToggleChange: (enabled: boolean) => void;
}

export function ConditionalToggle({ question, onToggleChange }: ConditionalToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium">Conditional Logic</h3>
        <p className="text-sm text-muted-foreground">Show this question based on other answers</p>
      </div>
      <Switch 
        checked={question.conditionalLogic?.enabled || false}
        onCheckedChange={onToggleChange}
      />
    </div>
  );
}
