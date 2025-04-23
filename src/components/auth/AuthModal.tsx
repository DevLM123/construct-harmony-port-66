
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
};

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl p-0 overflow-hidden">
        <DialogHeader className="pt-6 px-6">
          <DialogTitle className="text-2xl font-semibold text-center">
            {activeTab === 'login' ? 'Your Build Package' : 'Request Consultation'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6 rounded-none border-b">
            <TabsTrigger value="login" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Build Package
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Free Consultation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="m-0 p-6 pt-2">
            <LoginForm />
          </TabsContent>
          
          <TabsContent value="register" className="m-0 p-6 pt-2">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
