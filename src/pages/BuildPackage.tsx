
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BuildPackageConfigurator } from '@/components/buildPackage/BuildPackageConfigurator';
import { AuthModal } from '@/components/auth/AuthModal';
import { useToast } from '@/hooks/use-toast';

const BuildPackage = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const { toast } = useToast();

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };
  
  useEffect(() => {
    toast({
      title: "Build Package Started",
      description: "Scroll down to view all material options and see your summary",
      duration: 5000,
    });
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAuthClick={openAuthModal} />
      <main className="flex-grow pt-24 pb-16">
        <BuildPackageConfigurator />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} defaultTab={authModalTab} />
    </div>
  );
};

export default BuildPackage;
