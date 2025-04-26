
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast
    toast({
      title: "Package submitted",
      description: "Our team will review your selections and provide an estimate within 48 hours!",
    });

    // Navigate to build package page
    navigate('/build-package');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-center mb-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Package className="w-6 h-6 text-primary" />
        </div>
      </div>

      <p className="text-center text-muted-foreground mb-4">
        Review your home customization selections and submit for an estimate.
        Our team will use this information to prepare initial construction plans.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            required
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            required
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="(123) 456-7890"
            type="tel"
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Special Instructions</Label>
          <Textarea
            id="message"
            placeholder="Any additional details or special requirements?"
            rows={4}
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full h-11">
        Continue To Build Package
      </Button>
    </form>
  );
}
