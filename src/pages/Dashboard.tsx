
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { generateSampleResults } from "@/utils/scoring";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICardSection from "@/components/dashboard/KPICardSection";
import FormsList from "@/components/dashboard/FormsList";
import QuickActions from "@/components/dashboard/QuickActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ChartTabs from "@/components/dashboard/ChartTabs";
import AdvancedKPISection from "@/components/dashboard/AdvancedKPISection";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import PredictiveAnalyticsWidget from "@/components/dashboard/PredictiveAnalyticsWidget";
import CompletionRateWidget from "@/components/dashboard/CompletionRateWidget";
import { format } from "date-fns";

// Generate sample data for dashboard
const sampleResults = generateSampleResults(30);

const Dashboard = () => {
  const [results, setResults] = useState(sampleResults);
  const [timeRange, setTimeRange] = useState("30");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  
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

  // Generate time series data
  const timeSeriesData = Array.from({ length: parseInt(timeRange) }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Get results for this date
    const dateResults = filteredResults.filter(r => {
      const resultDate = new Date(r.completedAt);
      return resultDate.getDate() === date.getDate() &&
             resultDate.getMonth() === date.getMonth() &&
             resultDate.getFullYear() === date.getFullYear();
    });
    
    // Calculate average score for this date
    const dateAvgScore = dateResults.length > 0
      ? dateResults.reduce((sum, r) => sum + r.percentageScore, 0) / dateResults.length
      : 0;
    
    return {
      date: format(date, "MMM dd"),
      averageScore: Math.round(dateAvgScore),
      assessments: dateResults.length
    };
  }).reverse();

  // Generate risk distribution data for charts
  const riskDistributionData = [
    { name: "Low Risk", value: riskLevelCounts.low, color: "#10B981" },
    { name: "Moderate Risk", value: riskLevelCounts.moderate, color: "#F59E0B" },
    { name: "High Risk", value: riskLevelCounts.high, color: "#EF4444" }
  ].filter(item => item.value > 0);

  // Calculate completion rate (dummy data)
  const completionRate = 87;
  
  // Calculate average time to complete (dummy data)
  const avgTimeToComplete = "5 min 12 sec";

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24 lg:px-8">
        {/* Dashboard Header with Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <DashboardHeader 
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
          <DashboardFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content area - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Original KPI Cards */}
            <KPICardSection 
              filteredResults={filteredResults}
              averageScore={averageScore}
              timeRange={timeRange}
            />
            
            {/* Advanced KPI Cards */}
            <AdvancedKPISection
              completionRate={completionRate}
              avgTimeToComplete={avgTimeToComplete}
              riskLevelCounts={riskLevelCounts}
              filteredResults={filteredResults}
            />
            
            {/* Chart Tabs Section */}
            <ChartTabs
              timeSeriesData={timeSeriesData}
              riskDistributionData={riskDistributionData}
              filteredResults={filteredResults}
              riskLevelCounts={riskLevelCounts}
              averageScore={averageScore}
            />
            
            {/* Advanced Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <CompletionRateWidget
                completionRate={completionRate}
                timeRange={timeRange}
              />
              <PredictiveAnalyticsWidget
                riskLevelCounts={riskLevelCounts}
                totalAssessments={filteredResults.length}
              />
            </div>
            
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Forms List */}
            <Card className="p-6">
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="recent">Recent Forms</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent" className="w-full">
                  <FormsList filteredResults={filteredResults} />
                </TabsContent>
                
                <TabsContent value="drafts">
                  <FormsList filteredResults={filteredResults.slice(0, 5)} />
                </TabsContent>
                
                <TabsContent value="completed">
                  <FormsList filteredResults={filteredResults.filter(r => r.percentageScore > 50)} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Sidebar - 1/4 width */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dashboard Sidebar */}
            <DashboardSidebar 
              riskLevelCounts={riskLevelCounts}
              filteredResults={filteredResults}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
