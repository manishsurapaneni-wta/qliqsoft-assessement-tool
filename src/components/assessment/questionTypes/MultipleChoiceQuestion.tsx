
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Option } from '@/components/assessment/QuestionCard';

interface MultipleChoiceQuestionProps {
  options?: Option[];
  value: any;
  onChange: (value: any) => void;
}

export const MultipleChoiceQuestion = ({
  options,
  value,
  onChange
}: MultipleChoiceQuestionProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="space-y-3 pt-2"
    >
      {options?.map((option) => (
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
};
