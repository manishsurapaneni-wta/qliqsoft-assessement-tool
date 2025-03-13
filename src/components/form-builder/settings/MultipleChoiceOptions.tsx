
import { Question, Option } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, GripVertical } from "lucide-react";

interface MultipleChoiceOptionsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

export function MultipleChoiceOptions({ question, updateQuestion }: MultipleChoiceOptionsProps) {
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

  if (!question.options) return null;

  return (
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
              disabled={question.options.length <= 1}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
