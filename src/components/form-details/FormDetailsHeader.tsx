
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Copy, Eye, EyeOff } from "lucide-react";
import { Form } from "@/components/form-builder/types";

interface FormDetailsHeaderProps {
  form: Form;
  onEdit: () => void;
  onDuplicate: () => void;
  onTogglePublish: () => void;
}

export function FormDetailsHeader({ 
  form,
  onEdit,
  onDuplicate,
  onTogglePublish
}: FormDetailsHeaderProps) {
  const isPublished = form.status === "published";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
        <p className="text-muted-foreground mt-1">
          Form details and configuration
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Form
        </Button>
        <Button variant="outline" size="sm" onClick={onDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </Button>
        <Button 
          size="sm" 
          onClick={onTogglePublish}
          variant={isPublished ? "secondary" : "default"}
        >
          {isPublished ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Unpublish
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Publish
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
