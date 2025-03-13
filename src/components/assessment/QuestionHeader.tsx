
import { HelpCircle } from 'lucide-react';
import { 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';

interface QuestionHeaderProps {
  text: string;
  description?: string;
}

export const QuestionHeader = ({ text, description }: QuestionHeaderProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <CardTitle className="text-xl md:text-2xl leading-tight">
          {text}
        </CardTitle>
        {description && (
          <CardDescription className="mt-2 flex items-start gap-2">
            <HelpCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{description}</span>
          </CardDescription>
        )}
      </div>
    </div>
  );
};
