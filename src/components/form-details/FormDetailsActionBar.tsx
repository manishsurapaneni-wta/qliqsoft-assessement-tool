
import { Button } from "@/components/ui/button";
import { Edit, Copy, Eye, EyeOff, ArrowLeft } from "lucide-react";

interface FormDetailsActionBarProps {
  onEdit: () => void;
  onDuplicate: () => void;
  onTogglePublish: () => void;
  onBack: () => void;
  isPublished: boolean;
}

export function FormDetailsActionBar({ 
  onEdit, 
  onDuplicate, 
  onTogglePublish, 
  onBack,
  isPublished 
}: FormDetailsActionBarProps) {
  return (
    <div className="flex justify-between items-center py-4 border-t mt-8">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Forms List
      </Button>
      
      <div className="flex gap-2">
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
