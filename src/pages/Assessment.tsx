
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { 
  AssessmentResponse, 
  sampleQuestions,
  calculateAssessmentResult
} from "@/utils/scoring";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  ClipboardList, 
  ArrowRight, 
  FileCheck, 
  CheckCircle 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

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
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
        <Navbar />
        
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
              <ClipboardList className="h-10 w-10 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Medical Assessment Questionnaire
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              This assessment contains 20 questions about your health and will take 
              approximately 5-7 minutes to complete. Your responses will help evaluate 
              your current health status.
            </p>
            
            <div className="bg-card rounded-xl shadow-sm p-6 mb-8 border">
              <h2 className="font-medium mb-4 text-lg">Instructions:</h2>
              <ul className="text-left text-muted-foreground space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary/70" /> 
                  Answer all questions honestly for accurate results
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary/70" /> 
                  You can go back to previous questions if needed
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary/70" /> 
                  Your data is private and will be used only for assessment purposes
                </li>
              </ul>
            </div>
            
            <Button 
              size="lg" 
              onClick={startAssessment}
              className="font-medium text-base px-8 py-6 h-auto group"
            >
              Begin Assessment
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Show the assessment questions
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
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
          
          <div className="flex items-center gap-2 bg-card border rounded-lg p-3 shadow-sm">
            <FileCheck className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">
                  Question {currentQuestionIndex + 1} of {sampleQuestions.length}
                </span>
                <span className="text-sm text-primary font-medium">
                  {Math.round((currentQuestionIndex + 1) / sampleQuestions.length * 100)}%
                </span>
              </div>
              <Progress 
                value={((currentQuestionIndex + 1) / sampleQuestions.length) * 100} 
                className="h-2"
              />
            </div>
          </div>
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
