import { Search, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchInput = ({ search, setSearch, placeholder = "Search for a city..." }) => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="relative group">
      
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Search Icon */}
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-neon-green z-10" />
        
        {/* Location Icon */}
        <MapPin className="absolute right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 transition-colors duration-300 group-hover:text-neon-cyan z-10" />
        
        {/* Neural Activity Indicator */}
        <motion.div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className="w-4 h-4 text-neon-green" />
        </motion.div>
        
        {/* Input Field */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="cyber-input w-full pl-12 pr-20 py-4 text-lg relative z-10 group-hover:border-neon-green/50 focus:border-neon-green"
        />
        
        {/* Scanning line effect */}
        {search.length > 0 && (
          <motion.div
            className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        )}
      </div>
      
      {/* Status indicator */}
      {search.length > 2 && (
        <motion.div
          className="absolute -bottom-8 left-0 right-0 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" />
            <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
              Neural scan active
            </span>
            <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchInput;