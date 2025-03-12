
import React from 'react';
import { Building2, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-[#1e2832] text-white border-t border-amber-500/20">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-amber-500" />
              <div className="font-semibold">
                <span className="text-amber-500">Landmark</span> <span className="text-white">Home</span>
                <div className="text-sm text-gray-400 -mt-1">CONSTRUCTION</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Premium home building and elevation services with expert craftsmanship
              and attention to detail for your dream home.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-amber-500">Services</h4>
            <ul className="space-y-3">
              {['Home Building', 'Home Elevation', 'Lift Installation', 'Interior Design'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-amber-500 font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-amber-500">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Projects', 'Testimonials', 'Contact'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-amber-500 font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm uppercase tracking-wider text-amber-500">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Warranty', 'FAQ'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-amber-500 font-normal">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Landmark Home Construction. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
