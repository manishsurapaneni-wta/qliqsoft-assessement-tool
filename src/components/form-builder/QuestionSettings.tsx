
import { useState } from "react";
import { Question } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { MultipleChoiceOptions } from "./settings/MultipleChoiceOptions";
import { ScaleSettings } from "./settings/ScaleSettings";
import { ScoringSettings } from "./settings/ScoringSettings";
import { ConditionalLogicSettings } from "./settings/ConditionalLogicSettings";

interface QuestionSettingsProps {
  question: Question;
  updateQuestion: (question: Question) => void;
}

export function QuestionSettings({ question, updateQuestion }: QuestionSettingsProps) {
  const [activeTab, setActiveTab] = useState("options");
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="options">Options</TabsTrigger>
        <TabsTrigger value="scoring">Scoring & Logic</TabsTrigger>
      </TabsList>
      
      <TabsContent value="options" className="space-y-4">
        {question.type === "multiple_choice" && (
          <MultipleChoiceOptions 
            question={question} 
            updateQuestion={updateQuestion} 
          />
        )}
        
        {question.type === "scale" && (
          <ScaleSettings 
            question={question} 
            updateQuestion={updateQuestion} 
          />
        )}
      </TabsContent>
      
      <TabsContent value="scoring" className="space-y-6">
        {/* Scoring Section */}
        <ScoringSettings question={question} updateQuestion={updateQuestion} />
        
        <Separator />
        
        {/* Conditional Logic Section */}
        <ConditionalLogicSettings question={question} updateQuestion={updateQuestion} />
      </TabsContent>
    </Tabs>
  );
}
