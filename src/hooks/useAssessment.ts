
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Question, AssessmentResponse, calculateAssessmentResult } from "@/utils/scoring";

export function useAssessment(questions: Question[]) {
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

  return {
    currentQuestionIndex,
    responses,
    savedDraft,
    answeredCount,
    totalCount,
    handleResponseChange,
    getCurrentResponse,
    goToNextQuestion,
    goToPreviousQuestion,
    jumpToQuestion,
    saveDraft
  };
}
