
import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/auth/AuthModal';
import { ExportButton } from '@/components/ExportButton';

const Index = () => {
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
      <main className="flex-grow">
        <Hero onGetStarted={openAuthModal} />
        <div className="container mx-auto px-4 py-8">
          <ExportButton />
        </div>
        <Features />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} defaultTab={authModalTab} />
    </div>
  );
};

export default Index;
