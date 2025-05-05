import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPackageOptions } from "@/data/buildPackageOptions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type SelectedOptions = Record<
  string,
  Record<
    string,
    {
      material: string;
      selections: Record<string, string>;
    }
  >
>;

type BuildSummaryProps = {
  selectedOptions: SelectedOptions;
  isVisible: boolean;
  specialNotes: string;
  onNotesChange: (notes: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export const BuildSummary = ({
  selectedOptions,
  isVisible,
  specialNotes,
  onNotesChange,
  onSubmit,
  isSubmitting
}: BuildSummaryProps) => {
  return (
    <Card className={cn("border-t-2 border-primary/20", !isVisible && "hidden")}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Package className="h-5 w-5" />
          <span>Your Build Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <ScrollArea className="h-[min(50vh,300px)] pr-4">
          <div className="space-y-4">
            {Object.entries(buildPackageOptions).map(([category, categoryData]) => {
              const materials = selectedOptions[category];
              return (
                <div key={category} className="border-b pb-3">
                  <h4 className="font-medium capitalize mb-2">{categoryData.title}</h4>
                  {materials ? (
                    Object.entries(materials).map(([materialKey, materialData]) => (
                      <div key={materialKey} className="ml-2 mb-2">
                        <p className="font-medium">{materialData.material}</p>
                        <div className="ml-3 space-y-1 text-sm">
                          {Object.entries(materialData.selections).map(([subtype, value]) => (
                            <p key={subtype}>
                              {subtype}: <span className="font-medium">{value}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No selection made</p>
                  )}
                </div>
              );
            })}

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
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
          onClick={onSubmit}
        >
          {isSubmitting ? "Sending..." : "Submit Build Package"}
        </Button>
      </CardFooter>
    </Card>
  );
};
