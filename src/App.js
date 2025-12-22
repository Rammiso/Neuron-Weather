import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

// Components
import ParticleBackground from "./components/ui/ParticleBackground";
import LocationSearchInput from "./components/ui/LocationSearchInput";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import FloatingActionButton from "./components/ui/FloatingActionButton";
import SystemStatus from "./components/ui/SystemStatus";
import NotificationSystem from "./components/ui/NotificationSystem";
import PWAInstallPrompt from "./components/ui/PWAInstallPrompt";
import LocationHeader from "./components/LocationHeader";
import WeatherCard from "./components/WeatherCard";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";
import WeatherVisuals from "./components/ui/WeatherVisuals";

// New Advanced Components
import WeatherInsights from "./components/WeatherInsights";
import AirQualityCard from "./components/AirQualityCard";
import ExtremeWeatherAlerts from "./components/ExtremeWeatherAlerts";
import MinutelyForecast from "./components/MinutelyForecast";
import WeatherCharts from "./components/WeatherCharts";
import FavoriteLocations from "./components/FavoriteLocations";

// Hooks
import useWeather from "./hooks/useWeather";
import useDynamicTheme from "./hooks/useDynamicTheme";

// Icons
import { AlertCircle, Zap, Activity } from "lucide-react";

export default function App() {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useWeather(search);
  
  // Dynamic theme based on weather conditions
  useDynamicTheme(data, data?.forecast);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Weather Visuals */}
      <WeatherVisuals 
        weatherCondition={data?.current?.condition?.text} 
        intensity={0.6}
      />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* System Status */}
      <SystemStatus />
      
      {/* Notification System */}
      <NotificationSystem />
      
      {/* Floating Action Button */}
      <FloatingActionButton />
      
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      
      {/* Main Content */}
      <motion.div
        className="relative z-10 min-h-screen flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header
          className="text-center py-8 md:py-12 px-4 safe-area-top"
          variants={headerVariants}
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4">
            <div className="relative">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-neon-green" />
              <motion.div
                className="absolute inset-0 bg-neon-green/30 rounded-full blur-md"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold neon-text text-shadow-glow">
              NEURON WEATHER
            </h1>
            <Activity className="w-6 h-6 md:w-8 md:h-8 text-neon-cyan" />
          </div>
          
          <p className="font-mono text-gray-400 uppercase tracking-[0.2em] text-xs md:text-sm lg:text-base">
            Neural Weather Intelligence System
          </p>
          
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            <span className="font-mono text-xs text-gray-500 uppercase">
              Neural Network v2.1.0 Active
            </span>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
          </div>
        </motion.header>

        {/* Search Section */}
        <div className="px-4 mb-8">
          <LocationSearchInput 
            onLocationSelect={setSearch}
            placeholder="Initialize weather scan for city..."
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 px-4 pb-12 safe-area-bottom">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-20"
                >
                  <LoadingSpinner 
                    size="lg" 
                    text="Scanning atmospheric conditions..." 
                  />
                </motion.div>
              )}

              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-20"
                >
                  <div className="glass p-8 rounded-2xl text-center max-w-md">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">
                      Scan Failed
                    </h3>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <p className="font-mono text-xs text-gray-500 uppercase">
                      Try a different location
                    </p>
                  </div>
                </motion.div>
              )}

              {!loading && !error && !data && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState />
                </motion.div>
              )}

              {!loading && !error && data && (
                <motion.div
                  key="data"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Location Header */}
                  <LocationHeader 
                    location={data.location} 
                    search={search} 
                  />

                  {/* Extreme Weather Alerts */}
                  <ExtremeWeatherAlerts 
                    currentWeather={data}
                    forecast={data.forecast}
                  />

                  {/* Advanced Features Grid - Responsive Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Weather Insights */}
                      <WeatherInsights 
                        currentWeather={data}
                        forecast={data.forecast}
                      />
                      
                      {/* Minutely Forecast - Compact */}
                      <MinutelyForecast 
                        currentWeather={data}
                        forecast={data.forecast}
                      />
                    </div>
                    
                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Air Quality */}
                      <AirQualityCard 
                        location={data.location}
                        isVisible={true}
                      />
                      
                      {/* Favorite Locations */}
                      <FavoriteLocations 
                        currentLocation={data.location}
                        onLocationSelect={setSearch}
                      />
                    </div>
                  </div>

                  {/* Charts - Full Width */}
                  <div className="mb-8">
                    <WeatherCharts forecast={data.forecast} />
                  </div>

                  {/* Weather Cards Grid */}
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-50 mb-4 md:mb-6 text-center">
                      7-Day Forecast
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {data.forecast.forecastday.map((day, index) => (
                        <WeatherCard
                          key={day.date}
                          data={day}
                          index={index}
                          isToday={index === 0}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}
