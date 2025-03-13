import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard, Question } from "@/components/assessment/QuestionCard";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";
import { 
  AssessmentResponse,
  calculateAssessmentResult
} from "@/utils/scoring";
import { useToast } from "@/components/ui/use-toast";

interface AssessmentScreenProps {
  questions: Question[];
}

export const AssessmentScreen = ({ questions }: AssessmentScreenProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  
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
        
        <AssessmentProgress 
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
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
    </div>
  );
};
