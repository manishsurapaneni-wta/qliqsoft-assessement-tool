
import { MultipleChoiceQuestion } from '@/components/assessment/questionTypes/MultipleChoiceQuestion';
import { ScaleQuestion } from '@/components/assessment/questionTypes/ScaleQuestion';
import { BooleanQuestion } from '@/components/assessment/questionTypes/BooleanQuestion';
import { TextQuestion } from '@/components/assessment/questionTypes/TextQuestion';
import { DateQuestion } from '@/components/assessment/questionTypes/DateQuestion';
import { Question } from '@/utils/types/assessment';

/**
 * Custom hook to determine which question component to render based on question type
 */
export const useQuestionRenderer = () => {
  const renderQuestionContent = (
    question: Question, 
    value: any, 
    onChange: (value: any) => void
  ) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <MultipleChoiceQuestion 
            options={question.options}
            value={value}
            onChange={onChange}
          />
        );
        
      case 'scale':
        return (
          <ScaleQuestion
            minValue={question.minValue}
            maxValue={question.maxValue}
            value={value}
            onChange={onChange}
          />
        );
        
      case 'boolean':
        return (
          <BooleanQuestion
            value={value}
            onChange={onChange}
          />
        );
        
      case 'text':
        return (
          <TextQuestion
            value={value}
            onChange={onChange}
          />
        );
        
      case 'date':
        return (
          <DateQuestion
            value={value}
            onChange={onChange}
          />
        );
        
      case 'heading':
        // For heading type, just render the text without any input
        return <p className="text-muted-foreground">This is a section heading (no input required)</p>;
        
      default:
        return <p>Unsupported question type</p>;
    }
  };

  return { renderQuestionContent };
};
