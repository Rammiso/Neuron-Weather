import { useState, useEffect, useMemo } from 'react';

const useDynamicTheme = (currentWeather, forecast) => {
  const [timeOfDay, setTimeOfDay] = useState('day');

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 18) {
        setTimeOfDay('day');
      } else if (hour >= 18 && hour < 22) {
        setTimeOfDay('evening');
      } else {
        setTimeOfDay('night');
      }
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const themeConfig = useMemo(() => {
    if (!currentWeather) {
      return {
        backgroundClass: 'bg-gradient-to-br from-cyber-darker via-cyber-dark to-gray-900',
        particleColor: '#00ff88',
        accentColor: 'neon-green',
        weatherMood: 'neutral'
      };
    }

    const condition = currentWeather.current.condition.text.toLowerCase();
    const temp = currentWeather.current.temp_c;
    const isDay = currentWeather.current.is_day === 1;

    let weatherMood = 'neutral';
    let backgroundClass = '';
    let particleColor = '#00ff88';
    let accentColor = 'neon-green';

    if (condition.includes('rain') || condition.includes('drizzle')) {
      weatherMood = 'rainy';
      backgroundClass = isDay 
        ? 'bg-gradient-to-br from-slate-600 via-blue-900 to-gray-900'
        : 'bg-gradient-to-br from-slate-800 via-blue-950 to-black';
      particleColor = '#00aaff';
      accentColor = 'neon-cyan';
    } else if (condition.includes('snow') || condition.includes('blizzard')) {
      weatherMood = 'snowy';
      backgroundClass = isDay
        ? 'bg-gradient-to-br from-blue-200 via-blue-400 to-blue-900'
        : 'bg-gradient-to-br from-blue-900 via-blue-950 to-black';
      particleColor = '#ffffff';
      accentColor = 'blue-400';
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      weatherMood = 'cloudy';
      backgroundClass = isDay
        ? 'bg-gradient-to-br from-gray-500 via-gray-700 to-gray-900'
        : 'bg-gradient-to-br from-gray-800 via-gray-900 to-black';
      particleColor = '#9ca3af';
      accentColor = 'gray-400';
    } else if (condition.includes('clear') || condition.includes('sunny')) {
      weatherMood = 'sunny';
      backgroundClass = isDay
        ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600'
        : 'bg-gradient-to-br from-purple-900 via-blue-900 to-black';
      particleColor = isDay ? '#fbbf24' : '#00ff88';
      accentColor = isDay ? 'yellow-400' : 'neon-green';
    } else if (condition.includes('storm') || condition.includes('thunder')) {
      weatherMood = 'stormy';
      backgroundClass = 'bg-gradient-to-br from-purple-900 via-gray-900 to-black';
      particleColor = '#a855f7';
      accentColor = 'purple-400';
    } else {
      backgroundClass = 'bg-gradient-to-br from-cyber-darker via-cyber-dark to-gray-900';
    }

    if (timeOfDay === 'night') {
      backgroundClass = backgroundClass.replace(/from-\w+-\d+/, 'from-black');
    }

    return {
      backgroundClass,
      particleColor,
      accentColor,
      weatherMood,
      timeOfDay,
      isDay,
      condition,
      temperature: temp
    };
  }, [currentWeather, timeOfDay]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--dynamic-particle-color', themeConfig.particleColor);
    document.body.className = `font-inter ${themeConfig.backgroundClass} text-gray-50 min-h-screen overflow-x-hidden transition-all duration-1000`;
  }, [themeConfig]);

  return themeConfig;
};

export default useDynamicTheme;