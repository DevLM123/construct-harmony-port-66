
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Home, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Feature = {
  icon: React.ReactNode;
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <Building2 className="w-8 h-8 text-amber-600" />,
    beforeImage: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a",
    afterImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
    title: "Custom Home Building",
    description: "Expert home construction with premium materials and master craftsmanship for your dream residence."
  },
  {
    icon: <Home className="w-8 h-8 text-amber-600" />,
    beforeImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    afterImage: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff",
    title: "Home Elevation",
    description: "Professional home elevation services to protect your property from flooding and increase your home's safety and value."
  },
  {
    icon: <Landmark className="w-8 h-8 text-amber-600" />,
    beforeImage: "https://images.unsplash.com/photo-1577493340887-b7bfff550145",
    afterImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    title: "Interior Customization",
    description: "Extensive design options for fixtures, finishes, cabinets, flooring, and paint colors to match your style."
  }
];

export function Features() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden bg-[#1e2832]/5" id="features">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-secondary z-0"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive construction services for your home building, elevation, and customization needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card rounded-2xl p-4 md:p-5 lg:p-6 transition-all hover:shadow-lg cursor-pointer group",
                "animate-fade-up border-amber-600/20"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => navigate('/projects')}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-3 rounded-xl">
                  {feature.icon}
                </div>
                <div className="p-2 bg-[#1e2832]/10 rounded-full">
                  <ArrowRight className="w-4 h-4 text-[#1e2832] group-hover:text-amber-600 transition-colors" />
                </div>
              </div>
              
              <div className="relative h-48 md:h-40 lg:h-52 mb-4 overflow-hidden rounded-lg">
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
              
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{feature.description}</p>
              
              <Button variant="outline" className="w-full justify-between group-hover:bg-amber-600 group-hover:text-white border-amber-600/30">
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
