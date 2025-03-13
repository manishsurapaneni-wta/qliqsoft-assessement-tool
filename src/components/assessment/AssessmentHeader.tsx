
import { ArrowLeft, Save, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";

interface AssessmentHeaderProps {
  onToggleSidePanel: () => void;
  showSidePanel: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  onSaveDraft: () => void;
}

export const AssessmentHeader = ({
  onToggleSidePanel,
  showSidePanel,
  currentQuestionIndex,
  totalQuestions,
  onSaveDraft
}: AssessmentHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="mb-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        
        <h1 className="text-2xl md:text-3xl font-bold">Medical Assessment</h1>
        <p className="text-muted-foreground">
          Answer each question to the best of your knowledge.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onSaveDraft}>
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save your progress to continue later</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onToggleSidePanel}
                className={showSidePanel ? "bg-accent" : ""}
              >
                <List className="mr-2 h-4 w-4" />
                Question List
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View all questions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <AssessmentProgress 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      </div>
    </div>
  );
};
