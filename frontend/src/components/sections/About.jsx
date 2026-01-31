import React from 'react';
import { Code2, Server, Layers, Zap, Target, Users } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: '3.5+ Years',
    description: 'Professional Experience',
  },
  {
    icon: Server,
    title: 'Full Stack',
    description: 'End-to-End Development',
  },
  {
    icon: Layers,
    title: 'Enterprise',
    description: 'SaaS Applications',
  },
  {
    icon: Zap,
    title: 'AI-Driven',
    description: 'Product Development',
  },
];

export const About = () => {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            // ABOUT ME
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            System <span className="text-gradient-hud">Overview</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Bio */}
          <div className="space-y-6">
            <div className="glass-card hud-corner p-6 lg:p-8 rounded-2xl">
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                Software Engineer with <span className="text-primary font-semibold">3.5 years</span> of specialized experience building scalable enterprise web applications and AI-driven products.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mt-4">
                Expert in the <span className="text-primary font-semibold">Angular (15+)</span> ecosystem, Node.js backends, and full-stack architecture. Proven track record of delivering complex end-to-end UI modules, integrating IoT systems, and automating business workflows.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mt-4">
                At <span className="text-accent font-semibold">Talent Singularity</span>, I automated workflows that reduced manual operational effort by <span className="text-success font-semibold">90%</span>.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl text-center group hover:border-primary/50 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-orbitron font-bold text-primary mb-1">90%</div>
                <div className="text-xs text-muted-foreground">Operational Efficiency</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center group hover:border-primary/50 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-orbitron font-bold text-accent mb-1">30%</div>
                <div className="text-xs text-muted-foreground">Faster Load Time</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center group hover:border-primary/50 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-orbitron font-bold text-primary mb-1">10K+</div>
                <div className="text-xs text-muted-foreground">Concurrent Users</div>
              </div>
              <div className="glass-card p-4 rounded-xl text-center group hover:border-primary/50 transition-all duration-300">
                <div className="text-2xl lg:text-3xl font-orbitron font-bold text-accent mb-1">4x</div>
                <div className="text-xs text-muted-foreground">Faster Deployments</div>
              </div>
            </div>
          </div>

          {/* Right - Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="glass-card p-6 rounded-2xl group hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="font-orbitron text-lg font-bold text-foreground mb-1 relative">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground relative">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Result-Driven</h4>
              <p className="text-sm text-muted-foreground">Focused on delivering measurable impact and business value</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Team Player</h4>
              <p className="text-sm text-muted-foreground">Mentored 4 junior engineers and improved team productivity</p>
            </div>
          </div>
          <div className="glass-card p-6 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Innovation</h4>
              <p className="text-sm text-muted-foreground">Passionate about leveraging AI and modern tech solutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
