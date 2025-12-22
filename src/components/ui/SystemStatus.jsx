import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Wifi, 
  Database, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  Zap
} from 'lucide-react';

const SystemStatus = () => {
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    uptime: 0
  });

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
      value: `${systemStats.cpu}%`,
      color: getStatusColor(systemStats.cpu, 'cpu'),
      status: systemStats.cpu < 50 ? 'optimal' : 'high'
    },
    {
      icon: Database,
      label: 'Memory',
      value: `${systemStats.memory}%`,
      color: getStatusColor(systemStats.memory, 'memory'),
      status: systemStats.memory < 80 ? 'optimal' : 'high'
    },
    {
      icon: Wifi,
      label: 'Network',
      value: `${systemStats.network} Mbps`,
      color: 'text-neon-cyan',
      status: 'optimal'
    },
    {
      icon: Activity,
      label: 'Uptime',
      value: formatUptime(systemStats.uptime),
      color: 'text-purple-400',
      status: 'optimal'
    }
  ];

  return (
    <motion.div
      className="fixed top-4 right-4 z-40"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="glass p-4 rounded-xl min-w-[280px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-cyber-border/30">
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
          <div>
            <h3 className="font-semibold text-gray-200 text-sm">System Status</h3>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-wide">
              Neural Network Monitor
            </p>
          </div>
          <div className="ml-auto">
            <CheckCircle className="w-4 h-4 text-neon-green" />
          </div>
        </div>

        {/* Status Items */}
        <div className="space-y-3">
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
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <IconComponent className={`w-4 h-4 ${item.color}`} />
                    {item.status === 'optimal' && (
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
                  <span className="font-mono text-xs text-gray-300 uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-sm font-semibold ${item.color}`}>
                    {item.value}
                  </span>
                  {item.status === 'optimal' ? (
                    <CheckCircle className="w-3 h-3 text-neon-green" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-yellow-400" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* System Health Bar */}
        <div className="mt-4 pt-3 border-t border-cyber-border/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-wide">
              System Health
            </span>
            <span className="font-mono text-xs text-neon-green font-semibold">
              98.7%
            </span>
          </div>
          
          <div className="relative h-2 bg-cyber-border/30 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-green to-neon-cyan rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '98.7%' }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Animated glow effect */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-green/50 to-neon-cyan/50 rounded-full blur-sm"
              initial={{ width: 0 }}
              animate={{ width: '98.7%' }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
          </div>
        </div>

        {/* Last Update */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" />
          <span className="font-mono text-xs text-gray-500">
            Last update: {new Date().toLocaleTimeString()}
          </span>
          <div className="w-1 h-1 bg-neon-green rounded-full animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

export default SystemStatus;