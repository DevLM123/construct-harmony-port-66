
import React from 'react';
import { Package, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { buildPackageOptions } from '@/data/buildPackageOptions';
import { ScrollArea } from '@/components/ui/scroll-area';

type BuildSummaryProps = {
  selectedOptions: Record<string, {material: string, color: string}>;
  isVisible: boolean;
};

export const BuildSummary = ({ selectedOptions, isVisible }: BuildSummaryProps) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/customization', { state: { buildPackage: selectedOptions } });
  };

  // Calculate total price
  const calculatePrice = () => {
    let total = 0;
    
    Object.entries(selectedOptions).forEach(([category, { material, color }]) => {
      const categoryData = buildPackageOptions[category as keyof typeof buildPackageOptions];
      const materialData = categoryData.materials.find(m => m.name === material);
      
      if (materialData) {
        total += materialData.price;
        
        const colorData = materialData.colors.find(c => c.name === color);
        if (colorData) {
          total += colorData.price;
        }
      }
    });
    
    return total;
  };
  
  const totalPrice = calculatePrice();

  return (
    <Card className={`sticky bottom-6 transition-all duration-300 shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span>Your Build Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <ScrollArea className="h-[min(50vh,300px)] pr-4">
          <div className="space-y-4">
            {Object.entries(selectedOptions).map(([category, { material, color }]) => {
              const categoryData = buildPackageOptions[category as keyof typeof buildPackageOptions];
              const materialData = categoryData.materials.find(m => m.name === material);
              const materialPrice = materialData?.price || 0;
              const colorData = materialData?.colors.find(c => c.name === color);
              const colorPrice = colorData?.price || 0;
              const totalItemPrice = materialPrice + colorPrice;
              
              return (
                <div key={category} className="border-b pb-3">
                  <h3 className="font-medium capitalize">{categoryData.title}</h3>
                  <div className="text-sm mt-1 space-y-1">
                    <div className="flex justify-between">
                      <p>{material}</p>
                      <p className="font-medium">${materialPrice.toLocaleString()}</p>
                    </div>
                    {colorPrice > 0 && (
                      <div className="flex justify-between text-muted-foreground">
                        <p>• {color}</p>
                        <p>+${colorPrice}</p>
                      </div>
                    )}
                    {colorPrice === 0 && (
                      <div className="flex justify-between text-muted-foreground">
                        <p>• {color}</p>
                        <p><Check className="h-3 w-3" /></p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            <div className="pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>${totalPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
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
