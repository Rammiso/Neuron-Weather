import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  X
} from 'lucide-react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Demo notifications - only show on desktop
  useEffect(() => {
    if (isMobile) return; // Skip startup messages on mobile
    
    const demoNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Neural Network Online',
        message: 'Weather intelligence system activated',
        duration: 4000
      },
      {
        id: 2,
        type: 'info',
        title: 'System Update',
        message: 'NEURON Weather v2.1.0 loaded successfully',
        duration: 3000
      }
    ];

    // Show demo notifications with delay
    setTimeout(() => {
      setNotifications(demoNotifications);
    }, 2000);

    // Auto-remove notifications
    const timer = setTimeout(() => {
      setNotifications([]);
    }, 8000);

    return () => clearTimeout(timer);
  }, [isMobile]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-neon-green" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <X className="w-5 h-5 text-red-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-neon-cyan" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-neon-green/30 bg-neon-green/5';
      case 'warning':
        return 'border-yellow-400/30 bg-yellow-400/5';
      case 'error':
        return 'border-red-400/30 bg-red-400/5';
      case 'info':
      default:
        return 'border-neon-cyan/30 bg-neon-cyan/5';
    }
  };

  return (
    <div className="fixed top-4 left-4 md:left-4 z-50 space-y-3 max-w-sm md:max-w-sm w-full md:w-auto px-4 md:px-0">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`glass p-4 rounded-xl border ${getNotificationColor(notification.type)} relative overflow-hidden`}
          >
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, ease: "linear" }}
            />
            
            <div className="relative z-10 flex items-start gap-3">
              {/* Icon */}
              <div className="relative mt-0.5">
                {getNotificationIcon(notification.type)}
                <motion.div
                  className="absolute inset-0 bg-current rounded-full blur-sm opacity-30"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-200 text-sm mb-1">
                  {notification.title}
                </h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {notification.message}
                </p>
              </div>
              
              {/* Close button */}
              <motion.button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            
            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-current opacity-30"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: notification.duration / 1000, ease: "linear" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;