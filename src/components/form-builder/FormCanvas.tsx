
import { useDrop } from "react-dnd";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, Question } from "./types";
import { QuestionBlock } from "./QuestionBlock";
import { questionTemplates } from "./questionTemplates";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface FormCanvasProps {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
}

export function FormCanvas({ form, setForm }: FormCanvasProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "QUESTION_TYPE",
    drop: (item: { templateType: string }, monitor) => {
      const template = questionTemplates.find((t) => t.type === item.templateType);
      if (template) {
        const newQuestion: Question = {
          id: crypto.randomUUID(),
          ...template.createDefault(),
        };
        
        setForm((prev) => ({
          ...prev,
          questions: [...prev.questions, newQuestion],
        }));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    const newQuestions = [...form.questions];
    const draggedQuestion = newQuestions[dragIndex];
    
    // Remove the question from its original position
    newQuestions.splice(dragIndex, 1);
    
    // Insert the question at the new position
    newQuestions.splice(hoverIndex, 0, draggedQuestion);
    
    setForm((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    }));
  };

  const deleteQuestion = (questionId: string) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = form.questions.find((q) => q.id === questionId);
    if (questionToDuplicate) {
      const duplicatedQuestion: Question = {
        ...questionToDuplicate,
        id: crypto.randomUUID(),
        text: `${questionToDuplicate.text} (Copy)`,
      };
      
      setForm((prev) => ({
        ...prev,
        questions: [...prev.questions, duplicatedQuestion],
      }));
    }
  };

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
          <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center">
            <div className="text-muted-foreground mb-2">
              <PlusCircle className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-medium">Start Building Your Form</h3>
            <p className="text-muted-foreground max-w-md">
              Drag question types from the palette on the left onto this canvas to start building your form. 
            </p>
            <Button variant="outline" onClick={() => {
              const template = questionTemplates.find((t) => t.type === "multiple_choice");
              if (template) {
                const newQuestion: Question = {
                  id: crypto.randomUUID(),
                  ...template.createDefault(),
                };
                
                setForm((prev) => ({
                  ...prev,
                  questions: [...prev.questions, newQuestion],
                }));
              }
            }}>
              Add a sample question
            </Button>
          </div>
        ) : (
          form.questions.map((question, index) => (
            <QuestionBlock 
              key={question.id}
              question={question}
              index={index}
              moveQuestion={moveQuestion}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
              duplicateQuestion={duplicateQuestion}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
