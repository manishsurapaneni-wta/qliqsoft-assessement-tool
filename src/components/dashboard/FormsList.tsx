import { useState } from "react";
import { Search, MoreHorizontal, Eye, Edit, Trash2, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssessmentResult } from "@/utils/scoring";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

interface FormsListProps {
  filteredResults: AssessmentResult[];
}

export const FormsList = ({ filteredResults }: FormsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getRiskBadgeClassname = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-medical-success/10 text-medical-success";
      case "moderate":
        return "bg-medical-warning/10 text-medical-warning";
      case "high":
        return "bg-medical-danger/10 text-medical-danger";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button 
          onClick={() => navigate("/form-builder")}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Create Form
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Form Name</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px]">Risk Level</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3 py-4">
                    <div className="text-muted-foreground">No forms found</div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate("/form-builder")}
                      className="flex items-center gap-2"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Create your first form
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.slice(0, 8).map((result, index) => {
                return (
                  <TableRow 
                    key={index}
                    className="border-b last:border-0"
                  >
                    <TableCell className="font-medium">
                      Assessment Form #{index + 1}
                    </TableCell>
                    <TableCell>
                      {result.completedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="rounded-full">
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`rounded-full ${getRiskBadgeClassname(result.riskLevel)}`}>
                        {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => navigate(`/form-details/${index}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      {filteredResults.length > 8 && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" size="sm">
            View All Forms
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormsList;
