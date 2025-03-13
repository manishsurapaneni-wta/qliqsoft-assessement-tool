
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
import { 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle 
} from 'lucide-react';

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
            className="space-y-3 pt-2"
          >
            {question.options?.map((option) => (
              <div 
                key={option.value}
                className={cn(
                  "assessment-option relative overflow-hidden group",
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
                {value === option.value && (
                  <motion.div 
                    layoutId="highlight"
                    className="absolute inset-0 bg-primary/5 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            ))}
          </RadioGroup>
        );
        
      case 'scale':
        const min = question.minValue || 0;
        const max = question.maxValue || 10;
        
        return (
          <div className="space-y-8 pt-6">
            <Slider
              value={[value === undefined ? min : value]}
              min={min}
              max={max}
              step={1}
              onValueChange={(vals) => onChange(vals[0])}
              className="py-6"
            />
            <div className="flex justify-between items-center text-sm px-1">
              <span className="text-muted-foreground">Low ({min})</span>
              <span className="px-4 py-2 bg-primary/10 rounded-full font-medium text-primary">
                {value === undefined ? '-' : value}
              </span>
              <span className="text-muted-foreground">High ({max})</span>
            </div>
          </div>
        );
        
      case 'boolean':
        return (
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="flex gap-6 pt-4"
          >
            <div className={cn(
              "assessment-option flex-1 justify-center relative overflow-hidden",
              value === 'true' && "selected"
            )}>
              <RadioGroupItem id="yes" value="true" className="text-primary border-2" />
              <Label htmlFor="yes" className="cursor-pointer font-normal">Yes</Label>
              {value === 'true' && (
                <motion.div 
                  layoutId="highlight-boolean"
                  className="absolute inset-0 bg-primary/5 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </div>
            <div className={cn(
              "assessment-option flex-1 justify-center relative overflow-hidden",
              value === 'false' && "selected"
            )}>
              <RadioGroupItem id="no" value="false" className="text-primary border-2" />
              <Label htmlFor="no" className="cursor-pointer font-normal">No</Label>
              {value === 'false' && (
                <motion.div 
                  layoutId="highlight-boolean"
                  className="absolute inset-0 bg-primary/5 -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
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
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="border shadow-md overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary/70 via-primary to-primary/70 w-full"></div>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <CardTitle className="text-xl md:text-2xl leading-tight">
                {question.text}
              </CardTitle>
              {question.description && (
                <CardDescription className="mt-2 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{question.description}</span>
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {renderQuestionContent()}
        </CardContent>
        
        <CardFooter className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirst}
            className={cn(
              "transition-all duration-300", 
              isFirst ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={value === undefined}
            className={cn(
              "transition-all duration-300 group",
              value === undefined ? "opacity-70" : "opacity-100"
            )}
          >
            {isLast ? "Complete Assessment" : "Next Question"}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
