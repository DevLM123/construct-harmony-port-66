
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
  selectedMaterial: string;
  selectedColor: string;
  onSelect: (category: string, material: string, color: string) => void;
};

export const BuildOptionCategory = ({
  category,
  options,
  selectedMaterial,
  selectedColor,
  onSelect,
}: BuildOptionCategoryProps) => {
  return (
    <div className="space-y-6">
      {options.materials.map((material) => (
        <Card key={material.name} className={selectedMaterial === material.name ? "border-2 border-primary" : ""}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <RadioGroup
                value={selectedMaterial}
                onValueChange={(value) => onSelect(category, value, material.colors[0].name)}
                className="flex-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={material.name} id={`${category}-${material.name}`} />
                  <Label htmlFor={`${category}-${material.name}`} className="font-medium text-base">
                    {material.name}
                  </Label>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{material.description}</p>
              </RadioGroup>
              
              <div className="text-right">
                <span className="font-semibold text-lg">${material.price.toLocaleString()}</span>
              </div>
            </div>
            
            {selectedMaterial === material.name && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Colors:</p>
                <div className="flex flex-wrap gap-3">
                  {material.colors.map((color) => (
                    <div key={color.name} className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => onSelect(category, material.name, color.name)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color.name ? 'ring-2 ring-primary ring-offset-2' : ''
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                      <div className="flex flex-col items-center">
                        <span className="text-xs">{color.name}</span>
                        {color.price > 0 && (
                          <span className="text-xs text-muted-foreground">+${color.price}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
