
import { Question } from "../types";
import { ConditionalToggle } from "./conditional-logic/ConditionalToggle";
import { ShowWhenSelector } from "./conditional-logic/ShowWhenSelector";
import { ConditionsContainer } from "./conditional-logic/ConditionsContainer";
import { ConditionPreview } from "./conditional-logic/ConditionPreview";
import { useConditionalLogic } from "@/hooks/useConditionalLogic";

interface ConditionalLogicSettingsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
  allQuestions: Question[];
}

export function ConditionalLogicSettings({ 
  question, 
  updateQuestion, 
  allQuestions 
}: ConditionalLogicSettingsProps) {
  const {
    availableParentQuestions,
    handleConditionalLogicToggle,
    handleShowWhenChange,
    addCondition,
    removeCondition,
    updateCondition
  } = useConditionalLogic({
    question,
    updateQuestion,
    allQuestions
  });

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
