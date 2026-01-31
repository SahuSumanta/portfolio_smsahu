import React, { useEffect, useState, useRef } from "react";
import "@/App.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout Components
import { Navbar } from "@/components/layout/Navbar";

// Section Components
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/EducationSection";
import { CoolMoments } from "@/components/sections/CoolMoments";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

gsap.registerPlugin(ScrollTrigger);

// Terminal Preloader Component
const TerminalPreloader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef(null);

  const terminalLines = [
    { text: '> Initializing Angular Core...', delay: 0 },
    { text: '> Loading TypeScript Engine...', delay: 400 },
    { text: '> Connecting to Microservices...', delay: 800 },
    { text: '> Establishing Database Links...', delay: 1200 },
    { text: '> AI Neural Link: ESTABLISHED.', delay: 1600 },
    { text: '> System Ready.', delay: 2000 },
  ];

  useEffect(() => {
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line.text]);
      }, line.delay);
    });

    // Complete animation
    setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 2800);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#030303] flex items-center justify-center transition-all duration-700 ${
        isComplete ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      <div className="w-full max-w-2xl mx-4">
        {/* Terminal Window */}
        <div className="glass-card rounded-xl overflow-hidden border border-primary/20">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/10 bg-primary/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-4 text-xs font-mono text-muted-foreground">system-boot.sh</span>
          </div>
          
          {/* Terminal Content */}
          <div ref={terminalRef} className="p-6 min-h-[200px] font-mono text-sm">
            {lines.map((line, index) => (
              <div 
                key={index} 
                className={`mb-2 ${
                  line.includes('ESTABLISHED') || line.includes('Ready') 
                    ? 'text-green-400' 
                    : 'text-primary/80'
                }`}
                style={{ 
                  animation: 'fadeInUp 0.3s ease-out forwards',
                }}
              >
                {line}
              </div>
            ))}
            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
          </div>
        </div>
        
        {/* Loading Bar */}
        <div className="mt-6 h-1 bg-primary/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
            style={{ 
              width: `${(lines.length / terminalLines.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener('mousemove', moveCursor);
    
    // Find all clickable elements
    const clickables = document.querySelectorAll('a, button, [role="button"]');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor hidden lg:block ${isHovering ? 'hover' : ''}`}
      style={{ left: 0, top: 0 }}
    />
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <div className="App min-h-screen bg-[#030303]">
      {/* Terminal Preloader */}
      {isLoading && <TerminalPreloader onComplete={handleLoadingComplete} />}

      {/* Custom Cursor */}
      {showContent && <CustomCursor />}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-700 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <CoolMoments />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
