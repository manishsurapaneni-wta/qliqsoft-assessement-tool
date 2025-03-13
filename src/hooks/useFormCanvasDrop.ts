
import { useDrop } from "react-dnd";
import { Form, Question } from "@/components/form-builder/types";
import { questionTemplates } from "@/components/form-builder/questionTemplates";

export function useFormCanvasDrop(
  setForm: React.Dispatch<React.SetStateAction<Form>>
) {
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

  return { isOver, drop };
}
