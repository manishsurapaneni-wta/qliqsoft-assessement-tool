
import { Question, Condition } from "../types";
import { ConditionalToggle } from "./conditional-logic/ConditionalToggle";
import { ShowWhenSelector } from "./conditional-logic/ShowWhenSelector";
import { ConditionsContainer } from "./conditional-logic/ConditionsContainer";
import { ConditionPreview } from "./conditional-logic/ConditionPreview";

interface ConditionalLogicSettingsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
  allQuestions: Question[];
}

export function ConditionalLogicSettings({ question, updateQuestion, allQuestions }: ConditionalLogicSettingsProps) {
  // Filter out the current question and any heading type questions as potential parent questions
  const availableParentQuestions = allQuestions.filter(q => 
    q.id !== question.id && 
    q.type !== "heading" && 
    !q.parentQuestionIds?.includes(question.id)
  );

  const handleConditionalLogicToggle = (enabled: boolean) => {
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic || { conditions: [], showWhen: "all" },
        enabled,
      },
    });
  };

  const handleShowWhenChange = (showWhen: "all" | "any") => {
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic || { conditions: [], enabled: true },
        showWhen,
      },
    });
  };

  const addCondition = () => {
    if (availableParentQuestions.length === 0) return;
    
    const parentQuestion = availableParentQuestions[0];
    let defaultValue: string | number = "";
    
    // Set a default value based on the parent question type
    if (parentQuestion.type === "multiple_choice" || parentQuestion.type === "boolean") {
      defaultValue = parentQuestion.options?.[0]?.value || "";
    } else if (parentQuestion.type === "scale") {
      defaultValue = parentQuestion.minValue || 0;
    }
    
    const newCondition: Condition = {
      questionId: parentQuestion.id,
      operator: "equals",
      value: defaultValue,
      questionText: parentQuestion.text,
    };
    
    // Add the condition and update parent relationship
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic || { showWhen: "all", enabled: true },
        enabled: true,
        conditions: [...(question.conditionalLogic?.conditions || []), newCondition],
      },
      parentQuestionIds: [...(question.parentQuestionIds || []), parentQuestion.id],
    });
  };

  const removeCondition = (index: number) => {
    const updatedConditions = [...(question.conditionalLogic?.conditions || [])];
    const removedCondition = updatedConditions[index];
    updatedConditions.splice(index, 1);
    
    // Also update the parentQuestionIds array
    const updatedParentIds = question.parentQuestionIds?.filter(id => id !== removedCondition.questionId) || [];
    
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic!,
        conditions: updatedConditions,
      },
      parentQuestionIds: updatedParentIds,
    });
  };

  const updateCondition = (index: number, updatedCondition: Condition) => {
    const updatedConditions = [...(question.conditionalLogic?.conditions || [])];
    
    // If the question ID has changed, update the parentQuestionIds array
    if (updatedCondition.questionId !== updatedConditions[index].questionId) {
      const oldParentId = updatedConditions[index].questionId;
      const updatedParentIds = question.parentQuestionIds?.filter(id => id !== oldParentId) || [];
      updatedParentIds.push(updatedCondition.questionId);
      
      // Update parent question text
      const parentQuestion = allQuestions.find(q => q.id === updatedCondition.questionId);
      if (parentQuestion) {
        updatedCondition.questionText = parentQuestion.text;
      }
      
      updateQuestion({
        ...question,
        parentQuestionIds: updatedParentIds,
      });
    }
    
    updatedConditions[index] = updatedCondition;
    
    updateQuestion({
      ...question,
      conditionalLogic: {
        ...question.conditionalLogic!,
        conditions: updatedConditions,
      },
    });
  };

  return (
    <div className="space-y-4">
      <ConditionalToggle 
        question={question} 
        onToggleChange={handleConditionalLogicToggle} 
      />
      
      {question.conditionalLogic?.enabled && (
        <div className="space-y-4">
          <ShowWhenSelector 
            question={question}
            onShowWhenChange={handleShowWhenChange}
          />
          
          <ConditionsContainer
            question={question}
            allQuestions={allQuestions}
            availableParentQuestions={availableParentQuestions}
            conditions={question.conditionalLogic?.conditions || []}
            updateCondition={updateCondition}
            removeCondition={removeCondition}
            addCondition={addCondition}
          />
          
          <ConditionPreview 
            question={question}
            allQuestions={allQuestions}
          />
        </div>
      )}
    </div>
  );
}
