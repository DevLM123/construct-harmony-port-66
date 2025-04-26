
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
        <Card key={material.name}>
          <CardContent className="p-4">
            <RadioGroup
              defaultValue={selectedMaterial}
              onValueChange={(value) => onSelect(category, value, material.colors[0].name)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={material.name} id={material.name} />
                <Label htmlFor={material.name} className="font-medium">
                  {material.name}
                </Label>
              </div>
            </RadioGroup>
            
            <p className="mt-2 text-sm text-muted-foreground">{material.description}</p>
            
            {selectedMaterial === material.name && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Colors:</p>
                <div className="flex flex-wrap gap-2">
                  {material.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => onSelect(category, material.name, color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? 'ring-2 ring-primary ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
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
