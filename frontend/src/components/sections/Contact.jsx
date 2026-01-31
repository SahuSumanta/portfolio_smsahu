import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, Linkedin, Github, Twitter, Instagram, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sahusumanta/', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
  { icon: Github, href: 'https://github.com/sahusumanta', label: 'GitHub', color: 'hover:text-foreground' },
  { icon: Twitter, href: 'https://x.com/imsmsahu', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
  { icon: Instagram, href: 'https://www.instagram.com/imsmsahu/', label: 'Instagram', color: 'hover:text-[#E4405F]' },
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
    
    // Simulate form submission (mock functionality)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
    setFormData({ name: '', email: '', message: '', consent: false });
    setIsSubmitting(false);

    // Clear status after 5 seconds
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      {/* Arc Reactor Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            // GET IN TOUCH
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Establish <span className="text-gradient-hud">Connection</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm open to corporate roles and exciting opportunities. Feel free to reach out!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <a
                  key={info.label}
                  href={info.href}
                  className={`glass-card p-5 rounded-xl flex items-center gap-4 group hover:border-primary/50 transition-all duration-300 ${
                    info.href ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="text-foreground font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass-card p-6 rounded-xl">
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
                    className={`p-4 rounded-xl glass-card hover:border-primary/50 transition-all duration-300 group ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-muted-foreground group-hover:scale-110 transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                </span>
                <div>
                  <p className="text-foreground font-medium">Available for Opportunities</p>
                  <p className="text-sm text-muted-foreground">Open to full-time roles & collaborations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="glass-card p-6 lg:p-8 rounded-2xl hud-corner">
            <h3 className="font-orbitron text-xl font-semibold text-foreground mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-secondary/50 border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-secondary/50 border-primary/20 focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              {/* Consent Checkbox */}
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

              {/* Status Message */}
              {status.message && (
                <div
                  className={`flex items-center gap-2 p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-success/10 text-success border border-success/30'
                      : 'bg-destructive/10 text-destructive border border-destructive/30'
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

              {/* Submit Button */}
              <Button
                type="submit"
                variant="arc"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Sending...
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
