
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BuildPackageConfigurator } from '@/components/buildPackage/BuildPackageConfigurator';
import { AuthModal } from '@/components/auth/AuthModal';

const BuildPackage = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

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
