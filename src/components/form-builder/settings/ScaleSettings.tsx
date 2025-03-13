
import { Question } from "../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ScaleSettingsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

export function ScaleSettings({ question, updateQuestion }: ScaleSettingsProps) {
  // Update min/max values for scale questions
  const handleScaleChange = (field: 'minValue' | 'maxValue', value: number) => {
    updateQuestion({
      ...question,
      [field]: value,
    });
  };

  return (
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
  );
}
