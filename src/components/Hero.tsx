
import React from 'react';
import { Building2, BarChart3, Shield, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeroProps = {
  onGetStarted: () => void;
};

export function Hero({ onGetStarted }: HeroProps) {
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
            <span>Construction Management Reimagined</span>
          </div>
          
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight tracking-tight max-w-4xl">
            Build the Future with 
            <span className="text-gradient"> Landmark</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            The premium platform for property owners to manage construction projects,
            track progress, and access essential services in one place.
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
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-up animate-delay-200">
          {[
            { 
              icon: <Building2 className="w-10 h-10 text-primary" />, 
              value: "1,250+", 
              label: "Projects Managed" 
            },
            { 
              icon: <BarChart3 className="w-10 h-10 text-primary" />, 
              value: "98%", 
              label: "Completion Rate" 
            },
            { 
              icon: <Shield className="w-10 h-10 text-primary" />, 
              value: "24/7", 
              label: "Project Support" 
            },
          ].map((stat, index) => (
            <div 
              key={index} 
              className={cn(
                "glass-card rounded-2xl p-6 flex flex-col items-center text-center",
                "hover:shadow-xl transition-all duration-300 h-full"
              )}
            >
              <div className="mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
