
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { generateSampleResults } from "@/utils/scoring";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICardSection from "@/components/dashboard/KPICardSection";
import FormsList from "@/components/dashboard/FormsList";
import QuickActions from "@/components/dashboard/QuickActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

// Generate sample data for dashboard
const sampleResults = generateSampleResults(30);

const Dashboard = () => {
  const [results, setResults] = useState(sampleResults);
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

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <DashboardHeader 
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Main content area - 3/4 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* KPI Cards */}
            <KPICardSection 
              filteredResults={filteredResults}
              averageScore={averageScore}
              timeRange={timeRange}
            />
            
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
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Risk Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Low Risk</span>
                  <span className="font-medium text-medical-success">{riskLevelCounts.low}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-medical-success h-2 rounded-full" 
                    style={{ width: `${(riskLevelCounts.low / filteredResults.length) * 100}%` }} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Moderate Risk</span>
                  <span className="font-medium text-medical-warning">{riskLevelCounts.moderate}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-medical-warning h-2 rounded-full" 
                    style={{ width: `${(riskLevelCounts.moderate / filteredResults.length) * 100}%` }} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span>High Risk</span>
                  <span className="font-medium text-medical-danger">{riskLevelCounts.high}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-medical-danger h-2 rounded-full" 
                    style={{ width: `${(riskLevelCounts.high / filteredResults.length) * 100}%` }} 
                  />
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {filteredResults.slice(0, 5).map((result, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      result.riskLevel === 'low' ? 'bg-medical-success' : 
                      result.riskLevel === 'moderate' ? 'bg-medical-warning' : 
                      'bg-medical-danger'
                    }`} />
                    <div>
                      <p className="text-sm">Assessment #{idx + 1} completed</p>
                      <p className="text-xs text-muted-foreground">
                        {result.completedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
