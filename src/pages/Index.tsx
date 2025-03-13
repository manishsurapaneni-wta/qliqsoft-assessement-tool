
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BarChart, CheckCircle, ClipboardCheck, ListChecks, Shield, LineChart, Users } from "lucide-react";
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
      icon: <ClipboardCheck className="w-10 h-10 text-primary" />,
    },
    {
      title: "Precise Scoring",
      description: "Calculate detailed scores per question and overall assessment results.",
      icon: <CheckCircle className="w-10 h-10 text-primary" />,
    },
    {
      title: "Advanced Analytics",
      description: "Generate insights with interactive charts and visualizations of assessment data.",
      icon: <BarChart className="w-10 h-10 text-primary" />,
    },
    {
      title: "Customizable Evaluations",
      description: "Tailor assessments to specific medical needs and healthcare requirements.",
      icon: <ListChecks className="w-10 h-10 text-primary" />,
    },
  ];

  const benefits = [
    {
      title: "Data Security",
      description: "Enterprise-grade security protocols protecting all patient information.",
      icon: <Shield className="w-8 h-8 text-white" />,
    },
    {
      title: "Real-time Insights",
      description: "Monitor patient progress with live data visualization tools.",
      icon: <LineChart className="w-8 h-8 text-white" />,
    },
    {
      title: "Collaborative Platform",
      description: "Enable seamless sharing of assessments across healthcare teams.",
      icon: <Users className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <main ref={mainRef} className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with Background Gradient */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 -z-10"></div>
        <div className="absolute right-0 top-20 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute left-10 bottom-20 w-1/4 h-1/4 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-medical-light/30 to-transparent -z-10"
          style={{ opacity, scale, y }}
        />
        
        <div className="container mx-auto px-4 pt-16 md:pt-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="inline-block mb-4 px-4 py-1.5 bg-primary/10 text-primary rounded-full font-medium text-sm">
              Healthcare Assessment Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Advanced <span className="text-primary relative">Medical
                <svg className="absolute bottom-1 left-0 w-full h-3 text-primary/30 -z-10" viewBox="0 0 200 8">
                  <path d="M0 4C40 0 60 8 200 4" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> Assessment & Analytics
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              A comprehensive platform for healthcare providers to administer assessments, score results, 
              and gain valuable insights through advanced analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group text-lg h-14 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                onClick={() => navigate('/assessment')}
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg h-14 px-8 border-2 hover:bg-secondary/80"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard
              </Button>
            </div>
          </motion.div>
          
          {/* Abstract decoration */}
          <div className="hidden lg:block absolute right-0 top-1/4 -z-10">
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-80 h-80 rounded-full border-8 border-primary/10 relative"
            >
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/5 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute -left-10 top-40 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-1.5 bg-secondary text-primary rounded-full font-medium text-sm"
            >
              Powerful Features
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Tools for Healthcare Professionals
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-xl"
            >
              Our platform provides comprehensive tools to elevate your medical assessments 
              and decision-making process.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <Card className="h-full border-0 shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 overflow-hidden group">
                  <div className="absolute h-1 top-0 left-0 right-0 bg-primary/70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <CardContent className="pt-10 pb-8 px-6">
                    <div className="mb-6 p-4 bg-primary/10 rounded-lg inline-block">{feature.icon}</div>
                    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 -z-10"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-6 text-white"
            >
              Why Choose Our Platform
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white/80 text-xl"
            >
              Experience the advantages that set our assessment system apart
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20"
              >
                <div className="mb-6 p-4 bg-white/10 rounded-lg inline-block">{benefit.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{benefit.title}</h3>
                <p className="text-white/80 text-lg">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50 p-10 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <svg className="w-12 h-12 text-primary/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>
              <p className="text-2xl mb-8 leading-relaxed font-medium text-gray-700">
                The assessment platform has revolutionized how we manage patient evaluations. 
                The analytics provide insights we never had access to before, allowing us to deliver 
                better care with more informed decisions.
              </p>
              <div>
                <h4 className="font-semibold text-xl">Dr. Sarah Johnson</h4>
                <p className="text-muted-foreground">Chief Medical Officer, Memorial Healthcare</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute -left-40 bottom-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute right-10 top-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Assessment Process?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Start using our platform today and experience the power of advanced analytics
              in healthcare assessment.
            </p>
            <Button 
              size="lg" 
              className="group text-lg h-14 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              onClick={() => navigate('/assessment')}
            >
              Begin Your First Assessment
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/386e85d5-00ba-4c9f-b532-164661ff68f8.png" 
                  alt="Qliqsoft Logo" 
                  className="h-10 w-auto mr-3" 
                />
                <p className="text-sm text-muted-foreground">
                  Advanced Medical Assessment & Analytics
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Qliqsoft. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
