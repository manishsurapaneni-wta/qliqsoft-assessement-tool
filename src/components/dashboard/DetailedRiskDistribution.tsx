
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RiskInsightsPanel from "./RiskInsightsPanel";
import { AssessmentResult } from "@/utils/scoring";

interface RiskDistributionItem {
  name: string;
  value: number;
  color: string;
}

interface DetailedRiskDistributionProps {
  data: RiskDistributionItem[];
  riskLevelCounts: {
    low: number;
    moderate: number;
    high: number;
  };
  filteredResults: AssessmentResult[];
  averageScore: number;
}

export const DetailedRiskDistribution = ({
  data,
  riskLevelCounts,
  filteredResults,
  averageScore
}: DetailedRiskDistributionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Risk Distribution</CardTitle>
        <CardDescription>
          Detailed analysis of risk levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <RiskInsightsPanel 
            riskLevelCounts={riskLevelCounts}
            filteredResults={filteredResults}
            averageScore={averageScore}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedRiskDistribution;
