import { motion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

const LocationHeader = ({ location, search }) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!location && !search) return null;

  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <MapPin className="w-6 h-6 text-neon-green" />
        <h2 className="text-3xl font-bold text-gray-50">
          {location ? location.name : search}
        </h2>
      </div>
      
      {location && (
        <div className="space-y-2">
          <p className="font-mono text-gray-400 uppercase tracking-wide">
            {location.region}, {location.country}
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-gray-300">
                Local Time: {getCurrentTime()}
              </span>
            </div>
          </div>
          
          {/* Coordinates */}
          <div className="font-mono text-xs text-gray-500">
            {location.lat}°N, {location.lon}°E
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LocationHeader;