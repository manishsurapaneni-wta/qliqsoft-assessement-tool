
// Contains all the types and interfaces related to assessments and scoring

export interface Question {
  id: string;
  text: string;
  description?: string;
  type: "multiple_choice" | "scale" | "boolean" | "text" | "date";
  options?: Option[];
  minValue?: number;
  maxValue?: number;
}

export interface Option {
  value: string;
  label: string;
  score: number;
}

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
