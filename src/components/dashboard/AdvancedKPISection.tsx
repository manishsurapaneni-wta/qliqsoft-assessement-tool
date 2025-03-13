
import { Clock, CheckCircle, PieChart } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import { AssessmentResult } from "@/utils/types/assessment";

interface AdvancedKPIProps {
  completionRate: number;
  avgTimeToComplete: string;
  riskLevelCounts: {
    low: number;
    moderate: number;
    high: number;
  };
  filteredResults: AssessmentResult[];
}

export const AdvancedKPISection = ({
  completionRate,
  avgTimeToComplete,
  riskLevelCounts,
  filteredResults
}: AdvancedKPIProps) => {
  // Calculate percentage of high risk patients
  const highRiskPercentage = filteredResults.length > 0
    ? Math.round((riskLevelCounts.high / filteredResults.length) * 100)
    : 0;
  
  // Calculate completion trend (dummy data, would be calculated from real data)
  const completionTrend = {
    value: 3.2,
    isPositive: true
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AnalyticsCard
        title="Completion Rate"
        value={`${completionRate}%`}
        icon={<CheckCircle />}
        trend={completionTrend}
        description="Initiated vs completed forms"
        delay={0}
      />
      
      <AnalyticsCard
        title="Time to Complete"
        value={avgTimeToComplete}
        icon={<Clock />}
        description="Average completion time"
        delay={1}
      />
      
      <AnalyticsCard
        title="Risk Distribution"
        value={`${highRiskPercentage}%`}
        description="High Risk Patients"
        icon={<PieChart />}
        trend={{
          value: highRiskPercentage > 30 ? 2.5 : 1.2,
          isPositive: highRiskPercentage <= 30
        }}
        delay={2}
      />
    </div>
  );
};

export default AdvancedKPISection;
