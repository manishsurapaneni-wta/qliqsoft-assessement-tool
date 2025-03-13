
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { AssessmentResult } from "@/utils/scoring";
import { prepareChartData, formatDate } from "@/utils/charts";
import OverallScore from "@/components/results/OverallScore";
import ResultsTabs from "@/components/results/ResultsTabs";
import ResultsFooter from "@/components/results/ResultsFooter";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <span className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full font-medium text-sm">
              Assessment Complete
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Assessment Results</h1>
            <p className="text-muted-foreground">
              Completed on {formatDate(result.completedAt)}
            </p>
          </motion.div>
          
          {/* Overall Score */}
          <motion.div variants={itemVariants}>
            <OverallScore result={result} />
          </motion.div>
          
          {/* Detailed Results */}
          <motion.div variants={itemVariants}>
            <ResultsTabs result={result} chartData={chartData} />
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div variants={itemVariants}>
            <ResultsFooter />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
