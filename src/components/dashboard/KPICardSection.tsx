
import { Users, BarChart2, AlertCircle, Activity } from "lucide-react";
import AnalyticsCard from "./AnalyticsCard";
import { AssessmentResult } from "@/utils/scoring";

interface KPICardSectionProps {
  filteredResults: AssessmentResult[];
  averageScore: number;
  timeRange: string;
}

export const KPICardSection = ({
  filteredResults,
  averageScore,
  timeRange,
}: KPICardSectionProps) => {
  // Count risk levels from filtered results
  const riskLevelCounts = {
    low: filteredResults.filter(r => r.riskLevel === "low").length,
    moderate: filteredResults.filter(r => r.riskLevel === "moderate").length,
    high: filteredResults.filter(r => r.riskLevel === "high").length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <AnalyticsCard
        title="Total Assessments"
        value={filteredResults.length}
        icon={<Users />}
        description={`Past ${timeRange} days`}
        delay={0}
      />
      
      <AnalyticsCard
        title="Average Score"
        value={`${Math.round(averageScore)}%`}
        icon={<BarChart2 />}
        trend={{
          value: 5.2,
          isPositive: true
        }}
        delay={1}
      />
      
      <AnalyticsCard
        title="High Risk Patients"
        value={riskLevelCounts.high}
        icon={<AlertCircle />}
        description={`${Math.round((riskLevelCounts.high / filteredResults.length) * 100) || 0}% of total`}
        delay={2}
      />
      
      <AnalyticsCard
        title="Engagement Rate"
        value="92%"
        icon={<Activity />}
        trend={{
          value: 3.1,
          isPositive: true
        }}
        delay={3}
      />
    </div>
  );
};

export default KPICardSection;
