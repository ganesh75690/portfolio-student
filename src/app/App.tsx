import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Navigation } from './components/Navigation';
import { ThreeDBackground } from './components/ThreeDBackground';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-black font-['Inter'] transition-colors duration-300 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="animated-gradient"></div>
      
      {/* Moving Orbs */}
      <div className="moving-orb orb1"></div>
      <div className="moving-orb orb2"></div>
      <div className="moving-orb orb3"></div>
      
      {/* Floating Bubbles */}
      <div className="floating-bubble bubble1"></div>
      <div className="floating-bubble bubble2"></div>
      <div className="floating-bubble bubble3"></div>
      
      <ThreeDBackground />

      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
