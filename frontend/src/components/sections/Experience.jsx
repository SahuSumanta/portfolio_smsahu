import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, ChevronRight, Zap, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { text: 'Core developer for Databyte and Talent Singularity Enterprise SaaS Platforms', impact: 'Enterprise-level' },
  { text: 'Engineered Angular 15+ migration with lazy loading and reduced bundle size', impact: '30% faster load' },
  { text: 'Built AI-powered HRMS and automated candidate screening process', impact: '90% less manual work' },
  { text: 'Sole Frontend Owner for Customer Care BSS interface with UX research', impact: '35% faster tickets' },
  { text: 'Integrated Apache NiFi and Judge0 for IoT data orchestration', impact: '40% better ingestion' },
  { text: 'Decoupled monolith into 5 Node.js microservices with Docker/Helm', impact: '4x faster deploy' },
  { text: 'Refactored forms with RxJS/NgRx eliminating race conditions', impact: '100% data integrity' },
  { text: 'Mentored 4 junior engineers with strict linting/CI rules', impact: '25% better sprints' },
];

export const Experience = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      gsap.fromTo(timelineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-mono font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-6 tracking-widest">
            CAREER PATH
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Mission <span className="text-gradient-cyber">Log</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div 
              ref={timelineRef}
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30 transform md:-translate-x-1/2"
            ></div>
            
            <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-12">
              {/* Left - Company Info */}
              <div className="hidden md:flex flex-col items-end pr-12 pt-4">
                <div className="glass-card p-6 rounded-xl text-right max-w-sm sticky top-32">
                  <h3 className="font-orbitron text-2xl font-bold text-foreground mb-3">
                    Vision Waves
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-end gap-2">
                      <span>Indore, India</span>
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <span>Aug 2022 - Present</span>
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-mono">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                    </span>
                    ACTIVE
                  </div>
                </div>
              </div>

              {/* Timeline Node */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-glow border-4 border-background z-10 top-4"></div>

              {/* Right - Achievements */}
              <div className="md:pl-12">
                {/* Mobile Company Info */}
                <div className="md:hidden mb-8 glass-card p-4 rounded-xl">
                  <h3 className="font-orbitron text-xl font-bold text-foreground mb-1">
                    Software Engineer
                  </h3>
                  <p className="text-primary font-medium mb-2">Vision Waves</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-accent" />
                      Indore, India
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      Aug 2022 - Present
                    </span>
                  </div>
                </div>

                {/* Role Title - Desktop */}
                <div className="hidden md:flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="font-orbitron text-xl font-bold text-foreground">
                    Software Engineer
                  </h4>
                </div>

                {/* Achievement Cards */}
                <div className="space-y-4">
                  {achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="glass-card p-5 rounded-xl group hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <ChevronRight className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground/90 text-sm leading-relaxed mb-2">
                            {achievement.text}
                          </p>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 rounded text-xs text-accent font-mono">
                            <TrendingUp className="w-3 h-3" />
                            {achievement.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
