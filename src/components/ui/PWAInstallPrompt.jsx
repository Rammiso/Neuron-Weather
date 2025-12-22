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
      setIsStandalone(isStandaloneMode || isIOSStandalone);
      setIsInstalled(isStandaloneMode || isIOSStandalone);
    };

    // Check if iOS
    const checkIfIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      setIsIOS(isIOSDevice);
    };

    checkIfInstalled();
    checkIfIOS();

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install prompt after a delay if not already installed
      if (!isInstalled) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 3000); // Show after 3 seconds
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      
      // Show success message
      setTimeout(() => {
        alert('🎉 NEURON Weather installed successfully!');
      }, 500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

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
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or dismissed
  if (isInstalled || sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  // iOS Install Instructions
  const IOSInstallPrompt = () => (
    <motion.div
      className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="glass p-4 rounded-2xl border border-neon-green/30 bg-neon-green/5">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Smartphone className="w-6 h-6 text-neon-green" />
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
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-200 mb-2">
              Install NEURON Weather
            </h3>
            <p className="text-sm text-gray-300 mb-3">
              Tap the Share button <span className="inline-block">📤</span> then "Add to Home Screen" to install.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="px-3 py-1 text-xs glass rounded-lg text-gray-400 hover:text-gray-200 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
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
      className="fixed bottom-4 left-4 right-4 z-50 max-w-sm mx-auto"
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="glass p-4 rounded-2xl border border-neon-green/30 bg-neon-green/5 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Download className="w-6 h-6 text-neon-green" />
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
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-200">
                Install NEURON Weather
              </h3>
              <Zap className="w-4 h-4 text-neon-cyan" />
            </div>
            <p className="text-sm text-gray-300 mb-3">
              Get instant access, offline support, and native app experience.
            </p>
            
            <div className="flex gap-2">
              <motion.button
                onClick={handleInstallClick}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-green to-neon-dark text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span className="font-mono text-sm uppercase">Install Now</span>
              </motion.button>
              
              <button
                onClick={handleDismiss}
                className="px-3 py-2 text-sm glass rounded-lg text-gray-400 hover:text-gray-200 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        {/* Features list */}
        <div className="mt-3 pt-3 border-t border-cyber-border/30">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-gray-400">
              <CheckCircle className="w-3 h-3 text-neon-green" />
              <span>Offline Access</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <CheckCircle className="w-3 h-3 text-neon-green" />
              <span>Push Notifications</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <CheckCircle className="w-3 h-3 text-neon-green" />
              <span>Faster Loading</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <CheckCircle className="w-3 h-3 text-neon-green" />
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