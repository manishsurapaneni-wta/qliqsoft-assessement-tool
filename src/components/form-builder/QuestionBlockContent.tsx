
import { Question } from "./types";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionBlockContentProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

export function QuestionBlockContent({ question, updateQuestion }: QuestionBlockContentProps) {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateQuestion({
      ...question,
      description: e.target.value,
    });
  };

  const handleRequiredChange = (checked: boolean) => {
    updateQuestion({
      ...question,
      required: checked,
    });
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Textarea
          value={question.description || ''}
          onChange={handleDescriptionChange}
          placeholder="Add a description (optional)"
          className="min-h-[60px] resize-none"
        />
        
        <div className="flex items-center gap-2">
          <Checkbox 
            id={`required-${question.id}`}
            checked={question.required}
            onCheckedChange={handleRequiredChange}
          />
          <label 
            htmlFor={`required-${question.id}`}
            className="text-sm cursor-pointer"
          >
            Required question
          </label>
        </div>
        
        {question.scoring?.enabled && (
          <div className="text-sm text-muted-foreground inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
            <span>Scoring:</span>
            <span className="font-medium">{question.scoring.weight} points</span>
          </div>
        )}
      </div>
    </div>
  );
}
