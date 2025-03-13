
import { motion } from "framer-motion";
import { formatDate } from "@/utils/charts";

interface ResultsHeaderProps {
  completedAt: Date;
}

export const ResultsHeader = ({ completedAt }: ResultsHeaderProps) => {
  return (
    <motion.div className="mb-8 text-center">
      <span className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full font-medium text-sm">
        Assessment Complete
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Assessment Results</h1>
      <p className="text-muted-foreground">
        Completed on {formatDate(completedAt)}
      </p>
    </motion.div>
  );
};

export default ResultsHeader;
