
import { Question, Form } from "./types";
import { QuestionBlock } from "./QuestionBlock";

interface QuestionsContainerProps {
  questions: Question[];
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
  updateQuestion: (updatedQuestion: Question) => void;
  deleteQuestion: (questionId: string) => void;
  duplicateQuestion: (questionId: string) => void;
}

export function QuestionsContainer({ 
  questions, 
  moveQuestion, 
  updateQuestion, 
  deleteQuestion, 
  duplicateQuestion 
}: QuestionsContainerProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionBlock 
          key={question.id}
          question={question}
          index={index}
          moveQuestion={moveQuestion}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          duplicateQuestion={duplicateQuestion}
        />
      ))}
    </div>
  );
}
