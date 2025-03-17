
import { useState } from "react";
import { Question } from "./types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuestionSettings } from "./QuestionSettings";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface QuestionBlockContentProps {
  question: Question;
  updateQuestion: (question: Question) => void;
  allQuestions?: Question[];
}

export function QuestionBlockContent({ 
  question, 
  updateQuestion,
  allQuestions = []
}: QuestionBlockContentProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="p-4 pt-0 border-t">
      <div className="space-y-4">
        {/* Question Text */}
        <div className="space-y-2">
          <Input
            value={question.text}
            onChange={(e) => updateQuestion({ ...question, text: e.target.value })}
            placeholder="Enter your question text"
            className="font-medium"
          />
        </div>
        
        {/* Description (Optional) */}
        <div className="space-y-2">
          <Textarea
            value={question.description || ""}
            onChange={(e) => updateQuestion({ ...question, description: e.target.value })}
            placeholder="Add an optional description"
            className="resize-none"
            rows={2}
          />
        </div>
        
        {/* Required Toggle */}
        <div className="flex items-center space-x-2">
          <Switch 
            id={`required-${question.id}`} 
            checked={question.required} 
            onCheckedChange={(checked) => updateQuestion({ ...question, required: checked })}
          />
          <Label htmlFor={`required-${question.id}`}>Required</Label>
        </div>
        
        {/* Question Settings */}
        <div className="mt-4">
          <QuestionSettings 
            question={question} 
            updateQuestion={updateQuestion}
            allQuestions={allQuestions}
          />
        </div>
      </div>
    </div>
  );
}
