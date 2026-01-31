import React, { useEffect, useState } from "react";
import "@/App.css";

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

// Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        progress === 100 ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        {/* Arc Reactor Animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
            style={{ animationDuration: "1s" }}
          ></div>
          <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 arc-pulse flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary shadow-glow"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="font-orbitron text-xl text-foreground mb-4">
          INITIALIZING SYSTEM
        </h2>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden mx-auto mb-2">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-muted-foreground font-fira">{progress}%</p>
      </div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowContent(true);
  };

  return (
    <div className="App min-h-screen bg-background">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-500 ${
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
