
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ResultsFooter = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button
        variant="outline"
        size="lg"
        onClick={() => navigate("/")}
        className="flex-1 max-w-xs"
      >
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      <Button
        size="lg"
        onClick={() => navigate("/dashboard")}
        className="flex-1 max-w-xs group"
      >
        View Analytics Dashboard
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default ResultsFooter;
