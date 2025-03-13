
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface QuestionFooterProps {
  onNext: () => void;
  onPrevious?: () => void;
  isFirst: boolean;
  isLast: boolean;
  value: any;
}

export const QuestionFooter = ({
  onNext,
  onPrevious,
  isFirst,
  isLast,
  value
}: QuestionFooterProps) => {
  return (
    <div className="flex justify-between pt-6 border-t">
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
    </div>
  );
};
