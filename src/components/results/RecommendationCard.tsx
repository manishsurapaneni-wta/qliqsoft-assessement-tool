
import { getRiskRecommendation } from "@/utils/charts";

interface RecommendationCardProps {
  percentageScore: number;
}

export const RecommendationCard = ({ percentageScore }: RecommendationCardProps) => {
  return (
    <div className="p-3 bg-primary/10 rounded-lg">
      <div className="font-medium text-primary">Recommendation</div>
      <p className="text-sm mt-1">
        {getRiskRecommendation(percentageScore)}
      </p>
    </div>
  );
};

export default RecommendationCard;
