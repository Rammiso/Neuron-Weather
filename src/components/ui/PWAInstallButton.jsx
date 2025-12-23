import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone } from 'lucide-react';

const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check if iOS
    const checkIfIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      setIsIOS(isIOSDevice);
      return isIOSDevice;
    };

    // Check if already installed
    const checkIfInstalled = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = window.navigator.standalone === true;
      return isStandaloneMode || isIOSStandalone;
    };

    checkMobile();
    checkIfIOS();
    const installed = checkIfInstalled();

    // Show button if mobile and not installed
    if (!installed && window.innerWidth < 768) {
      setShowButton(true);
    }

    // Listen for beforeinstallprompt (Android)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Show iOS instructions
      alert('To install:\n1. Tap the Share button (↑)\n2. Tap "Add to Home Screen"');
      return;
    }

    if (!deferredPrompt) {
      alert('Installation not available. Please use your browser menu to install.');
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowButton(false);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Install error:', error);
    }
  };

  // Only show on mobile
  if (!isMobile || !showButton) {
    return null;
  }

  return (
    <motion.button
      onClick={handleInstallClick}
      className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg border border-neon-green/30 hover:border-neon-green/50 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, delay: 1.5 }}
    >
      {isIOS ? (
        <Smartphone className="w-3.5 h-3.5 text-neon-green" />
      ) : (
        <Download className="w-3.5 h-3.5 text-neon-green" />
      )}
      <span className="font-mono text-xs text-gray-300 uppercase tracking-wide">
        Install
      </span>
      <motion.div
        className="absolute inset-0 bg-neon-green/10 rounded-lg"
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};

export default PWAInstallButton;
