
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
