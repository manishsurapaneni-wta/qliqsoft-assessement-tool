
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { AssessmentResult, ScoreBreakdown } from "@/utils/scoring";
import RecommendationCard from "./RecommendationCard";

interface ResultSummaryProps {
  result: AssessmentResult;
  chartData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const ResultSummary = ({ result, chartData }: ResultSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Results Summary</CardTitle>
        <CardDescription>
          Overview of your assessment results by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Score Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Key Insights</h3>
            <div className="space-y-4">
              {/* Dynamically generated insights based on results */}
              {result.percentageScore >= 70 && (
                <div className="p-3 bg-medical-success/10 rounded-lg">
                  <div className="font-medium flex items-center gap-2 text-medical-success">
                    <CheckCircle className="h-4 w-4" />
                    Overall Health Status
                  </div>
                  <p className="text-sm mt-1">
                    Your overall health indicators are positive, showing good health practices.
                  </p>
                </div>
              )}
              
              {/* Areas of concern (low scoring questions) */}
              {result.breakdown
                .filter(item => (item.score / item.maxPossibleScore) < 0.5)
                .slice(0, 2)
                .map((item, index) => (
                  <div key={index} className="p-3 bg-medical-warning/10 rounded-lg">
                    <div className="font-medium flex items-center gap-2 text-medical-warning">
                      <AlertTriangle className="h-4 w-4" />
                      Potential Concern
                    </div>
                    <p className="text-sm mt-1">
                      {item.questionText}
                    </p>
                  </div>
                ))
              }
              
              {/* Recommendation based on overall score */}
              <RecommendationCard percentageScore={result.percentageScore} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultSummary;
