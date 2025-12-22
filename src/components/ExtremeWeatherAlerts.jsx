import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Zap, 
  Sun, 
  Wind, 
  CloudRain,
  Snowflake,
  X
} from 'lucide-react';
import { useState, useMemo } from 'react';

const ExtremeWeatherAlerts = ({ currentWeather, forecast }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const alerts = useMemo(() => {
    if (!currentWeather || !forecast) return [];
    
    const current = currentWeather.current;
    const today = forecast.forecastday[0];
    const tomorrow = forecast.forecastday[1];
    
    const alertList = [];
    
    // Heat wave alert
    if (current.temp_c > 35 || (today.day.maxtemp_c > 35)) {
      alertList.push({
        id: 'heat-wave',
        type: 'extreme',
        icon: Sun,
        title: 'Extreme Heat Warning',
        message: `Dangerous heat levels detected. Temperature reaching ${Math.round(Math.max(current.temp_c, today.day.maxtemp_c))}°C.`,
        details: [
          'Stay indoors during peak hours (10 AM - 4 PM)',
          'Drink plenty of water and avoid alcohol',
          'Wear light-colored, loose-fitting clothing',
          'Check on elderly neighbors and pets'
        ],
        severity: 'high',
        color: 'from-red-500 to-orange-500',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30'
      });
    }
    
    // Storm alert
    if (current.condition.text.toLowerCase().includes('storm') || 
        current.condition.text.toLowerCase().includes('thunder') ||
        (today.day.daily_chance_of_rain > 80 && current.wind_kph > 30)) {
      alertList.push({
        id: 'storm',
        type: 'severe',
        icon: Zap,
        title: 'Severe Storm Alert',
        message: `Thunderstorm conditions detected with ${Math.round(current.wind_kph)} km/h winds.`,
        details: [
          'Avoid outdoor activities and seek shelter',
          'Unplug electronic devices',
          'Stay away from windows and doors',
          'Have emergency supplies ready'
        ],
        severity: 'high',
        color: 'from-purple-500 to-blue-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30'
      });
    }
    
    // Strong wind alert
    if (current.wind_kph > 50) {
      alertList.push({
        id: 'strong-winds',
        type: 'caution',
        icon: Wind,
        title: 'High Wind Advisory',
        message: `Strong winds of ${Math.round(current.wind_kph)} km/h detected.`,
        details: [
          'Secure loose outdoor objects',
          'Avoid driving high-profile vehicles',
          'Be cautious of falling tree branches',
          'Postpone outdoor activities if possible'
        ],
        severity: 'medium',
        color: 'from-cyan-500 to-blue-500',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/30'
      });
    }
    
    // Heavy rain/flood alert
    if (today.day.totalprecip_mm > 50 || today.day.daily_chance_of_rain > 90) {
      alertList.push({
        id: 'heavy-rain',
        type: 'caution',
        icon: CloudRain,
        title: 'Heavy Rain Warning',
        message: `Significant rainfall expected: ${today.day.totalprecip_mm}mm with ${today.day.daily_chance_of_rain}% probability.`,
        details: [
          'Avoid low-lying and flood-prone areas',
          'Drive slowly and maintain safe distances',
          'Clear gutters and drains around your property',
          'Have emergency contact numbers ready'
        ],
        severity: 'medium',
        color: 'from-blue-500 to-indigo-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30'
      });
    }
    
    // Cold weather alert
    if (current.temp_c < -10 || (tomorrow && tomorrow.day.mintemp_c < -10)) {
      alertList.push({
        id: 'extreme-cold',
        type: 'extreme',
        icon: Snowflake,
        title: 'Extreme Cold Warning',
        message: `Dangerous cold temperatures: ${Math.round(Math.min(current.temp_c, tomorrow?.day.mintemp_c || 0))}°C.`,
        details: [
          'Limit time outdoors to prevent frostbite',
          'Dress in layers and cover exposed skin',
          'Check heating systems and have backup heat',
          'Bring pets indoors and check on neighbors'
        ],
        severity: 'high',
        color: 'from-blue-400 to-cyan-400',
        bgColor: 'bg-blue-400/10',
        borderColor: 'border-blue-400/30'
      });
    }
    
    // UV Index alert
    if (today.day.uv > 8) {
      alertList.push({
        id: 'uv-extreme',
        type: 'caution',
        icon: Sun,
        title: 'Extreme UV Alert',
        message: `Very high UV index of ${today.day.uv}. Skin damage can occur quickly.`,
        details: [
          'Use SPF 30+ sunscreen and reapply frequently',
          'Wear protective clothing and wide-brimmed hat',
          'Seek shade between 10 AM and 4 PM',
          'Wear UV-blocking sunglasses'
        ],
        severity: 'medium',
        color: 'from-yellow-500 to-orange-500',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30'
      });
    }
    
    return alertList.filter(alert => !dismissedAlerts.has(alert.id));
  }, [currentWeather, forecast, dismissedAlerts]);

  const dismissAlert = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      default: return 'ℹ️';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {alerts.map((alert, index) => {
          const IconComponent = alert.icon;
          
          return (
            <motion.div
              key={alert.id}
              className={`holographic-card p-6 border-2 ${alert.borderColor} ${alert.bgColor}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              {/* Alert Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <motion.div
                      className={`p-3 rounded-full bg-gradient-to-r ${alert.color}`}
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    {/* Pulsing ring for high severity */}
                    {alert.severity === 'high' && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-current opacity-30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                      <h3 className="text-lg font-bold text-white">{alert.title}</h3>
                    </div>
                    <p className="font-mono text-xs text-gray-300 uppercase tracking-wide">
                      {alert.type} Weather Alert
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => dismissAlert(alert.id)}
                  className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-gray-400" />
                </motion.button>
              </div>

              {/* Alert Message */}
              <div className="mb-4">
                <p className="text-gray-200 leading-relaxed">{alert.message}</p>
              </div>

              {/* Safety Recommendations */}
              <div className="glass p-4 rounded-lg">
                <h4 className="font-semibold text-sm text-gray-200 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Safety Recommendations
                </h4>
                <ul className="space-y-2">
                  {alert.details.map((detail, detailIndex) => (
                    <motion.li
                      key={detailIndex}
                      className="text-sm text-gray-300 flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + detailIndex * 0.1 }}
                    >
                      <span className="text-neon-green mt-1">•</span>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Alert Footer */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <span className="font-mono text-gray-400 uppercase">
                      Active Alert
                    </span>
                  </div>
                  <span className="font-mono text-gray-500">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ExtremeWeatherAlerts;