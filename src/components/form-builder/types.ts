
export type QuestionType = 
  | "multiple_choice" 
  | "scale" 
  | "boolean" 
  | "text" 
  | "date" 
  | "heading";

export interface Option {
  id: string;
  value: string;
  label: string;
  score?: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  description?: string;
  required: boolean;
  options?: Option[];
  minValue?: number;
  maxValue?: number;
  scoring?: {
    enabled: boolean;
    weight: number;
  };
  conditionalLogic?: {
    enabled: boolean;
    conditions: Condition[];
    showWhen: "all" | "any"; // Show question when all conditions match or any condition matches
  };
  parentQuestionIds?: string[]; // IDs of questions that this question depends on
}

export interface Condition {
  questionId: string;
  operator: "equals" | "not_equals" | "greater_than" | "less_than" | "contains";
  value: string | number;
  questionText?: string; // To display in the UI
}

export type FormStatus = "draft" | "published" | "archived";

export interface Form {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  status: FormStatus;
  createdAt: string;
  publishedAt?: string;
}

export interface QuestionTemplate {
  type: QuestionType;
  icon: string;
  label: string;
  description: string;
  createDefault: () => Omit<Question, "id">;
}
