
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show success toast
    toast({
      title: "Login successful",
      description: "Welcome to your Landmark dashboard!",
    });
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
      <div className="space-y-4">
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button variant="link" className="px-0 h-auto font-normal text-xs">
              Forgot password?
            </Button>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="h-11"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Remember me
          </Label>
        </div>
      </div>
      
      <Button type="submit" className="w-full h-11">
        Sign In
      </Button>
      
      <div className="relative flex items-center justify-center">
        <span className="px-2 bg-background text-xs text-muted-foreground">
          Or continue with
        </span>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" className="h-11">
          Google
        </Button>
        <Button variant="outline" type="button" className="h-11">
          Apple
        </Button>
      </div>
    </form>
  );
}
