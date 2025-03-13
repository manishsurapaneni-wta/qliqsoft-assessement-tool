
import { FileCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AssessmentProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export const AssessmentProgress = ({ 
  currentQuestionIndex, 
  totalQuestions 
}: AssessmentProgressProps) => {
  const progressPercentage = Math.round(
    ((currentQuestionIndex + 1) / totalQuestions) * 100
  );

  return (
    <div className="flex items-center gap-2 bg-card border rounded-lg p-3 shadow-sm">
      <FileCheck className="h-5 w-5 text-primary" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm text-primary font-medium">
            {progressPercentage}%
          </span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2"
        />
      </div>
    </div>
  );
};
