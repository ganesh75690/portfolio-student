import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';

export function Footer() {
  const { ref, isInView } = useInView();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/ganesh75690', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/b-sai-ganesh-949a45288', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:bsaiganesh2023@gmail.com', label: 'Email' },
  ];

  return (
    <motion.footer 
      ref={ref}
      className="relative overflow-hidden border-t border-border bg-background/50 backdrop-blur-md"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="grid md:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3 
              className="font-['Poppins'] text-xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              B SAI GANESH
            </motion.h3>
            <motion.p 
              className="font-['Inter'] text-sm text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              AI Developer and Engineer passionate about creating intelligent solutions and cutting-edge applications.
            </motion.p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h4 
              className="font-['Poppins'] text-base text-foreground mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Connect
            </motion.h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent text-muted-foreground transition-all duration-300"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -180 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    background: "linear-gradient(to bottom right, var(--gradient-start), var(--gradient-end))",
                    color: "white"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.p 
              className="font-['Inter'] text-sm text-muted-foreground text-center sm:text-left"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              © 2026 B SAI GANESH. All rights reserved.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Background Gradient */}
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--gradient-start)] opacity-5 rounded-full blur-3xl -z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 0.05 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      />
    </motion.footer>
  );
}
