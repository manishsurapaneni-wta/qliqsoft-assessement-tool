
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimeSeriesChart from "./TimeSeriesChart";
import RiskDistributionChart from "./RiskDistributionChart";
import ScoreTrendsChart from "./ScoreTrendsChart";
import DetailedRiskDistribution from "./DetailedRiskDistribution";
import { AssessmentResult } from "@/utils/scoring";

interface ChartTabsProps {
  timeSeriesData: Array<{
    date: string;
    averageScore: number;
    assessments: number;
  }>;
  riskDistributionData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  filteredResults: AssessmentResult[];
  riskLevelCounts: {
    low: number;
    moderate: number;
    high: number;
  };
  averageScore: number;
}

export const ChartTabs = ({
  timeSeriesData,
  riskDistributionData,
  filteredResults,
  riskLevelCounts,
  averageScore
}: ChartTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="trends">Score Trends</TabsTrigger>
        <TabsTrigger value="distribution">Risk Distribution</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TimeSeriesChart 
            data={timeSeriesData}
            title="Assessment Trends"
            description="Average scores and assessment count over time"
          />
          
          <RiskDistributionChart 
            data={riskDistributionData}
            title="Risk Level Distribution"
            description="Patient distribution by risk level"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="trends">
        <ScoreTrendsChart 
          data={timeSeriesData}
          title="Score Trends Over Time"
          description="Detailed view of assessment score trends"
        />
      </TabsContent>
      
      <TabsContent value="distribution">
        <DetailedRiskDistribution 
          data={riskDistributionData}
          riskLevelCounts={riskLevelCounts}
          filteredResults={filteredResults}
          averageScore={averageScore}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChartTabs;
