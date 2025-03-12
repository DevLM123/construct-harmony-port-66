
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CheckCircle, PaintBucket, Droplet, Grid3X3, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample customization options data
const customizationOptions = {
  fixtures: [
    { id: 1, name: 'Modern Matte Black', description: 'Sleek matte black bathroom and kitchen fixtures', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Classic Chrome', description: 'Timeless chrome fixtures for a traditional look', image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Brushed Nickel', description: 'Elegant brushed nickel fixtures with a warm tone', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Brass Accent', description: 'Luxurious brass fixtures for a premium look', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }
  ],
  cabinets: [
    { id: 1, name: 'Shaker Style', description: 'Clean lines with recessed panel doors', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Flat Panel', description: 'Minimalist design with smooth doors', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Glass Front', description: 'Elegant cabinets with glass panel inserts', image: 'https://images.unsplash.com/photo-1599413395996-97d8721e5112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Wood Grain', description: 'Natural wood grain finish with rich texture', image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }
  ],
  flooring: [
    { id: 1, name: 'Hardwood', description: 'Classic oak, maple, or walnut hardwood flooring', image: 'https://images.unsplash.com/photo-1577724562772-f0b50a0a0802?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Luxury Vinyl', description: 'Durable water-resistant vinyl with wood or stone look', image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Tile', description: 'Ceramic or porcelain tile in various patterns', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Engineered Wood', description: 'Stable engineered wood with premium top layer', image: 'https://images.unsplash.com/photo-1609587292244-217150db8d22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }
  ],
  paint: [
    { id: 1, name: 'Neutral Palette', description: 'Warm beiges, soft grays, and gentle whites', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Bold Accents', description: 'Statement walls with rich, vibrant colors', image: 'https://images.unsplash.com/photo-1589407625241-d172a0ac3349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Earth Tones', description: 'Natural earth-inspired colors for a calming atmosphere', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Coastal Blues', description: 'Ocean-inspired blues and soft aquas', image: 'https://images.unsplash.com/photo-1557592122-b9c7c0af3824?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }
  ]
};

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fixtures':
        return <Droplet className="w-5 h-5 mr-2" />;
      case 'cabinets':
        return <Grid3X3 className="w-5 h-5 mr-2" />;
      case 'flooring':
        return <Grid3X3 className="w-5 h-5 mr-2" />;
      case 'paint':
        return <PaintBucket className="w-5 h-5 mr-2" />;
      default:
        return <Palette className="w-5 h-5 mr-2" />;
    }
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {options.map((option) => (
                    <Card 
                      key={option.id} 
                      className={cn(
                        "overflow-hidden transition-all duration-300 hover:shadow-md",
                        selectedOptions[category] === option.id && "ring-2 ring-primary"
                      )}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={option.image} 
                          alt={option.name} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {selectedOptions[category] === option.id && (
                          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold mb-1">{option.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {option.description}
                        </p>
                        <Button 
                          variant={selectedOptions[category] === option.id ? "default" : "outline"}
                          className="w-full"
                          onClick={() => handleSelect(category, option.id)}
                        >
                          {selectedOptions[category] === option.id ? "Selected" : "Select"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 bg-card rounded-lg p-6 shadow-sm animate-fade-up animate-delay-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-primary" />
              Your Selections
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(selectedOptions).map(([category, selectedId]) => {
                const selectedOption = customizationOptions[category as keyof typeof customizationOptions].find(
                  option => option.id === selectedId
                );
                
                return (
                  <Card key={category} className="overflow-hidden">
                    <CardHeader className="p-4 flex flex-row items-center gap-2 pb-2">
                      {getCategoryIcon(category)}
                      <CardTitle className="text-base capitalize">{category}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {selectedOption ? (
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={selectedOption.image} 
                              alt={selectedOption.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{selectedOption.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {selectedOption.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No selection yet</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button className="px-8" onClick={openAuthModal}>
                Save Selections
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default Customization;
