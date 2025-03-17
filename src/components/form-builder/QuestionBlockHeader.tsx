
import { Question } from "./types";
import { Button } from "@/components/ui/button";
import { Grip, Trash2, Copy, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuestionBlockHeaderProps {
  question: Question;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
  allQuestions?: Question[];
}

export function QuestionBlockHeader({ 
  question, 
  updateQuestion, 
  deleteQuestion, 
  duplicateQuestion,
  allQuestions = []
}: QuestionBlockHeaderProps) {
  // Check if this question is a dependent question (has conditional logic)
  const hasConditionalLogic = question.conditionalLogic?.enabled && question.conditionalLogic.conditions.length > 0;
  
  // Check if this question is a parent for any other questions
  const isParentQuestion = allQuestions.some(q => 
    q.conditionalLogic?.enabled && 
    q.conditionalLogic.conditions.some(c => c.questionId === question.id)
  );
  
  return (
    <div className="p-4 flex items-center justify-between bg-muted/30 rounded-t-lg">
      <div className="flex items-center space-x-2">
        <Grip className="h-5 w-5 text-muted-foreground cursor-move" />
        <div className="font-medium text-sm">
          {question.type.charAt(0).toUpperCase() + question.type.slice(1).replace('_', ' ')}
        </div>
        
        {/* Conditional Logic Badges */}
        <div className="flex gap-1">
          {hasConditionalLogic && (
            <Badge variant="outline" className="text-xs py-0 h-5 bg-primary/5 border-primary/20 text-primary flex items-center gap-1">
              <Link className="h-3 w-3" />
              Conditional
            </Badge>
          )}
          
          {isParentQuestion && (
            <Badge variant="outline" className="text-xs py-0 h-5 bg-secondary/40 border-secondary/20 flex items-center gap-1">
              Parent
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => duplicateQuestion(question.id)}
          className="h-8 w-8"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteQuestion(question.id)}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
