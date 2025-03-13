
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Question } from "./types";

interface EmptyCanvasStateProps {
  onAddSampleQuestion: () => void;
}

export function EmptyCanvasState({ onAddSampleQuestion }: EmptyCanvasStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center">
      <div className="text-muted-foreground mb-2">
        <PlusCircle className="h-12 w-12" />
      </div>
      <h3 className="text-xl font-medium">Start Building Your Form</h3>
      <p className="text-muted-foreground max-w-md">
        Drag question types from the palette on the left onto this canvas to start building your form. 
      </p>
      <Button variant="outline" onClick={onAddSampleQuestion}>
        Add a sample question
      </Button>
    </div>
  );
}
