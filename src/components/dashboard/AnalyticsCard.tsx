
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, Variants } from 'framer-motion';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: (i: number) => ({ 
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  })
};

export const AnalyticsCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  delay = 0
}: AnalyticsCardProps) => {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card className={cn("h-full overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <div className="h-8 w-8 rounded-md bg-primary/10 p-1.5 text-primary">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline space-x-2">
            <div className="text-2xl font-bold">{value}</div>
            {trend && (
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-medical-success" : "text-medical-danger"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnalyticsCard;
