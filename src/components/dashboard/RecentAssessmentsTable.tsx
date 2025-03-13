
import { motion } from "framer-motion";
import { AssessmentResult } from "@/utils/scoring";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentAssessmentsTableProps {
  filteredResults: AssessmentResult[];
}

export const RecentAssessmentsTable = ({
  filteredResults
}: RecentAssessmentsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Assessments</CardTitle>
        <CardDescription>
          Latest completed medical assessments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Score</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.slice(0, 10).map((result, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.3
                  }}
                  className="border-b last:border-0 hover:bg-secondary/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    {result.completedAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{Math.round(result.percentageScore)}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${result.riskLevel === "low" 
                          ? "bg-medical-success/10 text-medical-success" 
                          : result.riskLevel === "moderate"
                          ? "bg-medical-warning/10 text-medical-warning"
                          : "bg-medical-danger/10 text-medical-danger"
                        }`}
                    >
                      {result.riskLevel === "low" && "Low Risk"}
                      {result.riskLevel === "moderate" && "Moderate Risk"}
                      {result.riskLevel === "high" && "High Risk"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAssessmentsTable;
