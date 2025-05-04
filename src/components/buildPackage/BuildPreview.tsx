
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { buildPackageOptions } from "@/data/buildPackageOptions";

type BuildPreviewProps = {
  selectedOptions: Record<string, { 
    material: string; 
    selections: Record<string, string> 
  }>;
  activeCategory: string;
};

export const BuildPreview = ({
  selectedOptions,
  activeCategory,
}: BuildPreviewProps) => {
  const getPreviewImage = (category: string, material: string) => {
    const categoryData = buildPackageOptions[category as keyof typeof buildPackageOptions];
    if (!categoryData) return "";
    
    const materialData = categoryData.materials.find(m => m.name === material);
    return materialData?.imageUrl || "";
  };

  const selection = selectedOptions[activeCategory];

  return (
    <Card className="sticky top-32">
      <CardContent className="p-6 space-y-4">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
          {selection && (
            <img
              src={getPreviewImage(activeCategory, selection.material)}
              alt={`${selection.material}`}
              className="h-full w-full object-cover transition-all"
            />
          )}
        </div>

        {selection && (
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">
                {
                  buildPackageOptions[
                    activeCategory as keyof typeof buildPackageOptions
                  ]?.title
                }
              </h3>
              <p className="text-muted-foreground">
                {selection.material}
              </p>
              <div className="mt-2">
                {Object.entries(selection.selections).map(([subtype, value]) => (
                  <div key={subtype} className="text-sm flex items-center mt-1">
                    <span className="capitalize">{subtype}:</span> 
                    <span className="ml-1 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t">
              <div className="flex justify-between items-center mt-2">
                <p className="text-muted-foreground text-sm">
                  Selected option for {
                    buildPackageOptions[
                      activeCategory as keyof typeof buildPackageOptions
                    ]?.title.toLowerCase()
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
