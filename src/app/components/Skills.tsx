import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function Skills() {
  const { ref, isInView } = useInView();

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Next.js', level: 80 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 80 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'Figma', level: 85 },
        { name: 'AWS', level: 65 },
      ],
    },
    {
      title: 'AI Automation Skills',
      skills: [
        { name: 'Machine Learning', level: 85 },
        { name: 'Natural Language Processing', level: 80 },
        { name: 'Computer Vision', level: 75 },
        { name: 'Automation Scripts', level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative overflow-hidden py-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            Skills & Tools
          </h2>
                  </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="backdrop-blur-md bg-[var(--glass-bg)] rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl"
            >
              <h3 className="font-['Poppins'] text-xl sm:text-2xl text-foreground mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name} 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.8, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-['Inter'] text-sm sm:text-base text-foreground">
                        {skill.name}
                      </span>
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5 }}
                        className="font-['Inter'] text-xs text-muted-foreground"
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.2 }}
                        className="h-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
