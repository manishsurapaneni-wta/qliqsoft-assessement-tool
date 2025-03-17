
export function getOperatorOptions(questionType: string) {
  switch (questionType) {
    case "multiple_choice":
    case "boolean":
    case "text":
    case "date":
      return [
        { value: "equals", label: "Equals" },
        { value: "not_equals", label: "Does not equal" },
      ];
    case "scale":
      return [
        { value: "equals", label: "Equals" },
        { value: "not_equals", label: "Does not equal" },
        { value: "greater_than", label: "Greater than" },
        { value: "less_than", label: "Less than" },
      ];
    default:
      return [{ value: "equals", label: "Equals" }];
  }
}
