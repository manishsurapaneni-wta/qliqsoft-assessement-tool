
import { motion } from "framer-motion";
import { X, CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Question } from "@/components/assessment/QuestionCard";

interface SidePanelProps {
  questions: Question[];
  visible: boolean;
  onClose: () => void;
  currentIndex?: number;
  responses?: any[];
  onJumpToQuestion?: (index: number) => void;
}

export function SidePanel({ 
  questions, 
  visible, 
  onClose,
  currentIndex = 0,
  responses = [],
  onJumpToQuestion
}: SidePanelProps) {
  // Determine question status (answered, current, or unanswered)
  const getQuestionStatus = (index: number) => {
    const response = responses.find(r => r.questionId === questions[index].id);
    if (index === currentIndex) return "current";
    return response ? "answered" : "unanswered";
  };

  // Render the status icon based on question status
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "answered":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "current":
        return <AlertCircle className="h-4 w-4 text-primary" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <motion.div 
      className="fixed inset-y-0 right-0 w-72 bg-card border-l shadow-lg z-50 flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: visible ? 0 : "100%" }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="font-medium">Question Navigator</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {questions.map((question, index) => {
            const status = getQuestionStatus(index);
            return (
              <div 
                key={question.id}
                className={`
                  flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-accent transition-colors
                  ${status === "current" ? "bg-primary/10 border-l-2 border-primary" : ""}
                `}
                onClick={() => onJumpToQuestion && onJumpToQuestion(index)}
              >
                <div className="flex-shrink-0">
                  {renderStatusIcon(status)}
                </div>
                <div className="truncate text-sm">
                  <span className="font-medium">Q{index + 1}:</span> {question.text}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-3 w-3 text-primary" />
            <span>Current Question</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 text-muted-foreground" />
            <span>Unanswered</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
