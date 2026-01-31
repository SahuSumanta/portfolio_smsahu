import React from 'react';
import { Zap, Heart, ArrowUp, Linkedin, Github, Twitter, Instagram, Terminal } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sahusumanta/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/sahusumanta', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/imsmsahu', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/imsmsahu/', label: 'Instagram' },
];

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#hero" className="flex items-center gap-2 group" onClick={scrollToTop}>
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-lg rotate-45 group-hover:rotate-[135deg] transition-transform duration-700"></div>
                <Zap className="w-5 h-5 text-primary relative z-10" />
              </div>
              <span className="font-orbitron text-lg font-bold text-foreground tracking-wide">
                <span className="text-gradient-cyber">S</span>UMANTA
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Architecting Intelligence. Scaling Systems. Building the future of enterprise software.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Navigation
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover:border-primary/50 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-muted-foreground text-sm font-mono">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-green-400" />
              System Status: Online
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Location: India</span>
            <span className="hidden sm:inline">•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-sm font-mono">Back to Top</span>
            <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center group-hover:border-primary/50 transition-all">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
