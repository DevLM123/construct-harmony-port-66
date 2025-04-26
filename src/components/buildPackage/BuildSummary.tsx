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
  selectedOptions: Record<string, Record<string, { color: string }>>;
  isVisible: boolean;
};

export const BuildSummary = ({
  selectedOptions,
  isVisible,
}: BuildSummaryProps) => {
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    let total = 0;
    for (const category in selectedOptions) {
      for (const material in selectedOptions[category]) {
        const categoryData =
          buildPackageOptions[category as keyof typeof buildPackageOptions];
        const mat = categoryData?.materials.find((m) => m.name === material);
        const colorOption = mat?.colors.find(
          (c) => c.name === selectedOptions[category][material].color,
        );
        total += (mat?.price || 0) + (colorOption?.price || 0);
      }
    }
    return total;
  };

  const getCategoryDetails = (
    category: string,
    selection: Record<string, { color: string }>,
  ) => {
    const categoryData =
      buildPackageOptions[category as keyof typeof buildPackageOptions];
    let totalPrice = 0;
    const items: { material: string; color: string; price: number }[] = [];
    for (const material in selection) {
      const mat = categoryData?.materials.find((m) => m.name === material);
      const colorOption = mat?.colors.find(
        (c) => c.name === selection[material].color,
      );
      const price = (mat?.price || 0) + (colorOption?.price || 0);
      totalPrice += price;
      items.push({ material, color: selection[material].color, price });
    }

    return {
      totalPrice,
      items,
      title: categoryData?.title || category,
    };
  };

  const handleSubmit = () => {
    navigate("/customization", { state: { buildPackage: selectedOptions } });
  };

  return (
    <Card
      className={cn("border-t-2 border-primary/20", !isVisible && "hidden")}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          <span>Your Build Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <ScrollArea className="h-[min(50vh,300px)] pr-4">
          <div className="space-y-4">
            {Object.entries(buildPackageOptions).map(
              ([category, categoryData]) => {
                const selection = selectedOptions[category];
                if (!selection) {
                  return (
                    <div key={category} className="border-b pb-3">
                      <h4 className="font-medium capitalize">
                        {categoryData.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        No selection made
                      </p>
                    </div>
                  );
                }

                const details = getCategoryDetails(category, selection);
                return (
                  <div key={category} className="border-b pb-3">
                    <h4 className="font-medium capitalize">{details.title}</h4>
                    <div className="text-sm mt-1 space-y-1">
                      {details.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <p>
                            {item.material} - {item.color}
                          </p>
                          <p className="font-medium">
                            ${item.price.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              },
            )}

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
