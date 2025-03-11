
import React from 'react';
import { LayoutDashboard, Home, Building, Palette, Building2, Shield, MessageSquare, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <Home className="w-10 h-10 text-primary" />,
    title: "Custom Home Building",
    description: "Expert home construction with premium materials and master craftsmanship for your dream residence."
  },
  {
    icon: <Building className="w-10 h-10 text-primary" />,
    title: "Home Elevation",
    description: "Professional home elevation services to protect your property from flooding and increase its value."
  },
  {
    icon: <Building2 className="w-10 h-10 text-primary" />,
    title: "Lift Installation",
    description: "Residential and commercial lift solutions with meticulous attention to compliance and safety standards."
  },
  {
    icon: <Palette className="w-10 h-10 text-primary" />,
    title: "Interior Customization",
    description: "Extensive design options for fixtures, finishes, cabinets, flooring, and paint colors to match your style."
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: "Dedicated Project Management",
    description: "Transparent communication and regular updates throughout your entire construction project."
  },
  {
    icon: <LayoutDashboard className="w-10 h-10 text-primary" />,
    title: "Detailed Planning",
    description: "Comprehensive planning and design services to bring your vision to life with precision and quality."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "Responsive Service",
    description: "Quick response times and accessible team members to address your questions and concerns."
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Quality Guarantee",
    description: "Industry-leading warranty and quality assurance for every aspect of your construction project."
  }
];

export function Features() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "glass-card rounded-2xl p-6 transition-all hover:shadow-lg hover:translate-y-[-4px]",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
