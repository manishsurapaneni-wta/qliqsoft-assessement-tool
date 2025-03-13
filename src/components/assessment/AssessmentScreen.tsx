
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { Question } from "@/utils/types/assessment";
import { AssessmentHeader } from "@/components/assessment/AssessmentHeader";
import { AssessmentFooter } from "@/components/assessment/AssessmentFooter";
import { useAssessment } from "@/hooks/useAssessment";

interface AssessmentScreenProps {
  questions: Question[];
  onToggleSidePanel?: () => void;
  showSidePanel?: boolean;
}

export const AssessmentScreen = ({ 
  questions, 
  onToggleSidePanel,
  showSidePanel
}: AssessmentScreenProps) => {
  const {
    currentQuestionIndex,
    answeredCount,
    totalCount,
    handleResponseChange,
    getCurrentResponse,
    goToNextQuestion,
    goToPreviousQuestion,
    jumpToQuestion,
    saveDraft
  } = useAssessment(questions);

  const toggleSidePanel = () => {
    if (onToggleSidePanel) {
      onToggleSidePanel();
    }
  };

  const handleJumpToQuestion = (index: number) => {
    jumpToQuestion(index);
    if (onToggleSidePanel && showSidePanel) {
      onToggleSidePanel();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 flex-1 flex flex-col">
      <AssessmentHeader 
        onToggleSidePanel={toggleSidePanel}
        showSidePanel={showSidePanel || false}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onSaveDraft={saveDraft}
      />
      
      <div className="flex-1 flex items-start justify-center py-4">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            value={getCurrentResponse()}
            onChange={handleResponseChange}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === questions.length - 1}
          />
        </AnimatePresence>
      </div>
      
      <AssessmentFooter 
        answeredCount={answeredCount}
        totalCount={totalCount}
        currentQuestionIndex={currentQuestionIndex}
        onNext={goToNextQuestion}
        onPrevious={goToPreviousQuestion}
        currentResponseExists={getCurrentResponse() !== undefined}
      />
    </div>
  );
};
