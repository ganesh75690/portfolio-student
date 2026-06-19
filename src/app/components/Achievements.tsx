import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Trophy, Target, Star, Zap } from 'lucide-react';

export function Achievements() {
  const { ref, isInView } = useInView();

  const achievements = [
    {
      icon: Trophy,
      title: 'Hackathon Winner',
      description: 'First place at Stanford Hackathon 2024 with an AI-powered study assistant app.',
      date: 'Nov 2024',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Star,
      title: 'Open Source Contributor',
      description: 'Contributed to 15+ open-source projects with 500+ GitHub stars.',
      date: '2023 - Present',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Target,
      title: 'Research Publication',
      description: 'Co-authored paper on machine learning optimization published in IEEE conference.',
      date: 'Aug 2024',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Zap,
      title: 'Freelance Success',
      description: 'Completed 25+ projects with 5-star rating on freelance platforms.',
      date: '2022 - Present',
      color: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <section id="achievements" className="relative overflow-hidden py-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            Achievements
          </h2>
                  </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 }
              }}
              className="group backdrop-blur-md bg-[var(--glass-bg)] rounded-2xl p-6 sm:p-8 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Icon with animated gradient */}
                <motion.div 
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-white`}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2,
                    transition: { duration: 0.6 }
                  }}
                >
                  <achievement.icon className="w-7 h-7" />
                </motion.div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="font-['Poppins'] text-xl text-foreground group-hover:text-[var(--gradient-start)] transition-colors">
                      {achievement.title}
                    </h3>
                    <span className="font-['Inter'] text-xs text-muted-foreground whitespace-nowrap">
                      {achievement.date}
                    </span>
                  </div>
                  <p className="font-['Inter'] text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
