
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CompletionRateWidgetProps {
  completionRate: number;
  timeRange: string;
}

export const CompletionRateWidget = ({
  completionRate,
  timeRange
}: CompletionRateWidgetProps) => {
  // Generate sample completion trend data
  const trendData = [
    { month: 'Jan', rate: 72 },
    { month: 'Feb', rate: 78 },
    { month: 'Mar', rate: 81 },
    { month: 'Apr', rate: 80 },
    { month: 'May', rate: 85 },
    { month: 'Jun', rate: 87 }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Completion Trends</span>
          <span className="text-base font-normal text-medical-success">
            +12% from last {timeRange} days
          </span>
        </CardTitle>
        <CardDescription>Monthly completion rate trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trendData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
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
                  value: 'Rate %', 
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
                formatter={(value) => [`${value}%`, 'Completion Rate']}
              />
              <Bar 
                dataKey="rate" 
                fill="#0ea5e9" 
                radius={[4, 4, 0, 0]}
                name="Completion Rate"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 flex justify-between items-center text-sm text-muted-foreground">
          <div>6-month trend</div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span>Completion Rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionRateWidget;
