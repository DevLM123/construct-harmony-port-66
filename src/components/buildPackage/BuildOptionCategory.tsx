import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

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
    <div className="grid grid-cols-1 gap-6"> {/* Changed to one column */}
      {options.materials.map((material) => (
        <Card 
          key={material.name} 
          className={`transition-all hover:shadow-lg cursor-pointer ${
            selectedMaterial === material.name ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelect(category, material.name, material.colors[0].name)}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{material.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{material.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">${material.price.toLocaleString()}</span>
                {selectedMaterial === material.name && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium mb-3">Available Colors:</p>
              <div className="grid grid-cols-5 gap-2">
                {material.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(category, material.name, color.name);
                    }}
                    className="group relative"
                  >
                    <div
                      className={`w-full aspect-square rounded-md transition-all ${
                        selectedMaterial === material.name && selectedColor === color.name
                          ? "ring-2 ring-primary ring-offset-2"
                          : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-popover px-2 py-1 rounded shadow-sm">
                      {color.name}
                      {color.price > 0 && ` (+$${color.price})`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};