
import { ScoreBreakdown } from "./scoring";

export const prepareChartData = (breakdown: ScoreBreakdown[]) => {
  // Group by score ranges
  const ranges = [
    { name: "High Score (8-10)", value: 0, color: "#10B981" },
    { name: "Medium Score (5-7)", value: 0, color: "#F59E0B" },
    { name: "Low Score (0-4)", value: 0, color: "#EF4444" },
  ];
  
  breakdown.forEach((item) => {
    const normalized = (item.score / item.maxPossibleScore) * 10;
    
    if (normalized >= 8) {
      ranges[0].value += 1;
    } else if (normalized >= 5) {
      ranges[1].value += 1;
    } else {
      ranges[2].value += 1;
    }
  });
  
  return ranges.filter((range) => range.value > 0);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

// Risk level styling helpers
export const riskColors = {
  low: "text-medical-success",
  moderate: "text-medical-warning",
  high: "text-medical-danger",
};

export const riskBgColors = {
  low: "bg-medical-success/10",
  moderate: "bg-medical-warning/10",
  high: "bg-medical-danger/10",
};

export const riskLabels = {
  low: "Low Risk",
  moderate: "Moderate Risk",
  high: "High Risk",
};

export const getRiskRecommendation = (percentageScore: number): string => {
  if (percentageScore >= 70) {
    return "Maintain your current health practices and schedule regular check-ups.";
  } else if (percentageScore >= 40) {
    return "Consider discussing these results with a healthcare provider during your next visit.";
  } else {
    return "We recommend consulting with a healthcare provider to discuss these results soon.";
  }
};
