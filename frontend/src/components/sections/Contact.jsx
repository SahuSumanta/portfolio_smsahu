import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Linkedin, Github, Twitter, Instagram, CheckCircle, AlertCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sahusumanta/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/sahusumanta', label: 'GitHub' },
  { icon: Twitter, href: 'https://x.com/imsmsahu', label: 'Twitter' },
  { icon: Instagram, href: 'https://www.instagram.com/imsmsahu/', label: 'Instagram' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'sumantasahu.sm@gmail.com', href: 'mailto:sumantasahu.sm@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 7751038364', href: 'tel:+917751038364' },
  { icon: MapPin, label: 'Location', value: 'Indore, India', href: null },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConsentChange = (checked) => {
    setFormData((prev) => ({ ...prev, consent: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setStatus({ type: 'error', message: 'Please accept the consent to proceed.' });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
    setFormData({ name: '', email: '', message: '', consent: false });
    setIsSubmitting(false);

    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Floating Orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-mono font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-6 tracking-widest">
            CONNECT
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Establish <span className="text-gradient-cyber">Uplink</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Open to corporate roles and exciting opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className={`contact-card glass-card p-5 rounded-xl flex items-center gap-4 group hover:border-primary/30 transition-all duration-300 ${
                  info.href ? 'cursor-pointer' : 'cursor-default'
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{info.label}</p>
                  <p className="text-foreground font-medium text-lg">{info.value}</p>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="contact-card glass-card p-6 rounded-xl">
              <h3 className="font-orbitron text-lg font-semibold text-foreground mb-4">
                Social Connect
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl glass-card hover:border-primary/50 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="contact-card glass-card p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
                </span>
                <div>
                  <p className="text-foreground font-medium">System Status: Online</p>
                  <p className="text-sm text-muted-foreground font-mono">Open to opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="contact-card glass-card p-8 rounded-2xl hud-corner">
            <h3 className="font-orbitron text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-mono text-sm">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-mono text-sm">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-mono text-sm">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-secondary/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={handleConsentChange}
                  className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                />
                <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I consent to having my data stored and used to respond to my inquiry.
                </Label>
              </div>

              {status.message && (
                <div
                  className={`flex items-center gap-2 p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span className="text-sm">{status.message}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="cyber"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
