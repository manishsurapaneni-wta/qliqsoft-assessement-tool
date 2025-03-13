
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { AssessmentResult } from "@/utils/scoring";
import { prepareChartData } from "@/utils/charts";
import ResultsContainer from "@/components/results/ResultsContainer";
import ResultsHeader from "@/components/results/ResultsHeader";
import OverallScore from "@/components/results/OverallScore";
import ResultsTabs from "@/components/results/ResultsTabs";
import ResultsFooter from "@/components/results/ResultsFooter";

// Animation variants for child items
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  
  // Attempt to load results from localStorage on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const savedResult = localStorage.getItem("assessmentResult");
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        // Restore date object
        parsedResult.completedAt = new Date(parsedResult.completedAt);
        setResult(parsedResult);
      } catch (e) {
        console.error("Error parsing assessment result", e);
      }
    } else {
      // No result found, redirect to assessment
      navigate("/assessment");
    }
  }, [navigate]);
  
  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>Loading results...</p>
      </div>
    );
  }
  
  // Prepare data for pie chart
  const chartData = prepareChartData(result.breakdown);

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24 flex-1">
        <ResultsContainer>
          {/* Header */}
          <div variants={itemVariants}>
            <ResultsHeader completedAt={result.completedAt} />
          </div>
          
          {/* Overall Score */}
          <div variants={itemVariants}>
            <OverallScore result={result} />
          </div>
          
          {/* Detailed Results */}
          <div variants={itemVariants}>
            <ResultsTabs result={result} chartData={chartData} />
          </div>
          
          {/* Action Buttons */}
          <div variants={itemVariants}>
            <ResultsFooter />
          </div>
        </ResultsContainer>
      </div>
    </div>
  );
};

export default Results;
