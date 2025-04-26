
import React from 'react';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

type BuildSummaryProps = {
  selectedOptions: Record<string, {material: string, color: string}>;
};

export const BuildSummary = ({ selectedOptions }: BuildSummaryProps) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/customization', { state: { buildPackage: selectedOptions } });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span>Your Build Package</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(selectedOptions).map(([category, { material, color }]) => (
          <div key={category} className="border-b pb-3">
            <h3 className="font-medium capitalize">{category}</h3>
            <div className="text-sm text-muted-foreground mt-1 space-y-1">
              <p><span className="font-medium">Material:</span> {material}</p>
              <p><span className="font-medium">Color:</span> {color}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
          onClick={handleSubmit}
        >
          Submit Build Package
        </Button>
      </CardFooter>
    </Card>
  );
};
