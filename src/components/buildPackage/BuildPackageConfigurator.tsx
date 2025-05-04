
import React, { useState, useEffect, useRef } from "react";
import { buildPackageOptions } from "@/data/buildPackageOptions";
import { BuildOptionCategory } from "@/components/buildPackage/BuildOptionCategory";
import { BuildPreview } from "@/components/buildPackage/BuildPreview";
import { BuildSummary } from "@/components/buildPackage/BuildSummary";
import { BuildCategoryMenu } from "@/components/buildPackage/BuildCategoryMenu";

export const BuildPackageConfigurator = () => {
  // Extract category info from buildPackageOptions
  const categories = Object.entries(buildPackageOptions).map(([id, data]) => ({
    id,
    title: data.title,
  }));

  // Modified structure to store selections by material name
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, Record<string, { material: string; selections: Record<string, string> }>>
  >({});

  const [activeCategory, setActiveCategory] = useState("kitchen");
  const [showSummary, setShowSummary] = useState(false);
  const [specialNotes, setSpecialNotes] = useState("");
  const mainContainerRef = useRef<HTMLDivElement>(null);

  // Refs for each category section
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleOptionSelect = (
    category: string,
    material: string,
    subtype: string,
    value: string,
  ) => {
    setSelectedOptions((prev) => {
      // Create a copy of the previous state
      const newState = { ...prev };
      
      // Initialize the category if it doesn't exist
      if (!newState[category]) {
        newState[category] = {};
      }
      
      // Initialize this material selection if it doesn't exist
      if (!newState[category][material]) {
        newState[category][material] = { 
          material, 
          selections: {} 
        };
      }
      
      // Update the specific selection
      newState[category][material].selections[subtype] = value;
      
      return newState;
    });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Scroll to the category section with offset for the sticky header
    const element = sectionRefs.current[category];
    if (element) {
      const headerOffset = 100; // Adjusted offset for the sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Set up intersection observer to update active category based on scroll position
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-100px 0px -40% 0px", // Adjusted top margin
      threshold: [0.1]
    };

    const observer = new IntersectionObserver((entries) => {
      // Find the most visible section
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio to get the most visible section
        const mostVisible = visibleEntries.reduce((prev, current) => 
          (prev.intersectionRatio > current.intersectionRatio) ? prev : current
        );
        
        const sectionId = mostVisible.target.id;
        if (sectionId && sectionId !== activeCategory) {
          setActiveCategory(sectionId);
        }
      }
    }, options);

    // Observe all category sections
    Object.keys(buildPackageOptions).forEach((category) => {
      const element = sectionRefs.current[category];
      if (element) observer.observe(element);
    });

    return () => {
      Object.keys(buildPackageOptions).forEach((category) => {
        const element = sectionRefs.current[category];
        if (element) observer.unobserve(element);
      });
    };
  }, [activeCategory]);

  // Show summary when scrolled near the bottom
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show summary when user has scrolled 80% of the page
      setShowSummary(scrollPosition > documentHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNotesChange = (notes: string) => {
    setSpecialNotes(notes);
  };

  // Convert the new selection structure to the format expected by child components
  const getFormattedSelectedOptions = () => {
    const formatted: Record<string, { material: string; selections: Record<string, string> }> = {};
    
    Object.entries(selectedOptions).forEach(([category, materials]) => {
      // For each material in this category
      Object.values(materials).forEach(materialData => {
        // If no entry for this category yet, create one
        if (!formatted[category]) {
          formatted[category] = {
            material: materialData.material,
            selections: { ...materialData.selections }
          };
        } else {
          // If this is a different material type in the same category,
          // add its selections under different keys
          formatted[category].selections = {
            ...formatted[category].selections,
            ...materialData.selections
          };
        }
      });
    });
    
    return formatted;
  };

  return (
    <div className="container mx-auto px-4 pb-32" ref={mainContainerRef}>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">
          Build Your Custom Home Package
        </h1>
        <p className="text-muted-foreground">
          Customize your home build with our selection of high-quality materials
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr,480px] gap-8">
        {/* Preview Section on the Left */}
        <div className="order-2 md:order-1">
          <BuildPreview
            selectedOptions={getFormattedSelectedOptions()}
            activeCategory={activeCategory}
          />
        </div>

        {/* Material Selection Section on the Right */}
        <div className="order-1 md:order-2 relative">
          <BuildCategoryMenu
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="space-y-20 mt-12 pt-4">
            {Object.entries(buildPackageOptions).map(([category, options]) => (
              <div
                key={category}
                id={category}
                ref={(el) => (sectionRefs.current[category] = el)}
                className="scroll-mt-32 py-6"
              >
                <h2 className="text-2xl font-semibold mb-5">{options.title}</h2>
                <BuildOptionCategory
                  category={category}
                  options={options}
                  selectedOptions={getFormattedSelectedOptions()}
                  onSelect={handleOptionSelect}
                />
              </div>
            ))}
          </div>

          {/* Summary at the bottom of the right column */}
          <div className="mt-16">
            <BuildSummary 
              selectedOptions={getFormattedSelectedOptions()} 
              isVisible={true}
              specialNotes={specialNotes}
              onNotesChange={handleNotesChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
