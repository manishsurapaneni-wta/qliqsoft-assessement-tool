
import { PlusCircle, BarChart2, ClipboardList, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export const QuickActions = () => {
  const actions = [
    {
      title: "Create New Form",
      description: "Start building a new assessment form",
      icon: <PlusCircle className="h-5 w-5" />,
      color: "bg-primary text-primary-foreground hover:bg-primary/90",
      path: "/assessment",
    },
    {
      title: "View Analytics",
      description: "See detailed analytics and insights",
      icon: <BarChart2 className="h-5 w-5" />,
      color: "bg-medical-success text-white hover:bg-medical-success/90",
      path: "/dashboard",
    },
    {
      title: "Manage Forms",
      description: "View and edit existing assessment forms",
      icon: <ClipboardList className="h-5 w-5" />,
      color: "bg-medical-warning text-white hover:bg-medical-warning/90",
      path: "/assessment",
    },
    {
      title: "User Management",
      description: "Manage users and permissions",
      icon: <Users className="h-5 w-5" />,
      color: "bg-medical-danger text-white hover:bg-medical-danger/90",
      path: "/dashboard",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Access frequently used functions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, i) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <Button
                asChild
                variant="outline"
                className={`h-auto w-full p-4 flex flex-col items-center text-center justify-center gap-3 ${action.color}`}
              >
                <a href={action.path}>
                  <div className="rounded-full bg-white/20 p-2.5">
                    {action.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-medium">{action.title}</h4>
                    <p className="text-xs opacity-90">
                      {action.description}
                    </p>
                  </div>
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
