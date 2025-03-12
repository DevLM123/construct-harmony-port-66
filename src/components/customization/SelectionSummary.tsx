
import React from 'react';
import { Palette, Droplet, Grid3X3, PaintBucket } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CustomizationOption } from './CustomizationOptionCard';

interface CategorySelections {
  [key: string]: number | null;
}

interface SelectionSummaryProps {
  selectedOptions: CategorySelections;
  customizationOptions: Record<string, CustomizationOption[]>;
  onSaveClick: () => void;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  selectedOptions,
  customizationOptions,
  onSaveClick,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fixtures':
        return <Droplet className="w-5 h-5 mr-2" />;
      case 'cabinets':
        return <Grid3X3 className="w-5 h-5 mr-2" />;
      case 'flooring':
        return <Grid3X3 className="w-5 h-5 mr-2" />;
      case 'paint':
        return <PaintBucket className="w-5 h-5 mr-2" />;
      default:
        return <Palette className="w-5 h-5 mr-2" />;
    }
  };
  
  return (
    <div className="mt-12 bg-card rounded-lg p-6 shadow-sm animate-fade-up animate-delay-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Palette className="w-5 h-5 mr-2 text-primary" />
        Your Selections
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(selectedOptions).map(([category, selectedId]) => {
          const selectedOption = customizationOptions[category]?.find(
            option => option.id === selectedId
          );
          
          return (
            <Card key={category} className="overflow-hidden">
              <CardHeader className="p-4 flex flex-row items-center gap-2 pb-2">
                {getCategoryIcon(category)}
                <CardTitle className="text-base capitalize">{category}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {selectedOption ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={selectedOption.image} 
                        alt={selectedOption.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{selectedOption.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {selectedOption.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No selection yet</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button className="px-8" onClick={onSaveClick}>
          Save Selections
        </Button>
      </div>
    </div>
  );
};
