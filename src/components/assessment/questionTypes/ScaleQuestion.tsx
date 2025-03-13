
import { Slider } from '@/components/ui/slider';

interface ScaleQuestionProps {
  minValue?: number;
  maxValue?: number;
  value: any;
  onChange: (value: any) => void;
}

export const ScaleQuestion = ({
  minValue = 0,
  maxValue = 10,
  value,
  onChange
}: ScaleQuestionProps) => {
  const min = minValue || 0;
  const max = maxValue || 10;
  
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
};
