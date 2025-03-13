
import { QuestionTemplate } from "./types";

export const questionTemplates: QuestionTemplate[] = [
  {
    type: "multiple_choice",
    icon: "list-checks",
    label: "Multiple Choice",
    description: "Select one option from a list",
    createDefault: () => ({
      type: "multiple_choice",
      text: "Enter your question text",
      required: true,
      options: [
        { id: crypto.randomUUID(), value: "option1", label: "Option 1", score: 1 },
        { id: crypto.randomUUID(), value: "option2", label: "Option 2", score: 2 },
        { id: crypto.randomUUID(), value: "option3", label: "Option 3", score: 3 },
      ],
      scoring: {
        enabled: true,
        weight: 1,
      },
      conditionalLogic: {
        enabled: false,
        conditions: [],
      },
    }),
  },
  {
    type: "scale",
    icon: "sliders",
    label: "Scale",
    description: "Numeric rating scale",
    createDefault: () => ({
      type: "scale",
      text: "Rate on a scale",
      required: true,
      minValue: 0,
      maxValue: 10,
      scoring: {
        enabled: true,
        weight: 1,
      },
      conditionalLogic: {
        enabled: false,
        conditions: [],
      },
    }),
  },
  {
    type: "boolean",
    icon: "toggle-left",
    label: "Yes/No",
    description: "Simple yes or no question",
    createDefault: () => ({
      type: "boolean",
      text: "Yes or no question",
      required: true,
      options: [
        { id: crypto.randomUUID(), value: "true", label: "Yes", score: 1 },
        { id: crypto.randomUUID(), value: "false", label: "No", score: 0 },
      ],
      scoring: {
        enabled: true,
        weight: 1,
      },
      conditionalLogic: {
        enabled: false,
        conditions: [],
      },
    }),
  },
  {
    type: "text",
    icon: "type",
    label: "Text Input",
    description: "Free text response",
    createDefault: () => ({
      type: "text",
      text: "Enter your question text",
      required: false,
      scoring: {
        enabled: false,
        weight: 0,
      },
      conditionalLogic: {
        enabled: false,
        conditions: [],
      },
    }),
  },
  {
    type: "date",
    icon: "calendar-days",
    label: "Date Picker",
    description: "Select a date",
    createDefault: () => ({
      type: "date",
      text: "Select a date",
      required: false,
      scoring: {
        enabled: false,
        weight: 0,
      },
      conditionalLogic: {
        enabled: false,
        conditions: [],
      },
    }),
  },
  {
    type: "heading",
    icon: "heading",
    label: "Section Heading",
    description: "Add a section title or description",
    createDefault: () => ({
      type: "heading",
      text: "Section Heading",
      required: false,
      description: "Add a description for this section",
      scoring: {
        enabled: false,
        weight: 0,
      },
      conditionalLogic: {
        enabled: false,
        conditions: [],
      },
    }),
  },
];
