import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Award, ExternalLink } from 'lucide-react';

export function Certifications() {
  const { ref, isInView } = useInView();

  const certifications = [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: 'Dec 2024',
      credential: 'ABC123456',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Google Cloud Professional',
      issuer: 'Google Cloud',
      date: 'Nov 2024',
      credential: 'GCP789012',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Meta Front-End Developer',
      issuer: 'Meta',
      date: 'Oct 2024',
      credential: 'META345678',
      color: 'from-blue-600 to-blue-400',
    },
    {
      name: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      date: 'Sep 2024',
      credential: 'DCA901234',
      color: 'from-blue-500 to-blue-700',
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: 'Aug 2024',
      credential: 'MDB567890',
      color: 'from-green-500 to-green-700',
    },
    {
      name: 'Microsoft Azure Fundamentals',
      issuer: 'Microsoft',
      date: 'Jul 2024',
      credential: 'AZ234567',
      color: 'from-blue-400 to-blue-600',
    },
  ];

  return (
    <section id="certifications" className="relative overflow-hidden py-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            Certifications
          </h2>
                  </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.credential}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                transition: { duration: 0.3 }
              }}
              className="group backdrop-blur-md bg-[var(--glass-bg)] rounded-2xl p-6 transition-all duration-300 cursor-pointer"
            >
              {/* Icon with Gradient */}
              <motion.div 
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-white mb-4`}
                whileHover={{ 
                  rotate: 360,
                  scale: 1.1,
                  transition: { duration: 0.5 }
                }}
              >
                <Award className="w-6 h-6" />
              </motion.div>

              <h3 className="font-['Poppins'] text-lg text-foreground mb-2 group-hover:text-[var(--gradient-start)] transition-colors">
                {cert.name}
              </h3>
              <p className="font-['Inter'] text-sm text-muted-foreground mb-1">
                {cert.issuer}
              </p>
              <p className="font-['Inter'] text-xs text-muted-foreground mb-3">
                Issued: {cert.date}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="font-['Inter'] text-xs text-muted-foreground">
                  ID: {cert.credential}
                </span>
                <motion.button 
                  className="text-[var(--gradient-start)] transition-colors"
                  aria-label={`View ${cert.name} certificate`}
                  title={`View ${cert.name} certificate`}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 45,
                    color: "var(--gradient-end)"
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
