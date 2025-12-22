import { motion } from 'framer-motion';
import { 
  Wind, 
  Thermometer,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import { useState, useMemo } from 'react';

const WeatherCharts = ({ forecast }) => {
  const [activeChart, setActiveChart] = useState('temperature');

  const chartData = useMemo(() => {
    if (!forecast || !forecast.forecastday) return null;
    
    const days = forecast.forecastday.slice(0, 7);
    
    return {
      temperature: {
        title: 'Temperature Trend',
        icon: Thermometer,
        color: 'neon-green',
        data: days.map((day, index) => ({
          label: index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
          high: day.day.maxtemp_c,
          low: day.day.mintemp_c,
          avg: day.day.avgtemp_c,
          date: day.date
        }))
      },
      wind: {
        title: 'Wind Speed Pattern',
        icon: Wind,
        color: 'neon-cyan',
        data: days.map((day, index) => ({
          label: index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
          value: day.day.maxwind_kph,
          date: day.date
        }))
      },
      hourly: {
        title: '24-Hour Temperature',
        icon: Activity,
        color: 'neon-lime',
        data: days[0]?.hour?.slice(0, 24).map(hour => ({
          label: new Date(hour.time).toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }),
          value: hour.temp_c,
          time: hour.time
        })) || []
      }
    };
  }, [forecast]);

  const getMaxValue = (data, key = 'value') => {
    if (key === 'high') {
      return Math.max(...data.map(d => d.high || 0));
    }
    return Math.max(...data.map(d => d[key] || 0));
  };

  const getMinValue = (data, key = 'value') => {
    if (key === 'low') {
      return Math.min(...data.map(d => d.low || 0));
    }
    return Math.min(...data.map(d => d[key] || 0));
  };

  const renderTemperatureChart = (data) => {
    const maxTemp = getMaxValue(data.data, 'high');
    const minTemp = getMinValue(data.data, 'low');
    const range = maxTemp - minTemp;
    
    return (
      <div className="space-y-4">
        {/* Chart Area */}
        <div className="relative h-48 glass p-4 rounded-lg">
          <div className="flex items-end justify-between h-full gap-2">
            {data.data.map((item, index) => {
              const highPercent = ((item.high - minTemp) / range) * 100;
              const lowPercent = ((item.low - minTemp) / range) * 100;
              const avgPercent = ((item.avg - minTemp) / range) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center h-full">
                  {/* Temperature Bar */}
                  <div className="relative flex-1 w-full max-w-8 flex flex-col justify-end">
                    {/* High temp indicator */}
                    <motion.div
                      className="w-full bg-gradient-to-t from-red-500/50 to-red-400/70 rounded-t-lg relative"
                      style={{ height: `${highPercent}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${highPercent}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-red-400">
                        {Math.round(item.high)}°
                      </span>
                    </motion.div>
                    
                    {/* Low temp indicator */}
                    <motion.div
                      className="w-full bg-gradient-to-t from-blue-500/50 to-blue-400/70 rounded-b-lg relative"
                      style={{ height: `${lowPercent}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${lowPercent}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                    >
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-blue-400">
                        {Math.round(item.low)}°
                      </span>
                    </motion.div>
                    
                    {/* Average line */}
                    <div 
                      className="absolute w-full h-0.5 bg-neon-green shadow-lg shadow-neon-green/50"
                      style={{ bottom: `${avgPercent}%` }}
                    />
                  </div>
                  
                  {/* Day label */}
                  <span className="text-xs font-mono text-gray-400 mt-8 text-center">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded" />
            <span className="text-gray-400">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-neon-green" />
            <span className="text-gray-400">Average</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded" />
            <span className="text-gray-400">Low</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSimpleChart = (data) => {
    const maxValue = getMaxValue(data.data);
    
    return (
      <div className="space-y-4">
        {/* Chart Area */}
        <div className="relative h-48 glass p-4 rounded-lg">
          <div className="flex items-end justify-between h-full gap-2">
            {data.data.map((item, index) => {
              const percent = (item.value / maxValue) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center h-full">
                  {/* Value Bar */}
                  <div className="relative flex-1 w-full max-w-8 flex flex-col justify-end">
                    <motion.div
                      className={`w-full bg-gradient-to-t from-${data.color}/50 to-${data.color}/70 rounded-lg relative`}
                      style={{ height: `${percent}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${percent}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                    >
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-gray-300">
                        {Math.round(item.value)}
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Label */}
                  <span className="text-xs font-mono text-gray-400 mt-4 text-center">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="text-center">
            <span className="text-gray-400 block">Max</span>
            <span className="text-gray-200 font-mono">{Math.round(maxValue)}</span>
          </div>
          <div className="text-center">
            <span className="text-gray-400 block">Avg</span>
            <span className="text-gray-200 font-mono">
              {Math.round(data.data.reduce((sum, item) => sum + item.value, 0) / data.data.length)}
            </span>
          </div>
          <div className="text-center">
            <span className="text-gray-400 block">Min</span>
            <span className="text-gray-200 font-mono">{Math.round(getMinValue(data.data))}</span>
          </div>
        </div>
      </div>
    );
  };

  if (!chartData) return null;

  const charts = ['temperature', 'wind', 'hourly'];
  const currentData = chartData[activeChart];

  return (
    <motion.div
      className="holographic-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyber-border/30">
        <div className="relative">
          <BarChart3 className="w-6 h-6 text-neon-lime" />
          <motion.div
            className="absolute inset-0 bg-neon-lime/30 rounded-full blur-sm"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-50">Weather Analytics</h3>
          <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
            Interactive Data Visualization
          </p>
        </div>
      </div>

      {/* Chart Selector */}
      <div className="flex gap-2 mb-6">
        {charts.map((chart) => {
          const data = chartData[chart];
          const IconComponent = data.icon;
          const isActive = activeChart === chart;
          
          return (
            <motion.button
              key={chart}
              onClick={() => setActiveChart(chart)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                isActive 
                  ? `bg-${data.color}/20 text-${data.color} border border-${data.color}/30` 
                  : 'glass text-gray-400 hover:text-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconComponent className="w-4 h-4" />
              <span className="uppercase tracking-wide">{chart}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Chart Content */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
            <currentData.icon className={`w-5 h-5 text-${currentData.color}`} />
            {currentData.title}
          </h4>
        </div>

        {activeChart === 'temperature' 
          ? renderTemperatureChart(currentData)
          : renderSimpleChart(currentData)
        }
      </motion.div>

      {/* Insights */}
      <div className="mt-6 pt-4 border-t border-cyber-border/30">
        <div className="glass p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="font-semibold text-sm text-gray-200">Quick Insights</span>
          </div>
          
          {activeChart === 'temperature' && (
            <div className="space-y-2 text-xs text-gray-300">
              <p>• Temperature range: {Math.round(getMinValue(currentData.data, 'low'))}° to {Math.round(getMaxValue(currentData.data, 'high'))}°C</p>
              <p>• Most stable day: {currentData.data.reduce((min, day) => 
                (day.high - day.low) < (min.high - min.low) ? day : min
              ).label}</p>
            </div>
          )}
          
          {activeChart === 'wind' && (
            <div className="space-y-2 text-xs text-gray-300">
              <p>• Peak wind speed: {Math.round(getMaxValue(currentData.data))} km/h</p>
              <p>• Windiest day: {currentData.data.reduce((max, day) => 
                day.value > max.value ? day : max
              ).label}</p>
            </div>
          )}
          
          {activeChart === 'hourly' && (
            <div className="space-y-2 text-xs text-gray-300">
              <p>• Peak temperature today: {Math.round(getMaxValue(currentData.data))}°C</p>
              <p>• Coolest hour: {currentData.data.reduce((min, hour) => 
                hour.value < min.value ? hour : min
              ).label}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse" />
        <span className="font-mono text-xs text-gray-500 uppercase">
          Data Visualization Active
        </span>
        <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

export default WeatherCharts;