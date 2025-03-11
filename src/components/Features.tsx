
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Feature = {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    beforeImage: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a",
    afterImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    title: "Custom Home Building",
    description: "Expert home construction with premium materials and master craftsmanship for your dream residence."
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    afterImage: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff",
    title: "Home Elevation",
    description: "Professional home elevation services to protect your property from flooding and increase your home's safety and value."
  },
  {
    beforeImage: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
    afterImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    title: "Interior Customization",
    description: "Extensive design options for fixtures, finishes, cabinets, flooring, and paint colors to match your style."
  }
];

export function Features() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-secondary/50" id="features">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-secondary z-0"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive construction services for your home building, elevation, and customization needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card rounded-2xl p-6 transition-all hover:shadow-lg cursor-pointer group",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate('/projects')}
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
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
              
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              
              <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground">
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
