import React from 'react';
import { ExternalLink, Github, Layers, Zap, Bell, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projectFeatures = [
  { title: 'AI-Driven Recommendations', desc: 'Analyzes spending patterns to identify unused services and suggest cost-saving cancellations.' },
  { title: 'One-Click Cancellation', desc: 'Implemented a streamlined workflow using Node.js automation to simplify the user exit process.' },
  { title: 'Smart Notifications', desc: 'Webhook-based notification system alerts users 3 days prior to renewal dates.' },
];

const techStack = ['Angular', 'Node.js', 'AI/ML', 'MongoDB'];

export const Projects = () => {
  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            PROJECTS
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Build <span className="text-gradient-hud">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          <div className="glass-card rounded-2xl overflow-hidden group">
            <div className="relative p-6 lg:p-8 bg-gradient-to-r from-primary/20 to-accent/10">
              <div className="absolute inset-0 cyber-grid opacity-20"></div>
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded border border-primary/30">
                        Featured
                      </span>
                      <span className="px-2 py-1 text-xs font-medium bg-accent/20 text-accent rounded border border-accent/30">
                        Full Stack Architect
                      </span>
                    </div>
                    <h3 className="font-orbitron text-2xl lg:text-3xl font-bold text-foreground">
                      SubSmart AI
                    </h3>
                    <p className="text-muted-foreground mt-1">Subscription Management Platform</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href="https://github.com/sahusumanta/SubSmart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl glass-card hover:border-primary/50 hover:shadow-glow transition-all duration-300"
                    >
                      <Github className="w-5 h-5 text-foreground" />
                    </a>
                  </div>
                </div>
                
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  An automated dashboard to aggregate user subscriptions and detect unwanted recurring charges, directly addressing consumer financial waste.
                </p>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {projectFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-secondary/30 border border-primary/10 group/feature hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover/feature:scale-110 transition-transform duration-300">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Tech Stack:
                </span>
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Want to see more of my work?</p>
          <Button
            variant="hud"
            size="lg"
            onClick={() => window.open('https://github.com/sahusumanta', '_blank')}
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
