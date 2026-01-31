import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Server, Layers, Zap, Target, Users, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '90%', label: 'Automation Achieved', color: 'primary' },
  { value: '30%', label: 'Faster Load Times', color: 'accent' },
  { value: '10K+', label: 'Users Served', color: 'primary' },
  { value: '4x', label: 'Faster Releases', color: 'accent' },
];

const highlights = [
  { icon: Code2, title: '3.5+ Years', desc: 'Professional Experience' },
  { icon: Server, title: 'Full Stack', desc: 'End-to-End Development' },
  { icon: Layers, title: 'Enterprise', desc: 'SaaS Applications' },
  { icon: Brain, title: 'AI-Driven', desc: 'Product Development' },
];

export const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-40 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-40 left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-mono font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-6 tracking-widest">
            PROFILE
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            System <span className="text-gradient-cyber">Overview</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I don&apos;t just write code; I engineer outcomes
          </p>
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Bio */}
          <div className="space-y-8">
            <div className="glass-card hud-corner p-8 rounded-2xl">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Software Engineer with <span className="text-primary font-semibold">3.5 years</span> of specialized experience building scalable enterprise web applications and AI-driven products.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Expert in the <span className="text-primary font-semibold">Angular (15+)</span> ecosystem, Node.js backends, and full-stack architecture. Proven track record of delivering complex end-to-end UI modules, integrating IoT systems, and automating business workflows.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                At <span className="text-accent font-semibold">Talent Singularity</span>, I automated workflows that reduced manual operational effort by <span className="text-green-400 font-semibold">90%</span>.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-5 rounded-xl text-center group hover:border-primary/30 transition-all duration-300">
                  <div className={`text-3xl lg:text-4xl font-orbitron font-bold mb-2 ${stat.color === 'primary' ? 'text-primary' : 'text-accent'}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="glass-card p-6 rounded-2xl group hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="font-orbitron text-xl font-bold text-foreground mb-1 relative">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground relative">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: 'Result-Driven', desc: 'Focused on delivering measurable impact and business value' },
            { icon: Users, title: 'Team Player', desc: 'Mentored 4 junior engineers and improved team productivity' },
            { icon: Zap, title: 'Innovation', desc: 'Passionate about leveraging AI and modern tech solutions' },
          ].map((value) => (
            <div key={value.title} className="glass-card p-6 rounded-xl flex items-start gap-4 group hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
