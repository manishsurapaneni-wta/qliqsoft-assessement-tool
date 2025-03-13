
import { Download, ChevronRight, BellRing, Calendar, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AssessmentResult } from "@/utils/types/assessment";

interface DashboardSidebarProps {
  riskLevelCounts: {
    low: number;
    moderate: number;
    high: number;
  };
  filteredResults: AssessmentResult[];
}

export const DashboardSidebar = ({
  riskLevelCounts,
  filteredResults
}: DashboardSidebarProps) => {
  return (
    <>
      {/* Risk Distribution Card */}
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
      
      {/* Quick Links Card */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Quick Links</h3>
        <div className="space-y-3">
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            View Historical Trends
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>
          
          <Button variant="ghost" className="w-full justify-start">
            <BarChart3 className="mr-2 h-4 w-4" />
            Drill Down by Department
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>
          
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            User Engagement Report
            <ChevronRight className="ml-auto h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="w-full justify-start mt-4">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </Card>
      
      {/* Recent Activity Card */}
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
      
      {/* System Alerts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">System Alerts</h3>
          <div className="bg-primary/10 p-1.5 rounded-full text-primary">
            <BellRing className="h-4 w-4" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-secondary/50 rounded-lg">
            <p className="text-sm font-medium">System Update Available</p>
            <p className="text-xs text-muted-foreground">
              New analytics features now available
            </p>
          </div>
          <div className="p-3 bg-medical-warning/10 rounded-lg">
            <p className="text-sm font-medium">Scheduled Maintenance</p>
            <p className="text-xs text-muted-foreground">
              05/15/2023, 2:00 AM - 4:00 AM EST
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default DashboardSidebar;
