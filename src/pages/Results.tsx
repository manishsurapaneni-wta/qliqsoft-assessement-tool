
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssessmentResult, ScoreBreakdown } from "@/utils/scoring";
import { BarChart, CheckCircle, ArrowRight, Home, AlertTriangle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

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

const riskIcons = {
  low: <CheckCircle className="h-5 w-5 text-medical-success" />,
  moderate: <AlertTriangle className="h-5 w-5 text-medical-warning" />,
  high: <AlertTriangle className="h-5 w-5 text-medical-danger" />,
};

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
  const prepareChartData = (breakdown: ScoreBreakdown[]) => {
    // Group by score ranges
    const ranges = [
      { name: "High Score (8-10)", value: 0, color: "#10B981" },
      { name: "Medium Score (5-7)", value: 0, color: "#F59E0B" },
      { name: "Low Score (0-4)", value: 0, color: "#EF4444" },
    ];
    
    breakdown.forEach((item) => {
      const normalized = (item.score / item.maxPossibleScore) * 10;
      
      if (normalized >= 8) {
        ranges[0].value += 1;
      } else if (normalized >= 5) {
        ranges[1].value += 1;
      } else {
        ranges[2].value += 1;
      }
    });
    
    return ranges.filter((range) => range.value > 0);
  };
  
  const chartData = prepareChartData(result.breakdown);
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

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
          </motion.div>
          
          {/* Detailed Results */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="summary" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Breakdown</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>Results Summary</CardTitle>
                    <CardDescription>
                      Overview of your assessment results by category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Score Distribution</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                label={({ name, percent }) => 
                                  `${name} (${(percent * 100).toFixed(0)}%)`
                                }
                                labelLine={false}
                              >
                                {chartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                        <div className="space-y-4">
                          {/* Dynamically generated insights based on results */}
                          {result.percentageScore >= 70 && (
                            <div className="p-3 bg-medical-success/10 rounded-lg">
                              <div className="font-medium flex items-center gap-2 text-medical-success">
                                <CheckCircle className="h-4 w-4" />
                                Overall Health Status
                              </div>
                              <p className="text-sm mt-1">
                                Your overall health indicators are positive, showing good health practices.
                              </p>
                            </div>
                          )}
                          
                          {/* Areas of concern (low scoring questions) */}
                          {result.breakdown
                            .filter(item => (item.score / item.maxPossibleScore) < 0.5)
                            .slice(0, 2)
                            .map((item, index) => (
                              <div key={index} className="p-3 bg-medical-warning/10 rounded-lg">
                                <div className="font-medium flex items-center gap-2 text-medical-warning">
                                  <AlertTriangle className="h-4 w-4" />
                                  Potential Concern
                                </div>
                                <p className="text-sm mt-1">
                                  {item.questionText}
                                </p>
                              </div>
                            ))
                          }
                          
                          {/* Recommendation based on overall score */}
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <div className="font-medium text-primary">Recommendation</div>
                            <p className="text-sm mt-1">
                              {result.percentageScore >= 70 
                                ? "Maintain your current health practices and schedule regular check-ups."
                                : result.percentageScore >= 40
                                ? "Consider discussing these results with a healthcare provider during your next visit."
                                : "We recommend consulting with a healthcare provider to discuss these results soon."
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="detailed">
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
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/")}
              className="flex-1 max-w-xs"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="flex-1 max-w-xs group"
            >
              View Analytics Dashboard
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
