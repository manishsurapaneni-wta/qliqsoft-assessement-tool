
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { IntroductionScreen } from "@/components/assessment/IntroductionScreen";
import { AssessmentScreen } from "@/components/assessment/AssessmentScreen";
import { SidePanel } from "@/components/assessment/SidePanel";
import { sampleQuestions } from "@/utils/scoring";

const Assessment = () => {
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  
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
        <div className="flex flex-1 relative">
          <AssessmentScreen 
            questions={sampleQuestions} 
            onToggleSidePanel={() => setShowSidePanel(prev => !prev)}
            showSidePanel={showSidePanel}
          />
          <SidePanel 
            questions={sampleQuestions}
            visible={showSidePanel}
            onClose={() => setShowSidePanel(false)}
            onJumpToQuestion={() => {}}
          />
        </div>
      )}
    </div>
  );
};

export default Assessment;
