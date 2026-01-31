import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Github, Linkedin, Twitter, Instagram, MapPin, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sahusumanta/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/sahusumanta', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/imsmsahu', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/imsmsahu/', label: 'Instagram' },
];

const titles = ['Software Engineer', 'Angular Architect', 'AI Builder', 'System Designer'];

export const Hero = () => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  // Typing animation
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

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 100, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        {/* Radial Gradient Spotlights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Corner Decorations */}
        <div className="absolute top-20 left-8 w-32 h-32 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl"></div>
        <div className="absolute top-20 right-8 w-32 h-32 border-r-2 border-t-2 border-primary/20 rounded-tr-3xl"></div>
        <div className="absolute bottom-20 left-8 w-32 h-32 border-l-2 border-b-2 border-primary/20 rounded-bl-3xl"></div>
        <div className="absolute bottom-20 right-8 w-32 h-32 border-r-2 border-b-2 border-primary/20 rounded-br-3xl"></div>
      </div>

      {/* Vertical Lines */}
      <div className="absolute top-24 left-6 hidden lg:flex flex-col gap-4 opacity-30">
        <div className="h-24 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="h-12 w-0.5 bg-gradient-to-b from-primary/50 to-transparent"></div>
      </div>
      <div className="absolute top-24 right-6 hidden lg:flex flex-col gap-4 opacity-30">
        <div className="h-24 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="h-12 w-0.5 bg-gradient-to-b from-primary/50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-sm text-muted-foreground">Available for opportunities</span>
        </div>

        {/* Name - The Command Center */}
        <div ref={nameRef}>
          <h1 className="font-orbitron text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-wider">
            <span className="text-foreground">SUMANTA </span>
            <span className="text-gradient-cyber">SAHU</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-8">
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-4 font-space">
            Architecting Intelligence. Scaling Systems.
          </p>
          
          {/* Dynamic Title */}
          <div className="h-12 flex items-center justify-center">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-orbitron text-primary">
              {displayedText}
              <span className="animate-pulse text-accent">|</span>
            </p>
          </div>
        </div>

        {/* Location & Company */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm">Vision Waves</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-primary/50 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="font-mono text-sm">Indore, India</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Button 
            variant="default"
            size="lg" 
            onClick={scrollToContact}
            className="magnetic-btn bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold px-8 hover:shadow-glow-lg transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            onClick={scrollToAbout}
            className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/60 font-semibold px-8"
          >
            Explore Portfolio
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4">
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
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
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
        <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
