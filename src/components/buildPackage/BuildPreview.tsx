import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { buildPackageOptions } from "@/data/buildPackageOptions";

type SelectedOptions = Record<
  string,
  Record<
    string,
    {
      material: string;
      selections: Record<string, string>;
    }
  >
>;

type BuildPreviewProps = {
  selectedOptions: SelectedOptions;
  activeCategory: string;
};

// Make sure this image exists in your /public folder
const DEFAULT_IMAGE = "/placeholder.jpg";

export const BuildPreview = ({ selectedOptions, activeCategory }: BuildPreviewProps) => {
  const materials = selectedOptions[activeCategory];

  const lastSelectedMaterial = materials
    ? Object.values(materials)[Object.values(materials).length - 1]
    : null;

  const getPreviewImage = (category: string, materialName: string): string => {
    const categoryData = buildPackageOptions[category as keyof typeof buildPackageOptions];
    const materialData = categoryData?.materials.find((m) => m.name === materialName);
    return materialData?.imageUrl || DEFAULT_IMAGE;
  };

  return (
    <Card className="sticky top-[110px]">
      <CardContent className="p-6 space-y-4">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
          <img
            src={
              lastSelectedMaterial
                ? getPreviewImage(activeCategory, lastSelectedMaterial.material)
                : DEFAULT_IMAGE
            }
            alt="Preview"
            className="h-full w-full object-cover transition-all"
          />
        </div>

        {lastSelectedMaterial ? (
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">
                {buildPackageOptions[activeCategory]?.title}
              </h3>
              <p className="text-muted-foreground">{lastSelectedMaterial.material}</p>
              <div className="mt-2">
                {Object.entries(lastSelectedMaterial.selections).map(([subtype, value]) => (
                  <div key={subtype} className="text-sm mt-1">
                    <span className="capitalize">{subtype}:</span>{" "}
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No selections made in this category.</p>
        )}
      </CardContent>
    </Card>
  );
};
