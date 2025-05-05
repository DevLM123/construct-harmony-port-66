import React, { useState, useEffect, useRef } from "react";
import { buildPackageOptions } from "@/data/buildPackageOptions";
import { BuildOptionCategory } from "@/components/buildPackage/BuildOptionCategory";
import { BuildPreview } from "@/components/buildPackage/BuildPreview";
import { BuildSummary } from "@/components/buildPackage/BuildSummary";
import { BuildCategoryMenu } from "@/components/buildPackage/BuildCategoryMenu";

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

export const BuildPackageConfigurator = () => {
  const categories = Object.entries(buildPackageOptions).map(([id, data]) => ({
    id,
    title: data.title,
  }));

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [activeCategory, setActiveCategory] = useState("kitchen");
  const [specialNotes, setSpecialNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleOptionSelect = (
    category: string,
    material: string,
    subtype: string,
    value: string
  ) => {
    setSelectedOptions((prev) => {
      const updated = { ...prev };
      if (!updated[category]) updated[category] = {};
      if (!updated[category][material]) {
        updated[category][material] = {
          material,
          selections: {},
        };
      }
      updated[category][material].selections[subtype] = value;
      return updated;
    });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    const element = sectionRefs.current[category];
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const mostVisible = visible.reduce((prev, curr) =>
            prev.intersectionRatio > curr.intersectionRatio ? prev : curr
          );
          const newActive = mostVisible.target.id;
          if (newActive && newActive !== activeCategory) setActiveCategory(newActive);
        }
      },
      { root: null, rootMargin: "-80px 0px -40% 0px", threshold: [0.1] }
    );

    Object.keys(buildPackageOptions).forEach((category) => {
      const el = sectionRefs.current[category];
      if (el) observer.observe(el);
    });

    return () => {
      Object.keys(buildPackageOptions).forEach((category) => {
        const el = sectionRefs.current[category];
        if (el) observer.unobserve(el);
      });
    };
  }, [activeCategory]);

  const handleSubmitBuildPackage = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = {
      build_package: selectedOptions,
      special_notes: specialNotes,
    };

    try {
      const res = await fetch("https://ipncjsbjvdepjsowdhkj.supabase.co/functions/v1/notify-buildpackage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Email send failed");

      window.alert("Email sent successfully!");

      setSelectedOptions({});
      setSpecialNotes("");
      window.location.reload();
    } catch (err) {
      console.error("Submission failed:", err);
      window.alert("Error sending email.");
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="container mx-auto px-4 pb-32">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Build Your Custom Home Package</h1>
        <p className="text-muted-foreground">
          Customize your home build with our selection of high-quality materials
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr,480px] gap-8">
        <div className="order-2 md:order-1">
          <BuildPreview
            selectedOptions={getFormattedSelectedOptions()}
            activeCategory={activeCategory}
          />
        </div>

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

          <div className="mt-16">
            <BuildSummary
              selectedOptions={selectedOptions}
              isVisible={true}
              specialNotes={specialNotes}
              onNotesChange={setSpecialNotes}
              onSubmit={handleSubmitBuildPackage}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};