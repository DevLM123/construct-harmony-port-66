
import React from 'react';
import { Building2, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type HeroProps = {
  onGetStarted: () => void;
};

// Define the feature type for before/after images
type Feature = {
  beforeImage: string;
  afterImage: string;
  title: string;
};

// Sample features data
const features: Feature[] = [
  {
    beforeImage: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a",
    afterImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    title: "Custom Home Building"
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    afterImage: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff",
    title: "Home Elevation"
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
    afterImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    title: "Interior Customization"
  }
];

export function Hero({ onGetStarted }: HeroProps) {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-pattern pt-20 pb-16 px-4">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-pulse-subtle"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400/5 rounded-full filter blur-3xl animate-pulse-subtle animate-delay-500"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 animate-fade-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Building2 className="w-4 h-4 mr-2" />
            <span>Premium Construction Services</span>
          </div>
          
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight max-w-4xl">
            Build Your Dream Home with 
            <span className="text-gradient"> Landmark</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Expert home building, elevation, and lift installation services
            with premium craftsmanship and attention to detail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="gap-2 text-base px-8 animate-fade-in"
            >
              <span>Get Started</span>
              <MoveRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-base px-8 animate-fade-in animate-delay-100"
            >
              Our Services
            </Button>
          </div>
        </div>
        
        {/* Before/After Images replacing Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-up animate-delay-200">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={cn(
                "glass-card rounded-2xl p-4 overflow-hidden cursor-pointer group",
                "hover:shadow-xl transition-all duration-300 h-full"
              )}
              onClick={() => navigate('/projects')}
            >
              <div className="relative h-44 md:h-36 lg:h-40 mb-3 overflow-hidden rounded-lg">
                <img 
                  src={feature.beforeImage} 
                  alt={`${feature.title} before`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img 
                  src={feature.afterImage} 
                  alt={`${feature.title} after`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <h3 className="text-base md:text-lg font-semibold text-center">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
