
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { buildPackageOptions } from "@/data/buildPackageOptions";

type BuildPreviewProps = {
  selectedOptions: Record<string, { material: string; color: string }>;
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
              alt={`${selection.material} in ${selection.color}`}
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
                {selection.material} - {selection.color}
              </p>
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
