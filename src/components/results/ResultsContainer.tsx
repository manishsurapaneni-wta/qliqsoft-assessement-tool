
import { ReactNode } from "react";
import { motion } from "framer-motion";

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

interface ResultsContainerProps {
  children: ReactNode;
}

export const ResultsContainer = ({ children }: ResultsContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto"
    >
      {children}
    </motion.div>
  );
};

export default ResultsContainer;
