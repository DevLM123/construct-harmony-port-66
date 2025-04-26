
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { BuildOptionCategory } from '@/components/buildPackage/BuildOptionCategory';
import { BuildSummary } from '@/components/buildPackage/BuildSummary';
import { buildPackageOptions } from '@/data/buildPackageOptions';

export const BuildPackageConfigurator = () => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, {material: string, color: string}>>({
    roof: { material: 'Timberland Natural', color: 'Charcoal' },
    floor: { material: 'Merola Tile', color: 'Arte White' },
    countertop: { material: 'Granite', color: 'Rigel White' },
  });
  
  const handleOptionSelect = (category: string, material: string, color: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: { material, color }
    }));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Build Your Custom Home Package</h1>
        <p className="text-muted-foreground">
          Customize your home build with our selection of high-quality materials
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="roof" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="roof">Roof</TabsTrigger>
              <TabsTrigger value="floor">Floor</TabsTrigger>
              <TabsTrigger value="countertop">Countertop</TabsTrigger>
            </TabsList>
            
            {Object.entries(buildPackageOptions).map(([category, options]) => (
              <TabsContent key={category} value={category}>
                <BuildOptionCategory
                  category={category}
                  options={options}
                  selectedMaterial={selectedOptions[category]?.material}
                  selectedColor={selectedOptions[category]?.color}
                  onSelect={handleOptionSelect}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div>
          <BuildSummary selectedOptions={selectedOptions} />
        </div>
      </div>
    </div>
  );
};
