
import { TrendingUp } from "lucide-react";
import { AssessmentResult } from "@/utils/scoring";

interface RiskInsightsPanelProps {
  riskLevelCounts: {
    low: number;
    moderate: number;
    high: number;
  };
  filteredResults: AssessmentResult[];
  averageScore: number;
}

export const RiskInsightsPanel = ({
  riskLevelCounts,
  filteredResults,
  averageScore
}: RiskInsightsPanelProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Key Insights</h3>
      
      <div className="p-4 bg-medical-success/10 rounded-lg">
        <div className="font-medium text-medical-success">Low Risk Patients</div>
        <p className="text-sm mt-1">
          {riskLevelCounts.low} patients ({Math.round((riskLevelCounts.low / filteredResults.length) * 100) || 0}%) 
          show low risk factors. Regular monitoring recommended.
        </p>
      </div>
      
      <div className="p-4 bg-medical-warning/10 rounded-lg">
        <div className="font-medium text-medical-warning">Moderate Risk Patients</div>
        <p className="text-sm mt-1">
          {riskLevelCounts.moderate} patients ({Math.round((riskLevelCounts.moderate / filteredResults.length) * 100) || 0}%) 
          show moderate risk factors. Follow-up consultations advised.
        </p>
      </div>
      
      <div className="p-4 bg-medical-danger/10 rounded-lg">
        <div className="font-medium text-medical-danger">High Risk Patients</div>
        <p className="text-sm mt-1">
          {riskLevelCounts.high} patients ({Math.round((riskLevelCounts.high / filteredResults.length) * 100) || 0}%) 
          show high risk factors. Immediate intervention recommended.
        </p>
      </div>
      
      <div className="p-4 bg-primary/5 rounded-lg">
        <div className="font-medium text-primary flex items-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          Trend Analysis
        </div>
        <p className="text-sm mt-1">
          {averageScore > 60 
            ? "Overall positive health trends observed in the patient population." 
            : "Some concerning health trends observed. Consider preventive programs."}
        </p>
      </div>
    </div>
  );
};

export default RiskInsightsPanel;
