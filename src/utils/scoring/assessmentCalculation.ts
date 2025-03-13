
import { Question, AssessmentResponse, AssessmentResult, ScoreBreakdown } from "../types/assessment";
import { getQuestionScore } from "./questionScoring";

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
