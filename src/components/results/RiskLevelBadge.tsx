
import { CheckCircle, AlertTriangle } from "lucide-react";
import { riskColors, riskBgColors, riskLabels } from "@/utils/charts";

// Risk level icons
const riskIcons = {
  low: <CheckCircle className="h-5 w-5 text-medical-success" />,
  moderate: <AlertTriangle className="h-5 w-5 text-medical-warning" />,
  high: <AlertTriangle className="h-5 w-5 text-medical-danger" />,
};

interface RiskLevelBadgeProps {
  riskLevel: "low" | "moderate" | "high";
}

export const RiskLevelBadge = ({ riskLevel }: RiskLevelBadgeProps) => {
  return (
    <div 
      className={`${riskBgColors[riskLevel]} ${riskColors[riskLevel]} px-3 py-1 rounded-full flex items-center space-x-1 text-sm font-medium`}
    >
      {riskIcons[riskLevel]}
      <span>{riskLabels[riskLevel]}</span>
    </div>
  );
};

export default RiskLevelBadge;
