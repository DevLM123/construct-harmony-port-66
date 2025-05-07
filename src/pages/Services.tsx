
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import ServiceCard from '@/components/services/ServiceCard';
import { Trash, ArrowUp, Home, Lightbulb, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthModal } from '@/components/auth/AuthModal';
import { BankResourcesDialog } from '@/components/services/BankResourcesDialog';
import { Button } from '@/components/ui/button';

const Services = () => {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [bankResourcesOpen, setBankResourcesOpen] = useState(false);

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const servicesList = [
    {
      icon: Trash,
      title: "Tear Down & Remodeling",
      description: "Transform your existing property with expert demolition and high-quality renovations to create a modern, functional living space."
    },
    {
      icon: ArrowUp,
      title: "Elevation (Lifting)",
      description: "Raise your home to protect against flooding, improve structural integrity, or create additional space underneath."
    },
    {
      icon: Home,
      title: "New Home Construction",
      description: "Build your dream home from the ground up with high-quality materials and expert craftsmanship tailored to your preferences."
    },
    {
      icon: Lightbulb,
      title: "Energy-Efficient Upgrades",
      description: "Enhance your home's efficiency with top-tier improvements, including energy-efficient windows, roofing, doors, and solar panel installations."
    }
  ];

  const handleLearnMore = (serviceTitle: string) => {
    toast.success(`You selected: ${serviceTitle}`, {
      description: "We'll contact you with more information soon.",
      duration: 3000
    });
    
    if (serviceTitle === "Elevation (Lifting)") {
      setTimeout(() => navigate('/lifts'), 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthClick={openAuthModal} />
      <div className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Landmark Construction specializes in a variety of home improvement and building services 
              tailored to meet the needs of property owners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {servicesList.map((service) => (
              <ServiceCard 
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                onLearnMore={() => handleLearnMore(service.title)}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-6">Ready to start your project?</h2>
            <div className="bg-muted p-8 rounded-lg max-w-2xl mx-auto">
              <p className="mb-4">
                Our team of experienced professionals is ready to help you bring your vision to life.
                Contact us today for a free consultation and quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <button 
                  onClick={() => openAuthModal('login')} 
                  className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Request a Quote
                </button>
                <Button 
                  onClick={() => setBankResourcesOpen(true)}
                  variant="secondary"
                  className="px-6 py-3">
                  <Compass className="h-4 w-4 mr-2" />
                  Florida Resources
                </Button>
                <button 
                  onClick={() => openAuthModal('register')}
                  className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/80 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} defaultTab={authModalTab} />
      <BankResourcesDialog isOpen={bankResourcesOpen} onClose={() => setBankResourcesOpen(false)} />
    </div>
  );
};

export default Services;
