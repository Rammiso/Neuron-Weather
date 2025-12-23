import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Smartphone, 
  X, 
  Zap,
  CheckCircle
} from 'lucide-react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = window.navigator.standalone === true;
      const isAppInstalled = isStandaloneMode || isIOSStandalone;
      setIsInstalled(isAppInstalled);
      return isAppInstalled;
    };

    // Check if iOS
    const checkIfIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      setIsIOS(isIOSDevice);
      return isIOSDevice;
    };

    const installed = checkIfInstalled();
    const iosDevice = checkIfIOS();

    // Check if user has dismissed the prompt in this session
    const dismissed = sessionStorage.getItem('pwa-install-dismissed');

    // For iOS devices, show prompt immediately if not installed and not dismissed
    if (iosDevice && !installed && !dismissed) {
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 2000); // Show after 2 seconds on iOS
    }

    // Listen for the beforeinstallprompt event (Android/Chrome)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install prompt after a delay if not already installed
      if (!installed && !dismissed) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 2000); // Show after 2 seconds
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      
      // Clear session storage
      sessionStorage.removeItem('pwa-install-dismissed');
      
      console.log('🎉 NEURON Weather installed successfully!');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setShowInstallPrompt(false);
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // Clear the deferredPrompt
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Store dismissal in session storage (will show again on next visit/reload)
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  // Check session dismissal
  const sessionDismissed = sessionStorage.getItem('pwa-install-dismissed');
  if (sessionDismissed && !showInstallPrompt) {
    return null;
  }

  // iOS Install Instructions
  const IOSInstallPrompt = () => (
    <motion.div
      className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="glass p-5 rounded-2xl border-2 border-neon-green/40 bg-gradient-to-br from-neon-green/10 to-neon-cyan/5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <Smartphone className="w-7 h-7 text-neon-green" />
            <motion.div
              className="absolute inset-0 bg-neon-green/30 rounded-full blur-md"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-100 text-base">
                Install NEURON Weather
              </h3>
              <Zap className="w-4 h-4 text-neon-cyan" />
            </div>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              Install this app on your iPhone: tap <span className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 rounded text-white text-xs mx-1">↑</span> then <strong className="text-neon-green">"Add to Home Screen"</strong>
            </p>
            
            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-full bg-neon-green/20 text-neon-green border border-neon-green/30">
                ⚡ Instant Access
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30">
                📱 Native Feel
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                🔔 Notifications
              </span>
            </div>
            
            <button
              onClick={handleDismiss}
              className="text-xs px-3 py-1.5 glass rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
            >
              Maybe Later
            </button>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Android/Desktop Install Prompt
  const AndroidInstallPrompt = () => (
    <motion.div
      className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="glass p-5 rounded-2xl border-2 border-neon-green/40 bg-gradient-to-br from-neon-green/10 to-neon-cyan/5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <Download className="w-7 h-7 text-neon-green" />
            <motion.div
              className="absolute inset-0 bg-neon-green/30 rounded-full blur-md"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-gray-100 text-base">
                Install NEURON Weather
              </h3>
              <Zap className="w-4 h-4 text-neon-cyan" />
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Get instant access, offline support, and native app experience.
            </p>
            
            <div className="flex gap-2 mb-3">
              <motion.button
                onClick={handleInstallClick}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-neon-green to-neon-dark text-black font-bold rounded-lg hover:shadow-lg hover:shadow-neon-green/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="font-mono text-sm uppercase">Install Now</span>
              </motion.button>
              
              <button
                onClick={handleDismiss}
                className="px-4 py-2 text-sm glass rounded-lg text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        {/* Features list */}
        <div className="mt-3 pt-3 border-t border-cyber-border/30">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
              <span>Offline Access</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
              <span>Push Notifications</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
              <span>Faster Loading</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle className="w-3.5 h-3.5 text-neon-green" />
              <span>Native Experience</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        isIOS ? <IOSInstallPrompt /> : <AndroidInstallPrompt />
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;