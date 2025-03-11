
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Building2, Menu, X, UserCircle, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

type NavLink = {
  label: string;
  href: string;
};

const links: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Lifts', href: '/lifts' },
  { label: 'Customization', href: '/customization' },
  { label: 'Services', href: '/dashboard' }
];

export function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-3',
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-border/50' 
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-primary font-medium text-lg transition-all hover:opacity-80"
            >
              <Building2 className="w-6 h-6" />
              <span className={cn(
                "font-semibold transition-all duration-300",
                isScrolled ? "text-foreground" : "text-foreground"
              )}>
                Landmark
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onAuthClick}
              className={cn(
                "hidden md:flex items-center gap-2 transition-all duration-300",
                isScrolled 
                  ? "border-muted hover:border-primary/50" 
                  : "border-muted/50 hover:border-primary/50"
              )}
            >
              <UserCircle className="w-4 h-4" />
              <span>Contact Us</span>
            </Button>
            
            <Button 
              onClick={onAuthClick}
              size="sm"
              className="hidden md:flex animate-fade-in"
            >
              Free Consultation
            </Button>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-background/95 backdrop-blur-lg transition-all duration-300 md:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 pt-20 pb-10 h-full overflow-y-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(false)} 
            className="absolute top-4 right-4"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <nav className="flex flex-col space-y-2">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  navigate(link.href);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "py-3 px-4 text-base font-medium rounded-lg transition-all",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-8 grid gap-3">
            <Button 
              variant="outline" 
              onClick={() => {
                onAuthClick();
                setMobileMenuOpen(false);
              }}
              className="w-full justify-center"
            >
              Contact Us
            </Button>
            <Button 
              onClick={() => {
                onAuthClick();
                setMobileMenuOpen(false);
              }}
              className="w-full justify-center"
            >
              Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
