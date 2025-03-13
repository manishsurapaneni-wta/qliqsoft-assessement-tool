
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BarChart, CheckCircle, ClipboardCheck, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 60]);
  
  // Fade-in animation on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Comprehensive Assessments",
      description: "Administer medical questionnaires with multiple question types for thorough evaluation.",
      icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
    },
    {
      title: "Precise Scoring",
      description: "Calculate detailed scores per question and overall assessment results.",
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
    },
    {
      title: "Advanced Analytics",
      description: "Generate insights with interactive charts and visualizations of assessment data.",
      icon: <BarChart className="w-8 h-8 text-primary" />,
    },
    {
      title: "Customizable Evaluations",
      description: "Tailor assessments to specific medical needs and healthcare requirements.",
      icon: <ListChecks className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <main ref={mainRef} className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-medical-light/30 to-transparent -z-10"
          style={{ opacity, scale, y }}
        />
        
        <div className="container mx-auto px-4 pt-16 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-block mb-4 px-3 py-1 bg-primary/10 text-primary rounded-full font-medium text-sm">
              Healthcare Assessment Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              Advanced <span className="text-primary">Medical</span> Assessment & Analytics
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              A comprehensive platform for healthcare providers to administer assessments, score results, 
              and gain valuable insights through advanced analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group"
                onClick={() => navigate('/assessment')}
              >
                Start Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Healthcare Professionals
            </h2>
            <p className="text-muted-foreground text-lg">
              Our platform provides comprehensive tools to elevate your medical assessments 
              and decision-making process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="h-full border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-medical-light/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Assessment Process?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start using our platform today and experience the power of advanced analytics
              in healthcare assessment.
            </p>
            <Button 
              size="lg" 
              className="group"
              onClick={() => navigate('/assessment')}
            >
              Begin Your First Assessment
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-xl font-bold flex items-center">
                <span className="text-primary">Med</span>Score
              </p>
              <p className="text-sm text-muted-foreground">
                Advanced Medical Assessment & Analytics
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MedScore. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
