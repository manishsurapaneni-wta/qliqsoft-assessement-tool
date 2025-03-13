
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import AnalyticsCard from "@/components/dashboard/AnalyticsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AssessmentResult, 
  generateSampleResults 
} from "@/utils/scoring";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from "recharts";
import { 
  BarChart2, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Activity 
} from "lucide-react";

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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive view of assessment data and insights
            </p>
          </div>
          
          <div className="w-full md:w-auto">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnalyticsCard
            title="Total Assessments"
            value={filteredResults.length}
            icon={<Users />}
            description={`Past ${timeRange} days`}
            delay={0}
          />
          
          <AnalyticsCard
            title="Average Score"
            value={`${Math.round(averageScore)}%`}
            icon={<BarChart2 />}
            trend={{
              value: 5.2,
              isPositive: true
            }}
            delay={1}
          />
          
          <AnalyticsCard
            title="High Risk Patients"
            value={riskLevelCounts.high}
            icon={<AlertCircle />}
            description={`${Math.round((riskLevelCounts.high / filteredResults.length) * 100) || 0}% of total`}
            delay={2}
          />
          
          <AnalyticsCard
            title="Engagement Rate"
            value="92%"
            icon={<Activity />}
            trend={{
              value: 3.1,
              isPositive: true
            }}
            delay={3}
          />
        </div>
        
        {/* Charts Section */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Score Trends</TabsTrigger>
            <TabsTrigger value="distribution">Risk Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Assessment Trends</CardTitle>
                  <CardDescription>
                    Average scores and assessment count over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: '#f0f0f0' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          tickLine={false} 
                          axisLine={false}
                          domain={[0, 100]}
                          label={{ 
                            value: 'Score %', 
                            angle: -90, 
                            position: 'insideLeft',
                            style: { textAnchor: 'middle', fontSize: 12, fill: '#888' }
                          }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                            border: 'none'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="averageScore" 
                          stroke="#0EA5E9" 
                          fillOpacity={1} 
                          fill="url(#colorScore)" 
                          name="Average Score"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Level Distribution</CardTitle>
                  <CardDescription>
                    Patient distribution by risk level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          labelLine={false}
                          label={({ name, percent }) => 
                            `${name} (${(percent * 100).toFixed(0)}%)`
                          }
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Score Trends Over Time</CardTitle>
                <CardDescription>
                  Detailed view of assessment score trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeSeriesData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#f0f0f0' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false} 
                        axisLine={false}
                        domain={[0, 100]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                          border: 'none'
                        }} 
                      />
                      <Legend />
                      <Bar 
                        dataKey="averageScore" 
                        name="Average Score" 
                        fill="#0EA5E9" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="assessments" 
                        name="Assessments Count" 
                        fill="#94A3B8" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle>Patient Risk Distribution</CardTitle>
                <CardDescription>
                  Detailed analysis of risk levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {riskDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Insights</h3>
                    
                    <div className="p-4 bg-medical-success/10 rounded-lg">
                      <div className="font-medium text-medical-success">Low Risk Patients</div>
                      <p className="text-sm mt-1">
                        {riskLevelCounts.low} patients ({Math.round((riskLevelCounts.low / filteredResults.length) * 100) || 0}%) 
                        show low risk factors. Regular monitoring recommended.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-medical-warning/10 rounded-lg">
                      <div className="font-medium text-medical-warning">Moderate Risk Patients</div>
                      <p className="text-sm mt-1">
                        {riskLevelCounts.moderate} patients ({Math.round((riskLevelCounts.moderate / filteredResults.length) * 100) || 0}%) 
                        show moderate risk factors. Follow-up consultations advised.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-medical-danger/10 rounded-lg">
                      <div className="font-medium text-medical-danger">High Risk Patients</div>
                      <p className="text-sm mt-1">
                        {riskLevelCounts.high} patients ({Math.round((riskLevelCounts.high / filteredResults.length) * 100) || 0}%) 
                        show high risk factors. Immediate intervention recommended.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <div className="font-medium text-primary flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Trend Analysis
                      </div>
                      <p className="text-sm mt-1">
                        {averageScore > 60 
                          ? "Overall positive health trends observed in the patient population." 
                          : "Some concerning health trends observed. Consider preventive programs."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Recent Assessments */}
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
      </div>
    </div>
  );
};

export default Dashboard;
