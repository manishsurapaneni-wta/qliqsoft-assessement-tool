
import { useNavigate } from "react-router-dom";
import { FormBuilderContainer } from "@/components/form-builder/FormBuilderContainer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Home, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const FormBuilder = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto py-6 pt-24 space-y-6">
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/dashboard")} className="flex items-center hover:text-primary transition-colors">
                  <Home className="h-4 w-4" />
                  <span className="ml-1">Dashboard</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate("/dashboard")} className="flex items-center hover:text-primary transition-colors">
                  <FileText className="h-4 w-4" />
                  <span className="ml-1">Forms</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="font-medium">Create Form</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl font-bold tracking-tight">Form Builder</h1>
          <p className="text-muted-foreground">
            Design your assessment form by adding and configuring questions
          </p>
        </div>
        
        <FormBuilderContainer />
      </div>
    </div>
  );
};

export default FormBuilder;
