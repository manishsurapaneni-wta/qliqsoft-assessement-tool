
import { Question, Condition } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ConditionPreviewProps {
  question: Question;
  allQuestions: Question[];
}

export function ConditionPreview({ question, allQuestions }: ConditionPreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  
  if (!question.conditionalLogic?.conditions.length) {
    return null;
  }
  
  return (
    <Dialog open={showPreview} onOpenChange={setShowPreview}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Preview Conditional Logic
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Conditional Logic Preview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="border rounded-md p-4 relative bg-muted/20">
            <div className="space-y-2">
              <div className="text-sm font-medium">This question will be shown when:</div>
              
              {question.conditionalLogic?.conditions.map((condition, index) => {
                const parentQuestion = allQuestions.find(q => q.id === condition.questionId);
                if (!parentQuestion) return null;
                
                let valueDisplay = condition.value.toString();
                if (parentQuestion.type === "multiple_choice" || parentQuestion.type === "boolean") {
                  const option = parentQuestion.options?.find(o => o.value === condition.value);
                  valueDisplay = option?.label || valueDisplay;
                }
                
                const operatorText = {
                  "equals": "equals",
                  "not_equals": "does not equal",
                  "greater_than": "is greater than",
                  "less_than": "is less than",
                  "contains": "contains"
                }[condition.operator];
                
                return (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <Badge variant="outline" className="font-normal">
                      {parentQuestion.text.length > 30 
                        ? parentQuestion.text.substring(0, 30) + "..." 
                        : parentQuestion.text}
                    </Badge>
                    <span>{operatorText}</span>
                    <Badge className="bg-primary/10 text-primary border-primary/30 font-normal">
                      {valueDisplay}
                    </Badge>
                    
                    {index < question.conditionalLogic.conditions.length - 1 && (
                      <span className="font-medium">
                        {question.conditionalLogic.showWhen === "all" ? "AND" : "OR"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="pt-4 flex items-center space-x-2">
              <ArrowRight className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Then show:</span>
              <Badge className="bg-primary/10 text-primary border-primary/30">
                {question.text.length > 30 
                  ? question.text.substring(0, 30) + "..." 
                  : question.text}
              </Badge>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            During the assessment, this question will only appear when the conditions above are met.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
