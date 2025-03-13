
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
import { useQuestionRenderer } from '@/hooks/useQuestionRenderer';
import { useAnimationVariants } from '@/hooks/useAnimationVariants';
import { Question } from '@/utils/types/assessment';

export interface QuestionCardProps {
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
  const { renderQuestionContent } = useQuestionRenderer();
  const { variants } = useAnimationVariants();

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
          {renderQuestionContent(question, value, onChange)}
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
