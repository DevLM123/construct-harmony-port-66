
import React, { useState, useEffect, useRef } from 'react';
import { buildPackageOptions } from '@/data/buildPackageOptions';
import { BuildOptionCategory } from '@/components/buildPackage/BuildOptionCategory';
import { BuildPreview } from '@/components/buildPackage/BuildPreview';
import { BuildSummary } from '@/components/buildPackage/BuildSummary';
import { BuildCategoryMenu } from '@/components/buildPackage/BuildCategoryMenu';

export const BuildPackageConfigurator = () => {
  // Extract category info from buildPackageOptions
  const categories = Object.entries(buildPackageOptions).map(([id, data]) => ({
    id,
    title: data.title
  }));

  const [selectedOptions, setSelectedOptions] = useState<Record<string, {material: string, color: string}>>({
    roof: { material: 'Timberland Natural', color: 'Charcoal' },
    floor: { material: 'Merola Tile', color: 'Arte White' },
    countertop: { material: 'Granite', color: 'Rigel White' },
  });
  
  const [activeCategory, setActiveCategory] = useState('roof');
  const [showSummary, setShowSummary] = useState(false);
  
  // Refs for each category section
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const handleOptionSelect = (category: string, material: string, color: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: { material, color }
    }));
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Scroll to the category section
    sectionRefs.current[category]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Set up intersection observer to update active category based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveCategory(entry.target.id);
        }
      });
    }, { 
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0.1
    });

    // Observe all category sections
    Object.keys(buildPackageOptions).forEach(category => {
      const element = sectionRefs.current[category];
      if (element) observer.observe(element);
    });

    return () => {
      Object.keys(buildPackageOptions).forEach(category => {
        const element = sectionRefs.current[category];
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Show summary when scrolled near the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show summary when user has scrolled 80% of the page
      setShowSummary(scrollPosition > documentHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container mx-auto px-4 pb-32">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Build Your Custom Home Package</h1>
        <p className="text-muted-foreground">
          Customize your home build with our selection of high-quality materials
        </p>
      </div>

      {/* Scrollable Category Menu */}
      <BuildCategoryMenu 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Preview Section on the Left */}
        <div className="order-2 md:order-1">
          <BuildPreview 
            selectedOptions={selectedOptions} 
            activeCategory={activeCategory}
          />
        </div>

        {/* Material Selectors on the Right */}
        <div className="order-1 md:order-2">
          <div className="space-y-16">
            {Object.entries(buildPackageOptions).map(([category, options]) => (
              <div 
                key={category}
                id={category}
                ref={el => sectionRefs.current[category] = el}
                className="scroll-mt-32"
              >
                <h2 className="text-2xl font-semibold mb-4">{options.title}</h2>
                <BuildOptionCategory
                  category={category}
                  options={options}
                  selectedMaterial={selectedOptions[category]?.material}
                  selectedColor={selectedOptions[category]?.color}
                  onSelect={handleOptionSelect}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Summary at the Bottom */}
      <div className="fixed bottom-6 left-0 right-0 px-4 max-w-md mx-auto z-40">
        <BuildSummary selectedOptions={selectedOptions} isVisible={showSummary} />
      </div>
    </div>
  );
};
