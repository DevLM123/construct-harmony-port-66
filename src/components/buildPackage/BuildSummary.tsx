import React from "react";
import { Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { buildPackageOptions } from "@/data/buildPackageOptions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type BuildSummaryProps = {
  selectedOptions: Record<string, { material: string; color: string }>;
  isVisible: boolean;
};

export const BuildSummary = ({
  selectedOptions,
  isVisible,
}: BuildSummaryProps) => {
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return Object.entries(selectedOptions).reduce((total, [category, selection]) => {
      const categoryData = buildPackageOptions[category as keyof typeof buildPackageOptions];
      if (!categoryData) return total;

      const material = categoryData.materials.find(m => m.name === selection.material);
      if (!material) return total;

      const colorOption = material.colors.find(c => c.name === selection.color);
      const materialPrice = material.price;
      const colorPrice = colorOption?.price || 0;

      return total + materialPrice + colorPrice;
    }, 0);
  };

  const getCategoryDetails = (category: string, selection: { material: string; color: string }) => {
    const categoryData = buildPackageOptions[category as keyof typeof buildPackageOptions];
    const material = categoryData?.materials.find(m => m.name === selection.material);
    const colorOption = material?.colors.find(c => c.name === selection.color);

    return {
      materialPrice: material?.price || 0,
      colorPrice: colorOption?.price || 0,
      title: categoryData?.title || category
    };
  };

  const handleSubmit = () => {
    navigate("/customization", { state: { buildPackage: selectedOptions } });
  };

  return (
    <Card className={cn("border-t-2 border-primary/20", !isVisible && "hidden")}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span>Your Build Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <ScrollArea className="h-[min(50vh,300px)] pr-4">
          <div className="space-y-4">
            {Object.entries(selectedOptions).map(([category, selection]) => {
              const details = getCategoryDetails(category, selection);
              return (
                <div key={category} className="border-b pb-3">
                  <h3 className="font-medium capitalize">{details.title}</h3>
                  <div className="text-sm mt-1 space-y-1">
                    <div className="flex justify-between">
                      <p>{selection.material}</p>
                      <p className="font-medium">
                        ${details.materialPrice.toLocaleString()}
                      </p>
                    </div>
                    {details.colorPrice > 0 ? (
                      <div className="flex justify-between text-muted-foreground">
                        <p>• {selection.color}</p>
                        <p>+${details.colorPrice}</p>
                      </div>
                    ) : (
                      <div className="flex justify-between text-muted-foreground">
                        <p>• {selection.color}</p>
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
                <p>${calculateTotalPrice().toLocaleString()}</p>
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