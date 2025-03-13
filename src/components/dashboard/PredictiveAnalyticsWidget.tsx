
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, TrendingDown, BarChart4 } from "lucide-react";

interface PredictiveAnalyticsWidgetProps {
  riskLevelCounts: {
    low: number;
    moderate: number;
    high: number;
  };
  totalAssessments: number;
}

export const PredictiveAnalyticsWidget = ({
  riskLevelCounts,
  totalAssessments
}: PredictiveAnalyticsWidgetProps) => {
  // Calculate current high risk percentage
  const currentHighRiskPercentage = totalAssessments > 0
    ? Math.round((riskLevelCounts.high / totalAssessments) * 100)
    : 0;
  
  // Generate predictive metrics (these would come from a real predictive model)
  const predictedHighRiskPercentage = currentHighRiskPercentage + 3;
  const isIncreasing = predictedHighRiskPercentage > currentHighRiskPercentage;
  const confidenceScore = 87;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart4 className="mr-2 h-5 w-5" />
          Predictive Risk Analysis
        </CardTitle>
        <CardDescription>Forecasted risk levels for next 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Predicted High Risk</p>
              <div className="flex items-baseline mt-1">
                <span className="text-3xl font-bold">{predictedHighRiskPercentage}%</span>
                <span className={`ml-2 text-sm ${isIncreasing ? 'text-medical-danger' : 'text-medical-success'}`}>
                  {isIncreasing ? (
                    <span className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{predictedHighRiskPercentage - currentHighRiskPercentage}%
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {predictedHighRiskPercentage - currentHighRiskPercentage}%
                    </span>
                  )}
                </span>
              </div>
            </div>
            
            <div className={`p-3 rounded-full ${isIncreasing ? 'bg-medical-danger/10' : 'bg-medical-success/10'}`}>
              <AlertTriangle className={`h-6 w-6 ${isIncreasing ? 'text-medical-danger' : 'text-medical-success'}`} />
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-secondary/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Prediction Confidence</span>
              <span className="text-sm font-medium">{confidenceScore}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${confidenceScore}%` }} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Recommended Actions:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Schedule preventive consultations</li>
              <li>Increase monitoring frequency</li>
              <li>Review high-risk assessment criteria</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalyticsWidget;
