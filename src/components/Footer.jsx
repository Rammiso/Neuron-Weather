import { motion } from 'framer-motion';
import { Github, Linkedin, Code, Zap, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/musab-hassen-b86247316/?lipi=urn%3Ali%3Apage%3Ad_flagship3_notifications%3BN11haWpzRMaIvqYm5fjEmQ%3D%3D',
      icon: Linkedin,
      color: 'text-blue-400 hover:text-blue-300'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Rammiso/Neuron-Weather',
      icon: Github,
      color: 'text-gray-400 hover:text-gray-300'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.footer
      className="relative mt-16 border-t border-cyber-border/30 bg-gradient-to-b from-transparent to-cyber-darker/50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-green/5 to-transparent animate-pulse" />
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-neon-green/10" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Developer Info */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <Code className="w-6 h-6 text-neon-green" />
                <motion.div
                  className="absolute inset-0 bg-neon-green/30 rounded-full blur-md"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-200">
                Developer
              </h3>
            </div>
            
            <div className="glass p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-cyan rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">Musab Hassen</h4>
                  <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
                    Full Stack Developer
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-400 leading-relaxed">
                Crafting futuristic web experiences with cutting-edge technologies 
                and cyberpunk aesthetics.
              </p>
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-neon-cyan" />
              <h3 className="text-lg font-semibold text-gray-200">
                Project Info
              </h3>
            </div>
            
            <div className="glass p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-gray-400 uppercase">Version</span>
                <span className="text-neon-green font-mono text-sm">v2.1.0</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-gray-400 uppercase">Build</span>
                <span className="text-neon-cyan font-mono text-sm">Neural-2025</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-gray-400 uppercase">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  <span className="text-neon-green font-mono text-sm">Active</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-cyber-border/30">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-wide">
                  Powered by React • Tailwind • Framer Motion
                </p>
              </div>
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            className="space-y-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <ExternalLink className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-200">
                Connect
              </h3>
            </div>
            
            <div className="space-y-3">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`glass p-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 ${link.color}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative">
                      <IconComponent className="w-5 h-5" />
                      <motion.div
                        className="absolute inset-0 bg-current rounded-full blur-md opacity-30"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-200">{link.name}</span>
                      <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
                        {link.name === 'LinkedIn' ? 'Professional Network' : 'Code Repository'}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-cyber-border/30"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-gray-400 text-sm">
                Made with passion for the future
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                © {currentYear} Musab Hassen
              </span>
              <div className="w-1 h-1 bg-gray-500 rounded-full" />
              <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                NEURON Weather System
              </span>
            </div>
          </div>
          
          {/* Neural Network Animation */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-neon-green rounded-full"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles for extra effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;