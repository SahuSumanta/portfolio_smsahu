import React from 'react';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

const education = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'Biju Patnaik University of Technology',
    location: 'Odisha, India',
    duration: '2018 - 2022',
    score: '8.5 CGPA / 85%',
    highlights: [
      'Specialized in Software Engineering',
      'Strong foundation in Data Structures & Algorithms',
      'Focus on Web Technologies and System Design',
    ],
  },
];

export const Education = () => {
  return (
    <section id="education" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            // EDUCATION
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Academic <span className="text-gradient-hud">Record</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <div
              key={edu.degree}
              className="glass-card rounded-2xl overflow-hidden hud-corner"
            >
              {/* Header */}
              <div className="relative p-6 lg:p-8 bg-gradient-to-r from-primary/10 to-accent/5">
                <div className="absolute inset-0 cyber-grid opacity-20"></div>
                <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 arc-pulse">
                    <GraduationCap className="w-10 h-10 text-primary" />
                  </div>
                  
                  {/* Main Info */}
                  <div className="flex-1">
                    <h3 className="font-orbitron text-xl lg:text-2xl font-bold text-foreground mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-primary font-medium text-lg mb-3">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        {edu.location}
                      </span>
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {edu.duration}
                      </span>
                    </div>
                  </div>

                  {/* Score Badge */}
                  <div className="glass-card px-6 py-4 rounded-xl text-center shrink-0">
                    <div className="flex items-center gap-2 justify-center mb-1">
                      <Award className="w-5 h-5 text-accent" />
                      <span className="text-sm text-muted-foreground">Score</span>
                    </div>
                    <div className="font-orbitron text-xl font-bold text-gradient-hud">
                      {edu.score}
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="p-6 lg:p-8">
                <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  Key Highlights
                </h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  {edu.highlights.map((highlight, hIndex) => (
                    <div
                      key={hIndex}
                      className="p-4 rounded-xl bg-secondary/30 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <span className="text-primary font-orbitron font-bold text-sm">
                          {String(hIndex + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
