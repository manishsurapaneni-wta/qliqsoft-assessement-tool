
import { Question } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface QuestionBlockHeaderProps {
  question: Question;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
}

export function QuestionBlockHeader({ 
  question, 
  updateQuestion, 
  deleteQuestion, 
  duplicateQuestion 
}: QuestionBlockHeaderProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion({
      ...question,
      text: e.target.value,
    });
  };

  return (
    <div className="p-4 pb-0 flex flex-row items-center gap-2">
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
    </div>
  );
}
