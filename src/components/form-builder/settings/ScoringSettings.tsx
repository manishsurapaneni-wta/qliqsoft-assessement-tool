
import { Question } from "../types";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface ScoringSettingsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

export function ScoringSettings({ question, updateQuestion }: ScoringSettingsProps) {
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

  return (
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
  );
}
