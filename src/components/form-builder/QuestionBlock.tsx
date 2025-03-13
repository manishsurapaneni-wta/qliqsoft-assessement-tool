
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Question } from "./types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { GripVertical, Trash, Copy, Settings } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { QuestionSettings } from "./QuestionSettings";

interface QuestionBlockProps {
  question: Question;
  index: number;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
}

export function QuestionBlock({ 
  question, 
  index, 
  moveQuestion, 
  updateQuestion, 
  deleteQuestion, 
  duplicateQuestion 
}: QuestionBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "QUESTION_BLOCK",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: "QUESTION_BLOCK",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
        return;
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      moveQuestion(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion({
      ...question,
      text: e.target.value,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateQuestion({
      ...question,
      description: e.target.value,
    });
  };

  const handleRequiredChange = (checked: boolean) => {
    updateQuestion({
      ...question,
      required: checked,
    });
  };

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      className={`border transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <CardHeader className="p-4 pb-0 flex flex-row items-center gap-2">
        <div className="cursor-move mr-1 text-muted-foreground">
          <GripVertical className="h-5 w-5" />
        </div>
        
        <div className="flex-1">
          <Input
            value={question.text}
            onChange={handleTextChange}
            placeholder="Enter question text"
            className="border-0 p-0 text-lg font-medium focus-visible:ring-0 bg-transparent"
          />
        </div>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => duplicateQuestion(question.id)}
            title="Duplicate Question"
          >
            <Copy className="h-4 w-4" />
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                title="Question Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Question Settings</DialogTitle>
                <DialogDescription>Configure options, scoring, and logic for this question</DialogDescription>
              </DialogHeader>
              <QuestionSettings question={question} updateQuestion={updateQuestion} />
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => deleteQuestion(question.id)}
            title="Delete Question"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          <Textarea
            value={question.description || ''}
            onChange={handleDescriptionChange}
            placeholder="Add a description (optional)"
            className="min-h-[60px] resize-none"
          />
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`required-${question.id}`}
              checked={question.required}
              onCheckedChange={handleRequiredChange}
            />
            <label 
              htmlFor={`required-${question.id}`}
              className="text-sm cursor-pointer"
            >
              Required question
            </label>
          </div>
          
          {question.scoring?.enabled && (
            <div className="text-sm text-muted-foreground inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
              <span>Scoring:</span>
              <span className="font-medium">{question.scoring.weight} points</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
