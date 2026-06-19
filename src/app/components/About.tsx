import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Code, Briefcase, GraduationCap } from 'lucide-react';

export function About() {
  const { ref, isInView } = useInView();

  const stats = [
    { icon: Code, label: 'Projects', value: '5+' },
    { icon: Briefcase, label: 'Experience', value: 'FRESHER' },
    { icon: GraduationCap, label: 'Certifications', value: '8+' },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            About Me
          </h2>
                  </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="font-['Inter'] text-base sm:text-lg text-muted-foreground leading-relaxed">
              I'm a passionate Computer Science student currently pursuing B-TECH in parul university with specialization ARTIFICIAL INTELLIGENCE AND DATA SCIENCE.
              Interested in building projects through full stack ddevelopment and AI automations and making solutions to complex problems and turning ideas
              into reality through code.
            </p>
            <p className="font-['Inter'] text-base sm:text-lg text-muted-foreground leading-relaxed">
              With a strong foundation in modern web technologies and a commitment to continuous learning, and also with AI sector development.
              I'm actively seeking internship opportunities where I can contribute to meaningful projects and solutions
              and grow as a developer.
            </p>
            <p className="font-['Inter'] text-base sm:text-lg text-muted-foreground leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source on AI
              projects, or working on personal projects that challenge my skills and creativity. 
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                  transition: { duration: 0.3 }
                }}
                className="group backdrop-blur-md bg-[var(--glass-bg)] rounded-2xl p-6 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-4 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-white"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <stat.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="font-['Poppins'] text-2xl sm:text-3xl text-foreground"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="font-['Inter'] text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
