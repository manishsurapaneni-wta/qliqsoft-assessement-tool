
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { 
  AssessmentResponse, 
  sampleQuestions,
  calculateAssessmentResult
} from "@/utils/scoring";
import { Button } from "@/components/ui/button";
import { ClipboardList, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Assessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  
  // Reset to top of page when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const startAssessment = () => {
    setAssessmentStarted(true);
    setCurrentQuestionIndex(0);
    setResponses([]);
  };
  
  const handleResponseChange = (value: any) => {
    const currentQuestion = sampleQuestions[currentQuestionIndex];
    
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
    const currentQuestion = sampleQuestions[currentQuestionIndex];
    const response = responses.find((r) => r.questionId === currentQuestion.id);
    return response ? response.value : undefined;
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Complete assessment and navigate to results
      const result = calculateAssessmentResult(sampleQuestions, responses);
      
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
  
  // Show intro screen if assessment not started
  if (!assessmentStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Medical Assessment Questionnaire
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              This assessment contains 20 questions about your health and will take 
              approximately 5-7 minutes to complete. Your responses will help evaluate 
              your current health status.
            </p>
            
            <div className="bg-secondary/50 rounded-lg p-4 mb-8">
              <h2 className="font-medium mb-2">Instructions:</h2>
              <ul className="text-left text-muted-foreground space-y-2">
                <li>• Answer all questions honestly for accurate results</li>
                <li>• You can go back to previous questions if needed</li>
                <li>• Your data is private and will be used only for assessment purposes</li>
              </ul>
            </div>
            
            <Button size="lg" onClick={startAssessment}>
              Begin Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Show the assessment questions
  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24 flex-1 flex flex-col">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4"
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
        
        <div className="flex-1 flex items-start justify-center py-4">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestionIndex}
              question={sampleQuestions[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              totalQuestions={sampleQuestions.length}
              value={getCurrentResponse()}
              onChange={handleResponseChange}
              onNext={goToNextQuestion}
              onPrevious={goToPreviousQuestion}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === sampleQuestions.length - 1}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
