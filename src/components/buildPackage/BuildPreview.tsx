
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { buildPackageOptions } from '@/data/buildPackageOptions';

type BuildPreviewProps = {
  selectedOptions: Record<string, {material: string, color: string}>;
  activeCategory: string;
};

export const BuildPreview = ({ selectedOptions, activeCategory }: BuildPreviewProps) => {
  const getPreviewImage = (category: string, material: string) => {
    const images = {
      roof: {
        'Timberland Natural': 'https://images.unsplash.com/photo-1632778149955-e80f8bf6fc09?q=80&w=2070',
        'Inverness Travertine': 'https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=2070',
      },
      floor: {
        'Merola Tile': 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070',
        'Polyester Carpet': 'https://images.unsplash.com/photo-1557177324-56c542165309?q=80&w=2070',
      },
      countertop: {
        'Granite': 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2070',
        'Laminated': 'https://images.unsplash.com/photo-1556909114-44e3563584b2?q=80&w=2070',
      },
    };
    return images[category as keyof typeof images]?.[material] || '';
  };

  const selection = selectedOptions[activeCategory];
  
  // Get price information
  const getMaterialPrice = () => {
    const catOptions = buildPackageOptions[activeCategory as keyof typeof buildPackageOptions];
    if (!catOptions) return null;
    
    const material = catOptions.materials.find(m => m.name === selection?.material);
    if (!material) return null;
    
    const colorOption = material.colors.find(c => c.name === selection?.color);
    return { 
      materialPrice: material.price,
      colorPrice: colorOption?.price || 0
    };
  };
  
  const priceInfo = getMaterialPrice();

  return (
    <Card className="sticky top-32">
      <CardContent className="p-6 space-y-4">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
          {selection && (
            <img
              src={getPreviewImage(activeCategory, selection.material)}
              alt={`${selection.material} in ${selection.color}`}
              className="h-full w-full object-cover transition-all"
            />
          )}
        </div>
        
        {selection && (
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{buildPackageOptions[activeCategory as keyof typeof buildPackageOptions]?.title}</h3>
              <p className="text-muted-foreground">
                {selection.material} - {selection.color}
              </p>
            </div>
            
            {priceInfo && (
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span>Base price:</span>
                  <span className="font-medium">${priceInfo.materialPrice.toLocaleString()}</span>
                </div>
                
                {priceInfo.colorPrice > 0 && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Color upgrade ({selection.color}):</span>
                    <span>+${priceInfo.colorPrice}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-2 font-semibold">
                  <span>Total for {buildPackageOptions[activeCategory as keyof typeof buildPackageOptions]?.title}:</span>
                  <span>${(priceInfo.materialPrice + priceInfo.colorPrice).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
