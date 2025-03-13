
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/form-builder/types";
import { format } from "date-fns";

interface FormMetadataPanelProps {
  form: Form;
}

export function FormMetadataPanel({ form }: FormMetadataPanelProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy h:mm a");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Form Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
            <p className="mt-1">{form.description || "No description provided"}</p>
          </div>
          
          <div>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <Badge className={`mt-1 ${getStatusColor(form.status)}`}>
                  {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                <p className="mt-1">{formatDate(form.createdAt)}</p>
              </div>
              
              {form.publishedAt && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Published</h3>
                  <p className="mt-1">{formatDate(form.publishedAt)}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Questions</h3>
                <p className="mt-1">{form.questions.length}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
