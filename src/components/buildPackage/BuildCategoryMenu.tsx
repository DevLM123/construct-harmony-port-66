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
    <div ref={menuRef} className="pb-3 border-b">
      <ScrollArea className="w-full px-2">
        <div className="flex overflow-x-auto gap-2 pb-2 border-b sticky top-[72px] bg-background/80 backdrop-blur-md z-40 shadow-sm">
          {categories.map((category) => (
            <button
              key={category.id}
              ref={category.id === activeCategory ? activeItemRef : null}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                category.id === activeCategory
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {category.title}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};