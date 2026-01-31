import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, Zap } from 'lucide-react';

const achievements = [
  'Core developer for Databyte and Talent Singularity Enterprise SaaS Platforms',
  'Engineered Angular 15+ migration, 30% faster load time for 10K+ users',
  'Built AI-powered HRMS, 90% reduction in manual effort',
  'Sole Frontend Owner for BSS Module, 35% faster ticket resolution',
  'Integrated Apache NiFi and Judge0, 40% improved data ingestion',
  'Decoupled to 5 microservices, release time 20min to 5min',
  'Refactored forms with RxJS/NgRx, 100% data integrity',
  'Mentored 4 junior engineers, 25% better sprint predictability',
];

export const Experience = () => {
  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            WORK HISTORY
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Mission <span className="text-gradient-hud">Log</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2"></div>
            
            <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-12">
              <div className="hidden md:flex flex-col items-end pr-12 pt-2">
                <div className="glass-card p-6 rounded-xl text-right max-w-sm">
                  <h3 className="font-orbitron text-xl font-bold text-foreground mb-2">
                    Vision Waves
                  </h3>
                  <div className="flex items-center justify-end gap-2 text-muted-foreground text-sm mb-2">
                    <span>Indore, India</span>
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-end gap-2 text-muted-foreground text-sm">
                    <span>Aug 2022 - Present</span>
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-success/10 border border-success/30 rounded-full text-success text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                    </span>
                    Current Position
                  </div>
                </div>
              </div>

              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-glow border-4 border-background"></div>

              <div className="md:pl-12">
                <div className="md:hidden mb-6">
                  <h3 className="font-orbitron text-xl font-bold text-foreground mb-1">
                    Software Engineer
                  </h3>
                  <p className="text-primary font-medium mb-2">Vision Waves</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Indore, India
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Aug 2022 - Present
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-orbitron text-lg font-bold text-foreground">
                    Software Engineer
                  </h4>
                </div>

                <div className="space-y-3">
                  {achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="glass-card p-4 rounded-xl group hover:border-primary/50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <ChevronRight className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                          {achievement}
                        </p>
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
