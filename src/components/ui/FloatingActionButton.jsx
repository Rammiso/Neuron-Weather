import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Smartphone,
  Zap,
  X
} from 'lucide-react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [theme, setTheme] = useState('cyberpunk');

  const menuItems = [
    {
      icon: soundEnabled ? Volume2 : VolumeX,
      label: soundEnabled ? 'Sound On' : 'Sound Off',
      action: () => setSoundEnabled(!soundEnabled),
      color: soundEnabled ? 'text-neon-green' : 'text-gray-400'
    },
    {
      icon: Palette,
      label: 'Theme',
      action: () => setTheme(theme === 'cyberpunk' ? 'neural' : 'cyberpunk'),
      color: 'text-purple-400'
    },
    {
      icon: Monitor,
      label: 'Desktop Mode',
      action: () => console.log('Desktop mode'),
      color: 'text-neon-cyan'
    },
    {
      icon: Smartphone,
      label: 'Mobile Mode',
      action: () => console.log('Mobile mode'),
      color: 'text-orange-400'
    }
  ];

  const fabVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { 
      opacity: 0, 
      y: 20, 
      scale: 0.8 
    },
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1 
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 space-y-3"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.button
                  key={item.label}
                  variants={itemVariants}
                  className="glass p-3 rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-all duration-300 group min-w-[160px]"
                  onClick={item.action}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-gray-200 text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId={`glow-${index}`}
                  />
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        className="glass w-14 h-14 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300 group relative overflow-hidden"
        variants={fabVariants}
        animate={isOpen ? 'open' : 'closed'}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Background pulse effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Icon */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-neon-green" />
            </motion.div>
          ) : (
            <motion.div
              key="settings"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Settings className="w-6 h-6 text-neon-green group-hover:rotate-180 transition-transform duration-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rotating border effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-neon-green/30"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.button>

      {/* Status indicator */}
      <motion.div
        className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Zap className="w-2 h-2 text-black" />
      </motion.div>
    </div>
  );
};

export default FloatingActionButton;