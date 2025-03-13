
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface BooleanQuestionProps {
  value: any;
  onChange: (value: any) => void;
}

export const BooleanQuestion = ({
  value,
  onChange
}: BooleanQuestionProps) => {
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
};
