import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Cloud, 
  Puzzle, 
  Users, 
  MessageSquare, 
  Search, 
  Lightbulb,
  Brain
} from 'lucide-react';

const technicalSkills = [
  {
    category: 'Frontend',
    icon: Code2,
    color: 'primary',
    skills: [
      { name: 'Angular (15+)', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'RxJS', level: 88 },
      { name: 'NgRx', level: 85 },
      { name: 'HTML5/CSS3', level: 92 },
      { name: 'TailwindCSS', level: 88 },
      { name: 'Ag-Grid', level: 82 },
      { name: 'Chart.js', level: 80 },
    ],
  },
  {
    category: 'Backend',
    icon: Server,
    color: 'accent',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 85 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'Microservices', level: 82 },
      { name: 'SQL', level: 80 },
      { name: 'MongoDB', level: 78 },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: Cloud,
    color: 'primary',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 78 },
      { name: 'Helm', level: 75 },
      { name: 'Git', level: 92 },
      { name: 'Jenkins/CI-CD', level: 80 },
      { name: 'Postman', level: 88 },
    ],
  },
  {
    category: 'Integration & Automation',
    icon: Puzzle,
    color: 'accent',
    skills: [
      { name: 'Apache NiFi', level: 80 },
      { name: 'n8n', level: 75 },
      { name: 'Judge0', level: 78 },
      { name: 'OpenAI API', level: 82 },
      { name: 'Stripe', level: 76 },
      { name: 'IoT Systems', level: 80 },
    ],
  },
];

const softSkills = [
  { name: 'Leadership', icon: Users, description: 'Mentored 4 junior engineers on best practices' },
  { name: 'Problem-Solving', icon: Lightbulb, description: 'Reduced operational overhead by 90%' },
  { name: 'Communication', icon: MessageSquare, description: 'Cross-team collaboration & client presentations' },
  { name: 'User Research', icon: Search, description: 'Conducted UX research for BSS module' },
  { name: 'Critical Thinking', icon: Brain, description: 'Architectural decisions & system design' },
];

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-4">
            // CAPABILITIES
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tech <span className="text-gradient-hud">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Technical Skills */}
        <div className="mb-20">
          <h3 className="font-orbitron text-xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <Code2 className="w-5 h-5 text-primary" />
            Technical Skills
          </h3>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {technicalSkills.map((category, index) => (
              <button
                key={category.category}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'glass-card text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="glass-card rounded-2xl p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSkills[activeCategory].skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-sm text-muted-foreground font-fira">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="skill-bar h-2 rounded-full overflow-hidden">
                    <div
                      className="skill-bar-fill rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: hoveredSkill === skill.name || hoveredSkill === null ? `${skill.level}%` : '0%',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="font-orbitron text-xl font-semibold text-foreground mb-8 flex items-center gap-3">
            <Users className="w-5 h-5 text-accent" />
            Soft Skills
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {softSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="glass-card p-6 rounded-xl group hover:border-primary/50 hover:shadow-glow transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{skill.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Tech Icons */}
        <div className="hidden lg:block">
          <div className="absolute top-32 right-10 w-16 h-16 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center float opacity-40">
            <Code2 className="w-8 h-8 text-primary/50" />
          </div>
          <div className="absolute bottom-32 left-10 w-12 h-12 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center float opacity-40" style={{ animationDelay: '1s' }}>
            <Server className="w-6 h-6 text-accent/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
