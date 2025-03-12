
import React from 'react';
import { Building2, MoveRight, BarChart3, Shield, Clock, Hammer, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type HeroProps = {
  onGetStarted: () => void;
};

export function Hero({ onGetStarted }: HeroProps) {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero-pattern pt-20 pb-16 px-4">
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-pulse-subtle"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#d1c7b8]/10 rounded-full filter blur-3xl animate-pulse-subtle animate-delay-500"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 animate-fade-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#f6f4ef] text-[#bbb3a5] text-sm font-medium mb-6 border border-[#e9e5dc]">
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
              className="gap-2 text-base px-8 animate-fade-in bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 border border-[#e9e5dc]/30"
            >
              <span>Get Started</span>
              <MoveRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-base px-8 animate-fade-in animate-delay-100 border-[#e9e5dc] hover:bg-[#f8f7f4]"
              onClick={() => navigate('/projects')}
            >
              Our Services
            </Button>
          </div>
        </div>
        
        {/* Stats and Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 animate-fade-up animate-delay-200">
          <div 
            className={cn(
              "glass-card rounded-2xl p-6 flex flex-col items-center text-center",
              "hover:shadow-xl transition-all duration-300 h-full border-[#e9e5dc]"
            )}
          >
            <div className="mb-4 p-3 bg-[#f6f4ef] rounded-full">
              <Hammer className="w-8 h-8 text-[#bbb3a5]" />
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">Premium</div>
            <div className="text-[#bbb3a5] mb-2">Craftsmanship</div>
            <p className="text-sm text-muted-foreground">Meticulous attention to detail in every aspect of your custom build</p>
          </div>
          
          <div 
            className={cn(
              "glass-card rounded-2xl p-6 flex flex-col items-center text-center",
              "hover:shadow-xl transition-all duration-300 h-full border-[#e9e5dc]"
            )}
          >
            <div className="mb-4 p-3 bg-primary/10 rounded-full">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">20+ Years</div>
            <div className="text-muted-foreground mb-2">Combined Experience</div>
            <p className="text-sm text-muted-foreground">Our expert team brings decades of construction knowledge to your project</p>
          </div>
          
          <div 
            className={cn(
              "glass-card rounded-2xl p-6 flex flex-col items-center text-center",
              "hover:shadow-xl transition-all duration-300 h-full border-[#e9e5dc]"
            )}
          >
            <div className="mb-4 p-3 bg-[#f6f4ef] rounded-full">
              <Shield className="w-8 h-8 text-[#bbb3a5]" />
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">10 Year</div>
            <div className="text-[#bbb3a5] mb-2">Warranty Guarantee</div>
            <p className="text-sm text-muted-foreground">Peace of mind with our industry-leading warranty coverage</p>
          </div>

          <div 
            className={cn(
              "glass-card rounded-2xl p-6 flex flex-col items-center text-center",
              "hover:shadow-xl transition-all duration-300 h-full border-[#e9e5dc]"
            )}
          >
            <div className="mb-4 p-3 bg-primary/10 rounded-full">
              <Layers className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">Modern</div>
            <div className="text-muted-foreground mb-2">Techniques</div>
            <p className="text-sm text-muted-foreground">State-of-the-art construction methods for efficiency and quality</p>
          </div>
        </div>
      </div>
    </section>
  );
}
