
import { Question } from "../types/assessment";

// Sample questions for the assessment
export const sampleQuestions: Question[] = [
  {
    id: "q1",
    text: "How would you rate your overall physical health?",
    type: "multiple_choice",
    options: [
      { value: "excellent", label: "Excellent", score: 10 },
      { value: "good", label: "Good", score: 8 },
      { value: "fair", label: "Fair", score: 5 },
      { value: "poor", label: "Poor", score: 2 },
    ],
  },
  {
    id: "q2",
    text: "On a scale of 0-10, how severe is your pain?",
    description: "0 means no pain, 10 means worst possible pain",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q3",
    text: "Do you smoke or use tobacco products?",
    type: "boolean",
  },
  {
    id: "q4",
    text: "Please describe any allergies or adverse reactions to medications you've experienced:",
    type: "text",
  },
  {
    id: "q5",
    text: "When was your last physical examination?",
    type: "date",
  },
  {
    id: "q6",
    text: "How would you rate your stress level in the past month?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q7",
    text: "How would you rate your diet?",
    type: "multiple_choice",
    options: [
      { value: "excellent", label: "Very healthy", score: 10 },
      { value: "good", label: "Mostly healthy", score: 7 },
      { value: "fair", label: "Somewhat healthy", score: 4 },
      { value: "poor", label: "Unhealthy", score: 1 },
    ],
  },
  {
    id: "q8",
    text: "Do you have a family history of heart disease?",
    type: "boolean",
  },
  {
    id: "q9",
    text: "List any medications you're currently taking:",
    type: "text",
  },
  {
    id: "q10",
    text: "When did you first notice your current symptoms?",
    type: "date",
  },
];
