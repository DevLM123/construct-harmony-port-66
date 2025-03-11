
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast
    toast({
      title: "Message sent",
      description: "We'll get back to you within 24 hours!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
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
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="How can we help you?"
            rows={4}
            required
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full h-11">
        Send Message
      </Button>
    </form>
  );
}
