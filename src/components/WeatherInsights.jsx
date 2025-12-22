import { motion } from 'framer-motion';
import { 
  Brain, 
  AlertTriangle, 
  Sun, 
  Snowflake, 
  Wind, 
  Droplets,
  Shield,
  Activity
} from 'lucide-react';
import { useMemo } from 'react';

const WeatherInsights = ({ currentWeather, forecast }) => {
  const insights = useMemo(() => {
    if (!currentWeather || !forecast) return [];
    
    const current = currentWeather.current;
    const today = forecast.forecastday[0];
    const tomorrow = forecast.forecastday[1];
    
    const analysisResults = [];
    
    // Temperature comfort analysis
    const temp = current.temp_c;
    if (temp > 30) {
      analysisResults.push({
        type: 'warning',
        icon: Sun,
        title: 'Heat Advisory',
        message: `High temperature of ${Math.round(temp)}°C. Stay hydrated and avoid prolonged sun exposure.`,
        priority: 'high'
      });
    } else if (temp < 0) {
      analysisResults.push({
        type: 'warning',
        icon: Snowflake,
        title: 'Cold Weather Alert',
        message: `Freezing conditions at ${Math.round(temp)}°C. Dress warmly and watch for ice.`,
        priority: 'high'
      });
    } else if (temp >= 20 && temp <= 25) {
      analysisResults.push({
        type: 'positive',
        icon: Shield,
        title: 'Perfect Weather',
        message: 'Ideal temperature for outdoor activities. Great day to be outside!',
        priority: 'low'
      });
    }
    
    // UV Index analysis
    if (today.day.uv > 7) {
      analysisResults.push({
        type: 'warning',
        icon: Sun,
        title: 'High UV Index',
        message: `UV Index of ${today.day.uv}. Use SPF 30+ sunscreen and seek shade during peak hours.`,
        priority: 'medium'
      });
    }
    
    // Wind analysis
    if (current.wind_kph > 40) {
      analysisResults.push({
        type: 'caution',
        icon: Wind,
        title: 'Strong Winds',
        message: `Wind speeds of ${Math.round(current.wind_kph)} km/h. Secure loose objects and drive carefully.`,
        priority: 'medium'
      });
    }
    
    // Rain probability analysis
    const rainChance = today.day.daily_chance_of_rain;
    if (rainChance > 70) {
      analysisResults.push({
        type: 'info',
        icon: Droplets,
        title: 'Rain Expected',
        message: `${rainChance}% chance of rain. Carry an umbrella and plan indoor activities.`,
        priority: 'medium'
      });
    }
    
    // Air quality analysis (simulated based on weather conditions)
    const visibility = current.vis_km;
    if (visibility < 5) {
      analysisResults.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Poor Visibility',
        message: `Visibility reduced to ${visibility}km. Drive with caution and use headlights.`,
        priority: 'high'
      });
    }
    
    // Tomorrow's weather comparison
    if (tomorrow) {
      const tempDiff = tomorrow.day.avgtemp_c - today.day.avgtemp_c;
      if (Math.abs(tempDiff) > 10) {
        analysisResults.push({
          type: 'info',
          icon: Activity,
          title: 'Temperature Change',
          message: `Tomorrow will be ${tempDiff > 0 ? 'warmer' : 'cooler'} by ${Math.abs(Math.round(tempDiff))}°C. Plan accordingly.`,
          priority: 'low'
        });
      }
    }
    
    // If no specific insights, provide general outdoor suitability
    if (analysisResults.length === 0) {
      const suitability = temp >= 15 && temp <= 28 && current.wind_kph < 25 && rainChance < 30;
      analysisResults.push({
        type: suitability ? 'positive' : 'neutral',
        icon: Shield,
        title: 'Outdoor Conditions',
        message: suitability 
          ? 'Excellent conditions for outdoor activities and sports.'
          : 'Mixed conditions. Check specific metrics before planning outdoor activities.',
        priority: 'low'
      });
    }
    
    return analysisResults.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [currentWeather, forecast]);

  const getInsightColor = (type) => {
    switch (type) {
      case 'warning': return 'text-red-400 border-red-400/30 bg-red-400/5';
      case 'caution': return 'text-amber-400 border-amber-400/30 bg-amber-400/5';
      case 'positive': return 'text-neon-green border-neon-green/30 bg-neon-green/5';
      case 'info': return 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/5';
    }
  };

  if (insights.length === 0) return null;

  return (
    <motion.div
      className="holographic-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyber-border/30">
        <div className="relative">
          <Brain className="w-6 h-6 text-neon-green" />
          <motion.div
            className="absolute inset-0 bg-neon-green/30 rounded-full blur-sm"
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
          <h3 className="text-lg font-semibold text-gray-50">Neural Weather Analysis</h3>
          <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
            AI-Powered Insights
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <motion.div
              key={index}
              className={`glass p-4 rounded-lg border ${getInsightColor(insight.type)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{insight.message}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-cyber-border/30">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          <span className="font-mono text-xs text-gray-500 uppercase">
            Neural Analysis Complete
          </span>
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherInsights;