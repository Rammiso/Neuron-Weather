import { motion } from 'framer-motion';
import { 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Zap
} from 'lucide-react';
import { useMemo } from 'react';

const AirQualityCard = ({ location, isVisible = true }) => {
  // Simulate AQI data based on location and weather conditions
  // In a real app, this would come from an AQI API
  const aqiData = useMemo(() => {
    if (!location) return null;
    
    // Simulate AQI based on location characteristics
    const baseAQI = Math.floor(Math.random() * 200) + 1;
    
    // Adjust based on location type (simplified simulation)
    let adjustedAQI = baseAQI;
    if (location.name.toLowerCase().includes('london') || 
        location.name.toLowerCase().includes('beijing') ||
        location.name.toLowerCase().includes('delhi')) {
      adjustedAQI = Math.min(200, baseAQI + 50); // Higher pollution in major cities
    } else if (location.name.toLowerCase().includes('rural') ||
               location.name.toLowerCase().includes('mountain')) {
      adjustedAQI = Math.max(1, baseAQI - 30); // Lower pollution in rural areas
    }
    
    return {
      aqi: adjustedAQI,
      pm25: Math.floor(adjustedAQI * 0.4),
      pm10: Math.floor(adjustedAQI * 0.6),
      o3: Math.floor(adjustedAQI * 0.3),
      no2: Math.floor(adjustedAQI * 0.2),
      so2: Math.floor(adjustedAQI * 0.1),
      co: Math.floor(adjustedAQI * 0.05)
    };
  }, [location]);

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return {
      level: 'Good',
      color: 'text-neon-green border-neon-green/30 bg-neon-green/5',
      icon: CheckCircle,
      description: 'Air quality is satisfactory for most people.',
      bgColor: 'bg-neon-green/10'
    };
    if (aqi <= 100) return {
      level: 'Moderate',
      color: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
      icon: Activity,
      description: 'Acceptable for most people, sensitive individuals may experience minor issues.',
      bgColor: 'bg-yellow-400/10'
    };
    if (aqi <= 150) return {
      level: 'Unhealthy for Sensitive Groups',
      color: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
      icon: AlertTriangle,
      description: 'Sensitive groups may experience health effects.',
      bgColor: 'bg-orange-400/10'
    };
    if (aqi <= 200) return {
      level: 'Unhealthy',
      color: 'text-red-400 border-red-400/30 bg-red-400/5',
      icon: XCircle,
      description: 'Everyone may experience health effects.',
      bgColor: 'bg-red-400/10'
    };
    return {
      level: 'Very Unhealthy',
      color: 'text-purple-400 border-purple-400/30 bg-purple-400/5',
      icon: XCircle,
      description: 'Health alert: everyone may experience serious health effects.',
      bgColor: 'bg-purple-400/10'
    };
  };

  if (!isVisible || !aqiData) {
    return (
      <motion.div
        className="holographic-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Leaf className="w-6 h-6 text-gray-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-50">Air Quality Index</h3>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
              Data Unavailable
            </p>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-400 mb-2">AQI data not available for this location</p>
          <p className="font-mono text-xs text-gray-500">Check back later for updates</p>
        </div>
      </motion.div>
    );
  }

  const aqiLevel = getAQILevel(aqiData.aqi);
  const IconComponent = aqiLevel.icon;

  const pollutants = [
    { name: 'PM2.5', value: aqiData.pm25, unit: 'μg/m³', color: 'text-red-400' },
    { name: 'PM10', value: aqiData.pm10, unit: 'μg/m³', color: 'text-orange-400' },
    { name: 'O₃', value: aqiData.o3, unit: 'μg/m³', color: 'text-blue-400' },
    { name: 'NO₂', value: aqiData.no2, unit: 'μg/m³', color: 'text-yellow-400' },
  ];

  return (
    <motion.div
      className="holographic-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyber-border/30">
        <div className="relative">
          <Leaf className="w-6 h-6 text-neon-green" />
          <motion.div
            className="absolute inset-0 bg-neon-green/30 rounded-full blur-sm"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-50">Air Quality Index</h3>
          <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
            Real-time Monitoring
          </p>
        </div>
      </div>

      {/* AQI Display */}
      <div className="text-center mb-6">
        <motion.div
          className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl border ${aqiLevel.color}`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <IconComponent className="w-6 h-6" />
          <div>
            <div className="text-3xl font-bold">{aqiData.aqi}</div>
            <div className="font-mono text-sm uppercase tracking-wide">{aqiLevel.level}</div>
          </div>
        </motion.div>
        
        <p className="text-sm text-gray-300 mt-3 leading-relaxed">
          {aqiLevel.description}
        </p>
      </div>

      {/* Pollutant Breakdown */}
      <div className="space-y-3 mb-4">
        <h4 className="font-semibold text-gray-200 text-sm flex items-center gap-2">
          <Zap className="w-4 h-4 text-neon-cyan" />
          Pollutant Levels
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {pollutants.map((pollutant, index) => (
            <motion.div
              key={pollutant.name}
              className="glass p-3 rounded-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400 uppercase">
                  {pollutant.name}
                </span>
                <span className={`text-sm font-semibold ${pollutant.color}`}>
                  {pollutant.value} {pollutant.unit}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${pollutant.color.replace('text-', 'bg-')}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (pollutant.value / 100) * 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Health Recommendations */}
      <div className="mt-4 pt-3 border-t border-cyber-border/30">
        <div className="glass p-3 rounded-lg">
          <h5 className="font-semibold text-sm text-gray-200 mb-2">Health Recommendations</h5>
          <div className="space-y-1 text-xs text-gray-300">
            {aqiData.aqi <= 50 && (
              <>
                <p>• Perfect for outdoor activities</p>
                <p>• No health precautions needed</p>
              </>
            )}
            {aqiData.aqi > 50 && aqiData.aqi <= 100 && (
              <>
                <p>• Sensitive individuals should limit prolonged outdoor exertion</p>
                <p>• Generally safe for outdoor activities</p>
              </>
            )}
            {aqiData.aqi > 100 && (
              <>
                <p>• Limit outdoor activities, especially for sensitive groups</p>
                <p>• Consider wearing a mask outdoors</p>
                <p>• Keep windows closed and use air purifiers</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
        <span className="font-mono text-xs text-gray-500 uppercase">
          Last Updated: {new Date().toLocaleTimeString()}
        </span>
        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

export default AirQualityCard;