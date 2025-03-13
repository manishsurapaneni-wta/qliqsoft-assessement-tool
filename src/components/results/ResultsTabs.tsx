
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResultSummary from "./ResultSummary";
import DetailedBreakdown from "./DetailedBreakdown";
import { AssessmentResult, ScoreBreakdown } from "@/utils/scoring";

interface ResultsTabsProps {
  result: AssessmentResult;
  chartData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const ResultsTabs = ({ result, chartData }: ResultsTabsProps) => {
  return (
    <Tabs defaultValue="summary" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="detailed">Detailed Breakdown</TabsTrigger>
      </TabsList>
      
      <TabsContent value="summary">
        <ResultSummary result={result} chartData={chartData} />
      </TabsContent>
      
      <TabsContent value="detailed">
        <DetailedBreakdown result={result} />
      </TabsContent>
    </Tabs>
  );
};

export default ResultsTabs;
