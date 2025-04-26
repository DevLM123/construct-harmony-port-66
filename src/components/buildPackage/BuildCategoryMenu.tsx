
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type BuildCategoryMenuProps = {
  categories: { id: string; title: string }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export const BuildCategoryMenu = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: BuildCategoryMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeItemRef.current && menuRef.current) {
      const container = menuRef.current;
      const activeItem = activeItemRef.current;
      const scrollPosition = activeItem.offsetLeft - (container.clientWidth / 2) + (activeItem.clientWidth / 2);
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <div ref={menuRef} className="container mx-auto">
        <ScrollArea className="w-full px-2">
          <div className="flex gap-2 py-4">
            {categories.map((category) => (
              <button
                key={category.id}
                ref={category.id === activeCategory ? activeItemRef : null}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "px-6 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                  category.id === activeCategory
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
