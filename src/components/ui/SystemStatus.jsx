import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Wifi, 
  Database, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  ChevronDown
} from 'lucide-react';

const SystemStatus = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    uptime: 0
  });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse on mobile
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate system stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 30) + 15, // 15-45%
        memory: Math.floor(Math.random() * 20) + 60, // 60-80%
        network: Math.floor(Math.random() * 40) + 80, // 80-120 Mbps
        uptime: Date.now() - new Date().setHours(0, 0, 0, 0) // Time since midnight
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (value, type) => {
    if (type === 'cpu') {
      if (value < 30) return 'text-neon-green';
      if (value < 60) return 'text-yellow-400';
      return 'text-red-400';
    }
    if (type === 'memory') {
      if (value < 70) return 'text-neon-green';
      if (value < 85) return 'text-yellow-400';
      return 'text-red-400';
    }
    return 'text-neon-cyan';
  };

  const statusItems = [
    {
      icon: Cpu,
      label: 'Neural CPU',
      shortLabel: 'CPU',
      value: `${systemStats.cpu}%`,
      color: getStatusColor(systemStats.cpu, 'cpu'),
      status: systemStats.cpu < 50 ? 'optimal' : 'high'
    },
    {
      icon: Database,
      label: 'Memory',
      shortLabel: 'MEM',
      value: `${systemStats.memory}%`,
      color: getStatusColor(systemStats.memory, 'memory'),
      status: systemStats.memory < 80 ? 'optimal' : 'high'
    },
    {
      icon: Wifi,
      label: 'Network',
      shortLabel: 'NET',
      value: `${systemStats.network}`,
      unit: 'Mbps',
      color: 'text-neon-cyan',
      status: 'optimal'
    },
    {
      icon: Activity,
      label: 'Uptime',
      shortLabel: 'UP',
      value: formatUptime(systemStats.uptime),
      color: 'text-purple-400',
      status: 'optimal'
    }
  ];

  return (
    <motion.div
      className={`fixed z-40 ${
        isMobile 
          ? 'top-4 right-4' 
          : 'top-4 right-4'
      }`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className={`glass rounded-xl ${isMobile ? 'p-2' : 'p-4'} ${isMobile ? 'w-12 h-12 flex items-center justify-center' : 'min-w-[280px]'}`}>
        {/* Header - Always Visible */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => isMobile && setIsExpanded(!isExpanded)}
          whileTap={isMobile ? { scale: 0.98 } : {}}
        >
          {/* Mobile: Compact toggle button */}
          {isMobile && !isExpanded && (
            <div className="relative">
              <Zap className="w-5 h-5 text-neon-green" />
              <motion.div
                className="absolute inset-0 bg-neon-green/30 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          )}
          
          {/* Desktop or Mobile Expanded: Full header */}
          {!isMobile || isExpanded ? (
            <>
              <div className="relative">
                <Zap className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-neon-green`} />
                <motion.div
                  className="absolute inset-0 bg-neon-green/30 rounded-full blur-sm"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-gray-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  System Status
                </h3>
                {!isMobile && (
                  <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
                    Neural Network Monitor
                  </p>
                )}
              </div>
              
              {/* Desktop: Always show status icon */}
              {!isMobile && (
                <CheckCircle className="w-4 h-4 text-neon-green" />
              )}
              
              {/* Mobile: Toggle icon */}
              {isMobile && (
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
              )}
            </>
          ) : null}
        </motion.div>

        {/* Expandable Content */}
        <AnimatePresence>
          {(!isMobile || isExpanded) && (
            <motion.div
              initial={isMobile ? { height: 0, opacity: 0 } : false}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {/* Divider */}
              <div className={`border-t border-cyber-border/30 ${isMobile ? 'my-3' : 'my-4'}`} />

              {/* Status Items */}
              <div className={`${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                {statusItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <IconComponent className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${item.color}`} />
                          {item.status === 'optimal' && !isMobile && (
                            <motion.div
                              className="absolute inset-0 bg-current rounded-full blur-sm opacity-30"
                              animate={{
                                scale: [1, 1.2, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.3
                              }}
                            />
                          )}
                        </div>
                        <span className={`font-mono ${isMobile ? 'text-xs' : 'text-xs'} text-gray-300 uppercase tracking-wide`}>
                          {isMobile ? item.shortLabel : item.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono ${isMobile ? 'text-xs' : 'text-sm'} font-semibold ${item.color}`}>
                          {item.value}
                          {item.unit && isMobile && <span className="text-xs opacity-70 ml-0.5">{item.unit}</span>}
                        </span>
                        {!isMobile && (
                          item.status === 'optimal' ? (
                            <CheckCircle className="w-3 h-3 text-neon-green" />
                          ) : (
                            <AlertTriangle className="w-3 h-3 text-yellow-400" />
                          )
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* System Health Bar */}
              <div className={`${isMobile ? 'mt-3 pt-3' : 'mt-4 pt-3'} border-t border-cyber-border/30`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono ${isMobile ? 'text-xs' : 'text-xs'} text-gray-400 uppercase tracking-wide`}>
                    {isMobile ? 'Health' : 'System Health'}
                  </span>
                  <span className={`font-mono ${isMobile ? 'text-xs' : 'text-xs'} text-neon-green font-semibold`}>
                    98.7%
                  </span>
                </div>
                
                <div className={`relative ${isMobile ? 'h-1.5' : 'h-2'} bg-cyber-border/30 rounded-full overflow-hidden`}>
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '98.7%' }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  
                  {/* Animated glow effect */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-green/50 to-neon-cyan/50 rounded-full blur-sm"
                      initial={{ width: 0 }}
                      animate={{ width: '98.7%' }}
                      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    />
                  )}
                </div>
              </div>

              {/* Last Update */}
              {!isMobile && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-gray-500">
                    Last update: {new Date().toLocaleTimeString()}
                  </span>
                  <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SystemStatus;