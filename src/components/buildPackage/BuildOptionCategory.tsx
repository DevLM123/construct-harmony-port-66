
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type BuildOptionCategoryProps = {
  category: string;
  options: {
    materials: {
      name: string;
      price: number;
      description: string;
      imageUrl: string;
      colors: {
        name: string;
        hex: string;
        price: number;
      }[];
    }[];
  };
  selectedOptions: Record<string, { material: string; color: string }>;
  onSelect: (category: string, material: string, color: string) => void;
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
        const selectedColor = selectedOptions[category]?.color;
        
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
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium mb-3">Available Options:</p>
                <RadioGroup 
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  value={isSelected && selectedColor ? selectedColor : ""}
                  onValueChange={(value) => onSelect(category, material.name, value)}
                >
                  {material.colors.map((color) => {
                    const isColorSelected = isSelected && selectedColor === color.name;
                    
                    return (
                      <label
                        key={color.name}
                        className={cn(
                          "relative flex cursor-pointer items-center rounded-md border p-3 hover:bg-accent focus:outline-none",
                          isColorSelected ? "bg-primary/5 border-primary" : "border-muted-foreground/20"
                        )}
                      >
                        <RadioGroupItem 
                          value={color.name} 
                          id={`${material.name}-${color.name}`}
                          className="sr-only"
                        />
                        <div className="flex items-center gap-3">
                          <div
                            className="h-6 w-6 rounded-full border"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="text-sm font-medium leading-tight">{color.name}</div>
                        </div>
                        {isColorSelected && (
                          <Check className="absolute top-3 right-3 h-4 w-4 text-primary" />
                        )}
                      </label>
                    );
                  })}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
