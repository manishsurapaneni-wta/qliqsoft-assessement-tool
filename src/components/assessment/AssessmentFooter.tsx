
import { Timer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AssessmentFooterProps {
  answeredCount: number;
  totalCount: number;
  currentQuestionIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  currentResponseExists: boolean;
}

export const AssessmentFooter = ({
  answeredCount,
  totalCount,
  currentQuestionIndex,
  onNext,
  onPrevious,
  currentResponseExists
}: AssessmentFooterProps) => {
  return (
    <div className="flex justify-between items-center py-6 border-t mt-auto">
      <div className="text-sm text-muted-foreground">
        <div className="flex items-center">
          <Timer className="mr-2 h-4 w-4" />
          Questions answered: <span className="font-medium ml-1">{answeredCount} of {totalCount}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        {currentQuestionIndex > 0 && (
          <Button variant="outline" onClick={onPrevious}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        )}
        
        <Button 
          onClick={onNext}
          disabled={!currentResponseExists}
        >
          {currentQuestionIndex === totalCount - 1 ? "Complete Assessment" : "Next Question"}
        </Button>
      </div>
    </div>
  );
};
