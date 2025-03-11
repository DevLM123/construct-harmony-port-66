
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
    title: "Home Building",
    description: "Expert home construction with premium materials and craftsmanship for your dream residence."
  },
  {
    icon: <Building className="w-10 h-10 text-primary" />,
    title: "Home Elevation",
    description: "Professional home elevation services to protect your property and increase its value."
  },
  {
    icon: <Building2 className="w-10 h-10 text-primary" />,
    title: "Lift Installation",
    description: "Residential and commercial lift solutions with detailed compliance and safety standards."
  },
  {
    icon: <Palette className="w-10 h-10 text-primary" />,
    title: "Interior Customization",
    description: "Extensive customization options for fixtures, finishes, cabinets, flooring, and paint colors."
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-primary" />,
    title: "Seamless Communication",
    description: "Stay connected with in-app messaging and automated status updates for your project."
  },
  {
    icon: <LayoutDashboard className="w-10 h-10 text-primary" />,
    title: "Project Dashboard",
    description: "Monitor your home building or elevation project with real-time updates and notifications."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "Mobile Accessibility",
    description: "Access your project details anytime, anywhere with our fully responsive web application."
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: "Enhanced Security",
    description: "Rest easy with end-to-end encryption and role-based access for all your sensitive data."
  }
];

export function Features() {
  return (
    <section className="py-24 px-4 relative overflow-hidden bg-secondary/50" id="features">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-secondary z-0"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for high-quality home building, elevation, and customization
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
