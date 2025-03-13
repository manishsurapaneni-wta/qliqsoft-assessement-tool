
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormCanvas } from "./FormCanvas";
import { ToolPalette } from "./ToolPalette";
import { FormSettings } from "./FormSettings";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form } from "./types";
import { useNavigate } from "react-router-dom";

export function FormBuilderContainer() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    id: crypto.randomUUID(),
    title: "New Assessment Form",
    description: "Assessment description goes here",
    questions: [],
    status: "draft",
    createdAt: new Date().toISOString(),
  });

  const handleSaveDraft = () => {
    // Here you would typically save to API/database
    toast.success("Form saved as draft");
  };

  const handlePublish = () => {
    // Here you would typically publish via API
    toast.success("Form published successfully");
    navigate("/dashboard");
  };

  const handlePreview = () => {
    // In a real app, this might open a preview modal or navigate to a preview page
    toast.info("Preview functionality would be implemented here");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tool Palette */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <ToolPalette />
        </div>

        {/* Form Canvas */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <FormCanvas form={form} setForm={setForm} />
        </div>

        {/* Form Settings */}
        <div className="lg:col-span-3 order-3">
          <FormSettings form={form} setForm={setForm} />
        </div>

        {/* Action Buttons */}
        <div className="col-span-full order-4 flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            Preview Form
          </Button>
          <Button variant="secondary" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            Publish Form
          </Button>
        </div>
      </div>
    </DndProvider>
  );
}
