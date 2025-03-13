
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { AssessmentResult } from "@/utils/scoring";

// Risk level colors
const riskColors = {
  low: "text-medical-success",
  moderate: "text-medical-warning",
  high: "text-medical-danger",
};

const riskBgColors = {
  low: "bg-medical-success/10",
  moderate: "bg-medical-warning/10",
  high: "bg-medical-danger/10",
};

const riskLabels = {
  low: "Low Risk",
  moderate: "Moderate Risk",
  high: "High Risk",
};

const riskIcons: Record<string, ReactNode> = {
  low: <CheckCircle className="h-5 w-5 text-medical-success" />,
  moderate: <AlertTriangle className="h-5 w-5 text-medical-warning" />,
  high: <AlertTriangle className="h-5 w-5 text-medical-danger" />,
};

interface OverallScoreProps {
  result: AssessmentResult;
}

export const OverallScore = ({ result }: OverallScoreProps) => {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <CardTitle>Overall Score</CardTitle>
        <CardDescription>
          Your overall health assessment score based on all responses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="h-36 w-36 relative flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 36 36"
              preserveAspectRatio="xMidYMid meet"
            >
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-secondary"
                strokeWidth="2"
              ></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray={`${(result.percentageScore * 100) / 100} 100`}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {Math.round(result.percentageScore)}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <div 
                className={`${riskBgColors[result.riskLevel]} ${riskColors[result.riskLevel]} px-3 py-1 rounded-full flex items-center space-x-1 text-sm font-medium`}
              >
                {riskIcons[result.riskLevel]}
                <span>{riskLabels[result.riskLevel]}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Score</span>
                  <span>{result.totalScore} / {result.maxPossibleScore}</span>
                </div>
                <Progress
                  value={(result.totalScore / result.maxPossibleScore) * 100}
                  className="h-2"
                />
              </div>
            </div>
            
            <p className="mt-4 text-muted-foreground">
              {result.riskLevel === "low" && "Your assessment indicates a healthy status with low risk factors. Continue your current health practices."}
              {result.riskLevel === "moderate" && "Your assessment indicates some potential health concerns that may need attention. Consider consulting with a healthcare provider."}
              {result.riskLevel === "high" && "Your assessment indicates significant health concerns. We strongly recommend consulting with a healthcare provider soon."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverallScore;
