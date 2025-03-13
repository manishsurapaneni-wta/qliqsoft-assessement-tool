
import { Question, Option } from "@/components/assessment/QuestionCard";

export interface AssessmentResponse {
  questionId: string;
  value: any;
}

export interface ScoreBreakdown {
  questionId: string;
  questionText: string;
  score: number;
  maxPossibleScore: number;
  percentage: number;
}

export interface AssessmentResult {
  totalScore: number;
  maxPossibleScore: number;
  percentageScore: number;
  breakdown: ScoreBreakdown[];
  categoryScores?: Record<string, {
    total: number;
    max: number;
    percentage: number;
  }>;
  riskLevel: "low" | "moderate" | "high";
  completedAt: Date;
}

/**
 * Calculate a score for a single question based on the response
 */
export const getQuestionScore = (
  question: Question,
  response: any
): { score: number; maxScore: number } => {
  switch (question.type) {
    case "multiple_choice": {
      const selectedOption = question.options?.find(
        (option) => option.value === response
      );
      const maxScore = Math.max(
        ...(question.options?.map((option) => option.score) || [0])
      );
      return {
        score: selectedOption ? selectedOption.score : 0,
        maxScore: maxScore,
      };
    }
    
    case "scale": {
      const min = question.minValue || 0;
      const max = question.maxValue || 10;
      
      // Normalize to 0-10 scale if different
      const normalizedScore = 
        max === 10 
          ? response 
          : (response - min) * (10 / (max - min));
          
      return {
        score: normalizedScore,
        maxScore: 10, // standardized max
      };
    }
    
    case "boolean": {
      // For boolean questions, "true" is typically a positive response
      // This could be inverted based on the context of the question
      return {
        score: response === "true" ? 1 : 0,
        maxScore: 1,
      };
    }
    
    default:
      return { score: 0, maxScore: 0 };
  }
};

/**
 * Calculate the overall score for the assessment
 */
export const calculateAssessmentResult = (
  questions: Question[],
  responses: AssessmentResponse[]
): AssessmentResult => {
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Calculate scores for each question
  const breakdown: ScoreBreakdown[] = questions.map((question) => {
    const response = responses.find((r) => r.questionId === question.id);
    
    const { score, maxScore } = getQuestionScore(
      question,
      response ? response.value : undefined
    );
    
    totalScore += score;
    maxPossibleScore += maxScore;
    
    return {
      questionId: question.id,
      questionText: question.text,
      score,
      maxPossibleScore: maxScore,
      percentage: maxScore > 0 ? (score / maxScore) * 100 : 0,
    };
  });
  
  // Calculate overall percentage score
  const percentageScore = maxPossibleScore > 0 
    ? (totalScore / maxPossibleScore) * 100 
    : 0;
  
  // Determine risk level based on percentage score
  let riskLevel: "low" | "moderate" | "high";
  if (percentageScore >= 70) {
    riskLevel = "low";
  } else if (percentageScore >= 40) {
    riskLevel = "moderate";
  } else {
    riskLevel = "high";
  }
  
  return {
    totalScore,
    maxPossibleScore,
    percentageScore,
    breakdown,
    riskLevel,
    completedAt: new Date(),
  };
};

// Sample questions for the assessment
export const sampleQuestions: Question[] = [
  {
    id: "q1",
    text: "How would you rate your overall physical health?",
    type: "multiple_choice",
    options: [
      { value: "excellent", label: "Excellent", score: 10 },
      { value: "good", label: "Good", score: 8 },
      { value: "fair", label: "Fair", score: 5 },
      { value: "poor", label: "Poor", score: 2 },
    ],
  },
  {
    id: "q2",
    text: "On a scale of 0-10, how severe is your pain?",
    description: "0 means no pain, 10 means worst possible pain",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q3",
    text: "Do you smoke or use tobacco products?",
    type: "boolean",
  },
  {
    id: "q4",
    text: "How often do you engage in moderate to intense physical activity?",
    type: "multiple_choice",
    options: [
      { value: "daily", label: "Daily", score: 10 },
      { value: "weekly", label: "3-5 times per week", score: 8 },
      { value: "occasional", label: "1-2 times per week", score: 5 },
      { value: "rarely", label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "q5",
    text: "How would you rate your stress level in the past month?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q6",
    text: "Have you been diagnosed with any chronic conditions?",
    type: "boolean",
  },
  {
    id: "q7",
    text: "How would you rate your diet?",
    type: "multiple_choice",
    options: [
      { value: "excellent", label: "Very healthy", score: 10 },
      { value: "good", label: "Mostly healthy", score: 7 },
      { value: "fair", label: "Somewhat healthy", score: 4 },
      { value: "poor", label: "Unhealthy", score: 1 },
    ],
  },
  {
    id: "q8",
    text: "On average, how many hours of sleep do you get per night?",
    type: "multiple_choice",
    options: [
      { value: "lt5", label: "Less than 5 hours", score: 0 },
      { value: "5to6", label: "5-6 hours", score: 3 },
      { value: "7to8", label: "7-8 hours", score: 10 },
      { value: "gt8", label: "More than 8 hours", score: 8 },
    ],
  },
  {
    id: "q9",
    text: "How often do you experience difficulty concentrating?",
    type: "multiple_choice",
    options: [
      { value: "never", label: "Never", score: 10 },
      { value: "sometimes", label: "Sometimes", score: 7 },
      { value: "often", label: "Often", score: 3 },
      { value: "always", label: "Always", score: 0 },
    ],
  },
  {
    id: "q10",
    text: "Do you have a family history of heart disease?",
    type: "boolean",
  },
  {
    id: "q11",
    text: "How would you rate your energy levels throughout the day?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q12",
    text: "How often do you feel anxious or worried?",
    type: "multiple_choice",
    options: [
      { value: "never", label: "Never", score: 10 },
      { value: "rarely", label: "Rarely", score: 8 },
      { value: "sometimes", label: "Sometimes", score: 5 },
      { value: "often", label: "Often", score: 2 },
      { value: "always", label: "Always", score: 0 },
    ],
  },
  {
    id: "q13",
    text: "Do you regularly take any medications?",
    type: "boolean",
  },
  {
    id: "q14",
    text: "How would you rate your mental health?",
    type: "multiple_choice",
    options: [
      { value: "excellent", label: "Excellent", score: 10 },
      { value: "good", label: "Good", score: 8 },
      { value: "fair", label: "Fair", score: 5 },
      { value: "poor", label: "Poor", score: 2 },
    ],
  },
  {
    id: "q15",
    text: "On a scale of 0-10, how satisfied are you with your social relationships?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q16",
    text: "Do you consume alcohol regularly?",
    type: "boolean",
  },
  {
    id: "q17",
    text: "How often do you eat processed foods?",
    type: "multiple_choice",
    options: [
      { value: "never", label: "Never", score: 10 },
      { value: "rarely", label: "Rarely", score: 8 },
      { value: "sometimes", label: "Sometimes", score: 5 },
      { value: "often", label: "Often", score: 2 },
      { value: "always", label: "Always", score: 0 },
    ],
  },
  {
    id: "q18",
    text: "How satisfied are you with your work-life balance?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q19",
    text: "Have you experienced significant weight changes in the past 6 months?",
    type: "boolean",
  },
  {
    id: "q20",
    text: "How would you rate your overall quality of life?",
    type: "multiple_choice",
    options: [
      { value: "excellent", label: "Excellent", score: 10 },
      { value: "good", label: "Good", score: 8 },
      { value: "fair", label: "Fair", score: 5 },
      { value: "poor", label: "Poor", score: 2 },
    ],
  },
];

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
