import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  const { ref, isInView } = useInView();

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with payment integration, real-time inventory, and admin dashboard.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com',
      live: 'https://example.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates, notifications, and team features.',
      tags: ['Next.js', 'TypeScript', 'MongoDB', 'Socket.io'],
      github: 'https://github.com',
      live: 'https://example.com',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool using OpenAI API for blogs, social media, and marketing copy.',
      tags: ['React', 'Python', 'OpenAI', 'FastAPI'],
      github: 'https://github.com',
      live: 'https://example.com',
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with forecasts, maps, and climate insights using real-time data.',
      tags: ['Vue.js', 'Tailwind', 'OpenWeather API'],
      github: 'https://github.com',
      live: 'https://example.com',
      color: 'from-green-500 to-teal-500',
    },
    {
      title: 'Social Media Analytics',
      description: 'Analytics platform for tracking social media performance with detailed insights and reports.',
      tags: ['React', 'D3.js', 'Node.js', 'Redis'],
      github: 'https://github.com',
      live: 'https://example.com',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'Portfolio Builder',
      description: 'Drag-and-drop portfolio builder with customizable templates and instant deployment.',
      tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
      github: 'https://github.com',
      live: 'https://example.com',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <section id="projects" className="relative overflow-hidden py-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            MY WORK
          </h2>
                  </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                transition: { duration: 0.3 }
              }}
              className="group backdrop-blur-md bg-[var(--glass-bg)] rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Project Header with Gradient */}
              <div className={`h-32 bg-gradient-to-br ${project.color} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="p-6">
                <h3 className="font-['Poppins'] text-xl text-foreground mb-3 group-hover:text-[var(--gradient-start)] transition-colors">
                  {project.title}
                </h3>
                <p className="font-['Inter'] text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "var(--gradient-start)",
                        color: "white"
                      }}
                      className="px-3 py-1 text-xs font-['Inter'] bg-accent text-accent-foreground rounded-full cursor-pointer transition-all duration-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-['Inter'] text-muted-foreground transition-colors"
                    whileHover={{ 
                      x: 5,
                      color: "var(--gradient-start)"
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-['Inter'] text-muted-foreground transition-colors"
                    whileHover={{ 
                      x: 5,
                      color: "var(--gradient-start)"
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
