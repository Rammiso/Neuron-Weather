import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Wind,
  Eye
} from 'lucide-react';

export const getWeatherIcon = (condition, size = 24) => {
  const iconProps = {
    size,
    className: "text-neon-cyan"
  };

  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return <Sun {...iconProps} className="text-yellow-400" />;
  }
  
  if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
    return <CloudRain {...iconProps} className="text-blue-400" />;
  }
  
  if (conditionLower.includes('drizzle')) {
    return <CloudDrizzle {...iconProps} className="text-blue-300" />;
  }
  
  if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return <CloudSnow {...iconProps} className="text-gray-200" />;
  }
  
  if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return <CloudLightning {...iconProps} className="text-purple-400" />;
  }
  
  if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    return <Cloud {...iconProps} className="text-gray-400" />;
  }
  
  if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
    return <Eye {...iconProps} className="text-gray-300" />;
  }
  
  if (conditionLower.includes('wind')) {
    return <Wind {...iconProps} className="text-neon-green" />;
  }

  // Default icon
  return <Cloud {...iconProps} />;
};

export const getTemperatureColor = (temp) => {
  if (temp >= 30) return 'text-red-400';
  if (temp >= 20) return 'text-orange-400';
  if (temp >= 10) return 'text-yellow-400';
  if (temp >= 0) return 'text-neon-cyan';
  return 'text-blue-400';
};