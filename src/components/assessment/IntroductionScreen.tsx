
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroductionScreenProps {
  onStartAssessment: () => void;
}

export const IntroductionScreen = ({ onStartAssessment }: IntroductionScreenProps) => {
  return (
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
          onClick={onStartAssessment}
          className="font-medium text-base px-8 py-6 h-auto group"
        >
          Begin Assessment
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  );
};
