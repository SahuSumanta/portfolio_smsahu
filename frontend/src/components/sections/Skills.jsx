import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Braces, 
  Globe, 
  Paintbrush, 
  FileCode,
  Wind,
  Workflow,
  RefreshCw,
  LayoutGrid,
  PieChart,
  TrendingUp,
  Server,
  Container,
  Cloud,
  Database,
  GitBranch,
  Layers,
  Brain,
  Bot,
  Zap,
  Network,
  Cpu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const architectureLayers = [
  {
    id: 'L01',
    title: 'Interface Layer',
    subtitle: 'What users touch',
    color: '#ef4444', // Red
    colorClass: 'layer-interface',
    skills: [
      { name: 'Angular 15+', icon: Code2 },
      { name: 'TypeScript', icon: Braces },
      { name: 'HTML5', icon: Globe },
      { name: 'CSS3', icon: Paintbrush },
      { name: 'JavaScript', icon: FileCode },
      { name: 'TailwindCSS', icon: Wind },
    ],
  },
  {
    id: 'L02',
    title: 'Interaction & State',
    subtitle: 'How data flows',
    color: '#f97316', // Orange
    colorClass: 'layer-state',
    skills: [
      { name: 'RxJS', icon: Workflow },
      { name: 'NgRx', icon: RefreshCw },
      { name: 'Ag-Grid', icon: LayoutGrid },
      { name: 'Chart.js', icon: PieChart },
      { name: 'D3.js', icon: TrendingUp },
    ],
  },
  {
    id: 'L03',
    title: 'Application Logic',
    subtitle: 'Business rules & processing',
    color: '#14b8a6', // Teal
    colorClass: 'layer-logic',
    skills: [
      { name: 'Node.js', icon: Server },
      { name: 'Express', icon: Layers },
      { name: 'RESTful APIs', icon: Network },
      { name: 'Microservices', icon: Cpu },
    ],
  },
  {
    id: 'L04',
    title: 'Data & Integration',
    subtitle: 'External systems & automation',
    color: '#8b5cf6', // Purple
    colorClass: 'layer-data',
    skills: [
      { name: 'MongoDB', icon: Database },
      { name: 'SQL', icon: Database },
      { name: 'Apache NiFi', icon: Workflow },
      { name: 'OpenAI API', icon: Brain },
      { name: 'n8n', icon: Bot },
    ],
  },
  {
    id: 'L05',
    title: 'Infrastructure',
    subtitle: 'Deployment & orchestration',
    color: '#0ea5e9', // Sky Blue
    colorClass: 'layer-devops',
    skills: [
      { name: 'Docker', icon: Container },
      { name: 'Kubernetes', icon: Cloud },
      { name: 'Helm', icon: Layers },
      { name: 'Jenkins/CI-CD', icon: GitBranch },
      { name: 'Git', icon: GitBranch },
    ],
  },
];

const SkillPill = ({ skill, color, delay }) => {
  const pillRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;

  useEffect(() => {
    gsap.fromTo(pillRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.5,
        delay: delay * 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: pillRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, [delay]);

  return (
    <div
      ref={pillRef}
      className="skill-pill cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? color : undefined,
        boxShadow: isHovered ? `0 0 25px ${color}40` : undefined,
      }}
    >
      <Icon 
        className="w-5 h-5 transition-colors duration-300" 
        style={{ color: isHovered ? color : '#a1a1aa' }}
      />
      <span className="text-sm font-medium">{skill.name}</span>
    </div>
  );
};

const ArchitectureLayer = ({ layer, index }) => {
  const layerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(layerRef.current,
      { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: layerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, [index]);

  return (
    <div 
      ref={layerRef}
      className="arch-card p-6 lg:p-8 relative"
    >
      {/* Layer Color Indicator */}
      <div 
        className="layer-indicator"
        style={{ backgroundColor: layer.color }}
      />
      
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pl-4">
        {/* Left - Title Section */}
        <div className="lg:w-1/4 shrink-0">
          <h3 
            className="text-xl lg:text-2xl font-bold mb-1"
            style={{ color: layer.color }}
          >
            {layer.title}
          </h3>
          <p className="text-sm text-muted-foreground font-mono">
            {layer.subtitle}
          </p>
        </div>
        
        {/* Center - Skills */}
        <div className="flex-1 flex flex-wrap gap-3">
          {layer.skills.map((skill, skillIndex) => (
            <SkillPill 
              key={skill.name} 
              skill={skill} 
              color={layer.color}
              delay={skillIndex}
            />
          ))}
        </div>
        
        {/* Right - Layer ID */}
        <div className="hidden lg:block shrink-0">
          <span className="text-xs font-mono text-muted-foreground/50">
            {layer.id}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Animate title
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
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-xs font-mono font-medium text-primary bg-primary/10 rounded-full border border-primary/20 mb-6 tracking-widest">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            The <span className="text-gradient-cyber">Engine Room</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A layered view of how my skills work together — from user interface to automation
          </p>
        </div>

        {/* Architecture Layers */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {architectureLayers.map((layer, index) => (
            <ArchitectureLayer 
              key={layer.id} 
              layer={layer} 
              index={index}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { value: '25+', label: 'Technologies' },
            { value: '5', label: 'Architecture Layers' },
            { value: '3.5+', label: 'Years Experience' },
            { value: '100%', label: 'Passion' },
          ].map((stat, idx) => (
            <div 
              key={stat.label}
              className="glass-card p-4 rounded-xl text-center group hover:border-primary/40 transition-all duration-300"
            >
              <div className="text-2xl lg:text-3xl font-orbitron font-bold text-gradient-cyber mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
