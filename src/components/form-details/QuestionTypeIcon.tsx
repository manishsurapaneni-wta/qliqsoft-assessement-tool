
import { 
  ListChecks, 
  Sliders, 
  ToggleLeft, 
  Type, 
  CalendarDays, 
  Heading 
} from "lucide-react";
import { QuestionType } from "@/components/form-builder/types";

interface QuestionTypeIconProps {
  type: QuestionType;
  className?: string;
}

export function QuestionTypeIcon({ type, className }: QuestionTypeIconProps) {
  const iconClass = `h-4 w-4 ${className || ""}`;
  
  switch (type) {
    case "multiple_choice":
      return <ListChecks className={iconClass} />;
    case "scale":
      return <Sliders className={iconClass} />;
    case "boolean":
      return <ToggleLeft className={iconClass} />;
    case "text":
      return <Type className={iconClass} />;
    case "date":
      return <CalendarDays className={iconClass} />;
    case "heading":
      return <Heading className={iconClass} />;
    default:
      return <ListChecks className={iconClass} />;
  }
}
