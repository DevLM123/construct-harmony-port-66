
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type BuildOptionCategoryProps = {
  category: string;
  options: {
    materials: {
      name: string;
      description: string;
      imageUrl: string;
      colors: {
        name: string;
        hex: string;
      }[];
    }[];
  };
  selectedOptions: Record<string, { 
    material: string; 
    selections: Record<string, string> 
  }>;
  onSelect: (category: string, material: string, subtype: string, value: string) => void;
};

export const BuildOptionCategory = ({
  category,
  options,
  selectedOptions,
  onSelect,
}: BuildOptionCategoryProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {options.materials.map((material) => {
        // Check if this specific material has been selected
        const materialSelection = Object.values(selectedOptions).find(
          selection => selection.material === material.name
        );
        
        const isSelected = !!materialSelection;
        
        // Get selections for this material if it exists
        const selectedSubtypes = materialSelection?.selections || {};
        
        return (
          <Card 
            key={material.name} 
            className={cn(
              "transition-all hover:shadow-md",
              isSelected ? "ring-2 ring-primary bg-primary/5" : ""
            )}
          >
            <Collapsible>
              <CardContent className="p-5">
                <CollapsibleTrigger className="flex justify-between items-center w-full">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{material.name}</h3>
                      {isSelected && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                  </div>
                  <div className="flex items-center">
                    <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="pt-4">
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-3">Select Colors:</p>
                    <div className="grid grid-cols-2 gap-4">
                      {material.colors.map((color) => {
                        const isColorSelected = isSelected && 
                          selectedSubtypes['color'] === color.name;
                        
                        return (
                          <div
                            key={color.name}
                            onClick={() => onSelect(category, material.name, 'color', color.name)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all",
                              isColorSelected ? "bg-primary/10 ring-1 ring-primary" : "hover:bg-accent"
                            )}
                          >
                            <div
                              className={cn(
                                "h-8 w-8 rounded-full border shadow-sm flex-shrink-0",
                                isColorSelected ? "ring-2 ring-primary ring-offset-2" : ""
                              )}
                              style={{ backgroundColor: color.hex }}
                              aria-label={color.name}
                            />
                            <span className="text-sm">{color.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CollapsibleContent>
              </CardContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
};
