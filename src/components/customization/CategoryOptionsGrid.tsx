
import React from 'react';
import { CustomizationOption, CustomizationOptionCard } from './CustomizationOptionCard';

interface CategoryOptionsGridProps {
  options: CustomizationOption[];
  selectedOptionId: number | null;
  onSelect: (id: number) => void;
}

export const CategoryOptionsGrid: React.FC<CategoryOptionsGridProps> = ({
  options,
  selectedOptionId,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {options.map((option) => (
        <CustomizationOptionCard
          key={option.id}
          option={option}
          isSelected={selectedOptionId === option.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
