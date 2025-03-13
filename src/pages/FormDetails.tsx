
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Home, FileText } from "lucide-react";
import { FormDetailsBreadcrumb } from "@/components/form-details/FormDetailsBreadcrumb";
import { FormDetailsHeader } from "@/components/form-details/FormDetailsHeader";
import { FormMetadataPanel } from "@/components/form-details/FormMetadataPanel";
import { QuestionsList } from "@/components/form-details/QuestionsList";
import { FormDetailsActionBar } from "@/components/form-details/FormDetailsActionBar";
import { toast } from "sonner";
import { useFormDetails } from "@/hooks/useFormDetails";

const FormDetails = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { form, isLoading, error } = useFormDetails(formId);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load form details");
      navigate("/dashboard");
    }
  }, [error, navigate]);

  const handleEditForm = () => {
    // In a real app, this would navigate to the form builder with the form ID
    navigate(`/form-builder?edit=${formId}`);
    toast.info("Edit form functionality would be implemented here");
  };

  const handleDuplicateForm = () => {
    // In a real app, this would create a duplicate and navigate to it
    toast.success("Form duplicated successfully");
  };

  const handleTogglePublish = () => {
    if (form?.status === "published") {
      toast.success("Form unpublished successfully");
    } else {
      toast.success("Form published successfully");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6 space-y-6">
          <FormDetailsBreadcrumb formName="Loading..." />
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Form Not Found</h2>
          <p className="text-muted-foreground">The requested form could not be found.</p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-primary hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 space-y-6">
        <FormDetailsBreadcrumb formName={form.title} />
        
        <FormDetailsHeader 
          form={form}
          onEdit={handleEditForm}
          onDuplicate={handleDuplicateForm}
          onTogglePublish={handleTogglePublish}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <FormMetadataPanel form={form} />
            <QuestionsList questions={form.questions} />
          </div>
          
          <div className="lg:col-span-4 space-y-6">
            {/* Quick navigation sidebar */}
            <div className="sticky top-6">
              <FormQuickNav form={form} />
            </div>
          </div>
        </div>
        
        <FormDetailsActionBar 
          onEdit={handleEditForm}
          onDuplicate={handleDuplicateForm}
          onTogglePublish={handleTogglePublish}
          onBack={() => navigate("/dashboard")}
          isPublished={form.status === "published"}
        />
      </div>
    </div>
  );
};

// Quick Navigation Sidebar Component
const FormQuickNav = ({ form }) => {
  return (
    <div className="border rounded-lg shadow-sm bg-card">
      <div className="p-4 border-b">
        <h3 className="font-medium">Quick Navigation</h3>
      </div>
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
        <div className="text-sm font-medium text-muted-foreground mb-2">Questions</div>
        {form.questions.map((question, index) => (
          <a 
            key={question.id} 
            href={`#question-${question.id}`}
            className="block text-sm hover:text-primary truncate"
          >
            {index + 1}. {question.text}
          </a>
        ))}
        
        {form.questions.length === 0 && (
          <div className="text-sm text-muted-foreground">
            No questions in this form.
          </div>
        )}
      </div>
    </div>
  );
};

export default FormDetails;
