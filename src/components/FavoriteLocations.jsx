import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Plus, 
  X, 
  Star,
  Navigation,
  Clock
} from 'lucide-react';
import { useState, useEffect } from 'react';

const FavoriteLocations = ({ currentLocation, onLocationSelect }) => {
  const [favorites, setFavorites] = useState([]);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('neuron-weather-favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('neuron-weather-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (location) => {
    if (!location || !location.name) return;
    
    const newFavorite = {
      id: Date.now(),
      name: location.name,
      region: location.region,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      addedAt: new Date().toISOString()
    };

    setFavorites(prev => {
      // Check if location already exists
      const exists = prev.some(fav => 
        fav.name.toLowerCase() === location.name.toLowerCase() &&
        fav.country.toLowerCase() === location.country.toLowerCase()
      );
      
      if (exists) return prev;
      
      return [newFavorite, ...prev].slice(0, 8); // Limit to 8 favorites
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const addCustomLocation = () => {
    if (!newLocationName.trim()) return;
    
    const customLocation = {
      id: Date.now(),
      name: newLocationName.trim(),
      region: 'Custom',
      country: 'Location',
      lat: 0,
      lon: 0,
      addedAt: new Date().toISOString(),
      isCustom: true
    };

    setFavorites(prev => [customLocation, ...prev].slice(0, 8));
    setNewLocationName('');
    setIsAddingLocation(false);
  };

  const isCurrentLocationFavorited = currentLocation && favorites.some(fav => 
    fav.name.toLowerCase() === currentLocation.name.toLowerCase() &&
    fav.country.toLowerCase() === currentLocation.country.toLowerCase()
  );

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const added = new Date(dateString);
    const diffInHours = Math.floor((now - added) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just added';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return added.toLocaleDateString();
  };

  return (
    <motion.div
      className="holographic-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyber-border/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Heart className="w-6 h-6 text-red-400" />
            <motion.div
              className="absolute inset-0 bg-red-400/30 rounded-full blur-sm"
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
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-50">Favorite Locations</h3>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
              Quick Access • {favorites.length}/8
            </p>
          </div>
        </div>

        {/* Add Current Location Button */}
        {currentLocation && !isCurrentLocationFavorited && (
          <motion.button
            onClick={() => addToFavorites(currentLocation)}
            className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-neon-green/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 text-neon-green" />
            <span className="font-mono text-xs text-neon-green uppercase">Add Current</span>
          </motion.button>
        )}
      </div>

      {/* Add New Location Input */}
      <AnimatePresence>
        {isAddingLocation && (
          <motion.div
            className="mb-4 p-4 glass rounded-lg border border-neon-cyan/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                placeholder="Enter city name..."
                className="flex-1 cyber-input text-sm"
                onKeyPress={(e) => e.key === 'Enter' && addCustomLocation()}
                autoFocus
              />
              <motion.button
                onClick={addCustomLocation}
                className="px-4 py-2 bg-neon-cyan/20 text-neon-cyan rounded-lg hover:bg-neon-cyan/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => setIsAddingLocation(false)}
                className="px-4 py-2 glass text-gray-400 rounded-lg hover:text-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites List */}
      <div className="space-y-3">
        <AnimatePresence>
          {favorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              className="glass p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onLocationSelect && onLocationSelect(favorite.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {favorite.isCustom ? (
                      <Navigation className="w-4 h-4 text-neon-cyan" />
                    ) : (
                      <MapPin className="w-4 h-4 text-neon-green" />
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {favorite.name}
                      </h4>
                      <p className="font-mono text-xs text-gray-400">
                        {favorite.region}, {favorite.country}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Time Added */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span className="font-mono">{getTimeAgo(favorite.addedAt)}</span>
                  </div>

                  {/* Remove Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(favorite.id);
                    }}
                    className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-400/20 text-red-400 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>

              {/* Coordinates for non-custom locations */}
              {!favorite.isCustom && (
                <div className="mt-2 pt-2 border-t border-cyber-border/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-gray-500">
                      {favorite.lat.toFixed(2)}°N, {favorite.lon.toFixed(2)}°E
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="font-mono text-gray-500">Favorite</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {favorites.length === 0 && (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 mb-2">No favorite locations yet</p>
            <p className="font-mono text-xs text-gray-500">
              Add locations for quick weather access
            </p>
          </motion.div>
        )}

        {/* Add Location Button */}
        {favorites.length < 8 && (
          <motion.button
            onClick={() => setIsAddingLocation(true)}
            className="w-full p-4 glass rounded-lg border-2 border-dashed border-cyber-border/50 hover:border-neon-cyan/50 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center gap-2">
              <Plus className="w-5 h-5 text-gray-400 group-hover:text-neon-cyan transition-colors" />
              <span className="font-mono text-sm text-gray-400 group-hover:text-neon-cyan transition-colors uppercase">
                Add Location
              </span>
            </div>
          </motion.button>
        )}
      </div>

      {/* Status */}
      <div className="mt-4 pt-3 border-t border-cyber-border/30">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          <span className="font-mono text-xs text-gray-500 uppercase">
            Personalization Active
          </span>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default FavoriteLocations;