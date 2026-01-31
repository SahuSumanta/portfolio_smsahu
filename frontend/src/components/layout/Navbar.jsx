import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass-card border-b border-primary/10 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg rotate-45 group-hover:rotate-[135deg] transition-transform duration-700"></div>
              <Zap className="w-5 h-5 text-primary relative z-10" />
            </div>
            <span className="font-orbitron text-lg font-bold text-foreground tracking-wide">
              <span className="text-gradient-cyber">S</span>UMANTA
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg relative group',
                  activeSection === link.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.name}
                <span
                  className={cn(
                    'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full',
                    activeSection === link.href.replace('#', '')
                      ? 'w-full'
                      : 'w-0 group-hover:w-1/2'
                  )}
                />
              </button>
            ))}
          </div>

          {/* Resume Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://customer-assets.emergentagent.com/job_dbcea3da-54c8-4c46-bedd-a3456a73ed12/artifacts/6zxf2x28_Sumanta_Sahu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/60"
              >
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors z-50"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 glass-card border-b border-primary/10 overflow-hidden transition-all duration-500',
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                'block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium',
                activeSection === link.href.replace('#', '')
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {link.name}
            </button>
          ))}
          <a
            href="https://customer-assets.emergentagent.com/job_dbcea3da-54c8-4c46-bedd-a3456a73ed12/artifacts/6zxf2x28_Sumanta_Sahu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4"
          >
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 border-primary/30 text-foreground hover:bg-primary/10"
            >
              <Download className="w-4 h-4" />
              View Resume
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
