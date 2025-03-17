
import { Condition, Question } from "../../types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ValueSelectorProps {
  condition: Condition;
  index: number;
  updateCondition: (index: number, updatedCondition: Condition) => void;
  parentQuestion: Question;
}

export function ValueSelector({ condition, index, updateCondition, parentQuestion }: ValueSelectorProps) {
  switch (parentQuestion.type) {
    case "multiple_choice":
    case "boolean":
      return (
        <Select
          value={condition.value.toString()}
          onValueChange={(value) => {
            updateCondition(index, { ...condition, value });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent>
            {parentQuestion.options?.map((option) => (
              <SelectItem key={option.id} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      
    case "scale":
      return (
        <Input
          type="number"
          min={parentQuestion.minValue}
          max={parentQuestion.maxValue}
          value={condition.value.toString()}
          onChange={(e) => {
            const value = parseInt(e.target.value) || 0;
            updateCondition(index, { ...condition, value });
          }}
        />
      );
      
    case "text":
      return (
        <Input
          type="text"
          value={condition.value.toString()}
          onChange={(e) => {
            updateCondition(index, { ...condition, value: e.target.value });
          }}
        />
      );
      
    case "date":
      return (
        <Input
          type="date"
          value={condition.value.toString()}
          onChange={(e) => {
            updateCondition(index, { ...condition, value: e.target.value });
          }}
        />
      );
      
    default:
      return null;
  }
}
