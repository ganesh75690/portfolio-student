import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export function Education() {
  const { ref, isInView } = useInView();

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science Engineering',
      institution: 'PARUL UNIVERSITY OF ENGINEERING AND TECHNOLOGY',
      location: 'Gujarat, India',
      period: '2023 - 2027',
      gpa: '8/10',
      achievements: [
        'Dean\'s List for 6 consecutive semesters',
        'President of Computer Science Club',
        'First place in University Hackathon 2023',
      ],
    },
    {
      degree: 'Intermediate Education',
      course: 'MPC',
      institution: 'NARAYANA JUNIOR COLLEGE',
      location: 'Andhra Pradesh, India',
      period: '2021 - 2023',
      gpa: '820/1000',
      achievements: [
        'Top 5% in State Board Examinations',
        'Excellence in Mathematics and Science',
        'Participated in National Science Olympiad',
      ],
    },
  ];

  return (
    <section id="education" className="relative overflow-hidden py-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            Education
          </h2>
                  </motion.div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 }}
              transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 }
              }}
              className="backdrop-blur-md bg-[var(--glass-bg)] rounded-2xl p-6 sm:p-8 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center text-white"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <GraduationCap className="w-8 h-8" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="font-['Poppins'] text-xl sm:text-2xl text-foreground mb-2">
                    {edu.degree}
                  </h3>
                  <p className="font-['Inter'] text-base sm:text-lg text-muted-foreground mb-2">
                    {edu.institution}
                  </p>
                  {edu.course && (
                    <p className="font-['Inter'] text-sm text-muted-foreground mb-4">
                      Course: <span className="text-[var(--gradient-start)]">{edu.course}</span>
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-['Inter']">{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-['Inter']">{edu.period}</span>
                    </div>
                    <div className="font-['Inter']">
                      TOTAL MARKS: <span className="text-[var(--gradient-start)]">{edu.gpa}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-['Inter'] text-sm text-muted-foreground mb-2">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, achIndex) => (
                        <motion.li
                          key={achievement}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.2 + achIndex * 0.1 + 0.4 }}
                          whileHover={{ 
                            x: 10,
                            color: "var(--gradient-start)"
                          }}
                          className="font-['Inter'] text-sm text-foreground flex items-start gap-2 cursor-pointer transition-all duration-200"
                        >
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ delay: index * 0.2 + achIndex * 0.1 + 0.6 }}
                            className="text-[var(--gradient-start)] mt-1"
                          >
                            •
                          </motion.span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
