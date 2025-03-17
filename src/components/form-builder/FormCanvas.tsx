
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "./types";
import { useFormCanvasDrop } from "@/hooks/useFormCanvasDrop";
import { useFormOperations } from "@/hooks/useFormOperations";
import { EmptyCanvasState } from "./EmptyCanvasState";
import { QuestionsContainer } from "./QuestionsContainer";

interface FormCanvasProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}

export function FormCanvas({ form, setForm }: FormCanvasProps) {
  const { isOver, drop } = useFormCanvasDrop(setForm);
  const { 
    moveQuestion, 
    updateQuestion, 
    deleteQuestion, 
    duplicateQuestion,
    addSampleQuestion
  } = useFormOperations(form, setForm);

  return (
    <Card 
      ref={drop} 
      className={`min-h-[600px] ${isOver ? 'bg-accent/20 border-2 border-dashed border-primary' : ''}`}
    >
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>
        <CardDescription>{form.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {form.questions.length === 0 ? (
          <EmptyCanvasState onAddSampleQuestion={addSampleQuestion} />
        ) : (
          <QuestionsContainer
            questions={form.questions}
            allQuestions={form.questions}
            moveQuestion={moveQuestion}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
            duplicateQuestion={duplicateQuestion}
          />
        )}
      </CardContent>
    </Card>
  );
}
