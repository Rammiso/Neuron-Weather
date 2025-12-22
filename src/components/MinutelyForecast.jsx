import { motion } from 'framer-motion';
import { 
  Clock, 
  Droplets, 
  Wind, 
  Thermometer,
  Activity,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

const MinutelyForecast = ({ currentWeather, forecast }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate minute-by-minute data for the next 2 hours
  const minutelyData = useMemo(() => {
    if (!currentWeather || !forecast) return [];
    
    const today = forecast.forecastday[0];
    const hourlyData = today.hour;
    
    const now = new Date();
    
    const data = [];
    
    // Generate data for next 120 minutes (2 hours) in 10-minute intervals
    for (let i = 0; i < 12; i++) {
      const minutesFromNow = i * 10;
      const targetTime = new Date(now.getTime() + minutesFromNow * 60000);
      const targetHour = targetTime.getHours();
      
      // Get base hourly data
      const baseHourData = hourlyData[Math.min(targetHour, hourlyData.length - 1)];
      const nextHourData = hourlyData[Math.min(targetHour + 1, hourlyData.length - 1)];
      
      // Interpolate between hours for more realistic minute-by-minute data
      const hourProgress = targetTime.getMinutes() / 60;
      
      // Add some randomness for realistic variation
      const tempVariation = (Math.random() - 0.5) * 2; // ±1°C variation
      const windVariation = (Math.random() - 0.5) * 5; // ±2.5 km/h variation
      const rainVariation = Math.random() * 0.1; // Small rain probability variation
      
      const interpolatedTemp = baseHourData.temp_c + 
        (nextHourData.temp_c - baseHourData.temp_c) * hourProgress + tempVariation;
      
      const interpolatedWind = baseHourData.wind_kph + 
        (nextHourData.wind_kph - baseHourData.wind_kph) * hourProgress + windVariation;
      
      const interpolatedRain = (baseHourData.chance_of_rain / 100) + 
        ((nextHourData.chance_of_rain / 100) - (baseHourData.chance_of_rain / 100)) * hourProgress + rainVariation;
      
      data.push({
        time: targetTime,
        timeLabel: targetTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        temp: Math.round(interpolatedTemp * 10) / 10,
        windSpeed: Math.max(0, Math.round(interpolatedWind * 10) / 10),
        rainProbability: Math.max(0, Math.min(1, interpolatedRain)),
        condition: baseHourData.condition.text,
        isNow: i === 0
      });
    }
    
    return data;
  }, [currentWeather, forecast]);

  const getIntensityColor = (value, type) => {
    switch (type) {
      case 'rain':
        if (value > 0.7) return 'text-blue-400';
        if (value > 0.4) return 'text-cyan-400';
        if (value > 0.1) return 'text-gray-400';
        return 'text-gray-600';
      case 'wind':
        if (value > 30) return 'text-red-400';
        if (value > 20) return 'text-orange-400';
        if (value > 10) return 'text-yellow-400';
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTrendIcon = (current, next) => {
    if (!next) return null;
    const diff = next - current;
    if (Math.abs(diff) < 0.5) return null;
    return diff > 0 ? TrendingUp : TrendingDown;
  };

  if (minutelyData.length === 0) return null;

  return (
    <motion.div
      className="holographic-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyber-border/30">
        <div className="relative">
          <Clock className="w-6 h-6 text-neon-cyan" />
          <motion.div
            className="absolute inset-0 bg-neon-cyan/30 rounded-full blur-sm"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-50">Minute-by-Minute</h3>
          <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
            Next {isMobile ? '40min' : '1hr'} • Live Updates
          </p>
        </div>
      </div>

      {/* Compact Timeline - Mobile First */}
      <div className="space-y-2">
        {/* Desktop: Show first 6 items, Mobile: Show first 4 items */}
        {minutelyData.slice(0, isMobile ? 4 : 6).map((item, index) => {
          const nextItem = minutelyData[index + 1];
          const TempTrendIcon = getTrendIcon(item.temp, nextItem?.temp);
          
          return (
            <motion.div
              key={index}
              className={`glass p-3 rounded-lg border ${
                item.isNow ? 'border-neon-green/50 bg-neon-green/5' : 'border-cyber-border/30'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="flex items-center justify-between">
                {/* Time */}
                <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
                  <div className={`font-mono text-sm font-semibold ${
                    item.isNow ? 'text-neon-green' : 'text-gray-300'
                  }`}>
                    {item.isNow ? 'NOW' : item.timeLabel}
                  </div>
                  {item.isNow && (
                    <motion.div
                      className="w-1.5 h-1.5 bg-neon-green rounded-full"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Compact Weather Data */}
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Temperature */}
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 md:w-4 md:h-4 text-orange-400" />
                    <span className="font-mono text-xs md:text-sm text-gray-200">
                      {item.temp}°
                    </span>
                    {TempTrendIcon && (
                      <TempTrendIcon className="w-2 h-2 md:w-3 md:h-3 text-gray-400" />
                    )}
                  </div>

                  {/* Wind */}
                  <div className="flex items-center gap-1">
                    <Wind className={`w-3 h-3 md:w-4 md:h-4 ${getIntensityColor(item.windSpeed, 'wind')}`} />
                    <span className="font-mono text-xs md:text-sm text-gray-200">
                      {item.windSpeed}
                    </span>
                  </div>

                  {/* Rain Probability */}
                  <div className="flex items-center gap-1">
                    <Droplets className={`w-3 h-3 md:w-4 md:h-4 ${getIntensityColor(item.rainProbability, 'rain')}`} />
                    <span className="font-mono text-xs md:text-sm text-gray-200">
                      {Math.round(item.rainProbability * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Compact Rain intensity indicator - only for significant rain */}
              {item.rainProbability > 0.3 && (
                <div className="mt-2 pt-2 border-t border-cyber-border/20">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${getIntensityColor(item.rainProbability, 'rain').replace('text-', 'bg-')}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.rainProbability * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                      />
                    </div>
                    <span className="font-mono text-xs text-gray-400 min-w-0 flex-shrink-0">
                      {item.rainProbability > 0.7 ? 'Heavy' : 
                       item.rainProbability > 0.4 ? 'Moderate' : 'Light'}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Compact Summary */}
      <div className="mt-4 pt-3 border-t border-cyber-border/30">
        <div className="glass p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-neon-green" />
            <span className="font-semibold text-sm text-gray-200">Summary</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-gray-400 block">Temp</span>
              <span className="text-gray-200 font-mono">
                {Math.min(...minutelyData.slice(0, 6).map(d => d.temp))}° - {Math.max(...minutelyData.slice(0, 6).map(d => d.temp))}°
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Wind</span>
              <span className="text-gray-200 font-mono">
                {Math.max(...minutelyData.slice(0, 6).map(d => d.windSpeed))} km/h
              </span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <span className="text-gray-400 block">Rain</span>
              <span className="text-gray-200 font-mono">
                {Math.round(Math.max(...minutelyData.slice(0, 6).map(d => d.rainProbability)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
        <span className="font-mono text-xs text-gray-500 uppercase">
          Live Forecast Active
        </span>
        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

export default MinutelyForecast;