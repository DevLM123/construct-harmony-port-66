
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface CustomizationOption {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface CustomizationOptionCardProps {
  option: CustomizationOption;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const CustomizationOptionCard: React.FC<CustomizationOptionCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={option.image} 
          alt={option.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
            <CheckCircle className="w-5 h-5" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{option.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {option.description}
        </p>
        <Button 
          variant={isSelected ? "default" : "outline"}
          className="w-full"
          onClick={() => onSelect(option.id)}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
};
