import React from 'react';
import { Code2, Server, Layers, Zap, Target, Users } from 'lucide-react';

const stats = [
  { value: '90%', label: 'Operational Efficiency' },
  { value: '30%', label: 'Faster Load Time' },
  { value: '10K+', label: 'Concurrent Users' },
  { value: '4x', label: 'Faster Deployments' },
];

const coreValues = [
  { title: 'Result-Driven', desc: 'Focused on delivering measurable impact and business value' },
  { title: 'Team Player', desc: 'Mentored 4 junior engineers and improved team productivity' },
  { title: 'Innovation', desc: 'Passionate about leveraging AI and modern tech solutions' },
];

export const About = () => {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            ABOUT ME
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            System <span className="text-gradient-hud">Overview</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-4 rounded-xl text-center group hover:border-primary/50 transition-all duration-300">
                  <div className="text-2xl lg:text-3xl font-orbitron font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl group hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-1 relative">3.5+ Years</h3>
              <p className="text-sm text-muted-foreground relative">Professional Experience</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl group hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Server className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-1 relative">Full Stack</h3>
              <p className="text-sm text-muted-foreground relative">End-to-End Development</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl group hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-1 relative">Enterprise</h3>
              <p className="text-sm text-muted-foreground relative">SaaS Applications</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl group hover:border-primary/50 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-orbitron text-lg font-bold text-foreground mb-1 relative">AI-Driven</h3>
              <p className="text-sm text-muted-foreground relative">Product Development</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((value) => (
            <div key={value.title} className="glass-card p-6 rounded-xl flex items-start gap-4 group hover:border-primary/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-primary" />
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
