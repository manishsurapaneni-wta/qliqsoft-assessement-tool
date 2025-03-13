
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';

import { QuestionHeader } from './QuestionHeader';
import { QuestionFooter } from './QuestionFooter';
import { MultipleChoiceQuestion } from './questionTypes/MultipleChoiceQuestion';
import { ScaleQuestion } from './questionTypes/ScaleQuestion';
import { BooleanQuestion } from './questionTypes/BooleanQuestion';

export type QuestionType = 'multiple_choice' | 'scale' | 'boolean';

export interface Option {
  value: string;
  label: string;
  score: number;
}

export interface Question {
  id: string;
  text: string;
  description?: string;
  type: QuestionType;
  options?: Option[];
  minValue?: number;
  maxValue?: number;
}

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  value: any;
  onChange: (value: any) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  value,
  onChange,
  onNext,
  onPrevious,
  isFirst,
  isLast
}: QuestionCardProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Render different question types
  const renderQuestionContent = () => {
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
        
      default:
        return <p>Unsupported question type</p>;
    }
  };

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      onAnimationComplete={() => setAnimationComplete(true)}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border shadow-md overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary/70 via-primary to-primary/70 w-full"></div>
        <CardHeader>
          <QuestionHeader 
            text={question.text}
            description={question.description}
          />
        </CardHeader>
        
        <CardContent>
          {renderQuestionContent()}
        </CardContent>
        
        <CardFooter>
          <QuestionFooter
            onNext={onNext}
            onPrevious={onPrevious}
            isFirst={isFirst}
            isLast={isLast}
            value={value}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
