
import { Question } from "../types/assessment";

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
