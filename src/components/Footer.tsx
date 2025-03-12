
import React from 'react';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-background border-t border-[#e9e5dc]">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <div className="font-semibold">
                <span className="text-primary">Landmark</span> <span className="text-foreground">Home</span>
                <div className="text-sm text-[#d1c7b8] -mt-1">CONSTRUCTION</div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Premium home building and elevation services with expert craftsmanship
              and attention to detail for your dream home.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-[#bbb3a5]">Services</h4>
            <ul className="space-y-3">
              {['Home Building', 'Home Elevation', 'Lift Installation', 'Interior Design'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-foreground/80 hover:text-primary font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-[#bbb3a5]">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Projects', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-foreground/80 hover:text-primary font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-[#bbb3a5]">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Warranty', 'FAQ'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-foreground/80 hover:text-primary font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#e9e5dc] flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Landmark Home Construction. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social) => (
              <Button key={social} variant="ghost" size="sm" className="h-auto p-0 text-sm text-muted-foreground hover:text-[#d1c7b8]">
                {social}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
