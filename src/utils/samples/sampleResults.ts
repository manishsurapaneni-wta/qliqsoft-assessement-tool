
import { Question, AssessmentResponse, AssessmentResult } from "../types/assessment";
import { sampleQuestions } from "./sampleQuestions";
import { calculateAssessmentResult } from "../scoring/assessmentCalculation";

// Helper to generate random responses
const getRandomResponseForQuestion = (question: Question): any => {
  switch (question.type) {
    case "multiple_choice":
      const options = question.options || [];
      return options[Math.floor(Math.random() * options.length)]?.value;
      
    case "scale":
      const min = question.minValue || 0;
      const max = question.maxValue || 10;
      return Math.floor(Math.random() * (max - min + 1)) + min;
      
    case "boolean":
      return Math.random() > 0.5 ? "true" : "false";
      
    default:
      return "";
  }
};

// Generate sample assessment results for the dashboard
export const generateSampleResults = (count: number): AssessmentResult[] => {
  const results: AssessmentResult[] = [];
  
  for (let i = 0; i < count; i++) {
    // Create random responses
    const responses: AssessmentResponse[] = sampleQuestions.map(q => ({
      questionId: q.id,
      value: getRandomResponseForQuestion(q)
    }));
    
    // Calculate results
    const result = calculateAssessmentResult(sampleQuestions, responses);
    
    // Adjust date to spread over last few months
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    result.completedAt = date;
    
    results.push(result);
  }
  
  // Sort by completion date, most recent first
  return results.sort((a, b) => 
    b.completedAt.getTime() - a.completedAt.getTime()
  );
};
