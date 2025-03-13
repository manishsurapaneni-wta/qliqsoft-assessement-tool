
import { useState } from "react";
import { Form, Question } from "@/components/form-builder/types";
import { questionTemplates } from "@/components/form-builder/questionTemplates";

export function useFormOperations(
  form: Form,
  setForm: React.Dispatch<React.SetStateAction<Form>>
) {
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

  const addSampleQuestion = () => {
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
  };

  return {
    moveQuestion,
    updateQuestion,
    deleteQuestion,
    duplicateQuestion,
    addSampleQuestion
  };
}
