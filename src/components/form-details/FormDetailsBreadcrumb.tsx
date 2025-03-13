
import { useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight, Home, FileText } from "lucide-react";

interface FormDetailsBreadcrumbProps {
  formName: string;
}

export function FormDetailsBreadcrumb({ formName }: FormDetailsBreadcrumbProps) {
  const navigate = useNavigate();

  return (
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
          <BreadcrumbLink className="font-medium truncate max-w-[300px] md:max-w-none">
            {formName}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
