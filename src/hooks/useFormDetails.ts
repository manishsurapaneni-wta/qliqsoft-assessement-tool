
import { useState, useEffect } from "react";
import { Form } from "@/components/form-builder/types";

// Simulated form details fetch (would normally be an API call)
export function useFormDetails(formId?: string) {
  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!formId) {
      setError(new Error("Form ID is required"));
      setIsLoading(false);
      return;
    }

    // Simulate API call
    const fetchForm = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be a fetch call to an API
        await new Promise(resolve => setTimeout(resolve, 800)); // Fake delay
        
        // Sample form data (in a real app, this would come from the API)
        const mockForm: Form = {
          id: formId,
          title: "Sample Assessment Form",
          description: "This is a detailed risk assessment questionnaire designed to evaluate potential health risks.",
          questions: [
            {
              id: "q1",
              type: "multiple_choice",
              text: "How would you rate your current stress level?",
              description: "Consider your overall stress in work and personal life",
              required: true,
              options: [
                { id: "opt1", value: "low", label: "Low", score: 1 },
                { id: "opt2", value: "moderate", label: "Moderate", score: 2 },
                { id: "opt3", value: "high", label: "High", score: 3 },
                { id: "opt4", value: "severe", label: "Severe", score: 4 }
              ],
              scoring: {
                enabled: true,
                weight: 2
              },
              conditionalLogic: {
                enabled: false,
                conditions: [],
                showWhen: "all" // Adding the missing property
              }
            },
            {
              id: "q2",
              type: "scale",
              text: "On a scale of 0-10, how would you rate your sleep quality?",
              description: "0 being very poor, 10 being excellent",
              required: true,
              minValue: 0,
              maxValue: 10,
              scoring: {
                enabled: true,
                weight: 1.5
              },
              conditionalLogic: {
                enabled: false,
                conditions: [],
                showWhen: "all" // Adding the missing property
              }
            },
            {
              id: "q3",
              type: "boolean",
              text: "Do you exercise regularly (3+ times per week)?",
              required: true,
              options: [
                { id: "yes", value: "true", label: "Yes", score: 0 },
                { id: "no", value: "false", label: "No", score: 2 }
              ],
              scoring: {
                enabled: true,
                weight: 1
              },
              conditionalLogic: {
                enabled: false,
                conditions: [],
                showWhen: "all" // Adding the missing property
              }
            },
            {
              id: "q4",
              type: "heading",
              text: "Diet and Nutrition",
              description: "The following questions are about your eating habits",
              required: false,
              scoring: {
                enabled: false,
                weight: 0
              },
              conditionalLogic: {
                enabled: false,
                conditions: [],
                showWhen: "all" // Adding the missing property
              }
            },
            {
              id: "q5",
              type: "multiple_choice",
              text: "How many servings of fruits and vegetables do you consume daily?",
              required: true,
              options: [
                { id: "opt1", value: "none", label: "None", score: 3 },
                { id: "opt2", value: "1-2", label: "1-2 servings", score: 2 },
                { id: "opt3", value: "3-4", label: "3-4 servings", score: 1 },
                { id: "opt4", value: "5+", label: "5+ servings", score: 0 }
              ],
              scoring: {
                enabled: true,
                weight: 1
              },
              conditionalLogic: {
                enabled: false,
                conditions: [],
                showWhen: "all" // Adding the missing property
              }
            }
          ],
          status: "published",
          createdAt: "2023-09-15T14:30:00Z",
          publishedAt: "2023-09-20T09:15:00Z"
        };
        
        setForm(mockForm);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  return { form, isLoading, error };
}
