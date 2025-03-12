
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Droplet, Grid3X3, PaintBucket } from 'lucide-react';
import { CategoryOptionsGrid } from '@/components/customization/CategoryOptionsGrid';
import { SelectionSummary } from '@/components/customization/SelectionSummary';
import { customizationOptions } from '@/data/customizationOptions';

const Customization = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number | null>>({
    fixtures: null,
    cabinets: null,
    flooring: null,
    paint: null
  });

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleSelect = (category: string, id: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: prev[category] === id ? null : id
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/25">
      <Navbar onAuthClick={openAuthModal} />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-10 animate-fade-up">
            <h1 className="text-3xl font-bold mb-3">Home Customization Options</h1>
            <p className="text-muted-foreground max-w-3xl">
              Personalize your home with our premium selection of fixtures, cabinets, flooring, and paint colors. 
              Choose the options that match your style and vision for your dream home.
            </p>
          </div>
          
          <Tabs defaultValue="fixtures" className="animate-fade-up animate-delay-100">
            <TabsList className="mb-8 flex flex-wrap">
              <TabsTrigger value="fixtures" className="flex items-center">
                <Droplet className="w-4 h-4 mr-2" />
                <span>Fixtures</span>
              </TabsTrigger>
              <TabsTrigger value="cabinets" className="flex items-center">
                <Grid3X3 className="w-4 h-4 mr-2" />
                <span>Cabinets</span>
              </TabsTrigger>
              <TabsTrigger value="flooring" className="flex items-center">
                <Grid3X3 className="w-4 h-4 mr-2" />
                <span>Flooring</span>
              </TabsTrigger>
              <TabsTrigger value="paint" className="flex items-center">
                <PaintBucket className="w-4 h-4 mr-2" />
                <span>Paint</span>
              </TabsTrigger>
            </TabsList>
            
            {Object.entries(customizationOptions).map(([category, options]) => (
              <TabsContent key={category} value={category} className="m-0">
                <CategoryOptionsGrid
                  options={options}
                  selectedOptionId={selectedOptions[category]}
                  onSelect={(id) => handleSelect(category, id)}
                />
              </TabsContent>
            ))}
          </Tabs>
          
          <SelectionSummary
            selectedOptions={selectedOptions}
            customizationOptions={customizationOptions}
            onSaveClick={openAuthModal}
          />
        </div>
      </main>
      
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default Customization;
