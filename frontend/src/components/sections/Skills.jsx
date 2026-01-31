import React, { useState } from 'react';
import { Code2, Server, Cloud, Puzzle, Users, MessageSquare, Search, Lightbulb, Brain } from 'lucide-react';

const frontendSkills = [
  { name: 'Angular (15+)', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'RxJS', level: 88 },
  { name: 'NgRx', level: 85 },
  { name: 'HTML5/CSS3', level: 92 },
  { name: 'TailwindCSS', level: 88 },
];

const backendSkills = [
  { name: 'Node.js', level: 88 },
  { name: 'Express', level: 85 },
  { name: 'RESTful APIs', level: 90 },
  { name: 'Microservices', level: 82 },
  { name: 'SQL', level: 80 },
  { name: 'MongoDB', level: 78 },
];

const devopsSkills = [
  { name: 'Docker', level: 85 },
  { name: 'Kubernetes', level: 78 },
  { name: 'Git', level: 92 },
  { name: 'Jenkins/CI-CD', level: 80 },
  { name: 'Postman', level: 88 },
  { name: 'Helm', level: 75 },
];

const integrationSkills = [
  { name: 'Apache NiFi', level: 80 },
  { name: 'OpenAI API', level: 82 },
  { name: 'Judge0', level: 78 },
  { name: 'Stripe', level: 76 },
  { name: 'IoT Systems', level: 80 },
  { name: 'n8n', level: 75 },
];

const softSkillsList = [
  { name: 'Leadership', desc: 'Mentored 4 junior engineers on best practices' },
  { name: 'Problem-Solving', desc: 'Reduced operational overhead by 90%' },
  { name: 'Communication', desc: 'Cross-team collaboration & client presentations' },
  { name: 'User Research', desc: 'Conducted UX research for BSS module' },
  { name: 'Critical Thinking', desc: 'Architectural decisions & system design' },
];

const categories = [
  { name: 'Frontend', icon: Code2, skills: frontendSkills },
  { name: 'Backend', icon: Server, skills: backendSkills },
  { name: 'DevOps', icon: Cloud, skills: devopsSkills },
  { name: 'Integration', icon: Puzzle, skills: integrationSkills },
];

const SkillBar = ({ name, level }) => (
  <div className="group">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
        {name}
      </span>
      <span className="text-sm text-muted-foreground font-fira">{level}%</span>
    </div>
    <div className="skill-bar h-2 rounded-full overflow-hidden">
      <div
        className="skill-bar-fill rounded-full"
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            CAPABILITIES
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tech <span className="text-gradient-hud">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="mb-20">
          <h3 className="font-orbitron text-xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <Code2 className="w-5 h-5 text-primary" />
            Technical Skills
          </h3>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeCategory === idx
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'glass-card text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories[activeCategory].skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-orbitron text-xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <Users className="w-5 h-5 text-accent" />
            Soft Skills
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {softSkillsList.map((skill) => (
              <div
                key={skill.name}
                className="glass-card p-6 rounded-xl group hover:border-primary/50 hover:shadow-glow transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{skill.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
