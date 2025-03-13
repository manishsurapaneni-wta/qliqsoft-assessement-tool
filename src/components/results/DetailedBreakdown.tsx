
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AssessmentResult } from "@/utils/scoring";

interface DetailedBreakdownProps {
  result: AssessmentResult;
}

export const DetailedBreakdown = ({ result }: DetailedBreakdownProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Breakdown</CardTitle>
        <CardDescription>
          Scores for each question in your assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {result.breakdown.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{item.questionText}</h4>
                <span className="text-sm text-muted-foreground">
                  {item.score} / {item.maxPossibleScore}
                </span>
              </div>
              <Progress
                value={item.percentage}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedBreakdown;
