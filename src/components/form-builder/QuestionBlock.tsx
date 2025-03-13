
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Question } from "./types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QuestionBlockHeader } from "./QuestionBlockHeader";
import { QuestionBlockContent } from "./QuestionBlockContent";

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

  return (
    <Card
      ref={ref}
      data-handler-id={handlerId}
      className={`border transition-opacity ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <CardHeader className="p-0">
        <QuestionBlockHeader
          question={question}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          duplicateQuestion={duplicateQuestion}
        />
      </CardHeader>
      
      <CardContent className="p-0">
        <QuestionBlockContent
          question={question}
          updateQuestion={updateQuestion}
        />
      </CardContent>
    </Card>
  );
}
