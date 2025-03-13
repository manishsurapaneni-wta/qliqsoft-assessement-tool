
import { Textarea } from "@/components/ui/textarea";

interface TextQuestionProps {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
}

export const TextQuestion = ({ value, onChange, placeholder = "Enter your answer here..." }: TextQuestionProps) => {
  return (
    <div className="space-y-2 pt-6">
      <Textarea
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="resize-none min-h-[120px]"
      />
      <p className="text-xs text-muted-foreground">
        {value?.length || 0} characters
      </p>
    </div>
  );
};
