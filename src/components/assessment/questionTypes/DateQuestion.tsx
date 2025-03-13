
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateQuestionProps {
  value: any;
  onChange: (value: any) => void;
}

export const DateQuestion = ({ value, onChange }: DateQuestionProps) => {
  // Parse the date string value back into a Date object
  const getDateValue = () => {
    if (!value) return undefined;
    return new Date(value);
  };

  return (
    <div className="space-y-4 pt-6">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(getDateValue() as Date, "PPP") : "Select a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={getDateValue()}
            onSelect={(date) => onChange(date ? date.toISOString() : null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
