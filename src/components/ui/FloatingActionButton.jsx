import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Palette, 
  Volume2, 
  VolumeX, 
  Zap,
  X
} from 'lucide-react';

const FloatingActionButton = ({ weatherCondition }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    // Load sound preference from localStorage
    const saved = localStorage.getItem('neuron-weather-sound');
    return saved ? JSON.parse(saved) : false;
  });
  const [theme, setTheme] = useState('cyberpunk');
  const [currentAudio, setCurrentAudio] = useState(null);

  // Weather sound mapping
  const weatherSounds = {
    rain: 'https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3', // Rain sound
    thunderstorm: 'https://assets.mixkit.co/active_storage/sfx/1295/1295-preview.mp3', // Thunder
    snow: 'https://assets.mixkit.co/active_storage/sfx/1649/1649-preview.mp3', // Wind/snow
    clear: 'https://assets.mixkit.co/active_storage/sfx/2462/2462-preview.mp3', // Birds chirping
    cloudy: 'https://assets.mixkit.co/active_storage/sfx/1649/1649-preview.mp3', // Gentle wind
    windy: 'https://assets.mixkit.co/active_storage/sfx/1649/1649-preview.mp3', // Strong wind
    fog: 'https://assets.mixkit.co/active_storage/sfx/1649/1649-preview.mp3', // Ambient
  };

  // Play weather sound based on condition
  useEffect(() => {
    if (!soundEnabled || !weatherCondition) {
      // Stop audio if sound is disabled or no weather condition
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setCurrentAudio(null);
      }
      return;
    }

    // Determine sound based on weather condition
    const condition = weatherCondition.toLowerCase();
    let soundUrl = null;

    if (condition.includes('rain') || condition.includes('drizzle')) {
      soundUrl = weatherSounds.rain;
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      soundUrl = weatherSounds.thunderstorm;
    } else if (condition.includes('snow') || condition.includes('sleet')) {
      soundUrl = weatherSounds.snow;
    } else if (condition.includes('clear') || condition.includes('sunny')) {
      soundUrl = weatherSounds.clear;
    } else if (condition.includes('wind')) {
      soundUrl = weatherSounds.windy;
    } else if (condition.includes('fog') || condition.includes('mist')) {
      soundUrl = weatherSounds.fog;
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      soundUrl = weatherSounds.cloudy;
    }

    if (soundUrl) {
      // Stop current audio if playing
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audio = new Audio(soundUrl);
      audio.volume = 0.3; // Set volume to 30%
      audio.loop = true;
      audio.play().catch(err => console.log('Audio play failed:', err));
      setCurrentAudio(audio);
    }

    // Cleanup
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherCondition, soundEnabled]);

  // Save sound preference
  useEffect(() => {
    localStorage.setItem('neuron-weather-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const menuItems = [
    {
      icon: soundEnabled ? Volume2 : VolumeX,
      label: soundEnabled ? 'Sound On' : 'Sound Off',
      action: () => setSoundEnabled(!soundEnabled),
      color: soundEnabled ? 'text-neon-green' : 'text-gray-400',
      description: 'Weather ambient sounds'
    },
    {
      icon: Palette,
      label: 'Theme',
      action: () => setTheme(theme === 'cyberpunk' ? 'neural' : 'cyberpunk'),
      color: 'text-purple-400',
      description: 'Cyberpunk style'
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
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
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
                  className="glass p-3 rounded-xl flex items-center gap-3 hover:-translate-y-1 transition-all duration-300 group min-w-[180px]"
                  onClick={item.action}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  <div className="flex-1 text-left">
                    <span className="text-gray-200 text-sm font-medium block">
                      {item.label}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {item.description}
                    </span>
                  </div>
                  
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