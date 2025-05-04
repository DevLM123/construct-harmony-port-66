
import React from "react";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { buildPackageOptions } from "@/data/buildPackageOptions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type BuildSummaryProps = {
  selectedOptions: Record<string, { 
    material: string; 
    selections: Record<string, string> 
  }>;
  isVisible: boolean;
  specialNotes: string;
  onNotesChange: (notes: string) => void;
};

export const BuildSummary = ({
  selectedOptions,
  isVisible,
  specialNotes,
  onNotesChange,
}: BuildSummaryProps) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/customization", { 
      state: { 
        buildPackage: selectedOptions,
        specialNotes: specialNotes 
      } 
    });
  };

  return (
    <Card
      className={cn("border-t-2 border-primary/20", !isVisible && "hidden")}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Package className="h-5 w-5" />
          <span>Your Build Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <ScrollArea className="h-[min(50vh,300px)] pr-4">
          <div className="space-y-4">
            {Object.entries(buildPackageOptions).map(
              ([category, categoryData]) => {
                const selection = selectedOptions[category];
                if (!selection) {
                  return (
                    <div key={category} className="border-b pb-3">
                      <h4 className="font-medium capitalize">
                        {categoryData.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        No selection made
                      </p>
                    </div>
                  );
                }

                return (
                  <div key={category} className="border-b pb-3">
                    <h4 className="font-medium capitalize">{categoryData.title}</h4>
                    <div className="text-sm mt-1">
                      <p className="font-medium">{selection.material}</p>
                      <div className="mt-2 space-y-1">
                        {Object.entries(selection.selections).map(([subtype, value]) => (
                          <div key={subtype} className="flex items-center">
                            <p className="capitalize">
                              {subtype}: <span className="font-medium">{value}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              },
            )}

            <div className="pt-2">
              <h4 className="font-medium">Special Additions</h4>
              <Textarea
                placeholder="Add any special notes or requests here..."
                className="mt-2"
                value={specialNotes}
                onChange={(e) => onNotesChange(e.target.value)}
              />
            </div>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
          onClick={handleSubmit}
        >
          Submit Build Package
        </Button>
      </CardFooter>
    </Card>
  );
};
