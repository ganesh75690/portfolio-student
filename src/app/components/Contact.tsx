import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const { ref, isInView } = useInView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'bsaiganesh2023@gmail.com',
      href: 'mailto:bsaiganesh2023@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7569083713',
      href: 'tel:+917569083713',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'VISAKHAPATNAM, ANDHRA PRADESH 530012, INDIA',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="font-['Inter'] text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.05,
                  borderColor: "var(--gradient-start)",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                  transition: { duration: 0.3 }
                }}
                className="group block backdrop-blur-md bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-['Inter'] text-xs text-muted-foreground mb-1">
                      {info.label}
                    </p>
                    <p className="font-['Inter'] text-sm sm:text-base text-foreground">
                      {info.value}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="backdrop-blur-md bg-[var(--glass-bg)] rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-['Inter'] text-sm text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[var(--gradient-start)] transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-['Inter'] text-sm text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[var(--gradient-start)] transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block font-['Inter'] text-sm text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[var(--gradient-start)] transition-all duration-200"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block font-['Inter'] text-sm text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[var(--gradient-start)] transition-all duration-200 resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <motion.button
                type="submit"
                className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] rounded-xl text-white font-['Inter'] transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2"
                aria-label="Send Message"
                title="Send Message"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(99,102,241,0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="relative z-10">Send Message</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Send className="w-5 h-5" />
                </motion.div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--gradient-end)] to-[var(--gradient-start)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
