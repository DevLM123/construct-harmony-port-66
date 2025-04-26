
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

type BuildPreviewProps = {
  selectedOptions: Record<string, {material: string, color: string}>;
};

export const BuildPreview = ({ selectedOptions }: BuildPreviewProps) => {
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

  const activeCategory = Object.entries(selectedOptions)[0];
  const [category, selection] = activeCategory;

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={getPreviewImage(category, selection.material)}
            alt={`${selection.material} in ${selection.color}`}
            className="h-full w-full object-cover transition-all"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Current Selection</h3>
          <p className="text-sm text-muted-foreground">
            {selection.material} - {selection.color}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
