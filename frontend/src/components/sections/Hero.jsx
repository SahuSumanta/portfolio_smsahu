import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Twitter, Instagram, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sahusumanta/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/sahusumanta', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/imsmsahu', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/imsmsahu/', label: 'Instagram' },
];

const titles = ['Software Engineer', 'Full Stack Developer', 'Angular Expert', 'UI Architect'];

export const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTitle.length) {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
        
        {/* Arc Reactor Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl"></div>
        
        {/* Corner Decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl"></div>
        <div className="absolute top-20 right-10 w-32 h-32 border-r-2 border-t-2 border-primary/20 rounded-tr-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 border-l-2 border-b-2 border-primary/20 rounded-bl-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border-r-2 border-b-2 border-primary/20 rounded-br-3xl"></div>
      </div>

      {/* HUD Frame */}
      <div className="absolute top-24 left-6 hidden lg:flex flex-col gap-4 opacity-30">
        <div className="h-20 w-1 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="h-10 w-1 bg-gradient-to-b from-primary/50 to-transparent"></div>
      </div>
      <div className="absolute top-24 right-6 hidden lg:flex flex-col gap-4 opacity-30">
        <div className="h-20 w-1 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="h-10 w-1 bg-gradient-to-b from-primary/50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </div>

        {/* Name */}
        <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-foreground">SUMANTA </span>
          <span className="text-gradient-hud">SAHU</span>
        </h1>

        {/* Dynamic Title */}
        <div className="h-12 mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl sm:text-2xl lg:text-3xl font-exo text-primary">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        {/* Location & Company */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>Vision Waves</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-primary/50 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Indore, India</span>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Building scalable enterprise web applications and AI-driven products with 3.5+ years of experience
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button variant="arc" size="lg" onClick={scrollToContact}>
            Get In Touch
          </Button>
          <Button variant="hud" size="lg" onClick={scrollToAbout}>
            Explore Portfolio
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3 rounded-xl glass-card hover:border-primary/50 transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
      >
        <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
