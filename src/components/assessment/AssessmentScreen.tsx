
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, List, Save, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, Question } from "@/components/assessment/QuestionCard";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { 
  AssessmentResponse,
  calculateAssessmentResult
} from "@/utils/scoring";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AssessmentScreenProps {
  questions: Question[];
  onToggleSidePanel?: () => void;
  showSidePanel?: boolean;
}

export const AssessmentScreen = ({ 
  questions, 
  onToggleSidePanel,
  showSidePanel
}: AssessmentScreenProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [savedDraft, setSavedDraft] = useState(false);
  
  const handleResponseChange = (value: any) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    setResponses((prev) => {
      const existing = prev.findIndex(
        (r) => r.questionId === currentQuestion.id
      );
      
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = {
          ...updated[existing],
          value,
        };
        return updated;
      }
      
      return [
        ...prev,
        {
          questionId: currentQuestion.id,
          value,
        },
      ];
    });
  };
  
  const getCurrentResponse = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const response = responses.find((r) => r.questionId === currentQuestion.id);
    return response ? response.value : undefined;
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Complete assessment and navigate to results
      const result = calculateAssessmentResult(questions, responses);
      
      // Save to local storage for results page
      localStorage.setItem("assessmentResult", JSON.stringify(result));
      
      toast({
        title: "Assessment Complete",
        description: "Your assessment has been completed successfully.",
      });
      
      navigate("/results");
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    if (onToggleSidePanel && showSidePanel) {
      onToggleSidePanel();
    }
  };

  const saveDraft = () => {
    localStorage.setItem("assessmentDraft", JSON.stringify({
      responses,
      currentQuestionIndex
    }));
    
    setSavedDraft(true);
    
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved. You can continue later.",
    });
  };

  // Calculate assessment progress
  const answeredCount = responses.length;
  const totalCount = questions.length;
  const progressPercentage = Math.round((answeredCount / totalCount) * 100);

  return (
    <div className="container mx-auto px-4 py-8 pt-24 flex-1 flex flex-col">
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
                <Button variant="outline" size="sm" onClick={saveDraft}>
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
            totalQuestions={questions.length}
          />
        </div>
      </div>
      
      <div className="flex-1 flex items-start justify-center py-4">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            value={getCurrentResponse()}
            onChange={handleResponseChange}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === questions.length - 1}
          />
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between items-center py-6 border-t mt-auto">
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center">
            <Timer className="mr-2 h-4 w-4" />
            Questions answered: <span className="font-medium ml-1">{answeredCount} of {totalCount}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {currentQuestionIndex > 0 && (
            <Button variant="outline" onClick={goToPreviousQuestion}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}
          
          <Button 
            onClick={goToNextQuestion}
            disabled={getCurrentResponse() === undefined}
          >
            {currentQuestionIndex === questions.length - 1 ? "Complete Assessment" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};
