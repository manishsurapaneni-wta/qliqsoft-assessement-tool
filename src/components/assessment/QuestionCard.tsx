
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { 
  Slider 
} from '@/components/ui/slider';
import { 
  Label 
} from '@/components/ui/label';
import { 
  Button 
} from '@/components/ui/button';

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
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="space-y-3"
          >
            {question.options?.map((option) => (
              <div 
                key={option.value}
                className={cn(
                  "assessment-option",
                  value === option.value && "selected"
                )}
              >
                <RadioGroupItem 
                  id={option.value} 
                  value={option.value} 
                  className="text-primary border-2" 
                />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case 'scale':
        const min = question.minValue || 0;
        const max = question.maxValue || 10;
        
        return (
          <div className="space-y-6 pt-4">
            <Slider
              value={[value === undefined ? min : value]}
              min={min}
              max={max}
              step={1}
              onValueChange={(vals) => onChange(vals[0])}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground px-1">
              <span>Low ({min})</span>
              <span>Selected: {value === undefined ? '-' : value}</span>
              <span>High ({max})</span>
            </div>
          </div>
        );
        
      case 'boolean':
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="flex gap-6 pt-2"
          >
            <div className={cn(
              "assessment-option flex-1 justify-center",
              value === 'true' && "selected"
            )}>
              <RadioGroupItem id="yes" value="true" className="text-primary border-2" />
              <Label htmlFor="yes" className="cursor-pointer font-normal">Yes</Label>
            </div>
            <div className={cn(
              "assessment-option flex-1 justify-center",
              value === 'false' && "selected"
            )}>
              <RadioGroupItem id="no" value="false" className="text-primary border-2" />
              <Label htmlFor="no" className="cursor-pointer font-normal">No</Label>
            </div>
          </RadioGroup>
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
    >
      <Card className="w-full max-w-2xl mx-auto border shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-muted-foreground">
              Question {currentIndex + 1} of {totalQuestions}
            </p>
            <div className="h-1 flex-1 max-w-[120px] bg-secondary rounded-full overflow-hidden ml-4">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
          <CardTitle className="text-xl md:text-2xl">{question.text}</CardTitle>
          {question.description && (
            <CardDescription>{question.description}</CardDescription>
          )}
        </CardHeader>
        
        <CardContent>
          {renderQuestionContent()}
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirst}
            className={cn(
              "transition-all duration-300", 
              isFirst ? "opacity-0" : "opacity-100"
            )}
          >
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={value === undefined}
            className={cn(
              "transition-all duration-300",
              value === undefined ? "opacity-70" : "opacity-100"
            )}
          >
            {isLast ? "Complete Assessment" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

<lov-add-dependency>framer-motion@latest</lov-add-dependency>
