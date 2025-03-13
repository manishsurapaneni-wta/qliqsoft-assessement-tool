
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
  };
}

export interface Condition {
  questionId: string;
  operator: "equals" | "not_equals" | "greater_than" | "less_than";
  value: string | number;
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
