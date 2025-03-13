
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
    text: "How often do you engage in moderate to intense physical activity?",
    type: "multiple_choice",
    options: [
      { value: "daily", label: "Daily", score: 10 },
      { value: "weekly", label: "3-5 times per week", score: 8 },
      { value: "occasional", label: "1-2 times per week", score: 5 },
      { value: "rarely", label: "Rarely or never", score: 0 },
    ],
  },
  {
    id: "q5",
    text: "How would you rate your stress level in the past month?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q6",
    text: "Have you been diagnosed with any chronic conditions?",
    type: "boolean",
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
    text: "On average, how many hours of sleep do you get per night?",
    type: "multiple_choice",
    options: [
      { value: "lt5", label: "Less than 5 hours", score: 0 },
      { value: "5to6", label: "5-6 hours", score: 3 },
      { value: "7to8", label: "7-8 hours", score: 10 },
      { value: "gt8", label: "More than 8 hours", score: 8 },
    ],
  },
  {
    id: "q9",
    text: "How often do you experience difficulty concentrating?",
    type: "multiple_choice",
    options: [
      { value: "never", label: "Never", score: 10 },
      { value: "sometimes", label: "Sometimes", score: 7 },
      { value: "often", label: "Often", score: 3 },
      { value: "always", label: "Always", score: 0 },
    ],
  },
  {
    id: "q10",
    text: "Do you have a family history of heart disease?",
    type: "boolean",
  },
  {
    id: "q11",
    text: "How would you rate your energy levels throughout the day?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q12",
    text: "How often do you feel anxious or worried?",
    type: "multiple_choice",
    options: [
      { value: "never", label: "Never", score: 10 },
      { value: "rarely", label: "Rarely", score: 8 },
      { value: "sometimes", label: "Sometimes", score: 5 },
      { value: "often", label: "Often", score: 2 },
      { value: "always", label: "Always", score: 0 },
    ],
  },
  {
    id: "q13",
    text: "Do you regularly take any medications?",
    type: "boolean",
  },
  {
    id: "q14",
    text: "How would you rate your mental health?",
    type: "multiple_choice",
    options: [
      { value: "excellent", label: "Excellent", score: 10 },
      { value: "good", label: "Good", score: 8 },
      { value: "fair", label: "Fair", score: 5 },
      { value: "poor", label: "Poor", score: 2 },
    ],
  },
  {
    id: "q15",
    text: "On a scale of 0-10, how satisfied are you with your social relationships?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q16",
    text: "Do you consume alcohol regularly?",
    type: "boolean",
  },
  {
    id: "q17",
    text: "How often do you eat processed foods?",
    type: "multiple_choice",
    options: [
      { value: "never", label: "Never", score: 10 },
      { value: "rarely", label: "Rarely", score: 8 },
      { value: "sometimes", label: "Sometimes", score: 5 },
      { value: "often", label: "Often", score: 2 },
      { value: "always", label: "Always", score: 0 },
    ],
  },
  {
    id: "q18",
    text: "How satisfied are you with your work-life balance?",
    type: "scale",
    minValue: 0,
    maxValue: 10,
  },
  {
    id: "q19",
    text: "Have you experienced significant weight changes in the past 6 months?",
    type: "boolean",
  },
  {
    id: "q20",
    text: "How would you rate your overall quality of life?",
    type: "multiple_choice",
    options: [
      { value: "excellent", label: "Excellent", score: 10 },
      { value: "good", label: "Good", score: 8 },
      { value: "fair", label: "Fair", score: 5 },
      { value: "poor", label: "Poor", score: 2 },
    ],
  },
];
