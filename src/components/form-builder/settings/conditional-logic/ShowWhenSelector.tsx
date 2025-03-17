
import { Question } from "../../types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ShowWhenSelectorProps {
  question: Question;
  onShowWhenChange: (showWhen: "all" | "any") => void;
}

export function ShowWhenSelector({ question, onShowWhenChange }: ShowWhenSelectorProps) {
  return (
    <div className="pt-2">
      <Label className="text-sm font-medium">Show this question when:</Label>
      <RadioGroup 
        className="flex items-center space-x-4 pt-2"
        value={question.conditionalLogic?.showWhen || "all"}
        onValueChange={(value) => onShowWhenChange(value as "all" | "any")}
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
  );
}
