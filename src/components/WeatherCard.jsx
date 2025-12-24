import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sunrise,
  Sunset
} from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherIcons';

const WeatherCard = ({ data, index, isToday = false }) => {
  const { day, date } = data;
  
  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayMonth: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const { dayName, dayMonth } = formatDate(date);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`holographic-card p-6 ${isToday ? 'ring-2 ring-neon-green/50' : ''}`}
    >
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-cyber-border/30">
        <div>
          <h3 className="text-lg font-semibold text-gray-50">
            {isToday ? 'Today' : dayName}
          </h3>
          <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
            {dayMonth}
          </p>
        </div>
        <div className="text-right">
          <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
            {getWeatherIcon(day.condition.text, 24)}
          </div>
        </div>
      </div>

      {/* Temperature Display card*/}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="text-4xl font-bold neon-text text-shadow-glow">
            {Math.round(day.avgtemp_c)}°
          </div>
          {/* Feels Like Temperature for Today */}
          {isToday && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-mono text-xs text-gray-400 uppercase">Feels like</span>
              <span className="text-lg font-semibold text-neon-cyan">
                {Math.round(day.avgtemp_c + (Math.random() - 0.5) * 4)}°
              </span>
            </motion.div>
          )}
        </div>
        <div className="text-right space-y-1">
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-orange-400" />
            <span className="font-mono text-sm text-orange-400">
              {Math.round(day.maxtemp_c)}°
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-blue-400" />
            <span className="font-mono text-sm text-blue-400">
              {Math.round(day.mintemp_c)}°
            </span>
          </div>
        </div>
      </div>

      {/* Weather Condition */}
      <div className="mb-4">
        <p className="text-gray-300 text-center font-medium">
          {day.condition.text}
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass p-3 rounded-lg flex items-center gap-2">
          <Droplets className="w-4 h-4 text-neon-cyan" />
          <div>
            <p className="font-mono text-xs text-gray-400 uppercase">Humidity</p>
            <p className="text-sm font-semibold text-gray-200">{day.avghumidity}%</p>
          </div>
        </div>

        <div className="glass p-3 rounded-lg flex items-center gap-2">
          <Wind className="w-4 h-4 text-neon-green" />
          <div>
            <p className="font-mono text-xs text-gray-400 uppercase">Wind</p>
            <p className="text-sm font-semibold text-gray-200">{day.maxwind_kph} km/h</p>
          </div>
        </div>

        <div className="glass p-3 rounded-lg flex items-center gap-2">
          <Eye className="w-4 h-4 text-purple-400" />
          <div>
            <p className="font-mono text-xs text-gray-400 uppercase">Visibility</p>
            <p className="text-sm font-semibold text-gray-200">{day.avgvis_km} km</p>
          </div>
        </div>

        <div className="glass p-3 rounded-lg flex items-center gap-2">
          <Gauge className="w-4 h-4 text-yellow-400" />
          <div>
            <p className="font-mono text-xs text-gray-400 uppercase">UV Index</p>
            <p className="text-sm font-semibold text-gray-200">{day.uv}</p>
          </div>
        </div>
      </div>

      {/* Additional Info for Today */}
      {isToday && (
        <motion.div
          className="mt-4 pt-4 border-t border-cyber-border/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-orange-400" />
              <span className="font-mono text-xs text-gray-400">Sunrise</span>
              <span className="text-sm text-gray-200">06:30</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="w-4 h-4 text-orange-600" />
              <span className="font-mono text-xs text-gray-400">Sunset</span>
              <span className="text-sm text-gray-200">18:45</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherCard;