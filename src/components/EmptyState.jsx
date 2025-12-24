import { motion } from 'framer-motion';
import { Search, Cloud, Zap } from 'lucide-react';

const EmptyState = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[400px] text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative mb-8">
        {/* Animated background glow  for */}
        <motion.div
          className="absolute inset-0 bg-neon-green/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Icon container */}
        <div className="relative glass w-24 h-24 rounded-full flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Cloud className="w-12 h-12 text-neon-cyan" />
          </motion.div>
          
          {/* Floating search icon */}
          <motion.div
            className="absolute -top-2 -right-2 glass w-8 h-8 rounded-full flex items-center justify-center"
            animate={{
              y: [-2, 2, -2],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Search className="w-4 h-4 text-neon-green" />
          </motion.div>
          
          {/* Lightning bolt */}
          <motion.div
            className="absolute -bottom-1 -left-1 glass w-6 h-6 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="w-3 h-3 text-yellow-400" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="space-y-4 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-gray-200">
          NEURON Weather System
        </h3>
        
        <p className="text-gray-400 leading-relaxed">
          Enter a city name to access real-time weather data and 7-day forecasts 
          powered by advanced neural meteorological algorithms.
        </p>
        
        <div className="font-mono text-sm text-gray-500 uppercase tracking-wider">
          Start typing to initialize scan...
        </div>
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green rounded-full opacity-30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default EmptyState;