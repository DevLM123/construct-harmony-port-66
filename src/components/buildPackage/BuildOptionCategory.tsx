
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [activeMaterial, setActiveMaterial] = useState(
    selectedMaterial || options.materials[0].name
  );

  const handleMaterialChange = (materialName: string) => {
    setActiveMaterial(materialName);
    // When material changes, default to the first color
    const firstColor = options.materials.find(m => m.name === materialName)?.colors[0].name || '';
    onSelect(category, materialName, firstColor);
  };

  const handleColorChange = (colorName: string) => {
    onSelect(category, activeMaterial, colorName);
  };

  // Find current material object
  const currentMaterial = options.materials.find(m => m.name === activeMaterial) || options.materials[0];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold capitalize mb-4">{category} Options</h2>
      
      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.materials.map((material) => (
              <Card 
                key={material.name} 
                className={`cursor-pointer transition-all ${
                  activeMaterial === material.name 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => handleMaterialChange(material.name)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{material.name}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden rounded-md">
                    <img 
                      src={material.imageUrl} 
                      alt={material.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="colors">
          <Card>
            <CardHeader>
              <CardTitle>{currentMaterial.name} Colors</CardTitle>
              <CardDescription>Select your preferred color option</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={selectedColor}
                value={selectedColor}
                onValueChange={handleColorChange}
                className="grid grid-cols-1 gap-4"
              >
                {currentMaterial.colors.map((color) => (
                  <div 
                    key={color.name} 
                    className="flex items-center space-x-4 border rounded-md p-4 hover:bg-secondary/50"
                  >
                    <RadioGroupItem value={color.name} id={`${currentMaterial.name}-${color.name}`} />
                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <Label htmlFor={`${currentMaterial.name}-${color.name}`}>{color.name}</Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
