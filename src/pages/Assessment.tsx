
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { IntroductionScreen } from "@/components/assessment/IntroductionScreen";
import { AssessmentScreen } from "@/components/assessment/AssessmentScreen";
import { sampleQuestions } from "@/utils/scoring";

const Assessment = () => {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  
  // Reset to top of page when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const startAssessment = () => {
    setAssessmentStarted(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      {!assessmentStarted ? (
        <IntroductionScreen onStartAssessment={startAssessment} />
      ) : (
        <AssessmentScreen questions={sampleQuestions} />
      )}
    </div>
  );
};

export default Assessment;
