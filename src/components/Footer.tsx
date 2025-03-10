
import React from 'react';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Landmark</span>
            </div>
            <p className="text-muted-foreground mb-4">
              The premium platform for property owners to manage construction projects
              and track progress in one centralized hub.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Company</h4>
            <ul className="space-y-3">
              {['About', 'Careers', 'Blog', 'Customers'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-foreground/80 hover:text-primary font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Resources</h4>
            <ul className="space-y-3">
              {['Documentation', 'Support', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-foreground/80 hover:text-primary font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Legal</h4>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Security', 'Accessibility'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-foreground/80 hover:text-primary font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Landmark. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
              <Button key={social} variant="ghost" size="sm" className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                {social}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
