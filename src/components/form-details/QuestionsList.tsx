
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Question } from "@/components/form-builder/types";
import { QuestionTypeIcon } from "./QuestionTypeIcon";

interface QuestionsListProps {
  questions: Question[];
}

export function QuestionsList({ questions }: QuestionsListProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Assessment Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {questions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No questions have been added to this form yet.</p>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-2">
            {questions.map((question, index) => (
              <QuestionItem 
                key={question.id} 
                question={question} 
                index={index} 
              />
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

interface QuestionItemProps {
  question: Question;
  index: number;
}

function QuestionItem({ question, index }: QuestionItemProps) {
  return (
    <AccordionItem 
      value={question.id} 
      className="border rounded-lg overflow-hidden" 
      id={`question-${question.id}`}
    >
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-accent/50">
        <div className="flex items-center gap-3 text-left">
          <Badge variant="outline" className="rounded-full w-6 h-6 p-0 flex items-center justify-center">
            {index + 1}
          </Badge>
          <QuestionTypeIcon type={question.type} />
          <span className="font-medium">{question.text}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 py-3 border-t bg-card">
        <div className="space-y-4">
          {/* Question Type */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Question Type</h3>
            <p className="mt-1 capitalize">{question.type.replace('_', ' ')}</p>
          </div>
          
          {/* Description if available */}
          {question.description && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{question.description}</p>
            </div>
          )}
          
          {/* Required */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Required</h3>
            <p className="mt-1">{question.required ? "Yes" : "No"}</p>
          </div>
          
          {/* Options for multiple choice */}
          {question.options && question.options.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Options</h3>
              <div className="mt-2 space-y-2">
                {question.options.map((option) => (
                  <div key={option.id} className="flex justify-between border-b pb-2">
                    <span>{option.label}</span>
                    {option.score !== undefined && (
                      <Badge variant="secondary">Score: {option.score}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Scale details */}
          {question.type === "scale" && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Scale Range</h3>
              <p className="mt-1">
                {question.minValue || 0} to {question.maxValue || 10}
              </p>
            </div>
          )}
          
          {/* Scoring */}
          {question.scoring && question.scoring.enabled && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Scoring</h3>
              <Badge className="mt-1" variant="outline">
                Weight: {question.scoring.weight}
              </Badge>
            </div>
          )}
          
          {/* Conditional Logic */}
          {question.conditionalLogic && question.conditionalLogic.enabled && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Conditional Logic</h3>
              <div className="mt-2 text-sm border rounded-md p-3 bg-muted/50">
                {question.conditionalLogic.conditions.length === 0 ? (
                  <p>No conditions specified</p>
                ) : (
                  <div className="space-y-2">
                    {question.conditionalLogic.conditions.map((condition, i) => (
                      <div key={i}>
                        <p>
                          Question {condition.questionId} {condition.operator} {condition.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
