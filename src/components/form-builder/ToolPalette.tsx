
import { useDrag } from "react-dnd";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { questionTemplates } from "./questionTemplates";
import { QuestionTemplate } from "./types";
import { 
  ListChecks, 
  Sliders, 
  ToggleLeft, 
  Type, 
  CalendarDays, 
  Heading 
} from "lucide-react";

export function ToolPalette() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Question Types</CardTitle>
        <CardDescription>Drag and drop elements to add to your form</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {questionTemplates.map((template) => (
          <DraggableQuestionType key={template.type} template={template} />
        ))}
      </CardContent>
    </Card>
  );
}

function DraggableQuestionType({ template }: { template: QuestionTemplate }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "QUESTION_TYPE",
    item: { templateType: template.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getIcon = () => {
    switch (template.type) {
      case "multiple_choice":
        return <ListChecks className="h-5 w-5" />;
      case "scale":
        return <Sliders className="h-5 w-5" />;
      case "boolean":
        return <ToggleLeft className="h-5 w-5" />;
      case "text":
        return <Type className="h-5 w-5" />;
      case "date":
        return <CalendarDays className="h-5 w-5" />;
      case "heading":
        return <Heading className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={drag}
      className={`flex items-center p-3 bg-background border rounded-md cursor-move hover:bg-accent hover:border-accent-foreground transition-colors ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="mr-3 text-primary">{getIcon()}</div>
      <div>
        <p className="font-medium">{template.label}</p>
        <p className="text-xs text-muted-foreground">{template.description}</p>
      </div>
    </div>
  );
}
