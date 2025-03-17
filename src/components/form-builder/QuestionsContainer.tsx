
import { Question } from "./types";
import { QuestionBlock } from "./QuestionBlock";

interface QuestionsContainerProps {
  questions: Question[];
  allQuestions: Question[];
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
}

export function QuestionsContainer({
  questions,
  allQuestions,
  moveQuestion,
  updateQuestion,
  deleteQuestion,
  duplicateQuestion,
}: QuestionsContainerProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionBlock
          key={question.id}
          question={question}
          index={index}
          allQuestions={allQuestions}
          moveQuestion={moveQuestion}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          duplicateQuestion={duplicateQuestion}
        />
      ))}
    </div>
  );
}
