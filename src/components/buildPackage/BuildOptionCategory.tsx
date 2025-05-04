
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-1 gap-6">
      {options.materials.map((material) => {
        const isSelected = selectedOptions[category]?.material === material.name;
        const selectedSubtypes = selectedOptions[category]?.selections || {};
        
        return (
          <Card 
            key={material.name} 
            className={cn(
              "transition-all hover:shadow-lg",
              isSelected ? "ring-2 ring-primary bg-primary/5" : ""
            )}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{material.name}</h3>
                    {isSelected && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={material.imageUrl || '/placeholder.svg'} 
                    alt={`${material.name} preview`}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium mb-3">Select Colors:</p>
                <div className="grid grid-cols-2 gap-3">
                  {material.colors.map((color) => {
                    const isColorSelected = isSelected && 
                      selectedSubtypes['color'] === color.name;
                    
                    return (
                      <div
                        key={color.name}
                        onClick={() => onSelect(category, material.name, 'color', color.name)}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-md cursor-pointer transition-all",
                          isColorSelected ? "bg-primary/10 ring-1 ring-primary" : "hover:bg-accent"
                        )}
                      >
                        <div
                          className={cn(
                            "h-8 w-8 rounded-full border shadow-sm",
                            isColorSelected ? "ring-2 ring-primary ring-offset-2" : ""
                          )}
                          style={{ backgroundColor: color.hex }}
                          aria-label={color.name}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
