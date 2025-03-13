
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { generateSampleResults, AssessmentResult } from "@/utils/scoring";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICardSection from "@/components/dashboard/KPICardSection";
import ChartTabs from "@/components/dashboard/ChartTabs";
import RecentAssessmentsTable from "@/components/dashboard/RecentAssessmentsTable";

// Generate sample data for dashboard
const sampleResults = generateSampleResults(30);

const Dashboard = () => {
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [timeRange, setTimeRange] = useState("30");
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setResults(sampleResults);
  }, []);

  // Filter results based on selected time range
  const getFilteredResults = () => {
    const now = new Date();
    const daysAgo = new Date();
    daysAgo.setDate(now.getDate() - parseInt(timeRange));
    
    return results.filter(r => r.completedAt >= daysAgo);
  };
  
  const filteredResults = getFilteredResults();
  
  // Calculate average score from filtered results
  const averageScore = filteredResults.length > 0
    ? filteredResults.reduce((sum, result) => sum + result.percentageScore, 0) / filteredResults.length
    : 0;
  
  // Count risk levels from filtered results
  const riskLevelCounts = {
    low: filteredResults.filter(r => r.riskLevel === "low").length,
    moderate: filteredResults.filter(r => r.riskLevel === "moderate").length,
    high: filteredResults.filter(r => r.riskLevel === "high").length,
  };
  
  // Prepare time series data for charts
  const prepareTimeSeriesData = () => {
    const data: any[] = [];
    const dateMap = new Map();
    
    // Group by date
    filteredResults.forEach(result => {
      const date = new Date(result.completedAt);
      const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
      
      if (dateMap.has(dateStr)) {
        const existing = dateMap.get(dateStr);
        existing.count += 1;
        existing.scoreSum += result.percentageScore;
      } else {
        dateMap.set(dateStr, {
          date: dateStr,
          count: 1,
          scoreSum: result.percentageScore,
        });
      }
    });
    
    // Convert map to array and calculate averages
    dateMap.forEach(value => {
      data.push({
        date: value.date,
        averageScore: value.scoreSum / value.count,
        assessments: value.count,
      });
    });
    
    // Sort by date
    return data.sort((a, b) => {
      const [aMonth, aDay] = a.date.split('/').map(Number);
      const [bMonth, bDay] = b.date.split('/').map(Number);
      return aMonth === bMonth ? aDay - bDay : aMonth - bMonth;
    });
  };
  
  const timeSeriesData = prepareTimeSeriesData();
  
  // Prepare risk distribution data for pie chart
  const riskDistributionData = [
    { name: "Low Risk", value: riskLevelCounts.low, color: "#10B981" },
    { name: "Moderate Risk", value: riskLevelCounts.moderate, color: "#F59E0B" },
    { name: "High Risk", value: riskLevelCounts.high, color: "#EF4444" },
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <DashboardHeader 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
        
        {/* KPI Cards */}
        <KPICardSection 
          filteredResults={filteredResults}
          averageScore={averageScore}
          timeRange={timeRange}
        />
        
        {/* Charts Section */}
        <ChartTabs 
          timeSeriesData={timeSeriesData}
          riskDistributionData={riskDistributionData}
          filteredResults={filteredResults}
          riskLevelCounts={riskLevelCounts}
          averageScore={averageScore}
        />
        
        {/* Recent Assessments */}
        <RecentAssessmentsTable filteredResults={filteredResults} />
      </div>
    </div>
  );
};

export default Dashboard;
