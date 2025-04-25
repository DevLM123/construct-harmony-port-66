
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BankResourcesDialog } from '@/components/services/BankResourcesDialog';

type HeroProps = {
  onGetStarted: (tab?: 'login' | 'register') => void;
};

export function Hero({ onGetStarted }: HeroProps) {
  const [bankResourcesOpen, setBankResourcesOpen] = useState(false);

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-muted/50 to-muted">
      <div className="absolute inset-0 bg-grid-white/50 bg-grid-pattern" />
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">
            Building Dreams,
            <br />
            One Home at a Time
          </h1>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl text-balance">
            Experience excellence in home renovation, elevation, and construction services. Our expert team brings your vision to life with precision and care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
            <Button
              onClick={() => onGetStarted('register')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
            >
              Free Consultation
            </Button>
            <Button
              onClick={() => setBankResourcesOpen(true)}
              variant="secondary"
              size="lg"
            >
              Resources
            </Button>
          </div>
        </div>
      </div>
      <BankResourcesDialog isOpen={bankResourcesOpen} onClose={() => setBankResourcesOpen(false)} />
    </div>
  );
}

