import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Layers, Zap, Bell, CreditCard, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const projectFeatures = [
  { icon: Brain, title: 'AI-Driven Recommendations', desc: 'Analyzes spending patterns to identify unused services and suggest cost-saving cancellations.' },
  { icon: CreditCard, title: 'One-Click Cancellation', desc: 'Streamlined workflow using Node.js automation to simplify the user exit process.' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Webhook-based system alerts users 3 days prior to renewal dates.' },
];

const techStack = ['Angular', 'Node.js', 'AI/ML', 'MongoDB'];

export const Projects = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-mono font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-6 tracking-widest">
            FEATURED WORK
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            The <span className="text-gradient-cyber">Blueprints</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            ref={cardRef}
            className="glass-card rounded-2xl overflow-hidden group"
            style={{ perspective: '1000px' }}
          >
            {/* Project Header */}
            <div className="relative p-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
              <div className="absolute inset-0 cyber-grid opacity-10"></div>
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 text-xs font-mono font-medium bg-primary/20 text-primary rounded border border-primary/30">
                        Featured
                      </span>
                      <span className="px-2.5 py-1 text-xs font-mono font-medium bg-accent/20 text-accent rounded border border-accent/30">
                        Full Stack
                      </span>
                    </div>
                    <h3 className="font-orbitron text-3xl lg:text-4xl font-bold text-foreground">
                      SubSmart AI
                    </h3>
                    <p className="text-muted-foreground mt-2 text-lg">Subscription Management Platform</p>
                  </div>
                  
                  {/* Project Link */}
                  <a
                    href="https://github.com/sahusumanta/SubSmart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl glass-card hover:border-primary/50 hover:shadow-glow transition-all duration-300"
                  >
                    <Github className="w-6 h-6 text-foreground" />
                  </a>
                </div>
                
                <p className="text-muted-foreground max-w-2xl leading-relaxed text-lg">
                  An automated dashboard to aggregate user subscriptions and detect unwanted recurring charges, directly addressing consumer financial waste.
                </p>
              </div>
            </div>

            {/* Project Features */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {projectFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-secondary/30 border border-border/30 group/feature hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover/feature:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground flex items-center gap-2 font-mono">
                  <Layers className="w-4 h-4 text-primary" />
                  STACK:
                </span>
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4 font-mono text-sm">Want to see more?</p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://github.com/sahusumanta', '_blank')}
            className="border-primary/30 hover:border-primary/60"
          >
            <Github className="w-5 h-5 mr-2" />
            View GitHub Profile
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
