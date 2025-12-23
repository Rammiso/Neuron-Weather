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
    const saved = localStorage.getItem('neuron-weather-sound');
    return saved ? JSON.parse(saved) : false;
  });
  const [theme, setTheme] = useState('cyberpunk');
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(null);

  // Weather sound mapping - Using reliable CDN sources
  const weatherSounds = {
    rain: 'https://cdn.freesound.org/previews/416/416710_5121236-lq.mp3',
    thunderstorm: 'https://cdn.freesound.org/previews/442/442774_907272-lq.mp3',
    snow: 'https://cdn.freesound.org/previews/270/270319_5123851-lq.mp3',
    clear: 'https://cdn.freesound.org/previews/506/506053_10361990-lq.mp3',
    cloudy: 'https://cdn.freesound.org/previews/270/270319_5123851-lq.mp3',
    windy: 'https://cdn.freesound.org/previews/270/270319_5123851-lq.mp3',
    fog: 'https://cdn.freesound.org/previews/270/270319_5123851-lq.mp3',
  };

  // Handle sound toggle with user interaction
  const handleSoundToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    setAudioError(null);
    
    if (newState && weatherCondition) {
      // User just enabled sound, try to play immediately
      playWeatherSound(weatherCondition);
    } else if (!newState && currentAudio) {
      // User disabled sound, stop audio
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  // Function to play weather sound
  const playWeatherSound = (condition) => {
    if (!condition) return;

    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Determine sound based on weather condition
    const conditionLower = condition.toLowerCase();
    let soundUrl = null;

    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      soundUrl = weatherSounds.rain;
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
      soundUrl = weatherSounds.thunderstorm;
    } else if (conditionLower.includes('snow') || conditionLower.includes('sleet')) {
      soundUrl = weatherSounds.snow;
    } else if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      soundUrl = weatherSounds.clear;
    } else if (conditionLower.includes('wind')) {
      soundUrl = weatherSounds.windy;
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
      soundUrl = weatherSounds.fog;
    } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
      soundUrl = weatherSounds.cloudy;
    }

    if (soundUrl) {
      try {
        const audio = new Audio(soundUrl);
        audio.volume = 0.3;
        audio.loop = true;
        audio.crossOrigin = 'anonymous'; // Handle CORS
        
        audio.addEventListener('playing', () => {
          setIsPlaying(true);
          setAudioError(null);
        });
        
        audio.addEventListener('error', (e) => {
          console.error('Audio error:', e);
          setAudioError('Sound unavailable');
          setIsPlaying(false);
        });

        audio.play()
          .then(() => {
            setCurrentAudio(audio);
            setIsPlaying(true);
          })
          .catch(err => {
            console.error('Audio play failed:', err);
            setAudioError('Click to enable sound');
            setIsPlaying(false);
          });
      } catch (error) {
        console.error('Audio creation failed:', error);
        setAudioError('Sound error');
      }
    }
  };

  // Play weather sound when condition changes
  useEffect(() => {
    if (soundEnabled && weatherCondition) {
      playWeatherSound(weatherCondition);
    }

    // Cleanup
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherCondition]);

  // Save sound preference
  useEffect(() => {
    localStorage.setItem('neuron-weather-sound', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const menuItems = [
    {
      icon: soundEnabled ? Volume2 : VolumeX,
      label: soundEnabled ? (isPlaying ? 'Sound Playing' : 'Sound On') : 'Sound Off',
      action: handleSoundToggle,
      color: soundEnabled ? (isPlaying ? 'text-neon-green' : 'text-yellow-400') : 'text-gray-400',
      description: audioError || (soundEnabled ? 'Weather ambient sounds' : 'Enable weather sounds')
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