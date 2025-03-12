
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import ServiceCard from '@/components/services/ServiceCard';
import { Trash, ArrowUp, Home, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Services = () => {
  const navigate = useNavigate();

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
    // For now, we'll show a toast notification
    toast.success(`You selected: ${serviceTitle}`, {
      description: "We'll contact you with more information soon.",
      duration: 3000
    });
    
    // For the Elevation service, we can navigate to the dedicated Lifts page
    if (serviceTitle === "Elevation (Lifting)") {
      setTimeout(() => navigate('/lifts'), 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthClick={() => {}} />
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
                <button className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Request a Quote
                </button>
                <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/80 transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
